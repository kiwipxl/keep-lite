import { v4 as uuidv4 } from "uuid";
import { ContentState } from "draft-js";

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
      title: title || ContentState.createFromText(""),
      body: body || ContentState.createFromText(""),
    },
  },
});

export const setNoteTitle = (id, title) => ({
  type: SET_NOTE_TITLE,
  payload: {
    id: id,
    title: title,
  },
});

export const setNoteBody = (id, body) => ({
  type: SET_NOTE_BODY,
  payload: {
    id: id,
    body: body,
  },
});
