(function() {
  var LogListView, ViewUriLog, amountOfCommitsToShow, git, gitLog;

  git = require('../git');

  LogListView = require('../views/log-list-view');

  ViewUriLog = 'atom://git-plus:log';

  amountOfCommitsToShow = function() {
    return atom.config.get('git-plus.amountOfCommitsToShow');
  };

  gitLog = function(repo, _arg) {
    var currentFile, onlyCurrentFile, _ref;
    onlyCurrentFile = (_arg != null ? _arg : {}).onlyCurrentFile;
    currentFile = repo.relativize((_ref = atom.workspace.getActiveTextEditor()) != null ? _ref.getPath() : void 0);
    atom.workspace.addOpener(function(filePath) {
      if (filePath === ViewUriLog) {
        return new LogListView;
      }
    });
    return atom.workspace.open(ViewUriLog).done(function(view) {
      if (view instanceof LogListView) {
        view.setRepo(repo);
        if (onlyCurrentFile) {
          return view.currentFileLog(onlyCurrentFile, currentFile);
        } else {
          return view.branchLog();
        }
      }
    });
  };

  module.exports = gitLog;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LWxvZy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMkRBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0EsV0FBQSxHQUFjLE9BQUEsQ0FBUSx3QkFBUixDQURkLENBQUE7O0FBQUEsRUFFQSxVQUFBLEdBQWEscUJBRmIsQ0FBQTs7QUFBQSxFQUlBLHFCQUFBLEdBQXdCLFNBQUEsR0FBQTtXQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsZ0NBQWhCLEVBRHNCO0VBQUEsQ0FKeEIsQ0FBQTs7QUFBQSxFQU9BLE1BQUEsR0FBUyxTQUFDLElBQUQsRUFBTyxJQUFQLEdBQUE7QUFDUCxRQUFBLGtDQUFBO0FBQUEsSUFEZSxrQ0FBRCxPQUFrQixJQUFqQixlQUNmLENBQUE7QUFBQSxJQUFBLFdBQUEsR0FBYyxJQUFJLENBQUMsVUFBTCw2REFBb0QsQ0FBRSxPQUF0QyxDQUFBLFVBQWhCLENBQWQsQ0FBQTtBQUFBLElBRUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFmLENBQXlCLFNBQUMsUUFBRCxHQUFBO0FBQ3ZCLE1BQUEsSUFBMEIsUUFBQSxLQUFZLFVBQXRDO0FBQUEsZUFBTyxHQUFBLENBQUEsV0FBUCxDQUFBO09BRHVCO0lBQUEsQ0FBekIsQ0FGQSxDQUFBO1dBS0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLFVBQXBCLENBQStCLENBQUMsSUFBaEMsQ0FBcUMsU0FBQyxJQUFELEdBQUE7QUFDbkMsTUFBQSxJQUFHLElBQUEsWUFBZ0IsV0FBbkI7QUFDRSxRQUFBLElBQUksQ0FBQyxPQUFMLENBQWEsSUFBYixDQUFBLENBQUE7QUFDQSxRQUFBLElBQUcsZUFBSDtpQkFDRSxJQUFJLENBQUMsY0FBTCxDQUFvQixlQUFwQixFQUFxQyxXQUFyQyxFQURGO1NBQUEsTUFBQTtpQkFHRSxJQUFJLENBQUMsU0FBTCxDQUFBLEVBSEY7U0FGRjtPQURtQztJQUFBLENBQXJDLEVBTk87RUFBQSxDQVBULENBQUE7O0FBQUEsRUFxQkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsTUFyQmpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-log.coffee
