import {ObjectHelper, ArrayHelper} from "../src/helpers/helpers"

let gecko: App.IGeckoModule = require("../src/index")
let http = require('http');

class Server {

    public init(): void {

        let config: IAppConfiguration = this.loadConfig();

        let monitor = gecko.watchBuilds(config);

        this.createServer();
    }

    private createServer() {

        http.createServer(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Gecko\n');
        }).listen(1337);
    }

    private loadConfig(): IAppConfiguration {
        let config: IAppConfiguration = require("./config");
        const userConfigFileName = "./config.user";

        let userConfig: {
            connections: ConnectionsConfig[]
        };

        let result = config;

        if (config.connections && config.connections.length > 0) {

            try {
                userConfig = require(userConfigFileName);
            } catch (e) { }

            if (userConfig && userConfig.connections) {

                let dictionary = ArrayHelper.toDictionary(userConfig.connections, con => con.name);
                config.connections.forEach((con, index, array) => {

                    let userConnection = dictionary[con.name];
                    if (userConnection)
                        array[index] = ObjectHelper.merge(con, userConnection);
                });
            }
        }

        return result;
    }
}

let server = new Server();
server.init();