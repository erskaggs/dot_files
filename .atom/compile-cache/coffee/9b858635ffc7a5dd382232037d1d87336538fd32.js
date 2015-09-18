(function() {
  var CompositeDisposable;

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = {
    subscriptions: null,
    activate: function(state) {
      var commands;
      this.subscriptions = new CompositeDisposable;
      commands = {
        'atom-vim-colon-command-on-command-pallete:w': (function(_this) {
          return function() {
            return _this.write();
          };
        })(this),
        'atom-vim-colon-command-on-command-pallete:write': (function(_this) {
          return function() {
            return _this.write();
          };
        })(this),
        'atom-vim-colon-command-on-command-pallete:q': (function(_this) {
          return function() {
            return _this.quit();
          };
        })(this),
        'atom-vim-colon-command-on-command-pallete:quit': (function(_this) {
          return function() {
            return _this.quit();
          };
        })(this),
        'atom-vim-colon-command-on-command-pallete:wq': (function(_this) {
          return function() {
            return _this.writeAndQuit();
          };
        })(this),
        'atom-vim-colon-command-on-command-pallete:tabnew': (function(_this) {
          return function() {
            return _this.openNewTab();
          };
        })(this),
        'w': (function(_this) {
          return function() {
            return _this.write();
          };
        })(this),
        'write': (function(_this) {
          return function() {
            return _this.write();
          };
        })(this),
        'q': (function(_this) {
          return function() {
            return _this.quit();
          };
        })(this),
        'quit': (function(_this) {
          return function() {
            return _this.quit();
          };
        })(this),
        'wq': (function(_this) {
          return function() {
            return _this.writeAndQuit();
          };
        })(this),
        'tabnew': (function(_this) {
          return function() {
            return _this.openNewTab();
          };
        })(this)
      };
      return this.subscriptions.add(atom.commands.add('atom-text-editor', commands));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    serialize: function() {},
    write: function() {
      return atom.workspace.getActiveTextEditor().save();
    },
    quit: function() {
      return atom.workspace.destroyActivePaneItemOrEmptyPane();
    },
    writeAndQuit: function() {
      atom.workspace.getActiveTextEditor().save();
      return atom.workspace.destroyActivePaneItemOrEmptyPane();
    },
    openNewTab: function() {
      return atom.workspace.open();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2F0b20tdmltLWNvbG9uLWNvbW1hbmQtb24tY29tbWFuZC1wYWxsZXRlL2xpYi9hdG9tLXZpbS1jb2xvbi1jb21tYW5kLW9uLWNvbW1hbmQtcGFsbGV0ZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsbUJBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGFBQUEsRUFBZSxJQUFmO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFFUixVQUFBLFFBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FBQTtBQUFBLE1BRUEsUUFBQSxHQUFXO0FBQUEsUUFDVCw2Q0FBQSxFQUFzRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsS0FBRCxDQUFBLEVBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUQ3QztBQUFBLFFBRVQsaURBQUEsRUFBc0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7bUJBQUcsS0FBQyxDQUFBLEtBQUQsQ0FBQSxFQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FGN0M7QUFBQSxRQUdULDZDQUFBLEVBQXNELENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxJQUFELENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBSDdDO0FBQUEsUUFJVCxnREFBQSxFQUFzRCxDQUFB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

//# sourceURL=/Users/erskaggs/.atom/packages/atom-vim-colon-command-on-command-pallete/lib/atom-vim-colon-command-on-command-pallete.coffee
