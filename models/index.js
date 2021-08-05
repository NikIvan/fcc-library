const BookModel = require('./Book.model.js');

function init(connection) {
  [
    BookModel,
  ].forEach((model) => model.init(connection));
}

module.exports = {
  init,
};
