//TFS build services
export class TfsBuildServices implements App.IBuildServices {

    constructor(private tfs: TFS.ITfsRestClient) { }

    public getBuilds(options: App.IGetBuildOptions): Promise<App.IBuild[]> {

        return this.get(options.projectName, {
            $top: options.$top
        });
    }

    private get(teamProject: string, options?: TFS.ITfsApiGetBuildOptions): Promise<App.IBuild[]> {

        let parseResult = (data) => {

            let tfsBuilds: TFS.ITFSList<TFS.ITfsBuild> = data.value;
            let appBuilds: App.IBuild[] = <any>tfsBuilds; //for the sake of self documentation
            return appBuilds;
        }

        return this.tfs.get<App.IBuild[]>({
            teamProject: teamProject,
            apiVersion: "2.0",
            area: "build",
            resource: "builds",
            data: options
        }, parseResult);
    }
}