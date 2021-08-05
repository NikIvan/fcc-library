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
    // You can send a GET request to /api/books
    // and receive a JSON response representing all the books.
    // The JSON response will be an array of objects
    // with each object (book) containing
    // title, _id, and commentcount properties.
    .get(async (req, res) => {
      let books;

      // TODO: Get all books from database with comments count
      try {
        books = await BookService.getBooks();
      } catch (err) {
        return res.sendStatus(500);
      }

      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      return res.json(books);
    })

    // You can send a POST request to /api/books
    // with title as part of the form data to add a book.
    // The returned response will be an object with the title
    // and a unique _id as keys.
    // If title is not included in the request,
    // the returned response should be the string missing required field title.
    .post(async (req, res) => {
      const {title} = req.body;
      let book;

      if (title == null || title === '') {
        return res.send('missing required field title');
      }

      // TODO: Save book into DB
      try {
        book = await BookService.addBook(title);
      } catch (err) {
        return res.sendStatus(500);
      }

      //response will contain new book object including atleast _id and title
      return res.json(book);
    })

    // You can send a DELETE request to /api/books
    // to delete all books in the database.
    // The returned response will be the string
    // 'complete delete successful
    // if successful.
    .delete(async (req, res) => {

      // TODO: Delete all books in the database
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

      // TODO: get book object with comments
      try {
        book = await BookService.getBook(bookId);
      } catch (err) {
        return res.sendStatus(500);
      }

      return res.json(book);
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    // You can send a POST request containing comment
    // as the form body data to /api/books/{_id}
    // to add a comment to a book.
    // The returned response will be the books
    // object similar to GET /api/books/{_id} request in an earlier test.
    // If comment is not included in the request,
    // return the string missing required field comment.
    // If no book is found, return the string no book exists
    .post(async (req, res) => {
      const bookId = req.params.id;
      const {comment} = req.body;
      let book;

      if (comment == null || comment === '') {
        return res.send('missing required field comment');
      }

      // TODO: Save comment in database
      try {
        book = await BookService.addComment(bookId, comment);
      } catch (err) {
        return res.sendStatus(500);
      }

      //json res format same as .get
      return res.json(book);
    })

    // You can send a DELETE request to /api/books/{_id}
    // to delete a book from the collection.
    // The returned response will be the string
    // delete successful if successful.
    // If no book is found, return the string no book exists
    .delete(async (req, res) => {
      let bookId = req.params.id;

      // TODO: Find book in database and delete
      try {
        await BookService.deleteBook(bookId);
      } catch (err) {
        return res.sendStatus(500);
      }

      return res.send('delete successful');
    });
  
};
