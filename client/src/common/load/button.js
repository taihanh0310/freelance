const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			require('../../../theme/dist/components/button.min.css');
			resolve()
		});
	});
};

module.exports = Loader;