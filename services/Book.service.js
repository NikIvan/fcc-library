const BookModel = require('../models/Book.model.js');

const BookService = {
  getBooks: async () => {
    return await BookModel.getBooks();
  },

  getBook: async (bookId) => {
    return await BookModel.getBook(bookId);
  },

  addBook: async (title) => {
    return await BookModel.addBook(title);
  },

  addComment: async (bookId, comment) => {
    return await BookModel.addComment(bookId, comment);
  },

  deleteBook: async (bookId) => {
    return await BookModel.deleteBook(bookId);
  },

  deleteAllBooks: async () => {
    return await BookModel.deleteAllBooks();
  },
};

module.exports = BookService;
