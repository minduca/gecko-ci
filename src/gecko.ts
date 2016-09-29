
export class Gecko implements App.IGecko {

    constructor(private monitors: App.IMonitorDevicesPair[]) { }

    public watchBuilds(): void {

        this.monitors.forEach((monitor) => {

            let forEachLight = (callbackfn: (lamp: App.IBuildLightBulb) => void) => {
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

    public stopMonitoringBuilds(): void {
        this.monitors.forEach((monitor) => monitor.build.stopWatchingBuilds());
    }
}