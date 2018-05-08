require('dotenv').config();
process.env.NODE_ENV = 'testing';

const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;
const Todo = require('../server/api/todo/todo-model');
require('colors');

/* eslint-disable no-undef */

describe('TODOS api'.yellow, () => {

  afterEach(done => {
    Todo.remove({}, err => {
      if (err) {
        console.log('Error while cleaning the Test DB'.red);
      }
      done();
    });
  });

  it('should get all todos', done => {
    request(app)
      .get('/api/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body).to.be.an('array');
        done();
      });
  });

  it('should post a todo', done => {
    request(app)
      .post('/api/todos')
      .send({
        name: 'Tester Tommy',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body).to.be.an('object');
        done();
      });
  });

  it('should get one todo', done => {
    request(app)
      .post('/api/todos')
      .send({
        name: 'Tester Tommy',
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const todo = resp.body;
        request(app)
          .get(`/api/todos/${todo._id}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, resp) => {
            expect(resp.body).to.be.an('object');
            done();
          });
      });
  });

  it('should put a todo', done => {
    request(app)
      .post('/api/todos')
      .send({
        name: 'Tester Timmy',
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const todo = resp.body;
        request(app)
          .put(`/api/todos/${todo._id}`)
          .send({
            name: 'Tester Tommy',
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, resp) => {
            expect(resp.body.name).to.equal('Tester Tommy');
            done();
          });
      });
  });

  it('should delete a todo', done => {
    request(app)
      .post('/api/todos')
      .send({
        name: 'Tester Tommy',
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const todo = resp.body;
        request(app)
          .delete(`/api/todos/${todo._id}`)
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, resp) => {
            expect(resp.body).to.be.an('object');
            done();
          });
      });
  });

});