const express = require("express");
const database = require("./connectDb");
const ObjectId = require("mongodb").ObjectId;
let postRoute = express.Router();

// Read  ( Retrieve All )
postRoute.route("/posts").get(async (request, response) => {
  // Memanggil fungsi getDb dari file connectDb.js untuk mendapatkan koneksi ke database
  let db = database.getDb();

  // Mengambil semua data dari koleksi "posts" dan menyimpannya dalam variabel data
  let data = await db.collection("posts").find({}).toArray();

  // Jika data tersebut tidak kosong, maka kita akan mengirimkan respons dengan status 200 (sukses) dan data tersebut dalam format JSON
  if (data.length > 0) {
    response.status(200).json(data);
  } else {
    // Jika data kosong, maka kita akan melempar error dengan pesan "WHERE IS THE DATAAAAAAA? o.O"
    throw new Error("Data was not found");
  }
});

// Read  ( Retrieve Single )
postRoute.route("/posts/:id").get(async (request, response) => {
  // Memanggil fungsi getDb dari file connectDb.js untuk mendapatkan koneksi ke database
  let db = database.getDb();

  // Mengambil satu data dari koleksi "posts" dan menyimpannya dalam variabel data
  let data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(request.params.id) });

  // Menggunakan fungsi Object.keys untuk mendapatkan array dari kunci (key) dari objek data. Kemudian, kita memeriksa apakah panjang dari array tersebut lebih dari 0. Jika ya, maka data tersebut sudah berisi data dan kita akan mengirimkan respons dengan status 200 (sukses) dan data tersebut dalam format JSON. Jika tidak, maka data tidak ditemukan dan kita akan melempar error dengan pesan "Data tidak ditemukan".
  if (Object.keys(data).length > 0) {
    response.status(200).json(data);
  } else {
    throw new Error("Data was not found");
  }
});

// Create  ( Create One )
postRoute.route("/posts").post(async (request, response) => {
  // Memanggil fungsi getDb dari file connectDb.js untuk mendapatkan koneksi ke database
  let db = database.getDb();

  // Membuat objek yang akan diinputkan ke dalam database
  let mongoObject = {
    title: request.body.title, // Judul postingan
    description: request.body.description, // Deskripsi postingan
    content: request.body.content, // Isi postingan
    author: request.body.author, // Nama penulis postingan
    dateCreated: request.body.dateCreated, // Tanggal postingan dibuat
  };

  // Menambahkan data ke dalam database
  let data = await db.collection("posts").insertOne(mongoObject);

  // Mengirimkan respons dengan status 200 (sukses) dan data yang telah diinputkan
  response.status(200).json(data);
});

// Update
postRoute.route("/posts/:id").put(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      // This is a MongoDB operator to update a document in the database. The $set operator replaces the value of a field with the specified value. In this case, it will update the fields of the document with the new values provided in the request body.
      title: request.body.title,
      description: request.body.description,
      content: request.body.content,
      author: request.body.author,
      dateCreated: request.body.dateCreated,
    },
  };

  let data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.status(200).json(data);
});

// Delete
postRoute.route("/posts/:id").delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(request.params.id) });

  response.status(200).json(data);
});

module.exports = postRoute;
