//Cardiologist that manages recurrent heart beats
export class Cardiologist {

    private timersDictionary: { [timerKey: string]: NodeJS.Timer } = {};

    public startHeartBeat(options: IHeartBeatOptions): string {

        let key = options.key ? options.key : Object.keys(this.timersDictionary).length.toString();

        this.stopHeartBeat(key);

        let timerId = setInterval(options.action, options.intervalMilliseconds);
        this.timersDictionary[key] = timerId;

        if (options.executeOnRegister) {
            options.action();
        }

        return key;
    }

    public stopHeartBeat(key: string) {

        let timerId: NodeJS.Timer = this.timersDictionary[key];

        if (timerId) {
            clearInterval(timerId);
        }
    }

    public stopAll(): void {

        Object.keys(this.timersDictionary).forEach(function (key) {

            let self: Cardiologist = this;
            self.stopHeartBeat(key);

        }.bind(this));
    }
}

interface IHeartBeatOptions {
    key?: string;
    intervalMilliseconds: number;
    action: () => void;
    executeOnRegister?: boolean;
}