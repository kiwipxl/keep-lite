import { v4 as uuidv4 } from "uuid";
import { ContentState } from "draft-js";

export const ADD_NOTE = "ADD_NOTE";
export const SET_NOTE_TITLE = "SET_NOTE_TITLE";
export const SET_NOTE_BODY = "SET_NOTE_BODY";
export const ADD_NOTE_LABEL = "ADD_NOTE_LABEL";
export const REMOVE_NOTE_LABEL = "REMOVE_NOTE_LABEL";

export const addNote = (nid, title, body, labels) => ({
  type: ADD_NOTE,
  payload: {
    id: nid || uuidv4(),
    title: title || ContentState.createFromText(""),
    body: body || ContentState.createFromText(""),
    labels: labels || [],
  },
});

export const setNoteTitle = (nid, title) => ({
  type: SET_NOTE_TITLE,
  payload: {
    id: nid,
    title: title,
  },
});

export const setNoteBody = (nid, body) => ({
  type: SET_NOTE_BODY,
  payload: {
    id: nid,
    body: body,
  },
});

export const addNoteLabel = (nid, lid) => ({
  type: ADD_NOTE_LABEL,
  payload: {
    id: nid,
    lid: lid,
  },
});

export const removeNoteLabel = (nid, lid) => ({
  type: REMOVE_NOTE_LABEL,
  payload: {
    id: nid,
    lid: lid,
  },
});
