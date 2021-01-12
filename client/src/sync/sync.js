import { onGqlError } from "./util";
import label_resolvers from "./resolvers/labels";
import note_resolvers from "./resolvers/notes";
import { syncPush, syncPop } from "../redux/actions/sync";
import store from "../redux/store";

const resolvers = [label_resolvers, note_resolvers];

const pollFrequency = 200;

export default {
  push,
};

async function pollQueue() {
  try {
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
            onGqlError(err);
          }

          throw new Error();
        }

        store.dispatch(syncPop(action));
      }
    }

    setTimeout(pollQueue, pollFrequency);
  } catch (err) {
    console.error("fatal sync error", err);
  }
}
setTimeout(pollQueue, pollFrequency);

function push(action) {
  store.dispatch(syncPush(action));
}
