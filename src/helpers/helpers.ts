export class UrlHelper {

    public static param(data: JSON): string {

        return Object.keys(data).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&')
    }
}

export class ObjectHelper {

    public static merge(defaultData, data): any {

        /*
         * CREDITS 
         * https://gist.github.com/mazhar266/c9ba906002f1c74ba67d
         * 
         * @name merge
         * @author Mazhar Ahmed
         *
         * this function will merge more than one json objects into one object
         *
         */
         
        let destination = {},
            sources = [].slice.call(arguments, 0);

        sources.forEach(function (source) {
            let prop;
            for (prop in source) {
                if (prop in destination && Array.isArray(destination[prop])) {

                    // Concat Arrays
                    destination[prop] = destination[prop].concat(source[prop]);

                } else if (prop in destination && typeof destination[prop] === "object") {

                    // Merge Objects
                    destination[prop] = ObjectHelper.merge(destination[prop], source[prop]);

                } else {

                    // Set new values
                    destination[prop] = source[prop];
                }
            }
        });

        return destination;
    }
}

export class ArrayHelper {

    public static indexOf<T>(array: T[], expr?: (obj: T) => boolean): number {

        var result = -1;
        for (var i = 0; i < array.length; i++) {

            if (!expr || expr(array[i])) {
                result = i;
                break;
            }
        }
        return result;
    }

    public static firstOrDefault<T>(array: T[], expr?: (obj: T) => boolean): T {

        var index = ArrayHelper.indexOf(array, expr);
        return index >= 0 ? array[index] : undefined;
    }

    public static toDictionary<T>(array: T[], convert: (obj: T) => string): { [key: string]: T } {

        let dictionary: { [key: string]: T } = {};
        array.forEach(value => dictionary[convert(value)] = value);
        return dictionary;
    }
}
