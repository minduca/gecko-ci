
export class Gecko {

    constructor(private buildMonitors: App.IBuildMonitor[]) { }

    public watchBuilds(): void {

        this.buildMonitors.forEach((monitor) => {
            monitor.watchBuilds({
                buildResultChanged: function (build: App.IBuild) {

                    let self: Gecko = this;
                    self.notifyBuildStatus(build);

                }.bind(this)
            })
        }, this);
    }

    private notifyBuildStatus(build: App.IBuild): void {
        //TODO
    }

    public stopMonitoringBuilds() {
        this.buildMonitors.forEach((monitor) => monitor.stopWatchingBuilds());
    }
}