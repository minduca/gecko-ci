/// <reference path="tfs/tfs.d.ts" />
/// <reference path="lighting/lifx.d.ts" />

interface IAppConfiguration {
    connections?: ConnectionsConfig[],
    buildMonitors?: BuildMonitorsConfig[],
    lightBulbs?: LightBulbsConfig[]
}

type ConnectionsConfig = TFS.ITfsConnection;
type BuildMonitorsConfig = TFS.ITfsBuildServiceOptions;
type LightBulbsConfig = LIFX.ILifxConnection;