const Identity = require('../models/identity.js');
const IdentityView = require('../views/identityview.js');

class IdentityController {
  static list() {
    let dataIdentity = Identity.readData();
    IdentityView.successMessage(dataIdentity);
  }
}

module.exports = IdentityController;