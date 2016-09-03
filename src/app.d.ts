/// <reference path="./tfs/tfs.d.ts" />

declare namespace App {

    interface IBuildServices {
        getBuilds(options: IGetBuildOptions): Promise<IBuild[]>
    }

    interface IGetBuildOptions {
        $top: number;                   //Maximum number of builds to return.
        statusFilter?: CteBuildStatus[];          //The build status.
        resultFilter?: CteBuildResultStatus[];    //The build result
    }

    interface IBuild {
        id: number;
        buildNumber: string;
        status: CteBuildStatus;
        result?: CteBuildResultStatus;
        finishTime?: Date;
        url: string;
        sourceBranch: string;
        lastChangedDate: Date;
    }

    type CteBuildStatus = "inProgress" | "completed" | "cancelling" | "postponed" | "notStarted";
    type CteBuildResultStatus = "succeeded" | "partiallySucceeded" | "failed" | "canceled";

    interface IWatchBuildOptions {
        buildResultChanged?: (build: IBuild) => void;
        buildCompleted?: (build: IBuild) => void;
        buildSucceeded?: (build: IBuild) => void;
        buildPartiallySucceeded?: (build: IBuild) => void;
        buildFailed?: (build: IBuild) => void;
    }

    interface IBuildMonitor {
        watchBuilds(options: IWatchBuildOptions): void;
        stopWatchingBuilds(): void;
    }

    interface IMonitorDevicesPair {
        build: App.IBuildMonitor;
        lights: App.IBuildLightBulb[]
    }

    interface IGeckoFactoryOptions {
        config?: IAppConfiguration;
        buildServicefactories?: {
            [technology: string]: (connection: any, buildConfig: any) => App.IBuildServices
        },
        lightBulbfactories?: {
            [technology: string]: (lightBulbConfig: any) => App.IBuildLightBulb
        }
    }

    interface IBuildLightBulb {
        displayBuildSucceededStatus: () => void;
        displayBuildPartiallySucceededStatus: () => void;
        buildFailedStatus: () => void;
    }
}