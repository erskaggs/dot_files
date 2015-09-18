(function() {
  var CompositeDisposable, TreeViewGitStatus, TreeViewGitStatusTooltip, fs, path;

  CompositeDisposable = require('atom').CompositeDisposable;

  path = require('path');

  fs = require('fs-plus');

  TreeViewGitStatusTooltip = require('./tooltip');

  module.exports = TreeViewGitStatus = {
    config: {
      autoToggle: {
        type: 'boolean',
        "default": true
      },
      showProjectModifiedStatus: {
        type: 'boolean',
        "default": true,
        description: 'Mark project folder as modified in case there are any ' + 'uncommited changes'
      },
      showBranchLabel: {
        type: 'boolean',
        "default": true
      },
      showCommitsAheadLabel: {
        type: 'boolean',
        "default": true
      },
      showCommitsBehindLabel: {
        type: 'boolean',
        "default": true
      }
    },
    subscriptions: null,
    repositorySubscriptions: null,
    repositoryMap: null,
    treeView: null,
    treeViewRootsMap: null,
    roots: null,
    showProjectModifiedStatus: true,
    showBranchLabel: true,
    showCommitsAheadLabel: true,
    showCommitsBehindLabel: true,
    subscriptionsOfCommands: null,
    active: false,
    ignoredRepositories: null,
    activate: function() {
      this.active = true;
      this.showProjectModifiedStatus = atom.config.get('tree-view-git-status.showProjectModifiedStatus');
      this.showBranchLabel = atom.config.get('tree-view-git-status.showBranchLabel');
      this.showCommitsAheadLabel = atom.config.get('tree-view-git-status.showCommitsAheadLabel');
      this.showCommitsBehindLabel = atom.config.get('tree-view-git-status.showCommitsBehindLabel');
      this.subscriptionsOfCommands = new CompositeDisposable;
      this.subscriptionsOfCommands.add(atom.commands.add('atom-workspace', {
        'tree-view-git-status:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
      this.subscriptions = new CompositeDisposable;
      this.treeViewRootsMap = new Map;
      this.ignoredRepositories = new Map;
      if (atom.config.get('tree-view-git-status.autoToggle')) {
        return this.toggle();
      }
    },
    deactivate: function() {
      var _ref, _ref1, _ref2, _ref3, _ref4;
      if ((_ref = this.subscriptions) != null) {
        _ref.dispose();
      }
      if ((_ref1 = this.repositorySubscriptions) != null) {
        _ref1.dispose();
      }
      if ((_ref2 = this.subscriptionsOfCommands) != null) {
        _ref2.dispose();
      }
      if (this.treeView != null) {
        this.clearTreeViewRootMap();
      }
      if ((_ref3 = this.repositoryMap) != null) {
        _ref3.clear();
      }
      if ((_ref4 = this.ignoredRepositories) != null) {
        _ref4.clear();
      }
      this.treeViewRootsMap = null;
      this.subscriptions = null;
      this.treeView = null;
      this.repositorySubscriptions = null;
      this.treeViewRootsMap = null;
      this.repositoryMap = null;
      this.ignoredRepositories = null;
      this.active = false;
      return this.toggled = false;
    },
    toggle: function() {
      var _ref, _ref1, _ref2;
      if (!this.active) {
        return;
      }
      if (this.toggled) {
        this.toggled = false;
        if ((_ref = this.subscriptions) != null) {
          _ref.dispose();
        }
        if ((_ref1 = this.repositorySubscriptions) != null) {
          _ref1.dispose();
        }
        if (this.treeView != null) {
          this.clearTreeViewRootMap();
        }
        return (_ref2 = this.repositoryMap) != null ? _ref2.clear() : void 0;
      } else {
        this.toggled = true;
        this.subscriptions.add(atom.project.onDidChangePaths((function(_this) {
          return function() {
            return _this.subscribeUpdateRepositories();
          };
        })(this)));
        this.subscribeUpdateRepositories();
        this.subscribeUpdateConfigurations();
        return atom.packages.activatePackage('tree-view').then((function(_this) {
          return function(treeViewPkg) {
            if (!(_this.active && _this.toggled)) {
              return;
            }
            _this.treeView = treeViewPkg.mainModule.createView();
            _this.subscribeUpdateTreeView();
            return _this.updateRoots(true);
          };
        })(this))["catch"](function(error) {
          return console.error(error, error.stack);
        });
      }
    },
    clearTreeViewRootMap: function() {
      var _ref, _ref1;
      if ((_ref = this.treeViewRootsMap) != null) {
        _ref.forEach(function(root, rootPath) {
          var customElements, _ref1, _ref2, _ref3, _ref4;
          if ((_ref1 = root.root) != null) {
            if ((_ref2 = _ref1.classList) != null) {
              _ref2.remove('status-modified');
            }
          }
          customElements = root.customElements;
          if ((customElements != null ? customElements.headerGitStatus : void 0) != null) {
            if ((_ref3 = root.root) != null) {
              if ((_ref4 = _ref3.header) != null) {
                _ref4.removeChild(customElements.headerGitStatus);
              }
            }
            customElements.headerGitStatus = null;
          }
          if ((customElements != null ? customElements.tooltip : void 0) != null) {
            customElements.tooltip.destruct();
            return customElements.tooltip = null;
          }
        });
      }
      return (_ref1 = this.treeViewRootsMap) != null ? _ref1.clear() : void 0;
    },
    subscribeUpdateConfigurations: function() {
      atom.config.observe('tree-view-git-status.showProjectModifiedStatus', (function(_this) {
        return function(newValue) {
          if (_this.showProjectModifiedStatus !== newValue) {
            _this.showProjectModifiedStatus = newValue;
            return _this.updateRoots();
          }
        };
      })(this));
      atom.config.observe('tree-view-git-status.showBranchLabel', (function(_this) {
        return function(newValue) {
          if (_this.showBranchLabel !== newValue) {
            _this.showBranchLabel = newValue;
            return _this.updateRoots();
          }
        };
      })(this));
      atom.config.observe('tree-view-git-status.showCommitsAheadLabel', (function(_this) {
        return function(newValue) {
          if (_this.showCommitsAheadLabel !== newValue) {
            _this.showCommitsAheadLabel = newValue;
            return _this.updateRoots();
          }
        };
      })(this));
      return atom.config.observe('tree-view-git-status.showCommitsBehindLabel', (function(_this) {
        return function(newValue) {
          if (_this.showCommitsBehindLabel !== newValue) {
            _this.showCommitsBehindLabel = newValue;
            return _this.updateRoots();
          }
        };
      })(this));
    },
    subscribeUpdateTreeView: function() {
      this.subscriptions.add(atom.project.onDidChangePaths((function(_this) {
        return function() {
          return _this.updateRoots(true);
        };
      })(this)));
      this.subscriptions.add(atom.config.onDidChange('tree-view.hideVcsIgnoredFiles', (function(_this) {
        return function() {
          return _this.updateRoots(true);
        };
      })(this)));
      this.subscriptions.add(atom.config.onDidChange('tree-view.hideIgnoredNames', (function(_this) {
        return function() {
          return _this.updateRoots(true);
        };
      })(this)));
      this.subscriptions.add(atom.config.onDidChange('core.ignoredNames', (function(_this) {
        return function() {
          if (atom.config.get('tree-view.hideIgnoredNames')) {
            return _this.updateRoots(true);
          }
        };
      })(this)));
      return this.subscriptions.add(atom.config.onDidChange('tree-view.sortFoldersBeforeFiles', (function(_this) {
        return function() {
          return _this.updateRoots(true);
        };
      })(this)));
    },
    subscribeUpdateRepositories: function() {
      var repo, _i, _len, _ref, _ref1, _results;
      if ((_ref = this.repositorySubscriptions) != null) {
        _ref.dispose();
      }
      this.repositorySubscriptions = new CompositeDisposable;
      this.repositoryMap = new Map();
      _ref1 = atom.project.getRepositories();
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        repo = _ref1[_i];
        if (repo != null) {
          if ((repo.getShortHead != null) && typeof repo.getShortHead() === 'string' && (repo.getWorkingDirectory != null) && typeof repo.getWorkingDirectory() === 'string' && (repo.statuses != null) && !this.isRepositoryIgnored(repo.getWorkingDirectory())) {
            this.repositoryMap.set(this.normalizePath(repo.getWorkingDirectory()), repo);
            _results.push(this.subscribeToRepo(repo));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    },
    subscribeToRepo: function(repo) {
      this.repositorySubscriptions.add(repo.onDidChangeStatuses((function(_this) {
        return function() {
          return _this.updateRootForRepo(repo);
        };
      })(this)));
      return this.repositorySubscriptions.add(repo.onDidChangeStatus((function(_this) {
        return function() {
          return _this.updateRootForRepo(repo);
        };
      })(this)));
    },
    updateRoots: function(reset) {
      var repoForRoot, repoSubPath, root, rootPath, rootPathHasGitFolder, _i, _len, _ref, _results;
      if (this.treeView != null) {
        this.roots = this.treeView.roots;
        if (reset) {
          this.clearTreeViewRootMap();
        }
        _ref = this.roots;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          root = _ref[_i];
          rootPath = this.normalizePath(root.directoryName.dataset.path);
          if (reset) {
            this.treeViewRootsMap.set(rootPath, {
              root: root,
              customElements: {}
            });
          }
          repoForRoot = null;
          repoSubPath = null;
          rootPathHasGitFolder = fs.existsSync(path.join(rootPath, '.git'));
          this.repositoryMap.forEach(function(repo, repoPath) {
            if ((repoForRoot == null) && ((rootPath === repoPath) || (rootPath.indexOf(repoPath) === 0 && !rootPathHasGitFolder))) {
              repoSubPath = path.relative(repoPath, rootPath);
              return repoForRoot = repo;
            }
          });
          if (repoForRoot != null) {
            _results.push(this.doUpdateRootNode(root, repoForRoot, rootPath, repoSubPath));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    },
    updateRootForRepo: function(repo) {
      var repoPath;
      if ((this.treeView != null) && (this.treeViewRootsMap != null)) {
        repoPath = this.normalizePath(repo.getWorkingDirectory());
        return this.treeViewRootsMap.forEach((function(_this) {
          return function(root, rootPath) {
            var repoSubPath;
            if (rootPath.indexOf(repoPath) === 0) {
              repoSubPath = path.relative(repoPath, rootPath);
              if (root.root != null) {
                return _this.doUpdateRootNode(root.root, repo, rootPath, repoSubPath);
              }
            }
          };
        })(this));
      }
    },
    doUpdateRootNode: function(root, repo, rootPath, repoSubPath) {
      var customElements, headerGitStatus, isModified, showHeaderGitStatus;
      customElements = this.treeViewRootsMap.get(rootPath).customElements;
      isModified = false;
      if (this.showProjectModifiedStatus && (repo != null)) {
        if (repoSubPath !== '' && repo.getDirectoryStatus(repoSubPath) !== 0) {
          isModified = true;
        } else if (repoSubPath === '') {
          isModified = this.isRepoModified(repo);
        }
      }
      if (isModified) {
        root.classList.add('status-modified');
      } else {
        root.classList.remove('status-modified');
      }
      showHeaderGitStatus = this.showBranchLabel || this.showCommitsAheadLabel || this.showCommitsBehindLabel;
      if (showHeaderGitStatus && (repo != null) && (customElements.headerGitStatus == null)) {
        headerGitStatus = document.createElement('span');
        headerGitStatus.classList.add('tree-view-git-status');
        this.generateGitStatusText(headerGitStatus, repo);
        root.header.insertBefore(headerGitStatus, root.directoryName.nextSibling);
        customElements.headerGitStatus = headerGitStatus;
      } else if (showHeaderGitStatus && (customElements.headerGitStatus != null)) {
        this.generateGitStatusText(customElements.headerGitStatus, repo);
      } else if (customElements.headerGitStatus != null) {
        root.header.removeChild(customElements.headerGitStatus);
        customElements.headerGitStatus = null;
      }
      if ((repo != null) && (customElements.tooltip == null)) {
        return customElements.tooltip = new TreeViewGitStatusTooltip(root, repo);
      }
    },
    generateGitStatusText: function(container, repo) {
      var ahead, behind, branchLabel, commitsAhead, commitsBehind, display, head, _ref, _ref1;
      display = false;
      head = repo != null ? repo.getShortHead() : void 0;
      ahead = behind = 0;
      if (repo.getCachedUpstreamAheadBehindCount != null) {
        _ref1 = (_ref = repo.getCachedUpstreamAheadBehindCount()) != null ? _ref : {}, ahead = _ref1.ahead, behind = _ref1.behind;
      }
      if (this.showBranchLabel && (head != null)) {
        branchLabel = document.createElement('span');
        branchLabel.classList.add('branch-label');
        branchLabel.textContent = head;
        display = true;
      }
      if (this.showCommitsAheadLabel && ahead > 0) {
        commitsAhead = document.createElement('span');
        commitsAhead.classList.add('commits-ahead-label');
        commitsAhead.textContent = ahead;
        display = true;
      }
      if (this.showCommitsBehindLabel && behind > 0) {
        commitsBehind = document.createElement('span');
        commitsBehind.classList.add('commits-behind-label');
        commitsBehind.textContent = behind;
        display = true;
      }
      if (display) {
        container.classList.remove('hide');
      } else {
        container.classList.add('hide');
      }
      container.innerHTML = '';
      if (branchLabel != null) {
        container.appendChild(branchLabel);
      }
      if (commitsAhead != null) {
        container.appendChild(commitsAhead);
      }
      if (commitsBehind != null) {
        return container.appendChild(commitsBehind);
      }
    },
    isRepoModified: function(repo) {
      return Object.keys(repo.statuses).length > 0;
    },
    ignoreRepository: function(repoPath) {
      this.ignoredRepositories.set(repoPath, true);
      this.subscribeUpdateRepositories();
      return this.updateRoots(true);
    },
    isRepositoryIgnored: function(repoPath) {
      return this.ignoredRepositories.has(repoPath);
    },
    normalizePath: function(repoPath) {
      return fs.realpathSync(path.normalize(repoPath));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3RyZWUtdmlldy1naXQtc3RhdHVzL2xpYi9tYWluLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwRUFBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUZMLENBQUE7O0FBQUEsRUFHQSx3QkFBQSxHQUEyQixPQUFBLENBQVEsV0FBUixDQUgzQixDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsaUJBQUEsR0FDZjtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxVQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtPQURGO0FBQUEsTUFHQSx5QkFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7QUFBQSxRQUVBLFdBQUEsRUFDRSx3REFBQSxHQUNBLG9CQUpGO09BSkY7QUFBQSxNQVNBLGVBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO09BVkY7QUFBQSxNQVlBLHFCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtPQWJGO0FBQUEsTUFlQSxzQkFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7T0FoQkY7S0FERjtBQUFBLElBb0JBLGFBQUEsRUFBZSxJQXBCZjtB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

//# sourceURL=/Users/erskaggs/.atom/packages/tree-view-git-status/lib/main.coffee
