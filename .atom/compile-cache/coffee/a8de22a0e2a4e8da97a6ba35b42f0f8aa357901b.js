(function() {
  var $$, BufferedProcess, CherryPickSelectBranch, CherryPickSelectCommits, SelectListView, git, notifier, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BufferedProcess = require('atom').BufferedProcess;

  _ref = require('atom-space-pen-views'), $$ = _ref.$$, SelectListView = _ref.SelectListView;

  git = require('../git');

  notifier = require('../notifier');

  CherryPickSelectCommits = require('./cherry-pick-select-commits-view');

  module.exports = CherryPickSelectBranch = (function(_super) {
    __extends(CherryPickSelectBranch, _super);

    function CherryPickSelectBranch() {
      return CherryPickSelectBranch.__super__.constructor.apply(this, arguments);
    }

    CherryPickSelectBranch.prototype.initialize = function(repo, items, currentHead) {
      this.repo = repo;
      this.currentHead = currentHead;
      CherryPickSelectBranch.__super__.initialize.apply(this, arguments);
      this.show();
      this.setItems(items);
      return this.focusFilterEditor();
    };

    CherryPickSelectBranch.prototype.show = function() {
      if (this.panel == null) {
        this.panel = atom.workspace.addModalPanel({
          item: this
        });
      }
      this.panel.show();
      return this.storeFocusedElement();
    };

    CherryPickSelectBranch.prototype.cancelled = function() {
      return this.hide();
    };

    CherryPickSelectBranch.prototype.hide = function() {
      var _ref1;
      return (_ref1 = this.panel) != null ? _ref1.destroy() : void 0;
    };

    CherryPickSelectBranch.prototype.viewForItem = function(item) {
      return $$(function() {
        return this.li(item);
      });
    };

    CherryPickSelectBranch.prototype.confirmed = function(item) {
      var args, repo;
      this.cancel();
      args = ['log', '--cherry-pick', '-z', '--format=%H%n%an%n%ar%n%s', "" + this.currentHead + "..." + item];
      repo = this.repo;
      return git.cmd({
        args: args,
        cwd: repo.getWorkingDirectory(),
        stdout: function(data) {
          if (this.save == null) {
            this.save = '';
          }
          return this.save += data;
        },
        exit: function(exit) {
          if (exit === 0 && (this.save != null)) {
            new CherryPickSelectCommits(repo, this.save.split('\0').slice(0, -1));
            return this.save = null;
          } else {
            return notifier.addInfo("No commits available to cherry-pick.");
          }
        }
      });
    };

    return CherryPickSelectBranch;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi92aWV3cy9jaGVycnktcGljay1zZWxlY3QtYnJhbmNoLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlHQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxrQkFBbUIsT0FBQSxDQUFRLE1BQVIsRUFBbkIsZUFBRCxDQUFBOztBQUFBLEVBQ0EsT0FBdUIsT0FBQSxDQUFRLHNCQUFSLENBQXZCLEVBQUMsVUFBQSxFQUFELEVBQUssc0JBQUEsY0FETCxDQUFBOztBQUFBLEVBR0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBSE4sQ0FBQTs7QUFBQSxFQUlBLFFBQUEsR0FBVyxPQUFBLENBQVEsYUFBUixDQUpYLENBQUE7O0FBQUEsRUFLQSx1QkFBQSxHQUEwQixPQUFBLENBQVEsbUNBQVIsQ0FMMUIsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSiw2Q0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEscUNBQUEsVUFBQSxHQUFZLFNBQUUsSUFBRixFQUFRLEtBQVIsRUFBZ0IsV0FBaEIsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLE9BQUEsSUFDWixDQUFBO0FBQUEsTUFEeUIsSUFBQyxDQUFBLGNBQUEsV0FDMUIsQ0FBQTtBQUFBLE1BQUEsd0RBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxJQUFELENBQUEsQ0FEQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsUUFBRCxDQUFVLEtBQVYsQ0FGQSxDQUFBO2FBR0EsSUFBQyxDQUFBLGlCQUFELENBQUEsRUFKVTtJQUFBLENBQVosQ0FBQTs7QUFBQSxxQ0FNQSxJQUFBLEdBQU0sU0FBQSxHQUFBOztRQUNKLElBQUMsQ0FBQSxRQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBZixDQUE2QjtBQUFBLFVBQUEsSUFBQSxFQUFNLElBQU47U0FBN0I7T0FBVjtBQUFBLE1BQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQUEsQ0FEQSxDQUFBO2FBR0EsSUFBQyxDQUFBLG1CQUFELENBQUEsRUFKSTtJQUFBLENBTk4sQ0FBQTs7QUFBQSxxQ0FZQSxTQUFBLEdBQVcsU0FBQSxHQUFBO2FBQUcsSUFBQyxDQUFBLElBQUQsQ0FBQSxFQUFIO0lBQUEsQ0FaWCxDQUFBOztBQUFBLHFDQWNBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDSixVQUFBLEtBQUE7aURBQU0sQ0FBRSxPQUFSLENBQUEsV0FESTtJQUFBLENBZE4sQ0FBQTs7QUFBQSxxQ0FpQkEsV0FBQSxHQUFhLFNBQUMsSUFBRCxHQUFBO2FBQ1gsRUFBQSxDQUFHLFNBQUEsR0FBQTtlQUNELElBQUMsQ0FBQSxFQUFELENBQUksSUFBSixFQURDO01BQUEsQ0FBSCxFQURXO0lBQUEsQ0FqQmIsQ0FBQTs7QUFBQSxxQ0FxQkEsU0FBQSxHQUFXLFNBQUMsSUFBRCxHQUFBO0FBQ1QsVUFBQSxVQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsTUFBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQSxHQUFPLENBQ0wsS0FESyxFQUVMLGVBRkssRUFHTCxJQUhLLEVBSUwsMkJBSkssRUFLTCxFQUFBLEdBQUcsSUFBQyxDQUFBLFdBQUosR0FBZ0IsS0FBaEIsR0FBcUIsSUFMaEIsQ0FEUCxDQUFBO0FBQUEsTUFTQSxJQUFBLEdBQU8sSUFBQyxDQUFBLElBVFIsQ0FBQTthQVVBLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsUUFDQSxHQUFBLEVBQUssSUFBSSxDQUFDLG1CQUFMLENBQUEsQ0FETDtBQUFBLFFBRUEsTUFBQSxFQUFRLFNBQUMsSUFBRCxHQUFBOztZQUNOLElBQUMsQ0FBQSxPQUFRO1dBQVQ7aUJBQ0EsSUFBQyxDQUFBLElBQUQsSUFBUyxLQUZIO1FBQUEsQ0FGUjtBQUFBLFFBS0EsSUFBQSxFQUFNLFNBQUMsSUFBRCxHQUFBO0FBQ0osVUFBQSxJQUFHLElBQUEsS0FBUSxDQUFSLElBQWMsbUJBQWpCO0FBQ0UsWUFBSSxJQUFBLHVCQUFBLENBQXdCLElBQXhCLEVBQThCLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixDQUFZLElBQVosQ0FBa0IsYUFBaEQsQ0FBSixDQUFBO21CQUNBLElBQUMsQ0FBQSxJQUFELEdBQVEsS0FGVjtXQUFBLE1BQUE7bUJBSUUsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsc0NBQWpCLEVBSkY7V0FESTtRQUFBLENBTE47T0FERixFQVhTO0lBQUEsQ0FyQlgsQ0FBQTs7a0NBQUE7O0tBRm1DLGVBUnJDLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/views/cherry-pick-select-branch-view.coffee
