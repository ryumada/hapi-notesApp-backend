const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler } = require('./handler');

const routes = [
  // untuk menambahkan notes baru
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  // untuk mengambil semua notes
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  // untuk mengambil salah satu notes dengan id
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
];

module.exports = routes;
