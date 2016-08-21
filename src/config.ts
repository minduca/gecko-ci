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
    buildMonitors: {
        tfs: {
            "gecko-ci build": {
                teamProject: "gecko-ci",
                connection: "default connection"
            }
        }
    },
    lightBulbs: {
        lifx: {
            
        }
    }
}

export = config