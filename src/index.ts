import {Gecko} from "./gecko"
import {BuildMonitor} from "./build-monitor"
import {TfsRestClient} from "./tfs/tfs-rest-client"
import {TfsBuildServices} from "./tfs/tfs-build-services"
import {ObjectHelper, ArrayHelper} from "./helpers/helpers"

module.exports = {
    watchBuilds(options: App.IGeckoFactoryOptions): App.IGecko {
        let gecko = GeckoFactory.createGecko(options);
        gecko.watchBuilds();
        return gecko;
    }
}

class GeckoFactory {

    public static createGecko(options: App.IGeckoFactoryOptions): Gecko {

        options = GeckoFactory.mergeWithDefaultOptions(options);

        let buildMonitors = BuildMonitorsFactory.createBuildMonitors(options);
        let monitors = GeckoFactory.createMonitorDevicesPairs(buildMonitors, options);

        return new Gecko(monitors);
    }

    private static mergeWithDefaultOptions(options: App.IGeckoFactoryOptions): App.IGeckoFactoryOptions {


        let defaults: App.IGeckoFactoryOptions = {
            buildServicefactories: {
                "tfs": (connection: TFS.ITfsConnection, buildConfig: TFS.ITfsBuildServiceOptions): App.IBuildServices => {
                    let restClient = new TfsRestClient(connection);
                    return new TfsBuildServices(restClient, buildConfig);
                }
            },
            lightBulbfactories: {
                "lifx": (connection: LIFX.ILifxConnection): App.IBuildLightBulb => {
                    return undefined;
                }
            }
        };

        return ObjectHelper.merge(defaults, options)
    }

    private static createMonitorDevicesPairs(buildMonitors: BuildMonitor[], options: App.IGeckoFactoryOptions): App.IMonitorDevicesPair[] {

        let config = options.config;

        if (!config.lightBulbs)
            throw "no light bulb configuration was found";

        if (!options.lightBulbfactories)
            throw "no light bulb factory was found";

        return buildMonitors.map<App.IMonitorDevicesPair>(build => {

            let lights = new Array<App.IBuildLightBulb>();

            if (config.lightBulbs.length > 0) {

                let lightBulbConfigs = config.lightBulbs.filter(config => ArrayHelper.contains(config.buildMonitorsNames, name => name == build.name));

                if (lightBulbConfigs.length > 0) {

                    lights = lightBulbConfigs.map<App.IBuildLightBulb>(lightBulbConfig => {

                        let factoryfn = options.lightBulbfactories[lightBulbConfig.technology];

                        if (!factoryfn)
                            throw "factory " + lightBulbConfig.technology + " was not found";

                        return factoryfn(lightBulbConfig);
                    });
                }
            }

            return {
                build: build,
                lights: lights
            };
        });
    }
}

class BuildMonitorsFactory {

    public static createBuildMonitors(options: App.IGeckoFactoryOptions): Array<BuildMonitor> {

        let monitors: { [name: string]: BuildMonitor } = {};
        let config = options.config;

        if (!config.buildMonitors)
            throw "no build configuration was found";

        if (!options.buildServicefactories)
            throw "no build service factory was found"

        return config.buildMonitors.map<BuildMonitor>(buildMonitorConfig => {

            let buildServices = BuildMonitorsFactory.createBuildServices(buildMonitorConfig, options)
            return new BuildMonitor(buildServices, buildMonitorConfig.name);
        });
    }

    private static createBuildServices(buildMonitorConfig: BuildMonitorsConfig, options: App.IGeckoFactoryOptions): App.IBuildServices {

        let connection = ArrayHelper.firstOrDefault(options.config.connections, con => con.name == buildMonitorConfig.connectionName);
        let technology = connection.technology;
        let factoryfn = options.buildServicefactories[technology];

        if (!factoryfn)
            throw "factory " + technology + " was not found";

        if (!connection)
            throw "connection " + buildMonitorConfig.connectionName + " was not found";

        return factoryfn(connection, buildMonitorConfig);
    }
}