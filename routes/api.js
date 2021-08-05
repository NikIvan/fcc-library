/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const BookService = require('../services/Book.service.js');

module.exports = function (app) {


  app.route('/api/books')
    .get(async (req, res) => {
      let books;

      try {
        books = await BookService.getBooks();
      } catch (err) {
        return res.sendStatus(500);
      }

      return res.json(books);
    })

    .post(async (req, res) => {
      const {title} = req.body;
      let book;

      if (title == null || title === '') {
        return res.send('missing required field title');
      }

      try {
        book = await BookService.addBook(title);
      } catch (err) {
        return res.sendStatus(500);
      }

      return res.json(book);
    })

    .delete(async (req, res) => {
      try {
        await BookService.deleteAllBooks();
      } catch (err) {
        return res.sendStatus(500);
      }

      return res.send('complete delete successful');
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      const bookId = req.params.id;
      let book;

      try {
        book = await BookService.getBook(bookId);
      } catch (err) {
        return res.sendStatus(500);
      }

      if (book == null) {
        return res.send('no book exists');
      }

      return res.json(book);
    })

    .post(async (req, res) => {
      const bookId = req.params.id;
      const {comment} = req.body;
      let book;

      if (comment == null || comment === '') {
        return res.send('missing required field comment');
      }

      try {
        book = await BookService.addComment(bookId, comment);
      } catch (err) {
        return res.sendStatus(500);
      }

      if (book == null) {
        return res.send('no book exists');
      }

      return res.json(book);
    })

    .delete(async (req, res) => {
      let bookId = req.params.id;
      let book;

      try {
        book = await BookService.deleteBook(bookId);
      } catch (err) {
        return res.sendStatus(500);
      }

      if (book == null) {
        return res.send('no book exists');
      }

      return res.send('delete successful');
    });
  
};
