
export class Gecko implements App.IGecko {

    constructor(private monitors: App.IMonitorDevicesPair[]) { }

    public watchBuilds(): void {

        this.monitors.forEach((monitor) => {

            if (monitor.lights && monitor.lights.length > 0)
                monitor.lights.forEach(light => light.init())

            this.watch(monitor);

        }, this);
    }

    private watch(monitor: App.IMonitorDevicesPair): void {

        let forEachLight = (callbackfn: (lamp: App.IBuildLightBulb) => void) => {
            if (monitor.lights && monitor.lights.length > 0)
                monitor.lights.forEach(callbackfn)
        }

        monitor.build.watchBuilds({
            buildSucceeded: function (build: App.IBuild) {

                forEachLight(light => {
                    if (light.buildSucceeded)
                        light.buildSucceeded();
                });
            },
            buildPartiallySucceeded: function (build: App.IBuild) {

                forEachLight(light => {
                    if (light.buildPartiallySucceeded)
                        light.buildPartiallySucceeded();
                });
            },
            buildFailed: function (build: App.IBuild) {

                forEachLight(light => {
                    if (light.buildFailed)
                        light.buildFailed();
                });
            },
        });
    }

    public stopMonitoringBuilds(): void {
        this.monitors.forEach((monitor) => monitor.build.stopWatchingBuilds());
    }
}