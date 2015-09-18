(function() {
  var git, gitStashDrop, notifier;

  git = require('../git');

  notifier = require('../notifier');

  gitStashDrop = function(repo) {
    return git.cmd({
      args: ['stash', 'drop'],
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

  module.exports = gitStashDrop;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LXN0YXNoLWRyb3AuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFFBQUEsR0FBVyxPQUFBLENBQVEsYUFBUixDQURYLENBQUE7O0FBQUEsRUFHQSxZQUFBLEdBQWUsU0FBQyxJQUFELEdBQUE7V0FDYixHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sQ0FBQyxPQUFELEVBQVUsTUFBVixDQUFOO0FBQUEsTUFDQSxHQUFBLEVBQUssSUFBSSxDQUFDLG1CQUFMLENBQUEsQ0FETDtBQUFBLE1BRUEsT0FBQSxFQUFTO0FBQUEsUUFDUCxHQUFBLEVBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQURWO09BRlQ7QUFBQSxNQUtBLE1BQUEsRUFBUSxTQUFDLElBQUQsR0FBQTtBQUNOLFFBQUEsSUFBNkIsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUFlLENBQUMsTUFBaEIsR0FBeUIsQ0FBdEQ7aUJBQUEsUUFBUSxDQUFDLFVBQVQsQ0FBb0IsSUFBcEIsRUFBQTtTQURNO01BQUEsQ0FMUjtBQUFBLE1BT0EsTUFBQSxFQUFRLFNBQUMsSUFBRCxHQUFBO2VBQ04sUUFBUSxDQUFDLFFBQVQsQ0FBa0IsSUFBbEIsRUFETTtNQUFBLENBUFI7S0FERixFQURhO0VBQUEsQ0FIZixDQUFBOztBQUFBLEVBZUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsWUFmakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-stash-drop.coffee
