const FaviconsWebpackPlugin = require('favicons');
module.exports = function() {
  return {
    plugins: [
      new FaviconsWebpackPlugin('./source/favicon.png'),
    ],
  };
};