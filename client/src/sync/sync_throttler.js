import store from "../redux/store";
import sync from "./sync";
import { addGlobalToastCustom } from "../redux/actions/misc";
import ErrorDetailsToast from "../components/ErrorDetailsToast";

const elements = {};

const pollInterval = 50;

const exports = {
  push,
};
export default exports;

function poll() {
  try {
    for (const id in elements) {
      const element = elements[id];

      if (Date.now() - element.lastPushedTime > element.delay) {
        sync.push(element.action);
        delete elements[id];
      }
    }

    setTimeout(poll, pollInterval);
  } catch (err) {
    console.error("sync throttler fatal error", err);

    store.dispatch(
      addGlobalToastCustom(({ onDismissed }) => (
        <ErrorDetailsToast
          message="Fatal sync throttler error"
          error={err}
          onDismissed={onDismissed}
        ></ErrorDetailsToast>
      ))
    );
  }
}

setTimeout(poll, pollInterval);

function push(id, action, delay = 200) {
  elements[id] = {
    action: action,
    delay: delay,
    lastPushedTime: Date.now(),
  };
}
