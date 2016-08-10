//TFS team project services
export class TfsTeamProjectServices {

    constructor(private tfs: TFS.ITfsRestClient) { }

    public getProjects() {

        return this.tfs.get({
            apiVersion: "1.0",
            resource: "projects"
        });
    }
}