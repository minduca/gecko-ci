let https = require("https")

export class LifxBulb implements App.IBuildLightBulb {

    constructor(private connection: LIFX.ILifxConnection) { }

    public init(): void {


        let req = https.request({
            hostname: "api.lifx.com",
            path: "/v1/lights/all",
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.connection.personalToken
            }
        }, (response) => {

            let resultStr = '';

            response.on("data", (data) => {
                resultStr += data;
            });

            response.on("end", () => {

                let result = JSON.parse(resultStr);
            });
        });

        req.on('error', (error) => {
            console.log('problem with request: ${e.message}');

        });

        req.end();
    }

    buildSucceeded(): void {

    }

    buildPartiallySucceeded(): void {

    }

    buildFailed(): void {

    }
}