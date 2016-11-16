import {ObjectHelper, ArrayHelper} from "./helpers/helpers"

export class ConfigMerger {

    public mergeConfig(getConfig: () => IAppConfiguration, getPrivateConfig: () => IAppPrivateConfiguration): IAppConfiguration {

        let config: IAppConfiguration = getConfig();
        let privateConfig: IAppPrivateConfiguration;

        let result = config;

        try {
            privateConfig = getPrivateConfig();
        } catch (e) { }

        this.mergeInto(config, privateConfig);

        return config;
    }

    public mergeInto(config: IAppConfiguration, privateConfig?: IAppPrivateConfiguration): void {

        if (privateConfig) {

            if (privateConfig.connections && config.connections && config.connections.length > 0) {
                this.merge(config.connections, privateConfig.connections);
            }

            if (privateConfig.lightBulbs && config.lightBulbs && config.lightBulbs.length > 0) {
                this.merge(config.lightBulbs, privateConfig.lightBulbs);
            }
        }
    }

    private merge(connections: { name: string }[], privateConnections: { name: string }[]) {

        let dictionary = ArrayHelper.toDictionary(privateConnections, con => con.name);

        connections.forEach((con, index, array) => {

            let userConnection = dictionary[con.name];
            if (userConnection)
                array[index] = ObjectHelper.merge(con, userConnection);
        });
    }
}