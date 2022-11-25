export default function debounce(callee, timeoutMs) {
  let timer;
  return function perform(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => callee(...args), timeoutMs);
  };
}
