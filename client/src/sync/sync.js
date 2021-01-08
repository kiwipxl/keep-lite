import { onSyncAction } from "./sync_resolvers";
import { onGqlError } from "./util";

const queue = [];
const pollFrequency = 200;

export default {
  size: () => queue.length,
  push,
};

async function pollQueue() {
  try {
    if (queue.length > 0) {
      for (const action of [].concat(queue)) {
        await onSyncAction(action);
        queue.splice(0, 1);
        console.log("sync", action.type);
      }
    }

    setTimeout(pollQueue, pollFrequency);
  } catch (err) {
    onGqlError(err);
  }
}
setTimeout(pollQueue, pollFrequency);

function push(action) {
  queue.push(action);
}
