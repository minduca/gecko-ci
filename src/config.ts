/// <reference path="app/app.d.ts" />

let config: App.IAppConfiguration = {
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
    buildsToWatch: {
        tfs: {
            "gecko-ci build": {
                teamProject: "gecko-ci",
                connection: "default connection"
            }
        }
    }
}

export = config