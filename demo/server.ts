let gecko: App.IGeckoModule = require("../src/index")
let http = require('http');

class Server {

    public init(): void {

        //Load configuration files
        let config = require("./config");
        let privateConfig = require("./config.user")

        //start monitoring
        let monitor = gecko.watchBuilds(config, privateConfig);

        //stop monitoring
        monitor.stopWatchingBuilds();

        this.createServer();
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