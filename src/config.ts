/// <reference path="config.d.ts" />

let config: IAppConfiguration = {
    connections: {
        tfs: {
            "default connection": {
                collection: "DefaultCollection",
                protocol: "https",
                serverInstance: "minduca.visualstudio.com",
                user: "",
                personalToken: ""
            }
        }
    },
    buildServices: {
        tfs: {
            "gecko-ci build": {
                teamProject: "gecko-ci"
            }
        }
    },
    lightBulbs: {
        lifx: {
            "default bulb": {
                //TODO
            }
        }
    },
    buildMonitors: [
        {
            buildTechnology: "tfs",
            buildService: "gecko-ci build",
            connection: "default connection",
            lightBulbs: ["default bulb"]
        }
    ]
}

export = config