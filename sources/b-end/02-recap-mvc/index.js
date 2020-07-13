const IdentityController = require('./controllers/identitycontroller.js');

const argv = process.argv;

if(argv[2] === 'list') {
  IdentityController.list();
}