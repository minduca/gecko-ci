//Cardiologist that manages recurrent heart beats
export class Cardiologist {

    private timersDictionary: { [timerKey: string]: NodeJS.Timer } = {};

    public startHeartBeat(options: IHeartBeatOptions): void {

        this.stopHeartBeat(options.key);

        let timerId = setInterval(options.action, options.intervalMilliseconds);
        this.timersDictionary[options.key] = timerId;

        if (options.executeOnRegister) {
            options.action();
        }
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
    key: string;
    intervalMilliseconds: number;
    action: () => void;
    executeOnRegister?: boolean;
}