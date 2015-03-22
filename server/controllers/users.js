module.exports = {
  list: function (req, res, next) {
    return req.send( {message: 'success'} );
  }
}