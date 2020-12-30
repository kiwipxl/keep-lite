import { v4 as uuidv4 } from "uuid";

export const ADD_NOTE = "ADD_NOTE";
export const SET_NOTE_TITLE = "SET_NOTE_TITLE";
export const SET_NOTE_BODY = "SET_NOTE_BODY";

export const ADD_LABEL = "ADD_LABEL";
export const RENAME_LABEL = "RENAME_LABEL";

export const addNote = (id, title, body) => ({
  type: ADD_NOTE,
  payload: {
    id: id || uuidv4(),
    content: {
      title: title,
      body: body,
    },
  },
});
