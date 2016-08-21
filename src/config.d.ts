/// <reference path="tfs/tfs.d.ts" />
/// <reference path="lighting/lifx.d.ts" />

interface IAppConfiguration {
    connections?: {
        tfs: {
            [name: string]: TFS.ITfsConnection
        };
    },
    buildMonitors?: {
        tfs: {
            [name: string]: TFS.ITfsBuildServiceOptions
        };
    }
    lightBulbs?: {
        lifx: {
            [name: string]: LIFX.ILifxConnection
        }
    }
}

interface IBuildMonitorConfig {
    buildTechnology: string;
    connection: string;
    buildService: string;
    lightBulbs: string[];
}