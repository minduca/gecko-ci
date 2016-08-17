﻿/// <reference path="../tfs/tfs.d.ts" />

declare namespace App {

    interface IGeckoOptions {
        project: string;
    }

    interface IBuildServices {
        getBuilds(options: IGetBuildOptions): Promise<IBuild[]>
    }

    interface IGetBuildOptions {
        projectName: string;            //Project name
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
        project: string;
        buildResultChanged?: (build: IBuild) => void;
        buildCompleted?: (build: IBuild) => void;
        buildSucceeded?: (build: IBuild) => void;
        buildPartiallySucceeded?: (build: IBuild) => void;
        buildFailed?: (build: IBuild) => void;
    }

    interface IAppConfiguration {
        tfs: TFS.ITfsConfiguration;
    }

    interface IBuildMonitor {
        watchBuilds(options: IWatchBuildOptions): void;
        stopWatchingBuilds(project?: string): void;
    }
}