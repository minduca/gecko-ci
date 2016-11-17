let https = require("https")
var querystring = require('querystring');

export class LifxBulb implements App.IBuildLightBulb {

    private lastColor = "";
    constructor(private connection: LIFX.ILifxConnection) { }

    buildSucceeded(): void {
        this.setColor("#9ACD32", "#638320");
    }

    buildPartiallySucceeded(): void {
        this.setColor("#FF6A00", "#A34400");
    }

    buildFailed(): void {
        this.setColor("#FF3022", "#BA1509");
    }

    private setColor(color: string, breatheColor?: string): void {

        if (this.lastColor != color) {

            this.makeRequest({
                path: "/state",
                method: "PUT",
                data: {
                    power: "on",
                    color: color
                }
            }).then((result) => this.lastColor = color);
        }
        else if (breatheColor) {

            this.makeRequest({
                path: "/effects/breathe",
                method: "POST",
                data: {
                    color: breatheColor
                }
            });
        }
    }

    private makeRequest<T>(options: {
        path: string,
        data: any,
        method: string
    }): Promise<T> {

        return new Promise<T>(function (resolve, reject) {

            let dataStr = querystring.stringify(options.data);
            let path = "/v1/lights/" + this.connection.selector + options.path;

            let req = https.request({
                hostname: "api.lifx.com",
                path: path,
                method: options.method,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + this.connection.personalToken,
                    "Content-Length": Buffer.byteLength(dataStr)
                }
            }, (response) => {

                response.setEncoding('utf8');

                let resultStr = '';
                response.on("data", (data) => resultStr += data);
                response.on("end", () => {

                    if (resolve) {
                        let result: T = resultStr != '' ? JSON.parse(resultStr) : undefined;
                        resolve(result);
                    }
                });
            });

            req.on('error', (error) => {
                console.log('problem with request: ${e.message}')

                if (reject)
                    reject(error);
            });
            req.write(dataStr);
            req.end();

        }.bind(this));

    }
}