// initialize require packages
const { nanoid } = require('nanoid');
const notes = require('./notes');

// handler untuk menambahkan notes
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  // masukkan newNote ke dalam array notes
  notes.push(newNote);

  // cek apa notes berhasil masuk atau tidak
  const isSuccess = notes.filter((note) => note.id === id.length > 0);
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });

    response.code(201);
    // jika client berada di alamat yang berbeda
    // .header('Access-Control-Allow-Origin', 'http://ec2-13-212-153-62.ap-southeast-1.compute.amazonaws.com:8000/');
    // atau mengizinkan seluruh origin mendapatkan data
    // .header('Access-Control-Allow-Origin', '*');
    return response;
  }
  // response jika gagal
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// untuk menghapus note by id
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan?!',
  });
  response.code(404);
  return response;
};

// untuk menyunting note by id
const editNoteByIdHandler = (request, h) => {
  // ambil id note
  const { id } = request.params;
  // ambil note yang telah diedit
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString(); // perbarui tanggal updated

  const index = notes.findIndex((note) => note.id === id);
  /** Bila note dengan id yang dicari ditemukan,
   * maka index akan bernilai array index dari objek catatan yang dicari.
   * Namun bila tidak ditemukan, maka index bernilai - 1.
   */
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    // buat nilai response berhasil
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan?!',
  });
  response.code(404);
  return response;
};

// untuk menampilkan notes
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// untuk mengambil satu notes
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  // cari notenya dengan array filter
  const note = notes.filter((n) => n.id === id)[0];

  // kembalikan nilai dengan ngecek apa note ada atau tidak
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  // kembalikan pesan error apabila tidak ada note yang ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// export module agar dapat dipakai ke berkas .js lain
module.exports = {
  addNoteHandler,
  deleteNoteByIdHandler,
  editNoteByIdHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
};
