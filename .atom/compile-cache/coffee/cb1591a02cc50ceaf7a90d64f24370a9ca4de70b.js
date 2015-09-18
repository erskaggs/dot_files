(function() {
  var Project, findGitRepos, fs, path, shouldIgnorePathFn, sortByFn, utils;

  fs = require('fs-plus');

  path = require('path');

  utils = require('./utils');

  Project = require('./models/project');

  sortByFn = function(_sortKey) {
    return function(array) {
      return utils.sortBy(_sortKey, array);
    };
  };

  shouldIgnorePathFn = function(_ignoredPath, _ignoredPatterns) {
    return function(_path) {
      var ignoredPaths, ignoredPattern;
      ignoredPaths = utils.parsePathString(_ignoredPath);
      ignoredPattern = new RegExp((_ignoredPatterns || "").split(/\s*;\s*/g).join("|"), "g");
      if (ignoredPattern.test(_path)) {
        return true;
      }
      return ignoredPaths && ignoredPaths.has(_path);
    };
  };

  findGitRepos = function(root, maxDepth, sortBy, shouldIgnorePath, cb) {
    var pathsChecked, projects, rootPaths;
    projects = [];
    pathsChecked = 0;
    rootPaths = utils.parsePathString(root);
    return rootPaths.forEach(function(rootPath) {
      var rootDepth, sendCallback;
      sendCallback = function() {
        if (++pathsChecked === rootPaths.size) {
          return cb(sortBy(projects));
        }
      };
      if (shouldIgnorePath(rootPath)) {
        return sendCallback();
      }
      rootDepth = rootPath.split(path.sep).length;
      return fs.traverseTree(rootPath, (function() {}), function(_dir) {
        var dirDepth, project;
        if (shouldIgnorePath(_dir)) {
          return false;
        }
        if (utils.isRepositorySync(_dir)) {
          project = new Project(_dir);
          if (!project.ignored) {
            projects.push(project);
          }
          return false;
        }
        dirDepth = _dir.split(path.sep).length;
        return rootDepth + maxDepth > dirDepth;
      }, function() {
        return sendCallback();
      });
    });
  };

  module.exports = function(rootPaths, config) {
    var callback, maxDepth, shouldIgnorePath, sortBy;
    callback = this.async();
    maxDepth = config.maxDepth;
    sortBy = sortByFn(config.sortBy);
    shouldIgnorePath = shouldIgnorePathFn(config.ignoredPath, config.ignoredPatterns);
    return findGitRepos(rootPaths, maxDepth, sortBy, shouldIgnorePath, function(projects) {
      emit('found-repos', projects);
      return callback();
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wcm9qZWN0cy9saWIvZmluZC1naXQtcmVwb3MtdGFzay5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsb0VBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLEtBQUEsR0FBUSxPQUFBLENBQVEsU0FBUixDQUZSLENBQUE7O0FBQUEsRUFJQSxPQUFBLEdBQVUsT0FBQSxDQUFRLGtCQUFSLENBSlYsQ0FBQTs7QUFBQSxFQU1BLFFBQUEsR0FBVyxTQUFDLFFBQUQsR0FBQTtBQUNULFdBQU8sU0FBQyxLQUFELEdBQUE7YUFDTCxLQUFLLENBQUMsTUFBTixDQUFhLFFBQWIsRUFBdUIsS0FBdkIsRUFESztJQUFBLENBQVAsQ0FEUztFQUFBLENBTlgsQ0FBQTs7QUFBQSxFQVVBLGtCQUFBLEdBQXFCLFNBQUMsWUFBRCxFQUFlLGdCQUFmLEdBQUE7QUFLbkIsV0FBTyxTQUFDLEtBQUQsR0FBQTtBQUNMLFVBQUEsNEJBQUE7QUFBQSxNQUFBLFlBQUEsR0FBZSxLQUFLLENBQUMsZUFBTixDQUFzQixZQUF0QixDQUFmLENBQUE7QUFBQSxNQUNBLGNBQUEsR0FBcUIsSUFBQSxNQUFBLENBQU8sQ0FBQyxnQkFBQSxJQUFvQixFQUFyQixDQUF3QixDQUFDLEtBQXpCLENBQStCLFVBQS9CLENBQTBDLENBQUMsSUFBM0MsQ0FBZ0QsR0FBaEQsQ0FBUCxFQUE2RCxHQUE3RCxDQURyQixDQUFBO0FBRUEsTUFBQSxJQUFlLGNBQWMsQ0FBQyxJQUFmLENBQW9CLEtBQXBCLENBQWY7QUFBQSxlQUFPLElBQVAsQ0FBQTtPQUZBO0FBR0EsYUFB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

//# sourceURL=/Users/erskaggs/.atom/packages/git-projects/lib/find-git-repos-task.coffee
