import {Cardiologist} from "../helpers/cardiologist"

//Technology agnostic build monitor
export class BuildMonitor implements App.IBuildMonitor {

    private lastBuild: App.IBuild;
    private cardiologist: Cardiologist;

    constructor(private builds: App.IBuildServices) {
        this.cardiologist = new Cardiologist();
    }

    public watchBuilds(options: App.IWatchBuildOptions): void {

        this.cardiologist.startHeartBeat({
            intervalMilliseconds: 30000,
            key: options.project,
            action: function () {

                let self: BuildMonitor = this;
                self.searchBuilds(options);

            }.bind(this),
            executeOnRegister: this.lastBuild == undefined
        });
    }

    public stopWatchingBuilds(project?: string): void {

        if (project)
            this.cardiologist.stopHeartBeat(project);
        else
            this.cardiologist.stopAll();
    }

    private searchBuilds(options: App.IWatchBuildOptions): void {

        this.builds.getBuilds({
            projectName: options.project,
            $top: 5
        }).then(
            function (builds: App.IBuild[]) {

                if (builds && builds.length > 0) {

                    let self: BuildMonitor = this;
                    let previousBuild = self.lastBuild;
                    let lastBuild = builds[0];
                    let isNewBuild = !previousBuild || lastBuild.id != previousBuild.id;

                    self.lastBuild = lastBuild;

                    if (isNewBuild) {

                        if (options.buildComplete)
                            options.buildComplete(lastBuild);

                        let isNewResult = !previousBuild || previousBuild.result != lastBuild.result;

                        if (isNewResult && options.buildResultChanged)
                            options.buildResultChanged(lastBuild);
                    }
                }
            }.bind(this));
    }
}