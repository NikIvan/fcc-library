/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

module.exports = function (app) {

  app.route('/api/books')
    .get((req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      return res.json([{}]);
    })
    
    .post((req, res) => {
      const {title} = req.body;
      //response will contain new book object including atleast _id and title
      return res.json({_id: '', title: ''});
    })
    
    .delete((req, res) => {
      //if successful response will be 'complete delete successful'
      return res.send('complete delete successful');
    });



  app.route('/api/books/:id')
    .get((req, res) => {
      const bookid = req.params.id;

      return res.json({})
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post((req, res) => {
      const bookid = req.params.id;
      const {comment} = req.body;

      //json res format same as .get
      return res.json({});
    })
    
    .delete((req, res) => {
      let bookid = req.params.id;

      return res.send('delete successful');
      //if successful response will be 'delete successful'
    });
  
};
