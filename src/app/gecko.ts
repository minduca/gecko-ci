
export class Gecko {

    constructor(private monitors: App.IMonitorDevicesPair[]) { }

    public watchBuilds(): void {

        this.monitors.forEach((monitor) => {

            let forEachLight = (callbackfn: (lamp: App.IBuildLamp) => void) => {
                if (monitor.lights && monitor.lights.length > 0)
                    monitor.lights.forEach(callbackfn)
            }

            monitor.build.watchBuilds({
                buildSucceeded: function (build: App.IBuild) {

                    forEachLight(light => light.displayBuildSucceededStatus());
                },
                buildPartiallySucceeded: function (build: App.IBuild) {

                    forEachLight(light => light.displayBuildPartiallySucceededStatus());
                },
                buildFailed: function (build: App.IBuild) {

                    forEachLight(light => light.buildFailedStatus());
                },
            });

        }, this);
    }

    public stopMonitoringBuilds() {
        this.monitors.forEach((monitor) => monitor.build.stopWatchingBuilds());
    }
}