import {Gecko} from "./gecko"
import {BuildMonitor} from "./build-monitor"

export class GeckoFactory {

    public static createGecko(options: App.IGeckoFactoryOptions): Gecko {

        let buildMonitors = this.createBuildMonitors(options);
        return new Gecko(buildMonitors);
    }

    private static createBuildMonitors(options: App.IGeckoFactoryOptions): BuildMonitor[] {

        let monitors = new Array<BuildMonitor>();
        let config = options.config;

        if (!config.buildsToWatch)
            throw "no build configuration was found";

        if (!options.buildServicefactories)
            throw "no build service factory was found"

        Object.keys(config.buildsToWatch).forEach(technology => {

            let factoryfn = options.buildServicefactories[technology];

            if (factoryfn == undefined) {
                throw "factory " + technology + " was not found";
            }

            this.forEachBuild(config.connections[technology], config.buildsToWatch[technology],
                (connection, buildConfig): void => {

                    let buildServices = factoryfn(connection, buildConfig);
                    let buildMonitor = new BuildMonitor(buildServices);
                    monitors.push(buildMonitor);
                });
        });

        return monitors;
    }

    private static forEachBuild(connections: { [name: string]: any },
        buildsToWatch: { [name: string]: any }, callbackfn: (connection: any, buildConfig: any) => void): void {

        if (buildsToWatch != undefined) {

            Object.keys(buildsToWatch).forEach(buildName => {

                let buildConfig = buildsToWatch[buildName];
                let connection = connections[buildConfig.connection];

                if (!connection)
                    throw "connection " + buildConfig.connection + " was not found";

                callbackfn(connection, buildConfig);
            });
        }
    }
}