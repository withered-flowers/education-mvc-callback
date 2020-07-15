const fs = require('fs');

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

  static readData() {
    const data = JSON.parse(fs.readFileSync('./dummy.json', 'utf8'));
    
    let result = [];

    for(let i = 0; i < data.length; i++) {
      result.push(new Identity(data[i].id, data[i].nama, data[i].email));
    }

    return result;
  }
}

module.exports = Identity;