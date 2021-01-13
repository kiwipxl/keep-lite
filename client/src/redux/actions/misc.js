export const SYNC_PUSH = "SYNC_PUSH";
export const SYNC_POP = "SYNC_POP";

export const syncPush = (action) => ({
  type: SYNC_PUSH,
  action: action,
});

export const syncPop = (action) => ({
  type: SYNC_POP,
  action: action,
});
