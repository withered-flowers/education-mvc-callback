class IdentityView {
  static successMessage(data) {
    console.table(data);
  }

  static errorMessage(err) {
    console.error(err.stack);
  }
}

module.exports = IdentityView;