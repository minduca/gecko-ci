
export class Gecko {

    constructor(private buildMonitor: App.IBuildMonitor) { }

    public watchBuilds(project: string): void {

        this.buildMonitor.watchBuilds({
            project: project,
            buildResultChanged: function (build: App.IBuild) {

                let self: Gecko = this;
                self.notifyBuildStatus(build);

            }.bind(this)
        });
    }

    private notifyBuildStatus(build: App.IBuild): void {
        //TODO
    }

    public stopMonitoringBuilds(project?: string) {
        this.buildMonitor.stopWatchingBuilds(project);
    }
}