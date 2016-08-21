import {Gecko} from "./gecko"
import {BuildMonitor} from "./build-monitor"
import {TfsRestClient} from "../tfs/tfs-rest-client"
import {TfsBuildServices} from "../tfs/tfs-build-services"
import {ObjectHelper} from "../helpers/helpers"

export class GeckoFactory {

    public static createGecko(options: App.IGeckoFactoryOptions): Gecko {

        options = GeckoFactory.mergeWithDefaultOptions(options);

        let buildMonitors = BuildMonitorsFactory.createBuildMonitors(options);
        let monitors = GeckoFactory.createMonitorDevicesPairs(buildMonitors, options.config.lightBulbs);

        return new Gecko(monitors);
    }

    private static mergeWithDefaultOptions(options: App.IGeckoFactoryOptions): App.IGeckoFactoryOptions {

        return ObjectHelper.merge({
            buildServicefactories: {
                "tfs": (connection: TFS.ITfsConnection, buildConfig: TFS.ITfsBuildServiceOptions): App.IBuildServices => {
                    let restClient = new TfsRestClient(connection);
                    return new TfsBuildServices(restClient, buildConfig);
                }
            }
        }, options)
    }

    private static createMonitorDevicesPairs(buildMonitors: { [name: string]: BuildMonitor }, lightBulbsConfig): App.IMonitorDevicesPair[] {

        let monitors = new Array<App.IMonitorDevicesPair>();

        let buildLightsDictionary: { [name: string]: any[] } = {};

        if (lightBulbsConfig != undefined) {

            //Object.keys(lightBulbsConfig).forEach(technology => {

            //    let bulbsConfig = lightBulbsConfig[technology];
            //});
        }

        Object.keys(buildMonitors).forEach(name => {

            monitors.push({
                build: buildMonitors[name],
                lights: buildLightsDictionary[name]
            });
        })

        return monitors;
    }
}

export class BuildMonitorsFactory {

    public static createBuildMonitors(options: App.IGeckoFactoryOptions): { [name: string]: BuildMonitor } {

        let monitors: { [name: string]: BuildMonitor } = {};
        let config = options.config;

        if (!config.buildMonitors)
            throw "no build configuration was found";

        if (!options.buildServicefactories)
            throw "no build service factory was found"

        Object.keys(config.buildMonitors).forEach(technology => {

            let factoryfn = options.buildServicefactories[technology];

            if (factoryfn == undefined) {
                throw "factory " + technology + " was not found";
            }

            this.forEachBuild(config.connections[technology], config.buildMonitors[technology],
                (connection, buildConfig, buildConfigName: string): void => {

                    let buildServices = factoryfn(connection, buildConfig);
                    let buildMonitor = new BuildMonitor(buildServices);
                    monitors[buildConfigName] = buildMonitor;
                });
        });

        return monitors;
    }

    private static forEachBuild(connections: { [name: string]: any },
        buildsToWatch: { [name: string]: any }, callbackfn: (connection: any, buildConfig: any, buildConfigName: string) => void): void {

        if (buildsToWatch != undefined) {

            Object.keys(buildsToWatch).forEach(buildName => {

                let buildConfig = buildsToWatch[buildName];
                let connection = connections[buildConfig.connection];

                if (!connection)
                    throw "connection " + buildConfig.connection + " was not found";

                callbackfn(connection, buildConfig, buildName);
            });
        }
    }
}