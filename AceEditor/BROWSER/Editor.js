/**
 * Ace Editor node class
 */
AceEditor.Editor = CLASS({

	preset : function() {
		'use strict';

		return NODE;
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.name
		//OPTIONAL: params.mode
		//OPTIONAL: params.theme
		//OPTIONAL: params.value

		var
		// name
		name = params.name,
		
		// value
		value = params.value,
		
		// mode
		mode = params.mode,
		
		// theme
		theme = params.theme,
		
		// dom
		dom,
		
		// ace editor
		aceEditor,
		
		// session
		session,
		
		// get name.
		getName,

		// get value.
		getValue,

		// set value.
		setValue,
		
		// set mode.
		setMode,
		
		// set theme.
		setTheme;

		dom = DIV();

		inner.setDom(dom);
		
		// create ace editor.
		aceEditor = ace.edit(dom.getEl());
		session = aceEditor.getSession();
		
		self.on('remove', function() {
			aceEditor.destroy();
		});
		
		self.getName = getName = function() {
			return name;
		};

		self.getValue = getValue = function() {
			return aceEditor.getValue();
		};

		self.setValue = setValue = function(value) {
			//REQUIRED: value

			var
			// origin value
			originValue = aceEditor.getValue();

			aceEditor.setValue(value, 1);

			if (originValue !== value) {

				EVENT.fireAll({
					node : self,
					name : 'change'
				});
			}
		};
		
		if (value !== undefined) {
			setValue(value);
		}
		
		self.setMode = setMode = function(mode) {
			//REQUIRED: mode
			
			session.setMode('ace/mode/' + mode);
		};
		
		if (mode !== undefined) {
			setMode(mode);
		}
		
		self.setTheme = setTheme = function(theme) {
			//REQUIRED: theme
			
			aceEditor.setTheme('ace/theme/' + theme);
		};
		
		if (theme !== undefined) {
			setTheme(theme);
		}
	}
});
