/// <reference path="tfs/tfs.d.ts" />
/// <reference path="lighting/lifx.d.ts" />

interface IAppConfiguration {
    connections?: {
        tfs: {
            [name: string]: TFS.ITfsConnection
        };
    },
    buildServices?: {
        tfs: {
            [name: string]: TFS.ITfsBuildServiceOptions
        };
    }
    lightBulbs?: {
        lifx: {
            [name: string]: LIFX.ILifxConnection
        }
    }
    buildMonitors?: IBuildMonitorConfig[]
}

interface IBuildMonitorConfig {
    buildTechnology: string;
    connection: string;
    buildService: string;
    lightBulbs: string[];
}