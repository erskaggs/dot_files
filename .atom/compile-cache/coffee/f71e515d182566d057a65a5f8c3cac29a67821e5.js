(function() {
  var GitCommit, git, gitCommitAmend;

  git = require('../git');

  GitCommit = require('./git-commit');

  gitCommitAmend = function(repo) {
    return git.cmd({
      args: ['log', '-1', '--format=%B'],
      cwd: repo.getWorkingDirectory(),
      stdout: function(amend) {
        return git.cmd({
          args: ['reset', '--soft', 'HEAD^'],
          cwd: repo.getWorkingDirectory(),
          exit: function() {
            return new GitCommit(repo, {
              amend: "" + (amend != null ? amend.trim() : void 0) + "\n"
            });
          }
        });
      }
    });
  };

  module.exports = gitCommitAmend;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LWNvbW1pdC1hbWVuZC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsOEJBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0EsU0FBQSxHQUFZLE9BQUEsQ0FBUSxjQUFSLENBRFosQ0FBQTs7QUFBQSxFQUdBLGNBQUEsR0FBaUIsU0FBQyxJQUFELEdBQUE7V0FDZixHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sQ0FBQyxLQUFELEVBQVEsSUFBUixFQUFjLGFBQWQsQ0FBTjtBQUFBLE1BQ0EsR0FBQSxFQUFLLElBQUksQ0FBQyxtQkFBTCxDQUFBLENBREw7QUFBQSxNQUVBLE1BQUEsRUFBUSxTQUFDLEtBQUQsR0FBQTtlQUNOLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxVQUFBLElBQUEsRUFBTSxDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQW9CLE9BQXBCLENBQU47QUFBQSxVQUNBLEdBQUEsRUFBSyxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQURMO0FBQUEsVUFFQSxJQUFBLEVBQU0sU0FBQSxHQUFBO21CQUFPLElBQUEsU0FBQSxDQUFVLElBQVYsRUFBZ0I7QUFBQSxjQUFBLEtBQUEsRUFBTyxFQUFBLEdBQUUsaUJBQUMsS0FBSyxDQUFFLElBQVAsQ0FBQSxVQUFELENBQUYsR0FBaUIsSUFBeEI7YUFBaEIsRUFBUDtVQUFBLENBRk47U0FERixFQURNO01BQUEsQ0FGUjtLQURGLEVBRGU7RUFBQSxDQUhqQixDQUFBOztBQUFBLEVBYUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsY0FiakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-commit-amend.coffee
