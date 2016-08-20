import {ObjectHelper} from "../helpers/helpers"

//TFS build services
export class TfsBuildServices implements App.IBuildServices {

    constructor(private tfs: TFS.ITfsRestClient, private config: TFS.ITfsBuildServiceOptions) { }

    public getBuilds(options: App.IGetBuildOptions): Promise<App.IBuild[]> {

        let optionsFull = ObjectHelper.merge(this.config, {
            $top: options.$top,
            statusFilter: options.statusFilter ? options.statusFilter.join(",") : undefined,
            resultFilter: options.resultFilter ? options.resultFilter.join(",") : undefined
        });

        return this.get(this.config.teamProject, optionsFull);
    }

    private get(teamProject: string, options?: TFS.ITfsApiGetBuildOptions): Promise<App.IBuild[]> {

        let parseResult = (data) => {

            let tfsBuilds: TFS.ITfsList<TFS.ITfsBuild> = data.value;
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