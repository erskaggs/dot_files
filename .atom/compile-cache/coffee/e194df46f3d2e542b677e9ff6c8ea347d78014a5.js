(function() {
  var git, gitStashSave, notifier;

  git = require('../git');

  notifier = require('../notifier');

  gitStashSave = function(repo) {
    var notification;
    notification = notifier.addInfo('Saving...', {
      dismissable: true
    });
    return git.cmd({
      args: ['stash', 'save'],
      cwd: repo.getWorkingDirectory(),
      options: {
        env: process.env.NODE_ENV
      },
      stdout: function(data) {
        notification.dismiss();
        return notifier.addSuccess(data);
      }
    });
  };

  module.exports = gitStashSave;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LXN0YXNoLXNhdmUuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFFBQUEsR0FBVyxPQUFBLENBQVEsYUFBUixDQURYLENBQUE7O0FBQUEsRUFHQSxZQUFBLEdBQWUsU0FBQyxJQUFELEdBQUE7QUFDYixRQUFBLFlBQUE7QUFBQSxJQUFBLFlBQUEsR0FBZSxRQUFRLENBQUMsT0FBVCxDQUFpQixXQUFqQixFQUE4QjtBQUFBLE1BQUEsV0FBQSxFQUFhLElBQWI7S0FBOUIsQ0FBZixDQUFBO1dBQ0EsR0FBRyxDQUFDLEdBQUosQ0FDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FBTjtBQUFBLE1BQ0EsR0FBQSxFQUFLLElBQUksQ0FBQyxtQkFBTCxDQUFBLENBREw7QUFBQSxNQUVBLE9BQUEsRUFBUztBQUFBLFFBQ1AsR0FBQSxFQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFEVjtPQUZUO0FBQUEsTUFLQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7QUFDTixRQUFBLFlBQVksQ0FBQyxPQUFiLENBQUEsQ0FBQSxDQUFBO2VBQ0EsUUFBUSxDQUFDLFVBQVQsQ0FBb0IsSUFBcEIsRUFGTTtNQUFBLENBTFI7S0FERixFQUZhO0VBQUEsQ0FIZixDQUFBOztBQUFBLEVBZUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsWUFmakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-stash-save.coffee
