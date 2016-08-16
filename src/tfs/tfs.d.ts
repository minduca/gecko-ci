﻿
declare namespace TFS {

    interface ITfsRestClient {
        get<T>(options: TFS.ITfsApiGetArgs, resultParser?: (result: any) => T): Promise<T>
    }

    interface ITfsApiGetArgs {
        teamProject?: string;
        area?: string;
        resource: string;
        apiVersion: string;
        data?: any;
    }

    //https://www.visualstudio.com/en-us/docs/integrate/api/build/builds
    interface ITfsApiGetBuildOptions {
        definitions?: string;            //A comma-delimited list of definition IDs.
        queues?: string;                 //A comma-delimited list of queue IDs.
        buildNumber?: string;            //Filters to builds with build numbers that start with this value.
        type?: string;                   //The type of builds to retrieve.
        minFinishTime?: Date;            //Builds that finished after this time.
        maxFinishTime?: Date;            //Builds that finished before this time.
        requestedFor?: string;           //Builds requested by this user. Alias of the user.fabrikamfiber4@hotmail.com, for example.
        reasonFilter?: string;           //The reason the build was created.
        resultFilter?: string;           //The build result
        statusFilter?: string;           //The build status.
        tagFilters?: string;             //A comma-delimited list of tags. Only builds with these tags will be returned.
        propertyFilters?: string;        //A comma-delimited list of extended properties to retrieve.
        maxBuildsPerDefinition?: number  //The maximum number of builds to retrieve for each definition. This is only valid when definitions is also specified.
        $top?: number;                   //Maximum number of builds to return.
        continuationToken?: string;      //A continuation token for paging through builds
    }

    interface ITfsConfiguration {
        serverInstance?: string;
        collection?: string;
        protocol?: string;
        user?: string;
        personalToken?: string;
    }

    interface ITfsTeamProject {
        id: string;
        name: string;
        description: string;
        url: string;
        state: string;
        revision: number;
    }

    interface ITFSList<T> {
        count: number;
        value: T[];
    }

    interface ITfsBuildDefinition {
        path: string;
        type: string;
        revision: number;
        id: number;
        name: string;
        url: string;
        project: ITfsTeamProject;
    }

    interface ITfsUser {
        id: string;
        displayName: string;
        uniqueName: string;
        url: string;
        imageUrl: string;
        isContainer: boolean;
    }

    interface ITfsBuild {
        _links: {
            self: { href: string; }
            web: { href: string; }
            timeline: { href: string; }
        };
        plans: {
            planId: string;
        }[];
        id: number;
        buildNumber: string;
        status: "inProgress" | "completed" | "cancelling";
        result?: "succeeded" | "failed" | "canceled";
        queueTime: Date;
        startTime: Date;
        finishTime?: Date;
        url: string;
        definition: ITfsBuildDefinition;
        buildNumberRevision: number;
        project: ITfsTeamProject;
        uri: string;
        sourceBranch: string;
        sourceVersion: string;
        queue: {
            pool: {
                id: number;
                name: string;
            };
            id: number;
            name: string;
        };
        priority: string;
        reason: string;
        requestedFor: ITfsUser;
        requestedBy: ITfsUser;
        lastChangedDate: Date;
        lastChangedBy: ITfsUser;
        parameters: string;
        orchestrationPlan: {
            planId: string;
        };
        logs: {
            id: number;
            type: string;
            url: string;
        };
        repository: {
            id: string;
            type: string;
            clean?: any;
            checkoutSubmodules: boolean;
        };
        keepForever: boolean;
        retainedByRelease: boolean;
    }
}

