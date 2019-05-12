module.exports = function() {
  return {
    devServer: {
			overlay: {
				warnings: true,
				errors: true
			},
			open: true
    },
  };
};