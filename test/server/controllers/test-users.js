require('rootpath')();
var request = require('supertest');
var app = require('index');

describe('users', function () {
  describe('#index', function () {
    it('returns 200', function (done) {
      request(app)
        .get('/api/' + app.config.apiVersion + '/users')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});