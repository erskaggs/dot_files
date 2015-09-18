(function() {
  var CompositeDisposable, Os, Path, diffFilePath, disposables, fs, git, gitDiff, notifier, prepFile, showFile, splitPane;

  CompositeDisposable = require('atom').CompositeDisposable;

  Os = require('os');

  Path = require('path');

  fs = require('fs-plus');

  git = require('../git');

  notifier = require('../notifier');

  disposables = new CompositeDisposable;

  diffFilePath = null;

  gitDiff = function(repo, _arg) {
    var args, diffStat, file, _ref, _ref1;
    _ref = _arg != null ? _arg : {}, diffStat = _ref.diffStat, file = _ref.file;
    diffFilePath = Path.join(repo.getPath(), "atom_git_plus.diff");
    if (file == null) {
      file = repo.relativize((_ref1 = atom.workspace.getActiveTextEditor()) != null ? _ref1.getPath() : void 0);
    }
    if (!file) {
      return notifier.addError("No open file. Select 'Diff All'.");
    }
    if (diffStat == null) {
      diffStat = '';
    }
    args = ['diff', '--color=never'];
    if (atom.config.get('git-plus.includeStagedDiff')) {
      args.push('HEAD');
    }
    if (atom.config.get('git-plus.wordDiff')) {
      args.push('--word-diff');
    }
    if (diffStat === '') {
      args.push(file);
    }
    return git.cmd({
      args: args,
      cwd: repo.getWorkingDirectory(),
      stdout: function(data) {
        return diffStat += data;
      },
      exit: function(code) {
        if (code === 0) {
          return prepFile(diffStat);
        }
      }
    });
  };

  prepFile = function(text) {
    if ((text != null ? text.length : void 0) > 0) {
      fs.writeFileSync(diffFilePath, text, {
        flag: 'w+'
      });
      return showFile();
    } else {
      return notifier.addInfo('Nothing to show.');
    }
  };

  showFile = function() {
    return atom.workspace.open(diffFilePath, {
      searchAllPanes: true
    }).done(function(textEditor) {
      if (atom.config.get('git-plus.openInPane')) {
        return splitPane(atom.config.get('git-plus.splitPane'), textEditor);
      } else {
        return disposables.add(textEditor.onDidDestroy((function(_this) {
          return function() {
            return fs.unlink(diffFilePath);
          };
        })(this)));
      }
    });
  };

  splitPane = function(splitDir, oldEditor) {
    var directions, hookEvents, options, pane;
    pane = atom.workspace.paneForURI(diffFilePath);
    options = {
      copyActiveItem: true
    };
    hookEvents = function(textEditor) {
      oldEditor.destroy();
      return disposables.add(textEditor.onDidDestroy((function(_this) {
        return function() {
          return fs.unlink(diffFilePath);
        };
      })(this)));
    };
    directions = {
      left: (function(_this) {
        return function() {
          pane = pane.splitLeft(options);
          return hookEvents(pane.getActiveEditor());
        };
      })(this),
      right: (function(_this) {
        return function() {
          pane = pane.splitRight(options);
          return hookEvents(pane.getActiveEditor());
        };
      })(this),
      up: (function(_this) {
        return function() {
          pane = pane.splitUp(options);
          return hookEvents(pane.getActiveEditor());
        };
      })(this),
      down: (function(_this) {
        return function() {
          pane = pane.splitDown(options);
          return hookEvents(pane.getActiveEditor());
        };
      })(this)
    };
    directions[splitDir]();
    return oldEditor.destroy();
  };

  module.exports = gitDiff;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LWRpZmYuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1IQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FETCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUdBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUhMLENBQUE7O0FBQUEsRUFLQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FMTixDQUFBOztBQUFBLEVBTUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxhQUFSLENBTlgsQ0FBQTs7QUFBQSxFQVFBLFdBQUEsR0FBYyxHQUFBLENBQUEsbUJBUmQsQ0FBQTs7QUFBQSxFQVNBLFlBQUEsR0FBZSxJQVRmLENBQUE7O0FBQUEsRUFXQSxPQUFBLEdBQVUsU0FBQyxJQUFELEVBQU8sSUFBUCxHQUFBO0FBQ1IsUUFBQSxpQ0FBQTtBQUFBLDBCQURlLE9BQWlCLElBQWhCLGdCQUFBLFVBQVUsWUFBQSxJQUMxQixDQUFBO0FBQUEsSUFBQSxZQUFBLEdBQWUsSUFBSSxDQUFDLElBQUwsQ0FBVSxJQUFJLENBQUMsT0FBTCxDQUFBLENBQVYsRUFBMEIsb0JBQTFCLENBQWYsQ0FBQTs7TUFDQSxPQUFRLElBQUksQ0FBQyxVQUFMLCtEQUFvRCxDQUFFLE9BQXRDLENBQUEsVUFBaEI7S0FEUjtBQUVBLElBQUEsSUFBRyxDQUFBLElBQUg7QUFDRSxhQUFPLFFBQVEsQ0FBQyxRQUFULENBQWtCLGtDQUFsQixDQUFQLENBREY7S0FGQTs7TUFJQSxXQUFZO0tB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

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-diff.coffee
