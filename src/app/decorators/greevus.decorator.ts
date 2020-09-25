const KENOBI_TRIGGER = 'General Kenobi';
export function GreevusDecorator(): Function {
    return (target: object, propertyKey: string) => {
        // console.log(target[propertyKey])
        // if (target[propertyKey] === 'name' && target[propertyKey] === KENOBI_TRIGGER) {
        //     alert('General Greevus nearby!!');
        // }
        let val = target[propertyKey];

        const getter = () => {
            return val;
        };
        const setter = (next) => {
            console.log('updating flavor...');
            val = `🍦 ${next} 🍦`;
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}
