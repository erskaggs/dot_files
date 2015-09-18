(function() {
  var TagListView, git, gitTags;

  git = require('../git');

  TagListView = require('../views/tag-list-view');

  gitTags = function(repo) {
    this.TagListView = null;
    return git.cmd({
      args: ['tag', '-ln'],
      cwd: repo.getWorkingDirectory(),
      stdout: function(data) {
        return this.TagListView = new TagListView(repo, data);
      },
      exit: function() {
        if (this.TagListView == null) {
          return new TagListView(repo);
        }
      }
    });
  };

  module.exports = gitTags;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LXRhZ3MuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFdBQUEsR0FBYyxPQUFBLENBQVEsd0JBQVIsQ0FEZCxDQUFBOztBQUFBLEVBR0EsT0FBQSxHQUFVLFNBQUMsSUFBRCxHQUFBO0FBQ1IsSUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLElBQWYsQ0FBQTtXQUNBLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFDLEtBQUQsRUFBUSxLQUFSLENBQU47QUFBQSxNQUNBLEdBQUEsRUFBSyxJQUFJLENBQUMsbUJBQUwsQ0FBQSxDQURMO0FBQUEsTUFFQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7ZUFBVSxJQUFDLENBQUEsV0FBRCxHQUFtQixJQUFBLFdBQUEsQ0FBWSxJQUFaLEVBQWtCLElBQWxCLEVBQTdCO01BQUEsQ0FGUjtBQUFBLE1BR0EsSUFBQSxFQUFNLFNBQUEsR0FBQTtBQUFHLFFBQUEsSUFBNkIsd0JBQTdCO2lCQUFJLElBQUEsV0FBQSxDQUFZLElBQVosRUFBSjtTQUFIO01BQUEsQ0FITjtLQURGLEVBRlE7RUFBQSxDQUhWLENBQUE7O0FBQUEsRUFXQSxNQUFNLENBQUMsT0FBUCxHQUFpQixPQVhqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-tags.coffee
