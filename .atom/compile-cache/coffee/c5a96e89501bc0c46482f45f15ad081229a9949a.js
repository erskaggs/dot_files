(function() {
  var BufferedProcess, RepoListView, dir, getRepo, getRepoForCurrentFile, getSubmodule, gitAdd, gitCmd, gitDiff, gitRefresh, gitResetHead, gitStagedFiles, gitStatus, gitUnstagedFiles, gitUntrackedFiles, notifier, relativize, _getGitPath, _prettify, _prettifyDiff, _prettifyUntracked;

  BufferedProcess = require('atom').BufferedProcess;

  RepoListView = require('./views/repo-list-view');

  notifier = require('./notifier');

  gitCmd = function(_arg) {
    var args, c_stdout, command, cwd, error, exit, options, stderr, stdout, _ref;
    _ref = _arg != null ? _arg : {}, args = _ref.args, cwd = _ref.cwd, options = _ref.options, stdout = _ref.stdout, stderr = _ref.stderr, exit = _ref.exit;
    command = _getGitPath();
    if (options == null) {
      options = {};
    }
    if (options.cwd == null) {
      options.cwd = cwd;
    }
    if (stderr == null) {
      stderr = function(data) {
        return notifier.addError(data.toString());
      };
    }
    if ((stdout != null) && (exit == null)) {
      c_stdout = stdout;
      stdout = function(data) {
        if (this.save == null) {
          this.save = '';
        }
        return this.save += data;
      };
      exit = function(exit) {
        c_stdout(this.save != null ? this.save : this.save = '');
        return this.save = null;
      };
    }
    try {
      return new BufferedProcess({
        command: command,
        args: args,
        options: options,
        stdout: stdout,
        stderr: stderr,
        exit: exit
      });
    } catch (_error) {
      error = _error;
      return notifier.addError('Git Plus is unable to locate git command. Please ensure process.env.PATH can access git.');
    }
  };

  gitStatus = function(repo, stdout) {
    return gitCmd({
      args: ['status', '--porcelain', '-z'],
      cwd: repo.getWorkingDirectory(),
      stdout: function(data) {
        return stdout(data.length > 2 ? data.split('\0') : []);
      }
    });
  };

  gitStagedFiles = function(repo, stdout) {
    var files;
    files = [];
    return gitCmd({
      args: ['diff-index', '--cached', 'HEAD', '--name-status', '-z'],
      cwd: repo.getWorkingDirectory(),
      stdout: function(data) {
        return files = _prettify(data);
      },
      stderr: function(data) {
        if (data.toString().includes("ambiguous argument 'HEAD'")) {
          return files = [1];
        } else {
          notifier.addError(data.toString());
          return files = [];
        }
      },
      exit: function(code) {
        return stdout(files);
      }
    });
  };

  gitUnstagedFiles = function(repo, _arg, stdout) {
    var showUntracked;
    showUntracked = (_arg != null ? _arg : {}).showUntracked;
    return gitCmd({
      args: ['diff-files', '--name-status', '-z'],
      cwd: repo.getWorkingDirectory(),
      stdout: function(data) {
        if (showUntracked) {
          return gitUntrackedFiles(repo, _prettify(data), stdout);
        } else {
          return stdout(_prettify(data));
        }
      }
    });
  };

  gitUntrackedFiles = function(repo, dataUnstaged, stdout) {
    if (dataUnstaged == null) {
      dataUnstaged = [];
    }
    return gitCmd({
      args: ['ls-files', '-o', '--exclude-standard', '-z'],
      cwd: repo.getWorkingDirectory(),
      stdout: function(data) {
        return stdout(dataUnstaged.concat(_prettifyUntracked(data)));
      }
    });
  };

  gitDiff = function(repo, path, stdout) {
    return gitCmd({
      args: ['diff', '-p', '-U1', path],
      cwd: repo.getWorkingDirectory(),
      stdout: function(data) {
        return stdout(_prettifyDiff(data));
      }
    });
  };

  gitRefresh = function() {
    atom.project.getRepositories().forEach(function(r) {
      return r != null ? r.refreshStatus() : void 0;
    });
    return gitCmd({
      args: ['add', '--refresh', '--', '.'],
      stderr: function(data) {}
    });
  };

  gitAdd = function(repo, _arg) {
    var args, exit, file, stderr, stdout, update, _ref;
    _ref = _arg != null ? _arg : {}, file = _ref.file, stdout = _ref.stdout, stderr = _ref.stderr, exit = _ref.exit, update = _ref.update;
    args = ['add'];
    if (update) {
      args.push('--update');
    } else {
      args.push('--all');
    }
    if (file) {
      args.push(file);
    } else {
      '.';
    }
    if (exit == null) {
      exit = function(code) {
        if (code === 0) {
          return notifier.addSuccess("Added " + (file != null ? file : 'all files'));
        }
      };
    }
    return gitCmd({
      args: args,
      cwd: repo.getWorkingDirectory(),
      stdout: stdout != null ? stdout : void 0,
      stderr: stderr != null ? stderr : void 0,
      exit: exit
    });
  };

  gitResetHead = function(repo) {
    return gitCmd({
      args: ['reset', 'HEAD'],
      cwd: repo.getWorkingDirectory(),
      stdout: function(data) {
        return notifier.addSuccess('All changes unstaged');
      }
    });
  };

  _getGitPath = function() {
    var p, _ref;
    p = (_ref = atom.config.get('git-plus.gitPath')) != null ? _ref : 'git';
    console.log("Git-plus: Using git at", p);
    return p;
  };

  _prettify = function(data) {
    var files, i, mode;
    data = data.split('\0').slice(0, -1);
    return files = (function() {
      var _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = data.length; _i < _len; i = _i += 2) {
        mode = data[i];
        _results.push({
          mode: mode,
          path: data[i + 1]
        });
      }
      return _results;
    })();
  };

  _prettifyUntracked = function(data) {
    var file, files;
    if (data == null) {
      return [];
    }
    data = data.split('\0').slice(0, -1);
    return files = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        file = data[_i];
        _results.push({
          mode: '?',
          path: file
        });
      }
      return _results;
    })();
  };

  _prettifyDiff = function(data) {
    var line, _ref;
    data = data.split(/^@@(?=[ \-\+\,0-9]*@@)/gm);
    [].splice.apply(data, [1, data.length - 1 + 1].concat(_ref = (function() {
      var _i, _len, _ref1, _results;
      _ref1 = data.slice(1);
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        line = _ref1[_i];
        _results.push('@@' + line);
      }
      return _results;
    })())), _ref;
    return data;
  };

  dir = function(andSubmodules) {
    if (andSubmodules == null) {
      andSubmodules = true;
    }
    return new Promise(function(resolve, reject) {
      var submodule;
      if (andSubmodules && (submodule = getSubmodule())) {
        return resolve(submodule.getWorkingDirectory());
      } else {
        return getRepo().then(function(repo) {
          return resolve(repo.getWorkingDirectory());
        });
      }
    });
  };

  relativize = function(path) {
    var _ref, _ref1, _ref2, _ref3;
    return (_ref = (_ref1 = (_ref2 = getSubmodule(path)) != null ? _ref2.relativize(path) : void 0) != null ? _ref1 : (_ref3 = atom.project.getRepositories()[0]) != null ? _ref3.relativize(path) : void 0) != null ? _ref : path;
  };

  getSubmodule = function(path) {
    var repo, _ref, _ref1, _ref2;
    if (path == null) {
      path = (_ref = atom.workspace.getActiveTextEditor()) != null ? _ref.getPath() : void 0;
    }
    return repo = (_ref1 = atom.project.getRepositories().filter(function(r) {
      return r != null ? r.repo.submoduleForPath(path) : void 0;
    })[0]) != null ? (_ref2 = _ref1.repo) != null ? _ref2.submoduleForPath(path) : void 0 : void 0;
  };

  getRepo = function() {
    return new Promise(function(resolve, reject) {
      return getRepoForCurrentFile().then(function(repo) {
        return resolve(repo);
      })["catch"](function(e) {
        var repos;
        repos = atom.project.getRepositories().filter(function(r) {
          return r != null;
        });
        if (repos.length === 0) {
          return reject("No repos found");
        } else if (repos.length > 1) {
          return resolve(new RepoListView(repos).result);
        } else {
          return resolve(repos[0]);
        }
      });
    });
  };

  getRepoForCurrentFile = function() {
    return new Promise(function(resolve, reject) {
      var directory, path, project, _ref;
      project = atom.project;
      path = (_ref = atom.workspace.getActiveTextEditor()) != null ? _ref.getPath() : void 0;
      directory = project.getDirectories().filter(function(d) {
        return d.contains(path);
      })[0];
      if (directory != null) {
        return project.repositoryForDirectory(directory).then(function(repo) {
          var submodule;
          submodule = repo.repo.submoduleForPath(path);
          if (submodule != null) {
            return resolve(submodule);
          } else {
            return resolve(repo);
          }
        })["catch"](function(e) {
          return reject(e);
        });
      } else {
        return reject("no current file");
      }
    });
  };

  module.exports.cmd = gitCmd;

  module.exports.stagedFiles = gitStagedFiles;

  module.exports.unstagedFiles = gitUnstagedFiles;

  module.exports.diff = gitDiff;

  module.exports.refresh = gitRefresh;

  module.exports.status = gitStatus;

  module.exports.reset = gitResetHead;

  module.exports.add = gitAdd;

  module.exports.dir = dir;

  module.exports.relativize = relativize;

  module.exports.getSubmodule = getSubmodule;

  module.exports.getRepo = getRepo;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9naXQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9SQUFBOztBQUFBLEVBQUMsa0JBQW1CLE9BQUEsQ0FBUSxNQUFSLEVBQW5CLGVBQUQsQ0FBQTs7QUFBQSxFQUNBLFlBQUEsR0FBZSxPQUFBLENBQVEsd0JBQVIsQ0FEZixDQUFBOztBQUFBLEVBRUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxZQUFSLENBRlgsQ0FBQTs7QUFBQSxFQWNBLE1BQUEsR0FBUyxTQUFDLElBQUQsR0FBQTtBQUNQLFFBQUEsd0VBQUE7QUFBQSwwQkFEUSxPQUEyQyxJQUExQyxZQUFBLE1BQU0sV0FBQSxLQUFLLGVBQUEsU0FBUyxjQUFBLFFBQVEsY0FBQSxRQUFRLFlBQUEsSUFDN0MsQ0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLFdBQUEsQ0FBQSxDQUFWLENBQUE7O01BQ0EsVUFBVztLQURYOztNQUVBLE9BQU8sQ0FBQyxNQUFPO0tBRmY7O01BR0EsU0FBVSxTQUFDLElBQUQsR0FBQTtlQUFVLFFBQVEsQ0FBQyxRQUFULENBQWtCLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FBbEIsRUFBVjtNQUFBO0tBSFY7QUFLQSxJQUFBLElBQUcsZ0JBQUEsSUFBZ0IsY0FBbkI7QUFDRSxNQUFBLFFBQUEsR0FBVyxNQUFYLENBQUE7QUFBQSxNQUNBLE1BQUEsR0FBUyxTQUFDLElBQUQsR0FBQTs7VUFDUCxJQUFDLENBQUEsT0FBUTtTQUFUO2VBQ0EsSUFBQyxDQUFBLElBQUQsSUFBUyxLQUZGO01BQUEsQ0FEVCxDQUFBO0FBQUEsTUFJQSxJQUFBLEdBQU8sU0FBQyxJQUFELEdBQUE7QUFDTCxRQUFBLFFBQUEscUJBQVMsSUFBQyxDQUFBLE9BQUQsSUFBQyxDQUFBLE9BQVEsRUFB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

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/git.coffee
