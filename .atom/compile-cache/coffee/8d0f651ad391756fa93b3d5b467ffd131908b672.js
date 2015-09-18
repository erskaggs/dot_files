(function() {
  var git, gitStashPop, notifier;

  git = require('../git');

  notifier = require('../notifier');

  gitStashPop = function(repo) {
    return git.cmd({
      args: ['stash', 'pop'],
      cwd: repo.getWorkingDirectory(),
      options: {
        env: process.env.NODE_ENV
      },
      stdout: function(data) {
        if (data.toString().length > 0) {
          return notifier.addSuccess(data);
        }
      },
      stderr: function(data) {
        return notifier.addError(data);
      }
    });
  };

  module.exports = gitStashPop;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LXN0YXNoLXBvcC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMEJBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0EsUUFBQSxHQUFXLE9BQUEsQ0FBUSxhQUFSLENBRFgsQ0FBQTs7QUFBQSxFQUdBLFdBQUEsR0FBYyxTQUFDLElBQUQsR0FBQTtXQUNaLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFDLE9BQUQsRUFBVSxLQUFWLENBQU47QUFBQSxNQUNBLEdBQUEsRUFBSyxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQURMO0FBQUEsTUFFQSxPQUFBLEVBQVM7QUFBQSxRQUNQLEdBQUEsRUFBSyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBRFY7T0FGVDtBQUFBLE1BS0EsTUFBQSxFQUFRLFNBQUMsSUFBRCxHQUFBO0FBQ04sUUFBQSxJQUE2QixJQUFJLENBQUMsUUFBTCxDQUFBLENBQWUsQ0FBQyxNQUFoQixHQUF5QixDQUF0RDtpQkFBQSxRQUFRLENBQUMsVUFBVCxDQUFvQixJQUFwQixFQUFBO1NBRE07TUFBQSxDQUxSO0FBQUEsTUFPQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7ZUFDTixRQUFRLENBQUMsUUFBVCxDQUFrQixJQUFsQixFQURNO01BQUEsQ0FQUjtLQURGLEVBRFk7RUFBQSxDQUhkLENBQUE7O0FBQUEsRUFlQSxNQUFNLENBQUMsT0FBUCxHQUFpQixXQWZqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-stash-pop.coffee
