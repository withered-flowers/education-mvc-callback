const fungsiPenjumlahan = (param1, param2, callback) => {
  if (param1 === undefined || param2 === undefined) {
    callback("Param1 atau Param2 tidak boleh kosong !", null);
  }
  else {
    callback(null, param1 + param2);
  }
}

const cetakPenjumlahan = (err, data) => {
  if (err) {
    return console.error(err);
  }
  console.log(`Hasil penjumlahan adalah ${data}`);
}

// Ini kode yang pasti error
fungsiPenjumlahan(undefined, 4, cetakPenjumlahan);

// Ini kode yang berhasil
fungsiPenjumlahan(5, 4, cetakPenjumlahan);