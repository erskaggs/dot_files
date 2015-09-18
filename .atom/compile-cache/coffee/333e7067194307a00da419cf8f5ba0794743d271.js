(function() {
  var RemoveListView, git, gitRemove, notifier, prettify;

  git = require('../git');

  notifier = require('../notifier');

  RemoveListView = require('../views/remove-list-view');

  gitRemove = function(repo, _arg) {
    var currentFile, showSelector, _ref;
    showSelector = (_arg != null ? _arg : {}).showSelector;
    currentFile = repo.relativize((_ref = atom.workspace.getActiveTextEditor()) != null ? _ref.getPath() : void 0);
    if ((currentFile != null) && !showSelector) {
      if (window.confirm('Are you sure?')) {
        atom.workspace.getActivePaneItem().destroy();
        return git.cmd({
          args: ['rm', '-f', '--ignore-unmatch', currentFile],
          cwd: repo.getWorkingDirectory(),
          stdout: function(data) {
            return notifier.addSuccess("Removed " + (prettify(data)));
          }
        });
      }
    } else {
      return git.cmd({
        args: ['rm', '-r', '-n', '--ignore-unmatch', '-f', '*'],
        cwd: repo.getWorkingDirectory(),
        stdout: function(data) {
          return new RemoveListView(repo, prettify(data));
        }
      });
    }
  };

  prettify = function(data) {
    var file, i, _i, _len, _results;
    data = data.match(/rm ('.*')/g);
    if (data) {
      _results = [];
      for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
        file = data[i];
        _results.push(data[i] = file.match(/rm '(.*)'/)[1]);
      }
      return _results;
    } else {
      return data;
    }
  };

  module.exports = gitRemove;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LXJlbW92ZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0RBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0EsUUFBQSxHQUFXLE9BQUEsQ0FBUSxhQUFSLENBRFgsQ0FBQTs7QUFBQSxFQUVBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLDJCQUFSLENBRmpCLENBQUE7O0FBQUEsRUFJQSxTQUFBLEdBQVksU0FBQyxJQUFELEVBQU8sSUFBUCxHQUFBO0FBQ1YsUUFBQSwrQkFBQTtBQUFBLElBRGtCLCtCQUFELE9BQWUsSUFBZCxZQUNsQixDQUFBO0FBQUEsSUFBQSxXQUFBLEdBQWMsSUFBSSxDQUFDLFVBQUwsNkRBQW9ELENBQUUsT0FBdEMsQ0FBQSxVQUFoQixDQUFkLENBQUE7QUFFQSxJQUFBLElBQUcscUJBQUEsSUFBaUIsQ0FBQSxZQUFwQjtBQUNFLE1BQUEsSUFBRyxNQUFNLENBQUMsT0FBUCxDQUFlLGVBQWYsQ0FBSDtBQUNFLFFBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBZixDQUFBLENBQWtDLENBQUMsT0FBbkMsQ0FBQSxDQUFBLENBQUE7ZUFDQSxHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsVUFBQSxJQUFBLEVBQU0sQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLGtCQUFiLEVBQWlDLFdBQWpDLENBQU47QUFBQSxVQUNBLEdBQUEsRUFBSyxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQURMO0FBQUEsVUFFQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7bUJBQ04sUUFBUSxDQUFDLFVBQVQsQ0FBcUIsVUFBQSxHQUFTLENBQUMsUUFBQSxDQUFTLElBQVQsQ0FBRCxDQUE5QixFQURNO1VBQUEsQ0FGUjtTQURGLEVBRkY7T0FERjtLQUFBLE1BQUE7YUFTRSxHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsa0JBQW5CLEVBQXVDLElBQXZDLEVBQTZDLEdBQTdDLENBQU47QUFBQSxRQUNBLEdBQUEsRUFBSyxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQURMO0FBQUEsUUFFQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7aUJBQWMsSUFBQSxjQUFBLENBQWUsSUFBZixFQUFxQixRQUFBLENBQVMsSUFBVCxDQUFyQixFQUFkO1FBQUEsQ0FGUjtPQURGLEVBVEY7S0FIVTtFQUFBLENBSlosQ0FBQTs7QUFBQSxFQXNCQSxRQUFBLEdBQVcsU0FBQyxJQUFELEdBQUE7QUFDVCxRQUFBLDJCQUFBO0FBQUEsSUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxZQUFYLENBQVAsQ0FBQTtBQUNBLElBQUEsSUFBRyxJQUFIO0FBQ0U7V0FBQSxtREFBQTt1QkFBQTtBQUNFLHNCQUFBLElBQUssQ0FBQSxDQUFBLENBQUwsR0FBVSxJQUFJLENBQUMsS0FBTCxDQUFXLFdBQVgsQ0FBd0IsQ0FBQSxDQUFBLEVBQWxDLENBREY7QUFBQTtzQkFERjtLQUFBLE1BQUE7YUFJRSxLQUpGO0tBRlM7RUFBQSxDQXRCWCxDQUFBOztBQUFBLEVBOEJBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBOUJqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-remove.coffee
