import {Gecko} from "./gecko"
import {BuildMonitor} from "./build-monitor"
import {TfsRestClient} from "./tfs/tfs-rest-client"
import {TfsBuildServices} from "./tfs/tfs-build-services"
import {LifxBulb} from "./lighting/lifx-bulb"
import {ObjectHelper, ArrayHelper} from "./helpers/helpers"

export class GeckoFactory {

    public createGecko(options: IAppConfiguration): Gecko {

        options = this.mergeWithDefaultOptions(options);

        let monitorsFactory = new BuildMonitorsFactory();
        let buildMonitors = monitorsFactory.createBuildMonitors(options);

        let monitors = this.createMonitorDevicesPairs(buildMonitors, options);

        return new Gecko(monitors);
    }

    private mergeWithDefaultOptions(options: IAppConfiguration): IAppConfiguration {


        let defaults: IAppConfiguration = {
            buildServicefactories: {
                "tfs": (connection: TFS.ITfsConnection, buildConfig: TFS.ITfsBuildServiceOptions): App.IBuildServices => {
                    let restClient = new TfsRestClient(connection);
                    return new TfsBuildServices(restClient, buildConfig);
                }
            },
            lightBulbfactories: {
                "lifx": (connection: LIFX.ILifxConnection): App.IBuildLightBulb => {
                    return new LifxBulb(connection);
                }
            }
        };

        return ObjectHelper.merge(defaults, options)
    }

    private createMonitorDevicesPairs(buildMonitors: BuildMonitor[], options: IAppConfiguration): App.IMonitorDevicesPair[] {

        if (!options.lightBulbs)
            throw "no light bulb configuration was found";

        if (!options.lightBulbfactories)
            throw "no light bulb factory was found";

        return buildMonitors.map<App.IMonitorDevicesPair>(build => {

            let lights = new Array<App.IBuildLightBulb>();

            if (options.lightBulbs.length > 0) {

                let lightBulbConfigs = options.lightBulbs.filter(config => ArrayHelper.contains(config.buildMonitorsNames, name => name == build.name));

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

    public createBuildMonitors(options: IAppConfiguration): Array<BuildMonitor> {

        let monitors: { [name: string]: BuildMonitor } = {};

        if (!options.buildMonitors)
            throw "no build configuration was found";

        if (!options.buildServicefactories)
            throw "no build service factory was found"

        return options.buildMonitors.map<BuildMonitor>(buildMonitorConfig => {

            let buildServices = this.createBuildServices(buildMonitorConfig, options)
            return new BuildMonitor(buildServices, buildMonitorConfig.name);
        });
    }

    private createBuildServices(buildMonitorConfig: BuildMonitorsConfig, options: IAppConfiguration): App.IBuildServices {

        let connection = ArrayHelper.firstOrDefault(options.connections, con => con.name == buildMonitorConfig.connectionName);
        let technology = connection.technology;
        let factoryfn = options.buildServicefactories[technology];

        if (!factoryfn)
            throw "factory " + technology + " was not found";

        if (!connection)
            throw "connection " + buildMonitorConfig.connectionName + " was not found";

        return factoryfn(connection, buildMonitorConfig);
    }
}