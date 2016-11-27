/// <reference path="../src/config.d.ts" />

let config: IAppConfiguration = {
    connections: [
        {
            name: "default connection",
            technology: "tfs",
            collection: "DefaultCollection",
            server: "https://minduca.visualstudio.com/",
            user: "",
            personalToken: ""
        }
    ],
    buildMonitors: [
        {
            name: "gecko-ci build",
            teamProject: "gecko-ci",
            connectionName: "default connection"
        }
    ],
    lightBulbs: [
        {
            name: "gecko-ci bulb",
            technology: "lifx",
            buildMonitorsNames: ["gecko-ci build"],
            selector: "all",
            personalToken: ""
        }
    ]
}

export = config