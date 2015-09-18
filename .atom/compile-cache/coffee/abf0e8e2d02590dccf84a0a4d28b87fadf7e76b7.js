(function() {
  var CompositeDisposable, Housekeeping, Mixin, fs, path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  fs = require("fs-plus");

  path = require("path");

  Mixin = require('mixto');

  module.exports = Housekeeping = (function(_super) {
    __extends(Housekeeping, _super);

    function Housekeeping() {
      return Housekeeping.__super__.constructor.apply(this, arguments);
    }

    Housekeeping.prototype.initializeHousekeeping = function() {
      this.subscriptions = new CompositeDisposable();
      this.subscriptions.add(this.editor.onDidDestroy((function(_this) {
        return function() {
          _this.cancelUpdate();
          _this.destroyDecoration();
          return _this.subscriptions.dispose();
        };
      })(this)));
      if (this.repositoryForPath(this.editor.getPath())) {
        this.subscribeToRepository();
        this.subscriptions.add(this.editor.onDidStopChanging(this.notifyContentsModified));
        this.subscriptions.add(this.editor.onDidChangePath(this.notifyContentsModified));
        this.subscriptions.add(this.editor.onDidChangeCursorPosition((function(_this) {
          return function() {
            return _this.notifyChangeCursorPosition();
          };
        })(this)));
        this.subscriptions.add(atom.project.onDidChangePaths((function(_this) {
          return function() {
            return _this.subscribeToRepository();
          };
        })(this)));
        this.subscriptions.add(atom.commands.add(this.editorView, 'git-diff-details:toggle-git-diff-details', (function(_this) {
          return function() {
            return _this.toggleShowDiffDetails();
          };
        })(this)));
        this.subscriptions.add(atom.commands.add("atom-text-editor", 'git-diff-details:close-git-diff-details', (function(_this) {
          return function(e) {
            if (_this.showDiffDetails) {
              return _this.closeDiffDetails();
            } else {
              return e.abortKeyBinding();
            }
          };
        })(this)));
        this.subscriptions.add(atom.commands.add(this.editorView, 'git-diff-details:undo', (function(_this) {
          return function(e) {
            if (_this.showDiffDetails) {
              return _this.undo();
            } else {
              return e.abortKeyBinding();
            }
          };
        })(this)));
        this.subscriptions.add(atom.commands.add(this.editorView, 'git-diff-details:copy', (function(_this) {
          return function(e) {
            if (_this.showDiffDetails) {
              return _this.copy();
            } else {
              return e.abortKeyBinding();
            }
          };
        })(this)));
        return this.scheduleUpdate();
      } else {
        this.subscriptions.add(atom.commands.add(this.editorView, 'git-diff-details:toggle-git-diff-details', function(e) {
          return e.abortKeyBinding();
        }));
        this.subscriptions.add(atom.commands.add("atom-text-editor", 'git-diff-details:close-git-diff-details', function(e) {
          return e.abortKeyBinding();
        }));
        this.subscriptions.add(atom.commands.add(this.editorView, 'git-diff-details:undo', function(e) {
          return e.abortKeyBinding();
        }));
        return this.subscriptions.add(atom.commands.add(this.editorView, 'git-diff-details:copy', function(e) {
          return e.abortKeyBinding();
        }));
      }
    };

    Housekeeping.prototype.repositoryForPath = function(goalPath) {
      var directory, i, _i, _len, _ref;
      _ref = atom.project.getDirectories();
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        directory = _ref[i];
        if (goalPath === directory.getPath() || directory.contains(goalPath)) {
          return atom.project.getRepositories()[i];
        }
      }
      return null;
    };

    Housekeeping.prototype.subscribeToRepository = function() {
      var repository;
      if (repository = this.repositoryForPath(this.editor.getPath())) {
        this.subscriptions.add(repository.onDidChangeStatuses((function(_this) {
          return function() {
            return _this.scheduleUpdate();
          };
        })(this)));
        return this.subscriptions.add(repository.onDidChangeStatus((function(_this) {
          return function(changedPath) {
            if (changedPath === _this.editor.getPath()) {
              return _this.scheduleUpdate();
            }
          };
        })(this)));
      }
    };

    Housekeeping.prototype.unsubscribeFromCursor = function() {
      var _ref;
      if ((_ref = this.cursorSubscription) != null) {
        _ref.dispose();
      }
      return this.cursorSubscription = null;
    };

    Housekeeping.prototype.cancelUpdate = function() {
      return clearImmediate(this.immediateId);
    };

    Housekeeping.prototype.scheduleUpdate = function() {
      this.cancelUpdate();
      return this.immediateId = setImmediate(this.notifyContentsModified);
    };

    return Housekeeping;

  })(Mixin);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1kaWZmLWRldGFpbHMvbGliL2hvdXNla2VlcGluZy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0RBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFJQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FKUixDQUFBOztBQUFBLEVBTUEsTUFBTSxDQUFDLE9BQVAsR0FBdUI7QUFDckIsbUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLDJCQUFBLHNCQUFBLEdBQXdCLFNBQUEsR0FBQTtBQUN0QixNQUFBLElBQUMsQ0FBQSxhQUFELEdBQXFCLElBQUEsbUJBQUEsQ0FBQSxDQUFyQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxZQUFSLENBQXFCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDdEMsVUFBQSxLQUFDLENBQUEsWUFBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFVBQ0EsS0FBQyxDQUFBLGlCQUFELENBQUEsQ0FEQSxDQUFBO2lCQUVBLEtBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBLEVBSHNDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckIsQ0FBbkIsQ0FEQSxDQUFBO0FBTUEsTUFBQSxJQUFHLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixJQUFDLENBQUEsTUFBTSxDQUFDLE9BQVIs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

//# sourceURL=/Users/erskaggs/.atom/packages/git-diff-details/lib/housekeeping.coffee
