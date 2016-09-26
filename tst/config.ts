﻿/// <reference path="../src/config.d.ts" />

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
            technology: "tfs",
            teamProject: "gecko-ci",
            connection: "default connection"
        }
    ],
    lightBulbs: [
        {
            name: "gecko-ci bulb",
            technology: "lifx",
            buildMonitorsNames: ["gecko-ci build"]
        }
    ]
}

export = config