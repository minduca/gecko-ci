declare namespace LIFX {

    interface ILifxConnection extends ILifxPrivateConnection {
        technology: string;
        buildMonitorsNames: string[],
        selector: string;
    }

    interface ILifxPrivateConnection {
        name: string;
        personalToken?: string;
    }
}