(function() {
  var SelectStageFiles, git, gitStageFiles;

  git = require('../git');

  SelectStageFiles = require('../views/select-stage-files-view');

  gitStageFiles = function(repo) {
    return git.unstagedFiles(repo, {
      showUntracked: true
    }, function(data) {
      return new SelectStageFiles(repo, data);
    });
  };

  module.exports = gitStageFiles;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LXN0YWdlLWZpbGVzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxvQ0FBQTs7QUFBQSxFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUFOLENBQUE7O0FBQUEsRUFDQSxnQkFBQSxHQUFtQixPQUFBLENBQVEsa0NBQVIsQ0FEbkIsQ0FBQTs7QUFBQSxFQUdBLGFBQUEsR0FBZ0IsU0FBQyxJQUFELEdBQUE7V0FDZCxHQUFHLENBQUMsYUFBSixDQUFrQixJQUFsQixFQUNFO0FBQUEsTUFBQSxhQUFBLEVBQWUsSUFBZjtLQURGLEVBRUUsU0FBQyxJQUFELEdBQUE7YUFBYyxJQUFBLGdCQUFBLENBQWlCLElBQWpCLEVBQXVCLElBQXZCLEVBQWQ7SUFBQSxDQUZGLEVBRGM7RUFBQSxDQUhoQixDQUFBOztBQUFBLEVBU0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsYUFUakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-stage-files.coffee
