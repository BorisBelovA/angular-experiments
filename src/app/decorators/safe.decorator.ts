export function Safe(): Function {
    return function(target: object, propertyName: string, propertyDescriptor: TypedPropertyDescriptor<Function>): TypedPropertyDescriptor<Function> {
        const sourceMethod = propertyDescriptor.value;

        propertyDescriptor.value = function(): TypedPropertyDescriptor<Function> | boolean {
            try {
                return sourceMethod.apply(this, arguments);
            } catch (error) {
                console.error(error.message)
                return false;
            }
        }
        return propertyDescriptor;
    }
}