AceEditorKitchenSink.Home = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// layout
		layout,
		
		// option form
		optionForm,
		
		// content
		content,
		
		// editor
		editor,
		
		// load editor.
		loadEditor;

		TITLE('Ace Editor BOX Kitchen Sink');

		layout = Yogurt.MenuLayout({
			
			toolbar : Yogurt.Toolbar({

				style : {
					onDisplayResize : function(width, height) {
						if (width > Yogurt.MenuLayout.getHideMenuWinWidth()) {
							return {
								display : 'none'
							};
						} else {
							return {
								display : 'block'
							};
						}
					}
				},

				// left
				left : Yogurt.ToolbarButton({
					img : IMG({
						src : Yogurt.R('menu.png')
					}),
					on : {
						tap : function(e) {
							layout.toggleLeftMenu();
						}
					}
				}),

				// title
				title : H1({
					style : {
						cursor : 'pointer'
					},
					c : 'Ace Editor BOX',
					on : {
						tap : function(e) {
							AceEditorKitchenSink.GO('');
							e.stopDefault();
						}
					}
				})
			}),

			leftMenu : DIV({
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
						fontSize : 12
					},
					c : [
					
					// modes
					TABLE({
						style : {
							borderCollapse : 'separate',
							borderSpacing : 5
						},
						c : [TR({
							c : [TD({
								style : {
									textAlign : 'right'
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
						}), TR({
							c : [TD({
								style : {
									textAlign : 'right'
								},
								c : 'Theme'
							}), TD({
								c : SELECT({
									name : 'theme',
									c : [OPTGROUP({
										label : 'Bright',
										c : RUN(function() {
											
											var
											// options
											options = [];
											
											EACH(AceEditorKitchenSink.THEMES, function(themes) {
												if (themes[2] === undefined) {
													options.push(OPTION({
														value : themes[1] === undefined ? themes[0] : themes[1],
														c : themes[0]
													}));
												}
											});
											
											return options;
										})
									}), OPTGROUP({
										label : 'Dark',
										c : RUN(function() {
											
											var
											// options
											options = [];
											
											EACH(AceEditorKitchenSink.THEMES, function(themes) {
												if (themes[2] === 'dark') {
													options.push(OPTION({
														value : themes[1] === undefined ? themes[0] : themes[1],
														c : themes[0]
													}));
												}
											});
											
											return options;
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
			}),
			
			c : content = DIV()
			
		}).appendTo(BODY);

		loadEditor = RAR(function() {
			
			var
			// options
			options = optionForm.getData(),
			
			// mode
			mode = options.mode,
			
			// theme
			theme = options.theme,
			
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
					onDisplayResize : function(width, height) {
						return {
							height : height
						};
					}
				},
				mode : mode.toLowerCase(),
				theme : theme.toLowerCase()
			}).appendTo(content);
			
			AceEditorKitchenSink.R(filename, function(content) {
				editor.setValue(content);
			});
		});

		inner.on('close', function() {
			layout.remove();
		});
	}
});
