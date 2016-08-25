import {Gecko} from "./gecko"
import {BuildMonitor} from "./build-monitor"
import {TfsRestClient} from "../tfs/tfs-rest-client"
import {TfsBuildServices} from "../tfs/tfs-build-services"
import {ObjectHelper, ArrayHelper} from "../helpers/helpers"

export class GeckoFactory {

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

    private static createMonitorDevicesPairs(buildMonitors: { [name: string]: BuildMonitor }, options: App.IGeckoFactoryOptions): App.IMonitorDevicesPair[] {

        let config = options.config;
        let monitors = new Array<App.IMonitorDevicesPair>();

        if (!config.lightBulbs)
            throw "no light bulb configuration was found";

        if (!config.gecko || !config.gecko.lights)
            throw "no device mapping was found";

        if (!options.lightBulbfactories)
            throw "no light bulb factory was found";

        config.gecko.lights.forEach(map => {

            let build = buildMonitors[map.buildMonitorName];

            if (!build)
                throw "build " + map.buildMonitorName + " was not found";

            if (map.lightBulbsNames && map.lightBulbsNames.length > 0) {

                let lights = new Array<App.IBuildLightBulb>();
                map.lightBulbsNames.forEach(lightBulbName => {

                    let lightBulbConfig = ArrayHelper.firstOrDefault(config.lightBulbs, bulb => bulb.name == lightBulbName);

                    if (!lightBulbConfig)
                        throw "light bulb " + lightBulbName + " was not found";

                    let factoryfn = options.lightBulbfactories[lightBulbConfig.technology];

                    if (!factoryfn)
                        throw "factory " + lightBulbConfig.technology + " was not found";

                    let lightBulb = factoryfn(lightBulbConfig);
                    lights.push(lightBulb);
                });
                
                monitors.push({
                    build: build,
                    lights: lights
                });
            }
            
        });

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

        config.buildMonitors.forEach(buildMonitorConfig => {

            let technology = buildMonitorConfig.technology;
            let factoryfn = options.buildServicefactories[technology];

            if (!factoryfn)
                throw "factory " + technology + " was not found";

            let connection = ArrayHelper.firstOrDefault(config.connections, con => con.name == buildMonitorConfig.connection);

            if (!connection)
                throw "connection " + buildMonitorConfig.connection + " was not found";

            let buildServices = factoryfn(connection, buildMonitorConfig);
            let buildMonitor = new BuildMonitor(buildServices);
            monitors[buildMonitorConfig.name] = buildMonitor;

        });

        return monitors;
    }
}