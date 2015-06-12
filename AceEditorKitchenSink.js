require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
		isDevMode : true,
		defaultBoxName : 'AceEditorKitchenSink',
		webServerPort : 8525
	},
	BROWSER_CONFIG : {
		Yogurt : {
			toolbarColor : '#0E62A5',
			menuLayoutMenuWidth : 280,
			menuLayoutMenuBackgroundColor : '#0E62A5'
		}
	}
});
