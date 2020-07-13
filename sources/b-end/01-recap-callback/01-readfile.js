const fs = require('fs');

// Lihat di sini bahwa callback function menerima dua buah
// parameter yah, yaitu:
// err untuk menyatakan error
// data untuk menyatakan hasil bacaan dari file dummy.json

fs.readFile('./dummy.json', 'utf8', (err, data) => {
  if(err) {
    return console.error(err.stack);
  }

  data = JSON.parse(data);
  
  console.log(data[0]);
});