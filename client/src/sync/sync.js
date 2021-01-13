import { getGqlErrors } from "./util";
import label_resolvers from "./resolvers/labels";
import note_resolvers from "./resolvers/notes";
import { syncPush, syncPop } from "../redux/actions/sync";
import store from "../redux/store";
import { addGlobalToast, addGlobalToastCustom } from "../redux/actions/misc";
import Toast from "../components/Toast";

const resolvers = [label_resolvers, note_resolvers];

const pollFrequency = 200;

export default {
  push,
};

async function pollQueue() {
  try {
    const r = 0;
    r.test = 1;

    const queue = store.getState().sync.queue;

    if (queue.length > 0) {
      for (const action of queue) {
        try {
          for (const resolver of resolvers) {
            await resolver(action);
          }
        } catch (err) {
          console.error("fatal sync error for action", action.type);

          if (err.graphQLErrors || err.networkError) {
            console.error("graphql errors", getGqlErrors(err));
          }

          throw err;
        }

        store.dispatch(syncPop(action));
      }
    }

    setTimeout(pollQueue, pollFrequency);
  } catch (err) {
    console.error("fatal sync error", err);

    store.dispatch(addGlobalToast("info", "test message!"));

    store.dispatch(
      addGlobalToastCustom(({ onDismissed }) => (
        <Toast
          message="Fatal sync error"
          dismissable
          onDismissed={onDismissed}
        ></Toast>
      ))
    );
  }
}
setTimeout(pollQueue, pollFrequency);

function push(action) {
  store.dispatch(syncPush(action));
}
