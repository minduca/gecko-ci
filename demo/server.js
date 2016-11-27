let gecko = require("../src/index");
let http = require('http');
class Server {
    init() {
        let config = require("./config");
        let privateConfig = require("./config.user");
        let monitor = gecko.watchBuilds(config, privateConfig);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksS0FBSyxHQUFxQixPQUFPLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDckQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTNCO0lBRVcsSUFBSTtRQUVQLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqQyxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7UUFFNUMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxZQUFZO1FBRWhCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRztZQUNoQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUM7QUFDTCxDQUFDO0FBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUMxQixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgZ2Vja286IEFwcC5JR2Vja29Nb2R1bGUgPSByZXF1aXJlKFwiLi4vc3JjL2luZGV4XCIpXHJcbmxldCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xyXG5cclxuY2xhc3MgU2VydmVyIHtcclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcclxuICAgICAgICBsZXQgcHJpdmF0ZUNvbmZpZyA9IHJlcXVpcmUoXCIuL2NvbmZpZy51c2VyXCIpXHJcblxyXG4gICAgICAgIGxldCBtb25pdG9yID0gZ2Vja28ud2F0Y2hCdWlsZHMoY29uZmlnLCBwcml2YXRlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVTZXJ2ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVNlcnZlcigpIHtcclxuXHJcbiAgICAgICAgaHR0cC5jcmVhdGVTZXJ2ZXIoZnVuY3Rpb24gKHJlcSwgcmVzKSB7XHJcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbicgfSk7XHJcbiAgICAgICAgICAgIHJlcy5lbmQoJ0dlY2tvXFxuJyk7XHJcbiAgICAgICAgfSkubGlzdGVuKDEzMzcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgc2VydmVyID0gbmV3IFNlcnZlcigpO1xyXG5zZXJ2ZXIuaW5pdCgpOyJdfQ==