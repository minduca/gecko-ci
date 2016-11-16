declare namespace LIFX {

    interface ILifxConnection extends ILifxPrivateConnection {
        technology: string;
        buildMonitorsNames: string[]
    }

    interface ILifxPrivateConnection {
        name: string;
        personalToken?: string;
    }
}