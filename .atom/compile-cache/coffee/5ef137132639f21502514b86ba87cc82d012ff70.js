(function() {
  var CompositeDisposable, path;

  CompositeDisposable = require('atom').CompositeDisposable;

  path = require('path');

  module.exports = {
    subscriptions: null,
    activate: function(state) {
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'open-git-modified-files:open': (function(_this) {
          return function() {
            return _this.open();
          };
        })(this)
      }));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    open: function() {
      var filePath, repo, repos, _i, _len, _results;
      repos = atom.project.getRepositories();
      if (repos != null) {
        _results = [];
        for (_i = 0, _len = repos.length; _i < _len; _i++) {
          repo = repos[_i];
          if (repo == null) {
            break;
          }
          _results.push((function() {
            var _results1;
            _results1 = [];
            for (filePath in repo.statuses) {
              if (repo.isPathModified(filePath) || repo.isPathNew(filePath)) {
                _results1.push(atom.workspace.open(path.join(repo.repo.workingDirectory, filePath)));
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          })());
        }
        return _results;
      } else {
        return atom.beep();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL29wZW4tZ2l0LW1vZGlmaWVkLWZpbGVzL2xpYi9vcGVuLWdpdC1tb2RpZmllZC1maWxlcy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEseUJBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxhQUFBLEVBQWUsSUFBZjtBQUFBLElBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBQWpCLENBQUE7YUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUNqQjtBQUFBLFFBQUEsOEJBQUEsRUFBZ0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7bUJBQUcsS0FBQyxDQUFBLElBQUQsQ0FBQSxFQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBaEM7T0FEaUIsQ0FBbkIsRUFGUTtJQUFBLENBRlY7QUFBQSxJQU9BLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsYUFBYSxDQUFDLE9BQWYsQ0FBQSxFQURVO0lBQUEsQ0FQWjtBQUFBLElBVUEsSUFBQSxFQUFNLFNBQUEsR0FBQTtBQUNKLFVBQUEseUNBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWIsQ0FBQSxDQUFSLENBQUE7QUFDQSxNQUFBLElBQUcsYUFBSDtBQUNFO2FBQUEsNENBQUE7MkJBQUE7QUFDRSxVQUFBLElBQWEsWUFBYjtBQUFBLGtCQUFBO1dBQUE7QUFBQTs7QUFDQTtpQkFBQSx5QkFBQSxHQUFBO0FBQ0UsY0FBQSxJQUFHLElBQUksQ0FBQyxjQUFMLENBQW9CLFFBQXBCLENBQUEsSUFBaUMsSUFBSSxDQUFDLFNBQUwsQ0FBZSxRQUFmLENBQXBDOytCQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixJQUFJLENBQUMsSUFBTCxDQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQXBCLEVBQXNDLFFBQXRDLENBQXBCLEdBREY7ZUFBQSxNQUFBO3VDQUFBO2VBREY7QUFBQTs7ZUFEQSxDQURGO0FBQUE7d0JBREY7T0FBQSxNQUFBO2VBT0UsSUFBSSxDQUFDLElBQUwsQ0FBQSxFQVBGO09BRkk7SUFBQSxDQVZOO0dBSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/open-git-modified-files/lib/open-git-modified-files.coffee
