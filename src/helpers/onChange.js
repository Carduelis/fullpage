export default (object, onChange) => {
    const handler = {
        get(target, property, receiver) {
            // console.log(target, property, receiver);
            try {
                return new Proxy(target[property], handler);
            } catch (err) {
                return Reflect.get(target, property, receiver);
            }
        },
        defineProperty(target, property, descriptor) {
            onChange(target, property, descriptor);
            return Reflect.defineProperty(target, property, descriptor);
        },
        deleteProperty(target, property) {
            onChange(target, property);
            return Reflect.deleteProperty(target, property);
        }
    };

    return new Proxy(object, handler);
};
