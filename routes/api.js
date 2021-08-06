/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const BookService = require('../services/Book.service.js');
const {validateAddBook, validateId, validateComment} = require('../validators/api.validators.js');

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
      let title;
      let book;

      try {
        const body = await validateAddBook(req.body);
        title = body.title;
      } catch (err) {
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
      let bookId;
      let book;

      try {
        bookId = await validateId(req.params.id);
      } catch (err) {
        return res.send('missing required fields');
      }

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
      let bookId;
      let comment;
      let book;

      try {
        const validationResults = await Promise.all([
          validateId(req.params.id),
          validateComment(req.body.comment),
        ]);

        bookId = validationResults[0];
        comment = validationResults[1];
      } catch (err) {
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
      let bookId;
      let book;

      try {
        bookId = await validateId(req.params.id);
      } catch (err) {
        return res.send('Invalid id');
      }

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
