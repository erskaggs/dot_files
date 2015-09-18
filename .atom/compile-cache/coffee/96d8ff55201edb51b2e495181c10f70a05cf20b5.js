(function() {
  var GitCommit, git, gitAddAndCommit;

  git = require('../git');

  GitCommit = require('./git-commit');

  gitAddAndCommit = function(repo) {
    var _ref;
    return git.add(repo, {
      file: repo.relativize((_ref = atom.workspace.getActiveTextEditor()) != null ? _ref.getPath() : void 0),
      exit: function() {
        return new GitCommit(repo);
      }
    });
  };

  module.exports = gitAddAndCommit;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9tb2RlbHMvZ2l0LWFkZC1hbmQtY29tbWl0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwrQkFBQTs7QUFBQSxFQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUFOLENBQUE7O0FBQUEsRUFDQSxTQUFBLEdBQVksT0FBQSxDQUFRLGNBQVIsQ0FEWixDQUFBOztBQUFBLEVBR0EsZUFBQSxHQUFrQixTQUFDLElBQUQsR0FBQTtBQUNoQixRQUFBLElBQUE7V0FBQSxHQUFHLENBQUMsR0FBSixDQUFRLElBQVIsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLElBQUksQ0FBQyxVQUFMLDZEQUFvRCxDQUFFLE9BQXRDLENBQUEsVUFBaEIsQ0FBTjtBQUFBLE1BQ0EsSUFBQSxFQUFNLFNBQUEsR0FBQTtlQUFPLElBQUEsU0FBQSxDQUFVLElBQVYsRUFBUDtNQUFBLENBRE47S0FERixFQURnQjtFQUFBLENBSGxCLENBQUE7O0FBQUEsRUFRQSxNQUFNLENBQUMsT0FBUCxHQUFpQixlQVJqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/models/git-add-and-commit.coffee
