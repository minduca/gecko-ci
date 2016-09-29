/// <reference path="tfs/tfs.d.ts" />
/// <reference path="lighting/lifx.d.ts" />

interface IAppConfiguration {
    connections?: ConnectionsConfig[],
    buildMonitors?: BuildMonitorsConfig[],
    lightBulbs?: LightBulbsConfig[],
    buildServicefactories?: {
        [technology: string]: (connection: any, buildConfig: any) => App.IBuildServices
    },
    lightBulbfactories?: {
        [technology: string]: (lightBulbConfig: any) => App.IBuildLightBulb
    }
}

type ConnectionsConfig = TFS.ITfsConnection;
type BuildMonitorsConfig = TFS.ITfsBuildServiceOptions;
type LightBulbsConfig = LIFX.ILifxConnection;