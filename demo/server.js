let gecko = require("../src/index");
let http = require('http');
class Server {
    init() {
        //Load configuration files
        let config = require("./config");
        let privateConfig = require("./config.user");
        //start monitoring
        let monitor = gecko.watchBuilds(config, privateConfig);
        //stop monitoring
        monitor.stopWatchingBuilds();
        this.createServer();
    }
    createServer() {
        http.createServer(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Gecko\n');
        }).listen(1337);
    }
}
let server = new Server();
server.init();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksS0FBSyxHQUFxQixPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDckQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTNCO0lBRVcsSUFBSTtRQUVQLDBCQUEwQjtRQUMxQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakMsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBRTVDLGtCQUFrQjtRQUNsQixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUV2RCxpQkFBaUI7UUFDakIsT0FBTyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFN0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxZQUFZO1FBRWhCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUNoQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7QUFDTCxDQUFDO0FBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUMxQixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgZ2Vja286IEFwcC5JR2Vja29Nb2R1bGUgPSByZXF1aXJlKFwiLi4vc3JjL2luZGV4XCIpXHJcbmxldCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xyXG5cclxuY2xhc3MgU2VydmVyIHtcclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgLy9Mb2FkIGNvbmZpZ3VyYXRpb24gZmlsZXNcclxuICAgICAgICBsZXQgY29uZmlnID0gcmVxdWlyZShcIi4vY29uZmlnXCIpO1xyXG4gICAgICAgIGxldCBwcml2YXRlQ29uZmlnID0gcmVxdWlyZShcIi4vY29uZmlnLnVzZXJcIilcclxuXHJcbiAgICAgICAgLy9zdGFydCBtb25pdG9yaW5nXHJcbiAgICAgICAgbGV0IG1vbml0b3IgPSBnZWNrby53YXRjaEJ1aWxkcyhjb25maWcsIHByaXZhdGVDb25maWcpO1xyXG5cclxuICAgICAgICAvL3N0b3AgbW9uaXRvcmluZ1xyXG4gICAgICAgIG1vbml0b3Iuc3RvcFdhdGNoaW5nQnVpbGRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlU2VydmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVTZXJ2ZXIoKSB7XHJcblxyXG4gICAgICAgIGh0dHAuY3JlYXRlU2VydmVyKGZ1bmN0aW9uIChyZXEsIHJlcykge1xyXG4gICAgICAgICAgICByZXMud3JpdGVIZWFkKDIwMCwgeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nIH0pO1xyXG4gICAgICAgICAgICByZXMuZW5kKCdHZWNrb1xcbicpO1xyXG4gICAgICAgIH0pLmxpc3RlbigxMzM3KTtcclxuICAgIH1cclxufVxyXG5cclxubGV0IHNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcclxuc2VydmVyLmluaXQoKTsiXX0=