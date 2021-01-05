const { connect, createNewDatabase } = require("../db");
const { createUser } = require("../user");
const {
  createNote,
  editNoteTitle,
  editNoteBody,
  deleteNote,
  getNote,
  getRecentNotes,
} = require("../note");
const {
  createLabel,
  renameLabel,
  deleteLabel,
  getAllLabels,
  addLabelToNote,
} = require("../label");

test("Database functionality stress test", async () => {
  await connect();
  await createNewDatabase();

  const user = await createUser();

  // Create some labels
  let socialLabel = await createLabel(user, "social");
  let meditationLabel = await createLabel(user, "meditation");
  let healthLabel = await createLabel(user, "hEALth");

  healthLabel = await renameLabel(user, healthLabel.id, "health");

  await deleteLabel(user, socialLabel.id);
  socialLabel = await createLabel(user, "social");

  expect(await getAllLabels(user)).toEqual(
    expect.arrayContaining([healthLabel, meditationLabel, socialLabel])
  );

  // Create some notes
  let note1 = await createNote(user);
  note1 = await editNoteTitle(user, note1.id, "did some meditation today!");
  note1 = await editNoteBody(user, note1.id, "it was great.");

  let note2 = await createNote(user);
  note2 = await editNoteBody(user, note2.id, "metup with some friends today!");

  let note3 = await createNote(user);

  await addLabelToNote(user, note1.id, meditationLabel.id);
  await addLabelToNote(user, note1.id, healthLabel.id);

  await addLabelToNote(user, note2.id, socialLabel.id);
  await addLabelToNote(user, note2.id, healthLabel.id);

  await addLabelToNote(user, note3.id, healthLabel.id);

  await deleteNote(user, note3.id);

  expect(await getRecentNotes(user, 10)).toEqual(
    expect.arrayContaining([note1, note2])
  );

  // Verify database errors as it should

  // Can't add label to non existent note
  await expect(
    addLabelToNote(user, note3.id, meditationLabel.id)
  ).rejects.toThrow();

  // Can't add duplicate labels to note (note already has this label)
  await expect(
    addLabelToNote(user, note1.id, meditationLabel.id)
  ).rejects.toThrow();

  // Can't do operations on notes/labels that doesn't exist
  await expect(getNote(user, 100)).rejects.toThrow();
  await expect(deleteNote(user, 100)).rejects.toThrow();
  await expect(editNoteBody(user, 100, "")).rejects.toThrow();
  await expect(renameLabel(user, 100, "")).rejects.toThrow();
  await expect(deleteLabel(user, 100)).rejects.toThrow();
});
