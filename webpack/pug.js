module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(pug|jade)$/,
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
      ],
    },
  };
};