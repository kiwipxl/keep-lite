import { v4 as uuidv4 } from "uuid";

export const CREATE_LABEL = "CREATE_LABEL";
export const DELETE_LABEL = "DELETE_LABEL";
export const RENAME_LABEL = "RENAME_LABEL";

export const createLabel = (id, name) => ({
  type: CREATE_LABEL,
  payload: {
    id: id || uuidv4(),
    name: name,
  },
});

export const deleteLabel = (id) => ({
  type: DELETE_LABEL,
  payload: {
    id: id || uuidv4(),
  },
});

export const renameLabel = (id, name) => ({
  type: RENAME_LABEL,
  payload: {
    id: id,
    name: name,
  },
});
