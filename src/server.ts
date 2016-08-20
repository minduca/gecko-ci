import {GeckoFactory} from "./app/gecko-factory"
import {ObjectHelper} from "./helpers/helpers"
import {TfsRestClient} from "./tfs/tfs-rest-client"
import {TfsBuildServices} from "./tfs/tfs-build-services"

let http = require('http');

class Server {

    public init(): void {

        let config: IAppConfiguration = this.loadConfig();

        let gecko = GeckoFactory.createGecko({
            config: config,
            buildServicefactories: {
                "tfs": (connection: TFS.ITfsConnection, buildConfig: TFS.ITfsBuildServiceOptions): App.IBuildServices => {
                    let restClient = new TfsRestClient(connection);
                    return new TfsBuildServices(restClient, buildConfig);
                }
            }
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
