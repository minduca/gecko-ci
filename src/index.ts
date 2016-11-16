import {ConfigMerger} from "./config-merger"
import {GeckoFactory} from "./gecko-factory"

module.exports = {

    watchBuilds(options: IAppConfiguration, privateOptions?: IAppPrivateConfiguration): App.IGecko {

        let configMerger = new ConfigMerger();
        configMerger.mergeInto(options, privateOptions);
        let factory = new GeckoFactory();

        let gecko = factory.createGecko(options);
        gecko.watchBuilds();
        return gecko;
    }
}