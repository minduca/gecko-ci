import {UrlHelper} from "../helpers/helpers"

export class TfsRestClient implements TFS.ITfsRestClient {

    constructor(private _connection: TFS.ITfsConfiguration) { }

    public get<T>(options: TFS.ITfsApiGetArgs, resultParser?: (result: any) => T): Promise<T> {

        let url = this.buildUrl(options);
        let supportedProtocols = ["http", "https"];

        if (!url.protocol || supportedProtocols.indexOf(url.protocol) == -1) {
            throw "protocol " + url.protocol + " is not supported";
        }

        let http = require(url.protocol)

        let credentialsBase64 = new Buffer(this._connection.user + ":" + this._connection.personalToken).toString('base64');

        return new Promise<T>(function (resolve, reject) {

            let req = http.request({
                hostname: url.hostname,
                path: url.path,
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Basic " + credentialsBase64
                }
            }, (response) => {

                let resultStr = '';
                if (resolve) {
                    response.on("data", (data) => {
                        resultStr += data;
                    });

                    response.on("end", () => {

                        let result: T = JSON.parse(resultStr);

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
        });
    }

    private buildUrl(options: TFS.ITfsApiGetArgs): {
        protocol: string;
        hostname: string;
        port: number;
        path: string;
    } {

        //Format : https://{instance}/{collection}/{team-project}/_apis/{area}/{resource}?api-version={version}

        let pathBuilder = ["/", this._connection.collection];

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

        let protocol = this._connection.protocol;
        if (protocol) {
            protocol = protocol.trim().toLowerCase();
        }

        return {
            protocol: protocol,
            hostname: this._connection.serverInstance,
            port: 80,
            path: pathBuilder.join("")
        };
    }
}