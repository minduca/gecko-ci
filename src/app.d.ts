/// <reference path="./tfs/tfs.d.ts" />

declare namespace App {

    interface IGeckoModule {
        /**
         * Initialize the build monitors.
         *
         * @param options a JSON object that represents the configuration file.
         * @param privateOptions a JSON object that represents the private configuration file.
         */
        watchBuilds(options: IAppConfiguration, privateOptions?: IAppPrivateConfiguration): App.IGecko
    }

    interface IGecko {
        watchBuilds(): void;
        stopMonitoringBuilds(): void;
    }

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

    interface IBuildLightBulb {
        buildSucceeded: () => void;
        buildPartiallySucceeded: () => void;
        buildFailed: () => void;
    }
}