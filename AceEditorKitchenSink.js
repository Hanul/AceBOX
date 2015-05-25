require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
		isDevMode : true,
		defaultBoxName : 'AceEditorKitchenSink',
		webServerPort : 8525
	}
});
