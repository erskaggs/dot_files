(function() {
  var $, CompositeDisposable, InputView, Os, Path, TextEditorView, View, fs, git, prepFile, showCommitFilePath, showFile, showObject, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Os = require('os');

  Path = require('path');

  fs = require('fs-plus');

  CompositeDisposable = require('atom').CompositeDisposable;

  _ref = require('atom-space-pen-views'), $ = _ref.$, TextEditorView = _ref.TextEditorView, View = _ref.View;

  git = require('../git');

  showCommitFilePath = function(objectHash) {
    return Path.join(Os.tmpDir(), "" + objectHash + ".diff");
  };

  showObject = function(repo, objectHash, file) {
    var args;
    args = ['show'];
    args.push('--format=full');
    if (atom.config.get('git-plus.wordDiff')) {
      args.push('--word-diff');
    }
    args.push(objectHash);
    if (file != null) {
      args.push('--');
      args.push(file);
    }
    return git.cmd({
      args: args,
      cwd: repo.getWorkingDirectory(),
      stdout: function(data) {
        if (data.length > 0) {
          return prepFile(data, objectHash);
        }
      }
    });
  };

  prepFile = function(text, objectHash) {
    fs.writeFileSync(showCommitFilePath(objectHash), text, {
      flag: 'w+'
    });
    return showFile(objectHash);
  };

  showFile = function(objectHash) {
    var disposables, split;
    disposables = new CompositeDisposable;
    split = atom.config.get('git-plus.openInPane') ? atom.config.get('git-plus.splitPane') : void 0;
    return atom.workspace.open(showCommitFilePath(objectHash), {
      split: split,
      activatePane: true
    }).done((function(_this) {
      return function(textBuffer) {
        if (textBuffer != null) {
          return disposables.add(textBuffer.onDidDestroy(function() {
            disposables.dispose();
            try {
              return fs.unlinkSync(showCommitFilePath(objectHash));
            } catch (_error) {}
          }));
        }
      };
    })(this));
  };

  InputView = (function(_super) {
    __extends(InputView, _super);

    function InputView() {
      return InputView.__super__.constructor.apply(this, arguments);
    }

    InputView.content = function() {
      return this.div((function(_this) {
        return function() {
          return _this.subview('objectHash', new TextEditorView({
            mini: true,
            placeholderText: 'Commit hash to show'
          }));
        };
      })(this));
    };

    InputView.prototype.initialize = function(repo) {
      this.repo = repo;
      this.disposables = new CompositeDisposable;
      this.currentPane = atom.workspace.getActivePane();
      if (this.panel == null) {
        this.panel = atom.workspace.addModalPanel({
          item: this
        });
      }
      this.panel.show();
      this.objectHash.focus();
      this.disposables.add(atom.commands.add('atom-text-editor', {
        'core:cancel': (function(_this) {
          return function() {
            return _this.destroy();
          };
        })(this)
      }));
      return this.disposables.add(atom.commands.add('atom-text-editor', {
        'core:confirm': (function(_this) {
          return function() {
            var name, text;
            text = _this.objectHash.getModel().getText().split(' ');
            name = text.length === 2 ? text[1] : text[0];
            showObject(_this.repo, text);
            return _this.destroy();
          };
        })(this)
      }));
    };

    InputView.prototype.destroy = function() {
      var _ref1, _ref2;
      if ((_ref1 = this.disposables) != null) {
        _ref1.dispose();
      }
      return (_ref2 = this.panel) != null ? _ref2.destroy() : void 0;
    };

    return InputView;

  })(View);

  module.exports = function(repo, objectHash, file) {
    if (objectHash == null) {
      return new InputView(repo);
    } else {
      return showObject(repo, objectHash, file);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LXNob3cuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9JQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUZMLENBQUE7O0FBQUEsRUFJQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBSkQsQ0FBQTs7QUFBQSxFQUtBLE9BQTRCLE9BQUEsQ0FBUSxzQkFBUixDQUE1QixFQUFDLFNBQUEsQ0FBRCxFQUFJLHNCQUFBLGNBQUosRUFBb0IsWUFBQSxJQUxwQixDQUFBOztBQUFBLEVBT0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBUE4sQ0FBQTs7QUFBQSxFQVNBLGtCQUFBLEdBQXFCLFNBQUMsVUFBRCxHQUFBO1dBQ25CLElBQUksQ0FBQyxJQUFMLENBQVUsRUFBRSxDQUFDLE1BQUgsQ0FBQSxDQUFWLEVBQXVCLEVBQUEsR0FBRyxVQUFILEdBQWMsT0FBckMsRUFEbUI7RUFBQSxDQVRyQixDQUFBOztBQUFBLEVBWUEsVUFBQSxHQUFhLFNBQUMsSUFBRCxFQUFPLFVBQVAsRUFBbUIsSUFBbkIsR0FBQTtBQUNYLFFBQUEsSUFBQTtBQUFBLElBQUEsSUFBQSxHQUFPLENBQUMsTUFBRCxDQUFQLENBQUE7QUFBQSxJQUNBLElBQUksQ0FBQyxJQUFMLENBQVUsZUFBVixDQURBLENBQUE7QUFFQSxJQUFBLElBQTJCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixtQkFBaEIsQ0FBM0I7QUFBQSxN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

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-show.coffee
