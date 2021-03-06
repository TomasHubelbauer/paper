/**
 * Drain a generator such that even a value returned by `return` is captured.
 * 
 * @example
 * 
 * async function *test() {
 *   yield 1;
 *   yield 2;
 *   return 3;
 * }
 * 
 * // This does not work, prints 1, 2:
 * for await (const number of test()) {
 *   console.log(number);
 * }
 * 
 * // This works, prints 1, 2, 3:
 * for await (const number of drain(test())) {
 *   console.log(number);
 * }
 */
export default async function* drainAsync(/** @type {function | object} */ generator) {
  let child;

  do {
    /** @ts-ignore */
    child = await generator.next();

    // Yield a `yield`-produced value always
    if (!child.done) {
      yield child.value;
    }

    // Yield a `return`-produced value only if there is no, not for `return;`
    else if (child.value !== undefined) {
      yield child.value;
    }
  } while (!child.done);
}
