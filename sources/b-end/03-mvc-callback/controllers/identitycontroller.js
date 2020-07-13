const Identity = require('../models/identity.js');
const IdentityView = require('../views/identityview.js');

class IdentityController {
  static list() {
    let dataIdentity = Identity.readData();
    IdentityView.successMessage(dataIdentity);
  }

  static listCallback() {
    Identity.readDataWithCallback((err, data) => {
      if(err) {
        IdentityView.errorMessage(err);
      }
      else {
        IdentityView.successMessage(data);
      }
    });
  }
}

module.exports = IdentityController;