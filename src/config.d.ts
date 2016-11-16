/// <reference path="tfs/tfs.d.ts" />
/// <reference path="lighting/lifx.d.ts" />

type ConnectionsConfig = TFS.ITfsConnection;
type BuildMonitorsConfig = TFS.ITfsBuildServiceOptions;
type LightBulbsConfig = LIFX.ILifxConnection;

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

type PrivateConnectionsConfig = TFS.ITfsPrivateConnection;
type PrivateLightBulbsConfig = LIFX.ILifxPrivateConnection;

interface IAppPrivateConfiguration {
    connections?: PrivateConnectionsConfig[],
    lightBulbs?: PrivateLightBulbsConfig[]
}