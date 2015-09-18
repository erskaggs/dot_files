(function() {
  var CompositeDisposable, GitCommit, GitPush, Path, fs, git, notifier, os;

  CompositeDisposable = require('atom').CompositeDisposable;

  fs = require('fs-plus');

  Path = require('flavored-path');

  os = require('os');

  git = require('../git');

  notifier = require('../notifier');

  GitPush = require('./git-push');

  module.exports = GitCommit = (function() {
    GitCommit.prototype.dir = function() {
      if (this.submodule != null ? this.submodule : this.submodule = git.getSubmodule()) {
        return this.submodule.getWorkingDirectory();
      } else {
        return this.repo.getWorkingDirectory();
      }
    };

    GitCommit.prototype.filePath = function() {
      return Path.join(this.repo.getPath(), 'COMMIT_EDITMSG');
    };

    function GitCommit(repo, _arg) {
      var _ref;
      this.repo = repo;
      _ref = _arg != null ? _arg : {}, this.amend = _ref.amend, this.andPush = _ref.andPush, this.stageChanges = _ref.stageChanges;
      this.currentPane = atom.workspace.getActivePane();
      this.disposables = new CompositeDisposable;
      if (this.amend == null) {
        this.amend = '';
      }
      this.isAmending = this.amend.length > 0;
      this.commentchar = '#';
      git.cmd({
        args: ['config', '--get', 'core.commentchar'],
        stdout: (function(_this) {
          return function(data) {
            if (data.trim() !== '') {
              return _this.commentchar = data.trim();
            }
          };
        })(this)
      });
      if (this.stageChanges) {
        git.add(this.repo, {
          update: true,
          exit: (function(_this) {
            return function(code) {
              return _this.getStagedFiles();
            };
          })(this)
        });
      } else {
        this.getStagedFiles();
      }
    }

    GitCommit.prototype.getStagedFiles = function() {
      return git.stagedFiles(this.repo, (function(_this) {
        return function(files) {
          if (_this.amend !== '' || files.length >= 1) {
            return git.cmd({
              args: ['status'],
              cwd: _this.repo.getWorkingDirectory(),
              stdout: function(data) {
                return _this.prepFile(data);
              }
            });
          } else {
            _this.cleanup();
            return notifier.addInfo('Nothing to commit.');
          }
        };
      })(this));
    };

    GitCommit.prototype.prepFile = function(status) {
      status = status.replace(/\s*\(.*\)\n/g, "\n");
      status = status.trim().replace(/\n/g, "\n" + this.commentchar + " ");
      return this.getTemplate().then((function(_this) {
        return function(template) {
          fs.writeFileSync(_this.filePath(), "" + (_this.amend.length > 0 ? _this.amend : template) + "\n" + _this.commentchar + " Please enter the commit message for your changes. Lines starting\n" + _this.commentchar + " with '" + _this.commentchar + "' will be ignored, and an empty message aborts the commit.\n" + _this.commentchar + "\n" + _this.commentchar + " " + status);
          return _this.showFile();
        };
      })(this));
    };

    GitCommit.prototype.getTemplate = function() {
      return new Promise(function(resolve, reject) {
        return git.cmd({
          args: ['config', '--get', 'commit.template'],
          stdout: (function(_this) {
            return function(data) {
              return resolve((data.trim() !== '' ? fs.readFileSync(Path.get(data.trim())) : ''));
            };
          })(this)
        });
      });
    };

    GitCommit.prototype.showFile = function() {
      return atom.workspace.open(this.filePath(), {
        searchAllPanes: true
      }).done((function(_this) {
        return function(textEditor) {
          if (atom.config.get('git-plus.openInPane')) {
            return _this.splitPane(atom.config.get('git-plus.splitPane'), textEditor);
          } else {
            _this.disposables.add(textEditor.onDidSave(function() {
              return _this.commit();
            }));
            return _this.disposables.add(textEditor.onDidDestroy(function() {
              if (_this.isAmending) {
                return _this.undoAmend();
              } else {
                return _this.cleanup();
              }
            }));
          }
        };
      })(this));
    };

    GitCommit.prototype.splitPane = function(splitDir, oldEditor) {
      var directions, hookEvents, options, pane;
      pane = atom.workspace.paneForURI(this.filePath());
      options = {
        copyActiveItem: true
      };
      hookEvents = (function(_this) {
        return function(textEditor) {
          oldEditor.destroy();
          _this.disposables.add(textEditor.onDidSave(function() {
            return _this.commit();
          }));
          return _this.disposables.add(textEditor.onDidDestroy(function() {
            if (_this.isAmending) {
              return _this.undoAmend();
            } else {
              return _this.cleanup();
            }
          }));
        };
      })(this);
      directions = {
        left: (function(_this) {
          return function() {
            pane = pane.splitLeft(options);
            return hookEvents(pane.getActiveEditor());
          };
        })(this),
        right: function() {
          pane = pane.splitRight(options);
          return hookEvents(pane.getActiveEditor());
        },
        up: function() {
          pane = pane.splitUp(options);
          return hookEvents(pane.getActiveEditor());
        },
        down: function() {
          pane = pane.splitDown(options);
          return hookEvents(pane.getActiveEditor());
        }
      };
      return directions[splitDir]();
    };

    GitCommit.prototype.commit = function() {
      var args;
      args = ['commit', '--cleanup=strip', "--file=" + (this.filePath())];
      return git.cmd({
        args: args,
        options: {
          cwd: this.dir()
        },
        stdout: (function(_this) {
          return function(data) {
            notifier.addSuccess(data);
            if (_this.andPush) {
              new GitPush(_this.repo);
            }
            _this.isAmending = false;
            _this.destroyCommitEditor();
            if (_this.currentPane.alive) {
              _this.currentPane.activate();
            }
            return git.refresh();
          };
        })(this),
        stderr: (function(_this) {
          return function(err) {
            return _this.destroyCommitEditor();
          };
        })(this)
      });
    };

    GitCommit.prototype.destroyCommitEditor = function() {
      this.cleanup();
      return atom.workspace.getPanes().some(function(pane) {
        return pane.getItems().some(function(paneItem) {
          var _ref;
          if (paneItem != null ? typeof paneItem.getURI === "function" ? (_ref = paneItem.getURI()) != null ? _ref.includes('COMMIT_EDITMSG') : void 0 : void 0 : void 0) {
            if (pane.getItems().length === 1) {
              pane.destroy();
            } else {
              paneItem.destroy();
            }
            return true;
          }
        });
      });
    };

    GitCommit.prototype.undoAmend = function(err) {
      if (err == null) {
        err = '';
      }
      return git.cmd({
        args: ['reset', 'ORIG_HEAD'],
        stdout: function() {
          return notifier.addError("" + err + ": Commit amend aborted!");
        },
        stderr: function() {
          return notifier.addError('ERROR! Undoing the amend failed! Please fix your repository manually!');
        },
        exit: (function(_this) {
          return function() {
            _this.isAmending = false;
            return _this.destroyCommitEditor();
          };
        })(this)
      });
    };

    GitCommit.prototype.cleanup = function() {
      if (this.currentPane.alive) {
        this.currentPane.activate();
      }
      this.disposables.dispose();
      try {
        return fs.unlinkSync(this.filePath());
      } catch (_error) {}
    };

    return GitCommit;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LWNvbW1pdC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsb0VBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQURMLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLGVBQVIsQ0FGUCxDQUFBOztBQUFBLEVBR0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBSEwsQ0FBQTs7QUFBQSxFQUtBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUxOLENBQUE7O0FBQUEsRUFNQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FOWCxDQUFBOztBQUFBLEVBT0EsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBUFYsQ0FBQTs7QUFBQSxFQVNBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFJSix3QkFBQSxHQUFBLEdBQUssU0FBQSxHQUFBO0FBRUgsTUFBQSw2QkFBRyxJQUFDLENBQUEsWUFBRCxJQUFDLENBQUEsWUFBYSxHQUFHLENBQUMsWUFBSixDQUFBLENBQWpCO2VBQ0UsSUFBQyxDQUFBLFNBQVMsQ0FBQyxtQkFBWCxDQUFBLEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBQyxDQUFBLElBQUksQ0FBQyxtQkFBTixDQUFBLEVBSEY7T0FGRztJQUFBLENBQUwsQ0FBQTs7QUFBQSx3QkFVQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsSUFBSSxDQUFDLElBQUwsQ0FBVSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBQSxDQUFWLEVBQTJCLGdCQUEzQixFQUFIO0lBQUEsQ0FWVixDQUFBOztBQVlh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

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-commit.coffee
