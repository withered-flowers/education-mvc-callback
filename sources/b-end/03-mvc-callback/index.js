const IdentityController = require('./controllers/identitycontroller.js');

const argv = process.argv;

if(argv[2] === 'list') {
  IdentityController.listCallback();
}
else if(argv[2] === 'find') {
  IdentityController.findCallback(argv[3]);
}