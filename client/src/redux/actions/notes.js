import { v4 as uuidv4 } from "uuid";
import { ContentState } from "draft-js";

export const ADD_NOTE = "ADD_NOTE";
export const SET_NOTE_TITLE = "SET_NOTE_TITLE";
export const SET_NOTE_BODY = "SET_NOTE_BODY";
export const ADD_NOTE_LABEL = "ADD_NOTE_LABEL";
export const REMOVE_NOTE_LABEL = "REMOVE_NOTE_LABEL";

export const addNote = (sync, id, title, body, labels) => ({
  type: ADD_NOTE,
  sync: sync,
  payload: {
    id: id || uuidv4(),
    title: title || ContentState.createFromText(""),
    body: body || ContentState.createFromText(""),
    labels: labels || [],
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

export const addNoteLabel = (noteId, labelId) => ({
  type: ADD_NOTE_LABEL,
  payload: {
    noteId: noteId,
    labelId: labelId,
  },
});

export const removeNoteLabel = (noteId, labelId) => ({
  type: REMOVE_NOTE_LABEL,
  payload: {
    noteId: noteId,
    labelId: labelId,
  },
});
