(function() {
  var ProjectsListView, git, gitInit, init, notifier;

  git = require('../git');

  ProjectsListView = require('../views/projects-list-view');

  notifier = require('../notifier');

  gitInit = function() {
    var currentFile, promise, _ref;
    currentFile = (_ref = atom.workspace.getActiveTextEditor()) != null ? _ref.getPath() : void 0;
    if (!currentFile && atom.project.getPaths().length > 1) {
      return promise = new ProjectsListView().result.then(function(path) {
        return init(path);
      });
    } else {
      return init(atom.project.getPaths()[0]);
    }
  };

  init = function(path) {
    return git.cmd({
      args: ['init'],
      cwd: path,
      stdout: function(data) {
        notifier.addSuccess(data);
        return atom.project.setPaths([path]);
      }
    });
  };

  module.exports = gitInit;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LWluaXQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhDQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSw2QkFBUixDQURuQixDQUFBOztBQUFBLEVBRUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxhQUFSLENBRlgsQ0FBQTs7QUFBQSxFQUlBLE9BQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixRQUFBLDBCQUFBO0FBQUEsSUFBQSxXQUFBLCtEQUFrRCxDQUFFLE9BQXRDLENBQUEsVUFBZCxDQUFBO0FBQ0EsSUFBQSxJQUFHLENBQUEsV0FBQSxJQUFvQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQWIsQ0FBQSxDQUF1QixDQUFDLE1BQXhCLEdBQWlDLENBQXhEO2FBQ0UsT0FBQSxHQUFjLElBQUEsZ0JBQUEsQ0FBQSxDQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUExQixDQUErQixTQUFDLElBQUQsR0FBQTtlQUFVLElBQUEsQ0FBSyxJQUFMLEVBQVY7TUFBQSxDQUEvQixFQURoQjtLQUFBLE1BQUE7YUFHRSxJQUFBLENBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFiLENBQUEsQ0FBd0IsQ0FBQSxDQUFBLENBQTdCLEVBSEY7S0FGUTtFQUFBLENBSlYsQ0FBQTs7QUFBQSxFQVdBLElBQUEsR0FBTyxTQUFDLElBQUQsR0FBQTtXQUNMLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFDLE1BQUQsQ0FBTjtBQUFBLE1BQ0EsR0FBQSxFQUFLLElBREw7QUFBQSxNQUVBLE1BQUEsRUFBUSxTQUFDLElBQUQsR0FBQTtBQUNOLFFBQUEsUUFBUSxDQUFDLFVBQVQsQ0FBb0IsSUFBcEIsQ0FBQSxDQUFBO2VBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFiLENBQXNCLENBQUMsSUFBRCxDQUF0QixFQUZNO01BQUEsQ0FGUjtLQURGLEVBREs7RUFBQSxDQVhQLENBQUE7O0FBQUEsRUFtQkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FuQmpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-init.coffee
