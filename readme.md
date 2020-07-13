## Table of Content
1. [Recap Callback](#recap-callback)
1. [Recap MVC](#recap-mvc)
1. [Implement MVC with Callback](#implement-mvc-with-callback)

## Recap Callback
Masih ingat bukan bahwa callback itu adalah sebuah fungsi yang dijadikan dalam
parameter sebuah fungsi lainnya.

Mari kita coba membuat sebuah fungsi dengan callback lagi yah, kali ini kita
akan mencoba untuk menggunakan `first error argument`atau `Error-first` 
callback yah.

`First error argument` adalah sebuah cara dalam menuliskan parameter di 
`callback` di mana parameter pertama akan menyatakan error, dan parameter
selanjutnya baru menyatakan data yang akan nantinya digunakan.

Apabila bingung, mari kita coba lihat kembali ketika kita menggunakan
`fs.readFile` dari nodejs yah !

```javascript
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
```

Oke, sekarang kita sudah berhasil melihat hal ini, sekarang kita akan coba 
untuk membuat sebuah callback function sendiri yang mengimplementasikan 
`Error-first` ini yah !

Misalnya kita hanya ingin membuat dua buah fungsi:
- fungsiPenjumlahan yang akan menjumlahkan dua buah angka
- cetakPenjumlahan yang akan mencetak hasil penjumlahan tersebut

```javascript
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
```

Selamat, dengan melakukan hal ini, artinya kita sudah berhasil untuk
membuat `callback function` yang memiliki `First error argument` yah !

## Recap MVC
Sekarang, mari kita tingkatkan ulang tingkat kesulitannya yah !

**WARNING**:  
Untuk langkah di sini akan ada banyak sekali perpindahan satu file menuju
file lainnya, jadi mohon diperhatikan nama filenya dengan **teliti** yah !

Sekarang kita akan membuat sebuah aplikasi berbasis MVC yang akan membaca
file `dummy.json` yang ada pada langkah sebelumnya.

Aplikasi ini akan menerima sebuah input dari `console` atau `terminal`.
Apabila input nya adalah `list`, maka akan menampilkan selurus isi dari 
`dummy.json` ini.

Kita akan membuat beberapa folder:
- `models` yang akan berisi representasi data kita
- `views` yang akan berisi tampilan / output yang akan dihasilkan
- `controllers` yang akan berisi *otak* penerima input output

Pada folder `models` kita akan membuat sebuah file dengan nama `identity.js`
File ini akan merepresentasikan data `dummy.json` yang kita miliki

```javascript
// File: /models/identity.js

// Jadi pertama-tama kita akan merepresentasikan data nya terlebih
// dahulu yah !

class Identity {
  constructor(id, nama , email) {
    this._id = id;
    this._nama = nama;
    this._email = email;
  }

  get id() {
    return this._id;
  }

  set id(val) {
    this._id = val;
  }

  get nama() {
    return this._nama;
  }

  set nama(val) {
    return this._nama;
  }

  get email() {
    return this._email;
  }

  set email(val) {
    this._email = val;
  }
}

module.exports = Identity;
```

Kemudian kita akan membuat file `index.js` yang akan meminta input dari 
`console` atau `terminal` yah !

```javascript
// File: index.js
const argv = process.argv;

if(argv[2] === 'list') {
  // Maka akan ???
  // Memanggil controller bukan?
}
```

Ternyata kode ini, tidak bisa diselesaikan tanpa membuat controller yah !  

Selanjutnya sebelum menyelesaikan `index.js` ini, kita akan membuat file
`identitycontroller.js` pada folder `controllers` yah !

```javascript
// File: controllers/identitycontroller.js

// Nah di sini kita akan membaca data bukan?
// Maka kita butuh untuk memanggil ...... model !
const Identity = require('../models/identity.js');

class IdentityController {
  static list() {
    // Nah loh, ternyata sekarang, kita membutuhkan sebuah
    // fungsi untuk membaca data yang ada pada Identity yah !
    // Maka dari itu, sekarang kita akan kembali lagi ke models/identity.js
    // untuk membuat sebuah method yang akan melisting seluruh data nya yah !
    let dataIdentity = Identity // ???
  }
}

module.exports = IdentityController;
```

```javascript
// File: models/identity.js
// Karena mau baca, sekarang kita butuh menggunakan ... fs !
const fs = require('fs');

class Identity {
  ...

  // sekarang kita akan membuat methodnya, misalnya namanya adalah readData
  static readData() {
    const data = JSON.parse(fs.readFileSync('./dummy.json', 'utf8'));

    let result = [];
    // Lalu sekarang kita akan mengkonversi ke data yang kita harapkan yah !
    for(let i = 0; i < data.length; i++) {
      result.push(new Identity(data[i].id, data[i].nama, data[i].email));
    }

    return result;
  }
}

...
```

Barulah setelah ini dibuat, kita akan kembali ke file 
`controllers/identitycontroller.js`

```javascript
// File: controllers/identitycontroller.js
...

  static list() {
    let dataIdentity = Identity.readData();
    // Setelah ini, kita akan melempar hasil ini ke dalam tampilan bukan?
    // karena itu, sekarang kita akan membutuhkan ..... views !
    // oleh karena itu, sekarang kita akan membuat views-nya yah !
  }

```

*Nah*, sekarang kita butuh untuk membuat tampilan outputnya bukan?
Karena itu, sekarang akan membuat sebuah file dengan nama `identityviews.js` 
pada folder `views` yah !

```javascript
// File: views/identityview.js

class IdentityView {
  // Misalnya nama methodnya adalah successMessage dan errorMessage
  // akan menerima data yah !
  static successMessage(data) {
    console.table(data);
  }

  static errorMessage(err) {
    console.error(err.stack);
  }
}

module.exports = IdentityView;
```

Sekarang, setelah membuat tampilan yang akan terjadinya, kita kembali lagi ke
`controllers/identitycontroller.js`

```javascript
// File: controllers/identitycontroller.js

...
// Sekarang kita harus mengimport si view !
const IdentityView = require('../views/identityview.js');

...
  static list() {
    let dataIdentity = Identity.readData();
    IdentityView.successMessage(dataIdentity);
  }

```

Kemudian setelah ini selesai, barulah kita kembali ke file `index.js` untuk
menyelesaikan semuanya !

```javascript
// File: index.js

// Di sini kita akan memanggil controller
const IdentityController = require('./controllers/identitycontroller.js');

const argv = process.argv;

if(argv[2] === 'list') {
  IdentityController.list();
}
```

Lalu sekarang kita akan coba untuk menjalankan file tersebut yah !

Terlihat bahwa sekarang file sudah berhasil dijalankan bukan?

Lalu sekarang, kita akan mencoba untuk mengubah dunia yang `sync` ini untuk
menjadi `async` dan menerapkan `callback` dalam MVC kita ini yah !

## Implement MVC with Callback
Sekarang mari kita ingat ingat kembali kode yang sudah kita tuliskan di atas,
Untuk membaca file yang ada, kita menggunakan `fs.readFileSync` bukan?

Sekarang untuk menggunakan MVC Callback, maka kita akan coba untuk menggunakan
`fs.readFile`, sehingga, kita akan memodifikasi `models/identity.js` pada
method `readData()` menjadi `readDataWithCallback()`

Modifikasi kodenya dapat dilihat pada *snippet* berikut:

```javascript
// File: models/identity.js

...

  // Ingat bahwa nantinya kita akan menggunakan callback
  // callback adalah sebuah parameter yang sebenarnya adalah 
  // sebuah function

  // parameter callback ini sebenernya adalah sebuah function
  // kita akan menggunakannya di controller yah !
  static readDataWithCallback(callback) {
    // parameter ke-3 dari fs.readFile adalah callback function
    // yang menggunakan error-first argument
    fs.readFile('./dummy.json', 'utf8', (err, data) => {
      if(err) {

        // Ingat bahwa parameter callback di atas adalah sebuah function
        // berarti kita bisa invoke dan mempassing parameter lainnya
        // sesuka kita, di sini kita akan membuat function
        // yang meneerima 2 buah parameter juga yaitu
        // error dan data (error-first argument)

        // Kalau error,
        //    error nya ada
        //    data nya null

        callback(err, null);
      }
      else {
        // Kalau berhasil baca data
        //    error nya null
        //    data nya ada

        // Kalau datanya ada, berarti akan kita proses sama dengan
        // readData (konversi ke array of instance-nya Identity)

        data = JSON.parse(data);

        let result = [];

        for(let i = 0; i < data.length; i++) {
          result.push(new Identity(data[i].id, data[i].nama, data[i].email));
        }

        // maka yang akan kita return adalah si..... result !
        callback(null, result);
    });
  }
```

Setelah melakukan konversi ini, maka selanjutnya kita akan menambahkan sebuah
method pada `controllers/identitycontroller.js` dengan nama `listCallback`

Penambahan kodenya dapat dilihat pada *snippet* berikut

```javascript
// File: controllers/identitycontroller.js

...
  static listCallback() {
    // Diingat kembali bahwa pada method readDataWithCallback
    // menerima sebuah parameter yaitu callback yang merupakan sebuah
    // function yang menerima 2 buah parameter: err dan data
    //    err akan berisi error dari readDataWithCallback bila ada
    //        kesalahan dalam membaca data
    //    data akan berisi data dari readDataWithCallback, dan berdasarkan
    //        logic yang kita buat, sudah dikonversikan menjadi
    //        array of instance identity
    Identity.readDataWithCallback((err, data) => {
      // Apabila error terjadi, maka kita akan memanggil view yang 
      // ada hubungan nya dengan error, yaitu method errorMessage
      if(err) {
        IdentityView.errorMessage(err);
      }
      else {
        IdentityView.successMessage(data);
      }
    });
  }
...
```

Selanjutnya kita mengubah `index.js` supaya memanggil method `listCallback`

```javascript
// File: index.js
const IdentityController = require('./controllers/identitycontroller.js');

const argv = process.argv;

if(argv[2] === 'list') {
  IdentityController.listCallback();
}
```

Kemudian kita akan mencoba untuk menjalankan seluruh kode yang sudah kita
tuliskan di atas. Apakah hasilnya sama?

(Hasilnya pasti sama, namun kita sudah berhasil mengkonversi kode yang kita
gunakan dengan versi `async` nya dengan menggunakan callback)

Selamat, dengan begini artinya kita sudah berhasil untuk menggunakan MVC
Callback pada aplikasi kita !

Kemudian bagaimana apabila kita menginginkan adanya penggunaan input tambahan
lainnya?

Misalnya ketika kita ingin memilih orang berdasarkan id yang dicari?

## References
* [NodeJS Error Convention](https://nodejs.org/en/knowledge/errors/what-are-the-error-conventions/#:~:text=In%20Node.,the%20first%20parameter%20is%20null)