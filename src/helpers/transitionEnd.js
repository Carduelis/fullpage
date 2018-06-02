export default (event, node, property, callback) => {
    const { target, propertyName } = event;
    if (target === node && propertyName === property) {
        callback(event);
    }
};
