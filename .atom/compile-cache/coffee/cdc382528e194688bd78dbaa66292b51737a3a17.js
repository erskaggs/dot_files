(function() {
  var git, gitCheckoutCurrentFile, notifier;

  git = require('../git');

  notifier = require('../notifier');

  gitCheckoutCurrentFile = function(repo) {
    var currentFile, _ref;
    currentFile = repo.relativize((_ref = atom.workspace.getActiveTextEditor()) != null ? _ref.getPath() : void 0);
    return git.cmd({
      args: ['checkout', '--', currentFile],
      cwd: repo.getWorkingDirectory(),
      stdout: function(data) {
        notifier.addSuccess('File changes checked out successfully');
        return git.refresh();
      }
    });
  };

  module.exports = gitCheckoutCurrentFile;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LWNoZWNrb3V0LWN1cnJlbnQtZmlsZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEscUNBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0EsUUFBQSxHQUFXLE9BQUEsQ0FBUSxhQUFSLENBRFgsQ0FBQTs7QUFBQSxFQUdBLHNCQUFBLEdBQXlCLFNBQUMsSUFBRCxHQUFBO0FBQ3ZCLFFBQUEsaUJBQUE7QUFBQSxJQUFBLFdBQUEsR0FBYyxJQUFJLENBQUMsVUFBTCw2REFBb0QsQ0FBRSxPQUF0QyxDQUFBLFVBQWhCLENBQWQsQ0FBQTtXQUNBLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFDLFVBQUQsRUFBYSxJQUFiLEVBQW1CLFdBQW5CLENBQU47QUFBQSxNQUNBLEdBQUEsRUFBSyxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQURMO0FBQUEsTUFFQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7QUFDTixRQUFBLFFBQVEsQ0FBQyxVQUFULENBQW9CLHVDQUFwQixDQUFBLENBQUE7ZUFDQSxHQUFHLENBQUMsT0FBSixDQUFBLEVBRk07TUFBQSxDQUZSO0tBREYsRUFGdUI7RUFBQSxDQUh6QixDQUFBOztBQUFBLEVBWUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsc0JBWmpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-checkout-current-file.coffee
