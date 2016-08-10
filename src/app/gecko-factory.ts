import {TfsRestClient} from "../tfs/tfs-rest-client"
import {TfsBuildServices} from "../tfs/tfs-build-services"
import {Gecko} from "./gecko"
import {BuildMonitor} from "./build-monitor"

export class GeckoFactory {

    public static createGecko(config: App.IAppConfiguration): Gecko {

        let tfs = new TfsRestClient(config.tfs);
        let tfsBuildServices = new TfsBuildServices(tfs);
        let buildMonitor = new BuildMonitor(tfsBuildServices);
        return new Gecko(buildMonitor);
    }
}