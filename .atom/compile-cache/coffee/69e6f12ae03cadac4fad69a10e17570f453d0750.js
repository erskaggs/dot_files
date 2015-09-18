(function() {
  var $, $$$, BufferedProcess, Disposable, GitShow, LogListView, ScrollView, amountOfCommitsToShow, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Disposable = require('atom').Disposable;

  BufferedProcess = require('atom').BufferedProcess;

  _ref = require('atom-space-pen-views'), $ = _ref.$, $$$ = _ref.$$$, ScrollView = _ref.ScrollView;

  git = require('../git');

  GitShow = require('../models/git-show');

  amountOfCommitsToShow = function() {
    return atom.config.get('git-plus.amountOfCommitsToShow');
  };

  module.exports = LogListView = (function(_super) {
    __extends(LogListView, _super);

    function LogListView() {
      return LogListView.__super__.constructor.apply(this, arguments);
    }

    LogListView.content = function() {
      return this.div({
        "class": 'git-plus-log native-key-bindings',
        tabindex: -1
      }, (function(_this) {
        return function() {
          return _this.table({
            id: 'git-plus-commits',
            outlet: 'commitsListView'
          });
        };
      })(this));
    };

    LogListView.prototype.onDidChangeTitle = function() {
      return new Disposable;
    };

    LogListView.prototype.onDidChangeModified = function() {
      return new Disposable;
    };

    LogListView.prototype.getURI = function() {
      return 'atom://git-plus:log';
    };

    LogListView.prototype.getTitle = function() {
      return 'git-plus: Log';
    };

    LogListView.prototype.initialize = function() {
      LogListView.__super__.initialize.apply(this, arguments);
      this.skipCommits = 0;
      this.on('click', '.commit-row', (function(_this) {
        return function(_arg) {
          var currentTarget;
          currentTarget = _arg.currentTarget;
          return _this.showCommitLog(currentTarget.getAttribute('hash'));
        };
      })(this));
      return this.scroll((function(_this) {
        return function() {
          if (_this.scrollTop() + _this.height() === _this.prop('scrollHeight')) {
            return _this.getLog();
          }
        };
      })(this));
    };

    LogListView.prototype.setRepo = function(repo) {
      this.repo = repo;
    };

    LogListView.prototype.parseData = function(data) {
      var commits, newline, separator;
      if (data.length > 0) {
        separator = ';|';
        newline = '_.;._';
        data = data.substring(0, data.length - newline.length - 1);
        commits = data.split(newline).map(function(line) {
          var tmpData;
          if (line.trim() !== '') {
            tmpData = line.trim().split(separator);
            return {
              hashShort: tmpData[0],
              hash: tmpData[1],
              author: tmpData[2],
              email: tmpData[3],
              message: tmpData[4],
              date: tmpData[5]
            };
          }
        });
        return this.renderLog(commits);
      }
    };

    LogListView.prototype.renderHeader = function() {
      var headerRow;
      headerRow = $$$(function() {
        return this.tr({
          "class": 'commit-header'
        }, (function(_this) {
          return function() {
            _this.td('Date');
            _this.td('Message');
            return _this.td({
              "class": 'hashShort'
            }, 'Short Hash');
          };
        })(this));
      });
      return this.commitsListView.append(headerRow);
    };

    LogListView.prototype.renderLog = function(commits) {
      commits.forEach((function(_this) {
        return function(commit) {
          return _this.renderCommit(commit);
        };
      })(this));
      return this.skipCommits += amountOfCommitsToShow();
    };

    LogListView.prototype.renderCommit = function(commit) {
      var commitRow;
      commitRow = $$$(function() {
        return this.tr({
          "class": 'commit-row',
          hash: "" + commit.hash
        }, (function(_this) {
          return function() {
            _this.td({
              "class": 'date'
            }, "" + commit.date + " by " + commit.author);
            _this.td({
              "class": 'message'
            }, "" + commit.message);
            return _this.td({
              "class": 'hashShort'
            }, "" + commit.hashShort);
          };
        })(this));
      });
      return this.commitsListView.append(commitRow);
    };

    LogListView.prototype.showCommitLog = function(hash) {
      return GitShow(this.repo, hash, this.onlyCurrentFile ? this.currentFile : void 0);
    };

    LogListView.prototype.branchLog = function() {
      this.skipCommits = 0;
      this.commitsListView.empty();
      this.onlyCurrentFile = false;
      this.currentFile = null;
      this.renderHeader();
      return this.getLog();
    };

    LogListView.prototype.currentFileLog = function(onlyCurrentFile, currentFile) {
      this.onlyCurrentFile = onlyCurrentFile;
      this.currentFile = currentFile;
      this.skipCommits = 0;
      this.commitsListView.empty();
      this.renderHeader();
      return this.getLog();
    };

    LogListView.prototype.getLog = function() {
      var args;
      args = ['log', "--pretty=%h;|%H;|%aN;|%aE;|%s;|%ai_.;._", "-" + (amountOfCommitsToShow()), '--skip=' + this.skipCommits];
      if (this.onlyCurrentFile && (this.currentFile != null)) {
        args.push(this.currentFile);
      }
      return git.cmd({
        args: args,
        cwd: this.repo.getWorkingDirectory(),
        stdout: (function(_this) {
          return function(data) {
            return _this.parseData(data);
          };
        })(this)
      });
    };

    return LogListView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi92aWV3cy9sb2ctbGlzdC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx1R0FBQTtJQUFBO21TQUFBOztBQUFBLEVBQUMsYUFBYyxPQUFBLENBQVEsTUFBUixFQUFkLFVBQUQsQ0FBQTs7QUFBQSxFQUNDLGtCQUFtQixPQUFBLENBQVEsTUFBUixFQUFuQixlQURELENBQUE7O0FBQUEsRUFFQSxPQUF1QixPQUFBLENBQVEsc0JBQVIsQ0FBdkIsRUFBQyxTQUFBLENBQUQsRUFBSSxXQUFBLEdBQUosRUFBUyxrQkFBQSxVQUZULENBQUE7O0FBQUEsRUFHQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FITixDQUFBOztBQUFBLEVBSUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxvQkFBUixDQUpWLENBQUE7O0FBQUEsRUFNQSxxQkFBQSxHQUF3QixTQUFBLEdBQUE7V0FDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGdDQUFoQixFQURzQjtFQUFBLENBTnhCLENBQUE7O0FBQUEsRUFTQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osa0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsV0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sa0NBQVA7QUFBQSxRQUEyQyxRQUFBLEVBQVUsQ0FBQSxDQUFyRDtPQUFMLEVBQThELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQzVELEtBQUMsQ0FBQSxLQUFELENBQU87QUFBQSxZQUFBLEVBQUEsRUFBSSxrQkFBSjtBQUFBLFlBQXdCLE1BQUEsRUFBUSxpQkFBaEM7V0FBUCxF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

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/views/log-list-view.coffee
