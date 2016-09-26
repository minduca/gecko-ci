import {Cardiologist} from "./helpers/cardiologist"
import {ArrayHelper} from "./helpers/helpers"

//Technology agnostic build monitor
export class BuildMonitor implements App.IBuildMonitor {

    private lastBuildCompleted: App.IBuild;
    private cardiologist: Cardiologist;

    constructor(private builds: App.IBuildServices, public name: string) {
        this.cardiologist = new Cardiologist();
    }

    public watchBuilds(options: App.IWatchBuildOptions): void {

        this.cardiologist.startHeartBeat({
            intervalMilliseconds: 30000,
            action: function () {

                let self: BuildMonitor = this;
                self.notifyNewBuilds(options);

            }.bind(this),
            executeOnRegister: this.lastBuildCompleted == undefined
        });
    }

    public stopWatchingBuilds(): void {

        this.cardiologist.stopAll();
    }

    private notifyNewBuilds(options: App.IWatchBuildOptions): void {

        this.builds.getBuilds({
            $top: 1,
            statusFilter: ["completed"],
            resultFilter: ["succeeded", "partiallySucceeded", "failed"]
        }).then(
            function (builds: App.IBuild[]) {

                let self: BuildMonitor = this;
                let info = self.extractInfo(builds);

                if (info.lastBuildCompleted) {

                    switch (info.lastBuildCompleted.result) {
                        case "succeeded":
                            {
                                if (options.buildSucceeded) {
                                    options.buildSucceeded(info.lastBuildCompleted);
                                }
                                break;
                            }
                        case "partiallySucceeded":
                            {
                                if (options.buildPartiallySucceeded) {
                                    options.buildPartiallySucceeded(info.lastBuildCompleted);
                                }
                                break;
                            }
                        case "failed":
                            {
                                if (options.buildFailed) {
                                    options.buildFailed(info.lastBuildCompleted);
                                }
                                break;
                            }
                    }

                    if (info.resultChanged && options.buildResultChanged) {
                        options.buildResultChanged(info.lastBuildCompleted);
                    }

                    if (options.buildCompleted) {
                        options.buildCompleted(info.lastBuildCompleted);
                    }
                }

            }.bind(this));
    }

    private extractInfo(builds: App.IBuild[]): IBuildResultInfo {

        let info: IBuildResultInfo = {};

        if (builds && builds.length > 0) {

            let indexLastCompleted = ArrayHelper.indexOf(builds, (b: App.IBuild) =>
                b.result != undefined && b.result != "canceled" && b.status == "completed");

            if (indexLastCompleted >= 0) {

                let lastBuild = builds[indexLastCompleted];
                let isNewBuild = !this.lastBuildCompleted || this.lastBuildCompleted.id != lastBuild.id || this.lastBuildCompleted.lastChangedDate != lastBuild.lastChangedDate;

                if (isNewBuild) {
                    info.lastBuildCompleted = lastBuild;
                    info.resultChanged = !this.lastBuildCompleted || this.lastBuildCompleted.result != lastBuild.result;
                    this.lastBuildCompleted = lastBuild;
                }
            }
        }

        return info;
    }
}

interface IBuildResultInfo {
    lastBuildCompleted?: App.IBuild;
    resultChanged?: boolean
}