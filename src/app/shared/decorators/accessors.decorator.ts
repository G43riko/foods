export function Watch(params: string | { getter?: string, setter: string }): any {
    return (target: any, key: string) => {
        if (!params) {
            throw new Error("Parameters cannot be empty");
        }
        if (!delete target[key]) {
            return;
        }

        if (typeof params === "string") {
            Object.defineProperty(target, params, {
                get: () => target[key],
                set: (value) => target[key] = value,
                enumerable: true,
                configurable: true,
            });
        } else {
            if (typeof params.getter === "string") {
                Object.defineProperty(target, params.getter, {
                    get: () => target[key],
                    enumerable: true,
                    configurable: true,
                });
            }

            if (typeof params.getter === "string") {
                Object.defineProperty(target, params.setter, {
                    set: (value) => target[key] = value,
                    enumerable: true,
                    configurable: true,
                });
            }
        }
    };
}
