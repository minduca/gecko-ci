import {GeckoFactory} from "./app/gecko-factory"
import {ObjectHelper} from "./helpers/helpers"
let http = require('http');

class Server {

    public init(): void {

        let config = this.loadConfig();

        let gecko = GeckoFactory.createGecko(config);
        gecko.watchBuilds("gecko");
    }

    public createServer() {

        http.createServer(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello World\n');
        }).listen(1337);
    }

    private loadConfig(): App.IAppConfiguration {
        let config: App.IAppConfiguration = require("./config");
        let userConfig: App.IAppConfiguration;
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
server.createServer();