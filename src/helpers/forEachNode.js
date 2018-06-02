export default function (array, callback, scope) {
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, array[i], i, array); // passes back stuff we need
  }
};
