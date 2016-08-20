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

        if (!config.connections)
            throw "no connection was found";

        if (!config.buildServices)
            throw "no build configuration was found";

        if (!config.buildMonitors)
            throw "no build monitor was found";

        if (!options.buildServicefactories)
            throw "no build service factory was found";

        config.buildMonitors.forEach(monitorConfig => {

            let technology = monitorConfig.buildTechnology;
            let factoryfn = options.buildServicefactories[technology];

            if (!factoryfn)
                throw "factory " + technology + " was not found";

            if (!config.connections[technology])
                throw "no connection was found for " + technology;

            if (!config.buildServices[technology])
                throw "no build service was found for " + technology;

            let connection = config.connections[technology][monitorConfig.connection];
            let buildServiceConfig = config.buildServices[technology][monitorConfig.buildService];

            if (!connection)
                throw "no connection was found for " + technology + " with name \"" + monitorConfig.connection + "\"";

            if (!buildServiceConfig)
                throw "no build service was found for " + technology + " with name \"" + monitorConfig.connection + "\"";

            let buildServices = factoryfn(connection, buildServiceConfig);
            let buildMonitor = new BuildMonitor(buildServices);

            monitors.push(buildMonitor);
        });

        return monitors;
    }
}