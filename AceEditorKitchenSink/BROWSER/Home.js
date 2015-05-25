AceEditorKitchenSink.Home = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// wrapper
		wrapper,
		
		// option form
		optionForm,
		
		// right
		right,
		
		// editor
		editor,
		
		// load editor.
		loadEditor;

		TITLE('Ace Editor BOX Kitchen Sink');

		wrapper = DIV({
			c : [
			
			// left
			DIV({
				style : {
					position : 'fixed',
					overflowY : 'scroll',
					width : 280,
					backgroundColor : '#0E62A5',
					onDisplayResize : function(width, height) {
						return {
							height : height
						};
					}
				},
				c : DIV({
					style : {
						paddingTop : 10
					},
					c : [
					
					// logo
					H1({
						style : {
							textAlign : 'center'
						},
						c : IMG({
							style : {
								width : 134
							},
							src : AceEditorKitchenSink.R('ace-logo.png')
						})
					}),
					
					optionForm = FORM({
						style : {
							marginTop : 10
						},
						c : [
						
						// modes
						TABLE({
							c : [TR({
								c : [TD({
									style : {
										textAlign : 'right',
										paddingRight : 10
									},
									c : 'Document'
								}), TD({
									c : SELECT({
										name : 'mode',
										c : [OPTGROUP({
											label : 'Mode Examples',
											c : RUN(function() {
												
												var
												// options
												options = [];
												
												EACH(AceEditorKitchenSink.SUPPORTED_MODES, function(v, mode) {
													options.push(OPTION({
														value : mode
													}));
												});
												
												return options;
											})
										}), OPTGROUP({
											label : 'Huge documents',
											c : OPTION({
												value : 'ace.js'
											})
										})],
										on : {
											change : function() {
												loadEditor();
											}
										}
									})
								})]
							})]
						}),
						
						// options
						TABLE({
							
						})]
					})]
				})
			}),
			
			// right
			right = DIV({
				style : {
					paddingLeft : 280,
					onDisplayResize : function(width, height) {
						return {
							height : height
						};
					}
				}
			}),
			
			CLEAR_BOTH()]
		}).appendTo(BODY);
		
		loadEditor = RAR(function() {
			
			var
			// options
			options = optionForm.getData(),
			
			// mode
			mode = options.mode,
			
			// filename
			filename,
			
			// ext
			ext;
			
			if (editor !== undefined) {
				editor.remove();
			}
			
			if (mode === 'ace.js') {
				mode = 'javascript';
				filename = 'ace.js';
			} else if (mode === 'Apache_Conf') {
				filename = 'docs/htaccess';
			} else if (mode === 'Dockerfile') {
				filename = 'docs/Dockerfile';
			} else if (mode === 'Makefile') {
				filename = 'docs/Makefile';
			} else {
				ext = AceEditorKitchenSink.SUPPORTED_MODES[mode][0];
				filename = 'docs/' + mode.toLowerCase() + '.' + (ext.indexOf('|') === -1 ? ext : ext.substring(0, ext.indexOf('|')));
			}
			
			editor = AceEditor.Editor({
				style : {
					height : '100%'
				},
				mode : mode
			}).appendTo(right);
			
			AceEditorKitchenSink.R(filename, function(content) {
				editor.setValue(content);
			});
		});

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});
