import { v4 as uuidv4 } from "uuid";

export const CREATE_LABEL = "CREATE_LABEL";
export const DELETE_LABEL = "DELETE_LABEL";
export const RENAME_LABEL = "RENAME_LABEL";

export const createLabel = (lid, name) => ({
  type: CREATE_LABEL,
  payload: {
    id: lid || uuidv4(),
    name: name,
  },
});

export const deleteLabel = (lid) => ({
  type: DELETE_LABEL,
  payload: {
    id: lid || uuidv4(),
  },
});

export const renameLabel = (lid, name) => ({
  type: RENAME_LABEL,
  payload: {
    id: lid,
    name: name,
  },
});
