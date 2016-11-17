import {UrlHelper} from "../helpers/helpers"
let urlapi = require("url");

export class TfsRestClient implements TFS.ITfsRestClient {

    private http;

    constructor(private connection: TFS.ITfsConnection) { }

    public get<T>(options: TFS.ITfsApiGetArgs, resultParser?: (result: any) => T): Promise<T> {

        let url = this.buildUrl(options);

        this.loadHttpModule(url.protocol);

        let credentialsBase64 = new Buffer(this.connection.user + ":" + this.connection.personalToken).toString('base64');

        return new Promise<T>(function (resolve, reject) {

            let req = this.http.request({
                hostname: url.hostname,
                path: url.path,
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Basic " + credentialsBase64
                }
            }, (response) => {

                if (resolve) {

                    let resultStr = '';
                    response.on("data", (data) => resultStr += data);

                    response.on("end", () => {

                        let result: T = resultStr != '' ? JSON.parse(resultStr) : undefined;

                        if (result == undefined)
                            throw "No data was returned from TFS. Please, check if the token is expired"

                        if (resultParser)
                            result = resultParser(result);

                        resolve(result);
                    });
                }
            });

            req.on('error', (error) => {
                console.log('problem with request: ${e.message}');

                if (reject)
                    reject(error);
            });

            req.end();

        }.bind(this));
    }

    private buildUrl(options: TFS.ITfsApiGetArgs): {
        protocol: string;
        hostname: string;
        port: number;
        path: string;
    } {

        //Format : https://{instance}/{collection}/{team-project}/_apis/{area}/{resource}?api-version={version}

        let pathBuilder = ["/", this.connection.collection];

        if (options.teamProject) {
            pathBuilder.push("/" + options.teamProject);
        }

        pathBuilder.push("/_apis");

        if (options.area)
            pathBuilder.push("/" + options.area);

        pathBuilder.push("/" + options.resource);

        pathBuilder.push("?api-version=" + options.apiVersion);

        if (options.data) {
            pathBuilder.push("&" + UrlHelper.param(options.data));
        }

        let url = urlapi.parse(this.connection.server);

        let protocol: string = url.protocol;
        if (protocol) {
            protocol = protocol.replace(":", "").trim().toLowerCase();
        }

        return {
            protocol: protocol,
            hostname: url.hostname,
            port: url.port,
            path: pathBuilder.join("")
        };
    }

    private loadHttpModule(protocol: string) {

        if (!this.http) {

            let supportedProtocols = ["http", "https"];

            if (!protocol || supportedProtocols.indexOf(protocol) == -1) {
                throw "protocol " + protocol + " is not supported";
            }

            this.http = require(protocol);
        }
    }
}