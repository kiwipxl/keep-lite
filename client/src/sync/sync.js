import { onGqlError } from "./util";
import label_resolvers from "./resolvers/labels";
import note_resolvers from "./resolvers/notes";

const resolvers = [label_resolvers, note_resolvers];

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
        for (const resolver of resolvers) {
          await resolver(action);
        }

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
  if (action.sync === false) {
    return;
  }

  queue.push(action);
}
