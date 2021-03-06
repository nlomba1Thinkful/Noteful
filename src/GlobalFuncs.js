// get the notes/folders from state via context
// test
//export const BASE_URL = "http://localhost:8000";
export const BASE_URL = "https://noteful-server-master.herokuapp.com";

export const findFolder = (folders = [], folderId) =>
  folders.find((folder) => folder.id === folderId);

export const findNote = (notes = [], noteId) =>
  notes.find((note) => note.id === parseInt(noteId));

export const getNotes = (notes = [], folderId) =>
  !folderId ? notes : notes.filter((note) => note.folderId === folderId);

export const getNoteCount = (notes = [], folderId) =>
  notes.filter((note) => note.folderId === folderId).length;
