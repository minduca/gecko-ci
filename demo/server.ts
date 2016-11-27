let gecko: App.IGeckoModule = require("../src/index")
let http = require('http');

class Server {

    public init(): void {

        let config = require("./config");
        let privateConfig = require("./config.user")

        let monitor = gecko.watchBuilds(config, privateConfig);

        this.createServer();

        monitor.stopWatchingBuilds()
    }

    private createServer() {

        http.createServer(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Gecko\n');
        }).listen(1337);
    }
}

let server = new Server();
server.init();