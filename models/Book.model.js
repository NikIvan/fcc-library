const mongoose = require('mongoose');
const {Schema} = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
  },
  comments: {
    type: [String],
  },
});

let Book;

const BookModel = {
  init: (connection) => {
    Book = connection.model('book', BookSchema);
  },

  getBooks: async () => {
    let books;

    try {
      books = await Book.aggregate([{
        $project: {
          commentcount: {
            $size: "$comments"
          },
          title: 1,
          _id: 1,
        },
      }]);
    } catch (err) {
      console.error(err);
      throw new Error('Cannot get books');
    }

    return books;
  },

  getBook: async (_id) => {
    let book;

    try {
      book = await Book.findOne({_id}, { __v: 0 });
    } catch (err) {
      console.error(err);
      throw new Error('Cannot get book');
    }

    return book;
  },

  addBook: async (title) => {
    const book = new Book({
      title,
      comments: [],
    });

    try {
      await book.save();
    } catch (err) {
      console.error(err);
      throw new Error('Cannot add book');
    }

    return book.toObject({ versionKey: false });
  },

  addComment: async (_id, comment) => {
    let book;

    try {
      book = await Book.findOne({_id});

      if (book == null) {
        return null;
      }

      book = await Book.findOneAndUpdate({_id}, {
        $push: {
          comments: comment,
        },
      }, {
        new: true,
        fields: { __v: 0 }
      });
    } catch (err) {
      console.error(err);
      throw new Error('Cannot add comment');
    }

    return book;
  },

  deleteBook: async (_id) => {
    let book;

    try {
      book = await Book.findOne({_id});

      if (book == null) {
        return null;
      }

      await Book.deleteOne({_id});
    } catch (err) {
      console.error(err);
      throw new Error('Cannot delete book');
    }

    return book;
  },

  deleteAllBooks: async () => {
    try {
      await Book.deleteMany();
    } catch (err) {
      console.error(err);
      throw new Error('Cannot delete all books');
    }
  },

};

module.exports = BookModel;
