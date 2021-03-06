/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing tests', function() {
    let booksInDb = [];

    suite('POST /api/books with title => create book object/expect book object', function() {

      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({title: 'The Lord of the Rings'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'comments', 'Book should contain comments property');
            assert.isArray(res.body.comments, 'Comments property should be an array');
            assert.strictEqual(res.body.comments.length, 0, 'Comments array should be empty');

            assert.property(res.body, 'title', 'Books in array should contain title');
            assert.property(res.body, '_id', 'Books in array should contain _id');
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'response should be a string');
            assert.strictEqual(res.text, 'missing required field title');

            done();
          });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');

            booksInDb = res.body;

            done();
          });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        const id = '000000000000000000000000';

        chai.request(server)
          .get(`/api/books/${id}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.status, 200);
            assert.isString(res.text, 'response should be a string');
            assert.strictEqual(res.text, 'no book exists');
            done();
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        const id = booksInDb[0]._id;

        chai.request(server)
          .get(`/api/books/${id}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'comments', 'Book should contain comments property');
            assert.isArray(res.body.comments, 'Comments property should be an array');
            assert.property(res.body, 'title', 'Books in array should contain title');
            assert.property(res.body, '_id', 'Books in array should contain _id');
            done();
          });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        const id = booksInDb[0]._id;
        const body = {comment: 'Very nice book!'};

        chai.request(server)
          .post(`/api/books/${id}`)
          .send(body)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body, 'comments', 'Book should contain comments property');
            assert.isArray(res.body.comments, 'Comments property should be an array');
            assert.isAtLeast(res.body.comments.length, 1, 'Should be at least one comment');
            assert.property(res.body, 'title', 'Books in array should contain title');
            assert.property(res.body, '_id', 'Books in array should contain _id');
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        const id = booksInDb[0]._id;
        const body = {};

        chai.request(server)
          .post(`/api/books/${id}`)
          .send(body)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'response should be a string');
            assert.strictEqual(res.text, 'missing required field comment');

            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        const id = '000000000000000000000000';
        const body = {comment: 'I have bought 2 copies to support author'};

        chai.request(server)
          .post(`/api/books/${id}`)
          .send(body)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'response should be a string');
            assert.strictEqual(res.text, 'no book exists');

            done();
          });
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        const id = booksInDb[0]._id;

        chai.request(server)
          .delete(`/api/books/${id}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'response should be a string');
            assert.strictEqual(res.text, 'delete successful');

            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        const id = '000000000000000000000000';

        chai.request(server)
          .delete(`/api/books/${id}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.text, 'response should be a string');
            assert.strictEqual(res.text, 'no book exists');

            done();
          });
      });

    });

  });

});
