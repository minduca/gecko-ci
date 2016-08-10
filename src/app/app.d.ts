/// <reference path="../tfs/tfs.d.ts" />

declare namespace App {

    interface IBuildServices {
        getBuilds(options: IGetBuildOptions): Promise<IBuild[]>
    }

    interface IGetBuildOptions {
        projectName: string;
        $top: number;
    }

    interface IBuild {
        id: number;
        buildNumber: string;
        status: "inProgress" | "completed" | "cancelling";
        result?: "succeeded" | "failed" | "canceled";
        finishTime?: Date;
        url: string;
        sourceBranch: string;
        lastChangedDate: Date;
    }

    interface IWatchBuildOptions {
        project: string;
        buildComplete?: (build: IBuild) => void;
        buildResultChanged?: (build: IBuild) => void;
    }

    interface IAppConfiguration {
        tfs: TFS.ITfsConfiguration;
    }

    export interface IBuildMonitor {
        watchBuilds(options: IWatchBuildOptions): void;
        stopWatchingBuilds(project?: string): void;
    }
}