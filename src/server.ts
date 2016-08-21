import {GeckoFactory} from "./app/factories"
import {ObjectHelper} from "./helpers/helpers"

let http = require('http');

class Server {

    public init(): void {

        let config: IAppConfiguration = this.loadConfig();

        let gecko = GeckoFactory.createGecko({
            config: config
        });

        gecko.watchBuilds();

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
        let userConfig: IAppConfiguration;
        let result = config;

        try {
            userConfig = require("./config.user");
            result = ObjectHelper.merge(config, userConfig);

        } catch (e) { }

        return result;
    }
}

let server = new Server();
server.init();
