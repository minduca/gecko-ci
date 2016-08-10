
export class Gecko {

    constructor(private buildMonitor: App.IBuildMonitor) { }

    public watchBuilds(project: string): void {

        let obj = this;
        this.buildMonitor.watchBuilds({
            project: project,
            buildResultChanged: function (build: App.IBuild) {
                obj.notifyBuildStatus(build);
            }
        });
    }

    private notifyBuildStatus(build: App.IBuild): void {

        let x = 0;
    }

    public stopMonitoringBuilds(project?: string) {
        this.buildMonitor.stopWatchingBuilds(project);
    }
}