var expect = require('chai').expect;
var TodoList = require('../../../client/javascripts/collections/todos');
var todoList;

describe('TodoList', function () {
  beforeEach(function (done) {
    todoList = new TodoList();
    todoList.create({ title: 'todo#1', order: 1 });
    todoList.create({ title: 'todo#2', order: 2, completed: true });
    done();
  });

  describe('#completed', function () {
    it('returns 1', function (done) {
      expect(todoList.completed().length).to.eq(1);
      done();
    });
  });

  describe('#remaining', function () {
    it('returns 1', function (done) {
      expect(todoList.remaining().length).to.eq(1);
      done();
    });
  });

  describe('#nextOrder', function () {
    it('returns 3', function (done) {
      expect(todoList.nextOrder()).to.eq(3);
      done();
    });
  });

  describe('#comparator', function () {
    it('returns 1', function (done) {
      var todo = todoList.at(1);
      expect(todoList.comparator(todo)).to.eq(2);
      done();
    });
  });
});