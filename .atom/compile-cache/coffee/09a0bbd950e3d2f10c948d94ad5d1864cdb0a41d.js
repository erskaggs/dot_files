(function() {
  var BranchListView, DeleteBranchListView, git, notifier,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  git = require('../git');

  notifier = require('../notifier');

  BranchListView = require('./branch-list-view');

  module.exports = DeleteBranchListView = (function(_super) {
    __extends(DeleteBranchListView, _super);

    function DeleteBranchListView() {
      return DeleteBranchListView.__super__.constructor.apply(this, arguments);
    }

    DeleteBranchListView.prototype.initialize = function(repo, data, _arg) {
      this.repo = repo;
      this.data = data;
      this.isRemote = (_arg != null ? _arg : {}).isRemote;
      return DeleteBranchListView.__super__.initialize.apply(this, arguments);
    };

    DeleteBranchListView.prototype.confirmed = function(_arg) {
      var branch, name, remote;
      name = _arg.name;
      if (name.startsWith("*")) {
        name = name.slice(1);
      }
      if (!this.isRemote) {
        this["delete"](name);
      } else {
        branch = name.substring(name.indexOf('/') + 1);
        remote = name.substring(0, name.indexOf('/'));
        this["delete"](branch, remote);
      }
      return this.cancel();
    };

    DeleteBranchListView.prototype["delete"] = function(branch, remote) {
      if (remote == null) {
        remote = '';
      }
      if (remote.length === 0) {
        return git.cmd({
          args: ['branch', '-D', branch],
          cwd: this.repo.getWorkingDirectory(),
          stdout: function(data) {
            return notifier.addSuccess(data.toString());
          }
        });
      } else {
        return git.cmd({
          args: ['push', remote, '--delete', branch],
          cwd: this.repo.getWorkingDirectory(),
          stderr: function(data) {
            return notifier.addSuccess(data.toString());
          }
        });
      }
    };

    return DeleteBranchListView;

  })(BranchListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi92aWV3cy9kZWxldGUtYnJhbmNoLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1EQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0EsUUFBQSxHQUFXLE9BQUEsQ0FBUSxhQUFSLENBRFgsQ0FBQTs7QUFBQSxFQUVBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG9CQUFSLENBRmpCLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUVRO0FBQ0osMkNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLG1DQUFBLFVBQUEsR0FBWSxTQUFFLElBQUYsRUFBUyxJQUFULEVBQWUsSUFBZixHQUFBO0FBQWtDLE1BQWpDLElBQUMsQ0FBQSxPQUFBLElBQWdDLENBQUE7QUFBQSxNQUExQixJQUFDLENBQUEsT0FBQSxJQUF5QixDQUFBO0FBQUEsTUFBbEIsSUFBQyxDQUFBLDJCQUFGLE9BQVksSUFBVixRQUFpQixDQUFBO2FBQUEsc0RBQUEsU0FBQSxFQUFsQztJQUFBLENBQVosQ0FBQTs7QUFBQSxtQ0FFQSxTQUFBLEdBQVcsU0FBQyxJQUFELEdBQUE7QUFDVCxVQUFBLG9CQUFBO0FBQUEsTUFEVyxPQUFELEtBQUMsSUFDWCxDQUFBO0FBQUEsTUFBQSxJQUFHLElBQUksQ0FBQyxVQUFMLENBQWdCLEdBQWhCLENBQUg7QUFDRSxRQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLENBQVgsQ0FBUCxDQURGO09BQUE7QUFHQSxNQUFBLElBQUEsQ0FBQSxJQUFRLENBQUEsUUFBUjtBQUNFLFFBQUEsSUFBQyxDQUFBLFFBQUEsQ0FBRCxDQUFRLElBQVIsQ0FBQSxDQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBSSxDQUFDLE9BQUwsQ0FBYSxHQUFiLENBQUEsR0FBb0IsQ0FBbkMsQ0FBVCxDQUFBO0FBQUEsUUFDQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLElBQUksQ0FBQyxPQUFMLENBQWEsR0FBYixDQUFsQixDQURULENBQUE7QUFBQSxRQUVBLElBQUMsQ0FBQSxRQUFBLENBQUQsQ0FBUSxNQUFSLEVBQWdCLE1BQWhCLENBRkEsQ0FIRjtPQUhBO2FBVUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQVhTO0lBQUEsQ0FGWCxDQUFBOztBQUFBLG1DQWVBLFNBQUEsR0FBUSxTQUFDLE1BQUQsRUFBUyxNQUFULEdBQUE7O1FBQVMsU0FBUztPQUN4QjtBQUFBLE1BQUEsSUFBRyxNQUFNLENBQUMsTUFBUCxLQUFpQixDQUFwQjtlQUNFLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxVQUFBLElBQUEsRUFBTSxDQUFDLFFBQUQsRUFBVyxJQUFYLEVBQWlCLE1BQWpCLENBQU47QUFBQSxVQUNBLEdBQUEsRUFBSyxJQUFDLENBQUEsSUFBSSxDQUFDLG1CQUFOLENBQUEsQ0FETDtBQUFBLFVBRUEsTUFBQSxFQUFRLFNBQUMsSUFBRCxHQUFBO21CQUFVLFFBQVEsQ0FBQyxVQUFULENBQW9CLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FBcEIsRUFBVjtVQUFBLENBRlI7U0FERixFQURGO09BQUEsTUFBQTtlQU1FLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxVQUFBLElBQUEsRUFBTSxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLFVBQWpCLEVBQTZCLE1BQTdCLENBQU47QUFBQSxVQUNBLEdBQUEsRUFBSyxJQUFDLENBQUEsSUFBSSxDQUFDLG1CQUFOLENBQUEsQ0FETDtBQUFBLFVBRUEsTUFBQSxFQUFRLFNBQUMsSUFBRCxHQUFBO21CQUFVLFFBQVEsQ0FBQyxVQUFULENBQW9CLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FBcEIsRUFBVjtVQUFBLENBRlI7U0FERixFQU5GO09BRE07SUFBQSxDQWZSLENBQUE7O2dDQUFBOztLQURpQyxlQU5yQyxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/views/delete-branch-view.coffee
