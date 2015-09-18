(function() {
  var $, $$, Project, ProjectsListView, SelectListView, View, fs, path, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom-space-pen-views'), $ = _ref.$, $$ = _ref.$$, SelectListView = _ref.SelectListView, View = _ref.View;

  fs = require('fs-plus');

  path = require('path');

  Project = require('../models/project');

  module.exports = ProjectsListView = (function(_super) {
    __extends(ProjectsListView, _super);

    function ProjectsListView() {
      this.getEmptyMessage = __bind(this.getEmptyMessage, this);
      return ProjectsListView.__super__.constructor.apply(this, arguments);
    }

    ProjectsListView.prototype.controller = null;

    ProjectsListView.prototype.cachedViews = new Map;

    ProjectsListView.prototype.activate = function() {
      return new ProjectsListView;
    };

    ProjectsListView.prototype.initialize = function(serializeState) {
      ProjectsListView.__super__.initialize.apply(this, arguments);
      return this.addClass('git-projects');
    };

    ProjectsListView.prototype.getFilterKey = function() {
      return 'title';
    };

    ProjectsListView.prototype.getFilterQuery = function() {
      return this.filterEditorView.getText();
    };

    ProjectsListView.prototype.cancelled = function() {
      return this.hide();
    };

    ProjectsListView.prototype.confirmed = function(project) {
      this.controller.openProject(project);
      return this.cancel();
    };

    ProjectsListView.prototype.getEmptyMessage = function(itemCount, filteredItemCount) {
      var msg, query;
      msg = "No repositories found in '" + (atom.config.get('git-projects.rootPath')) + "'";
      query = this.getFilterQuery();
      if (!filteredItemCount && query.length) {
        return "" + msg + " for '" + query + "'";
      }
      if (!itemCount) {
        return msg;
      }
      return ProjectsListView.__super__.getEmptyMessage.apply(this, arguments);
    };

    ProjectsListView.prototype.toggle = function(controller) {
      var _ref1;
      this.controller = controller;
      if ((_ref1 = this.panel) != null ? _ref1.isVisible() : void 0) {
        return this.hide();
      } else {
        return this.show();
      }
    };

    ProjectsListView.prototype.hide = function() {
      var _ref1;
      return (_ref1 = this.panel) != null ? _ref1.hide() : void 0;
    };

    ProjectsListView.prototype.show = function() {
      if (this.panel == null) {
        this.panel = atom.workspace.addModalPanel({
          item: this
        });
      }
      this.loading.text("Looking for repositories ...");
      this.loadingArea.show();
      this.panel.show();
      this.cachedProjects = this.controller.projects;
      if (this.cachedProjects != null) {
        this.setItems(this.cachedProjects);
      }
      this.focusFilterEditor();
      return setImmediate((function(_this) {
        return function() {
          return _this.refreshItems();
        };
      })(this));
    };

    ProjectsListView.prototype.refreshItems = function() {
      this.cachedViews.clear();
      return this.controller.findGitRepos(null, (function(_this) {
        return function(repos) {
          var projectMap, _ref1;
          projectMap = {};
          if ((_ref1 = _this.cachedProjects) != null) {
            _ref1.forEach(function(project) {
              return projectMap[project.path] = project;
            });
          }
          repos.map(function(repo) {
            var project;
            project = projectMap[repo.path];
            if (project == null) {
              return repo;
            }
            repo.branch = project.branch;
            repo.dirty = project.dirty;
            repo.setStale(true);
            return repo;
          });
          return _this.setItems(repos);
        };
      })(this));
    };

    ProjectsListView.prototype.viewForItem = function(project) {
      var cachedView, createdSubview, subview, view;
      if (cachedView = this.cachedViews.get(project)) {
        return cachedView;
      }
      view = $$(function() {
        return this.li({
          "class": 'two-lines'
        }, (function(_this) {
          return function() {
            _this.div({
              "class": 'status status-added'
            });
            _this.div({
              "class": 'primary-line icon ' + project.icon
            }, function() {
              return _this.span(project.title);
            });
            return _this.div({
              "class": 'secondary-line no-icon'
            }, function() {
              return _this.span(project.path);
            });
          };
        })(this));
      });
      if (atom.config.get('git-projects.showGitInfo')) {
        createdSubview = null;
        subview = function() {
          createdSubview = $$(function() {
            this.span(" (" + project.branch + ")");
            if (project.dirty) {
              return this.span({
                "class": 'status status-modified icon icon-diff-modified'
              });
            }
          });
          return view.find('.primary-line').append(createdSubview);
        };
        if (project.hasGitInfo()) {
          subview();
        }
        if (!project.hasGitInfo() || project.isStale()) {
          project.readGitInfo(function() {
            if (createdSubview != null) {
              createdSubview.remove();
            }
            return subview();
          });
        }
      }
      this.cachedViews.set(project, view);
      return view;
    };

    return ProjectsListView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wcm9qZWN0cy9saWIvdmlld3MvcHJvamVjdHMtbGlzdC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxzRUFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFBLE9BQWdDLE9BQUEsQ0FBUSxzQkFBUixDQUFoQyxFQUFDLFNBQUEsQ0FBRCxFQUFJLFVBQUEsRUFBSixFQUFRLHNCQUFBLGNBQVIsRUFBd0IsWUFBQSxJQUF4QixDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQSxPQUFBLEdBQVUsT0FBQSxDQUFRLG1CQUFSLENBSFYsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSix1Q0FBQSxDQUFBOzs7OztLQUFBOztBQUFBLCtCQUFBLFVBQUEsR0FBWSxJQUFaLENBQUE7O0FBQUEsK0JBQ0EsV0FBQSxHQUFhLEdBQUEsQ0FBQSxHQURiLENBQUE7O0FBQUEsK0JBR0EsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUNSLEdBQUEsQ0FBQSxpQkFEUTtJQUFBLENBSFYsQ0FBQTs7QUFBQSwrQkFNQSxVQUFBLEdBQVksU0FBQyxjQUFELEdBQUE7QUFDVixNQUFBLGtEQUFBLFNBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxjQUFWLEVBRlU7SUFBQSxDQU5aLENBQUE7O0FBQUEsK0JBVUEsWUFBQSxHQUFjLFNBQUEsR0FBQTthQUNaLFFBRFk7SUFBQSxDQVZkLENBQUE7O0FBQUEsK0JBYUEsY0FBQSxHQUFnQixTQUFBLEdBQUE7YUFDZCxJQUFDLENBQUEsZ0JBQWdCLENBQUMsT0FBbEIsQ0FBQSxFQURjO0lBQUEsQ0FiaEIsQ0FBQTs7QUFBQSwrQkFnQkEsU0FBQSxHQUFXLFNBQUEsR0FBQTthQUNULElBQUMsQ0FBQSxJQUFELENBQUEsRUFEUztJQUFBLENBaEJYLENBQUE7O0FBQUEsK0JBbUJBLFNBQUEsR0FBVyxTQUFDLE9BQUQsR0FBQTtBQUNULE1BQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxXQUFaLENBQXdCLE9BQXhCLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFGUztJQUFBLENBbkJYLENBQUE7O0FBQUEsK0JBdUJBLGVBQUEsR0FBaUIsU0FBQyxTQUFELEVBQVksaUJBQVosR0FBQTtBQUNmLFVBQUEsVUFBQTtBQUFBLE1BQUEsR0FBQSxHQUFPLDRCQUFBLEdBQTJCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHVCQUFoQixDQUFELENBQTNCLEdBQXFFLEdBQTVFLENBQUE7QUFBQSxNQUNBLEtBQUEsR0FBUSxJQUFDLENBQUEsY0FBRCxDQUFBLENBRFIsQ0FBQTtBQUVBLE1BQUEsSUFBa0MsQ0FBQSxpQkFBQSxJQUFzQixLQUFLLENBQUMsTUFBOUQ7QUFBQSxlQUFPLEVBQUEsR0FBRyxHQUFILEdBQU8sUUFBUCxHQUFlLEtBQWYsR0FBcUIsR0FBNUIsQ0FBQTtPQUZBO0FBR0EsTUFBQSxJQUFBLENBQUEsU0FBQTtBQUFBLGVBQU8sR0FBUCxDQUFBO09BSEE7QUFJQSxhQUFPLHVEQUFBLFNBQUEsQ0FBUCxDQUxlO0lBQUEsQ0F2QmpCLENBQUE7O0FBQUEsK0JBOEJBLE1BQUEsR0FBUSxTQUFDLFVBQUQsR0FBQTtBQUNOLFVBQUEsS0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFVBQUQsR0FBYyxVQUFkLENBQUE7QUFDQSxNQUFBLHdDQUFTLENBQUUsU0FBUixDQUFBLFVBQUg7ZUFDRSxJQUFDLENBQUEsSUFBRCxDQUFBLEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBQyxDQUFBLElBQUQsQ0FBQSxFQUhGO09BRk07SUFBQSxDQTlCUixDQUFBOztBQUFBLCtCQXFDQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0osVUFBQSxLQUFBO2lEQUFNLENBQUUsSUFBUixDQUFBLFdBREk7SUFBQSxDQXJDTixDQUFBOztBQUFBLCtCQXdDQSxJQUFBLEdBQU0sU0FBQSxHQUFBOztRQUNKLElBQUMsQ0FBQSxRQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBZixDQUE2QjtBQUFBLFVBQUEsSUFBQSxFQUFNLElBQU47U0FBN0I7T0FBVjtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsOEJBQWQsQ0FEQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsQ0FBQSxDQUZBLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFBLENBSEEsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLGNBQUQsR0FBa0IsSUFBQyxDQUFBLFVBQVUsQ0FBQyxRQUw5QixDQUFBO0FBTUEsTUFBQSxJQUE4QiwyQkFBOUI7QUFBQSxRQUFBLElBQUMsQ0FBQSxRQUFELENBQVUsSUFBQyxDQUFBLGNBQVgsQ0FBQSxDQUFBO09BTkE7QUFBQSxNQU9BLElBQUMsQ0FBQSxpQkFBRCxDQUFBLENBUEEsQ0FBQTthQVNBLFlBQUEsQ0FBYSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxZQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsRUFWSTtJQUFBLENBeENOLENBQUE7O0FBQUEsK0JBb0RBLFlBQUEsR0FBYyxTQUFBLEdBQUE7QUFDWixNQUFBLElBQUMsQ0FBQSxXQUFXLENBQUMsS0FBYixDQUFBLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsWUFBWixDQUF5QixJQUF6QixFQUErQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEdBQUE7QUFDN0IsY0FBQSxpQkFBQTtBQUFBLFVBQUEsVUFBQSxHQUFhLEVBQWIsQ0FBQTs7aUJBQ2UsQ0FBRSxPQUFqQixDQUF5QixTQUFDLE9BQUQsR0FBQTtxQkFDdkIsVUFBVyxDQUFBLE9BQU8sQ0FBQyxJQUFSLENBQVgsR0FBMkIsUUFESjtZQUFBLENBQXpCO1dBREE7QUFBQSxVQU1BLEtBQUssQ0FBQyxHQUFOLENBQVUsU0FBQyxJQUFELEdBQUE7QUFDUixnQkFBQSxPQUFBO0FBQUEsWUFBQSxPQUFBLEdBQVUsVUFBVyxDQUFBLElBQUksQ0FBQyxJQUFMLENBQXJCLENBQUE7QUFDQSxZQUFBLElBQW1CLGVBQW5CO0FBQUEscUJBQU8sSUFBUCxDQUFBO2FBREE7QUFBQSxZQUVBLElBQUksQ0FBQyxNQUFMLEdBQWMsT0FBTyxDQUFDLE1BRnRCLENBQUE7QUFBQSxZQUdBLElBQUksQ0FBQyxLQUFMLEdBQWEsT0FBTyxDQUFDLEtBSHJCLENBQUE7QUFBQSxZQUlBLElBQUksQ0FBQyxRQUFMLENBQWMsSUFBZCxDQUpBLENBQUE7QUFLQSxtQkFBTyxJQUFQLENBTlE7VUFBQSxDQUFWLENBTkEsQ0FBQTtpQkFjQSxLQUFDLENBQUEsUUFBRCxDQUFVLEtBQVYsRUFmNkI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEvQixFQUZZO0lBQUEsQ0FwRGQsQ0FBQTs7QUFBQSwrQkF1RUEsV0FBQSxHQUFhLFNBQUMsT0FBRCxHQUFBO0FBQ1gsVUFBQSx5Q0FBQTtBQUFBLE1BQUEsSUFBRyxVQUFBLEdBQWEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLE9BQWpCLENBQWhCO0FBQStDLGVBQU8sVUFBUCxDQUEvQztPQUFBO0FBQUEsTUFDQSxJQUFBLEdBQU8sRUFBQSxDQUFHLFNBQUEsR0FBQTtlQUNSLElBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxVQUFBLE9BQUEsRUFBTyxXQUFQO1NBQUosRUFBd0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDdEIsWUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQU8scUJBQVA7YUFBTCxDQUFBLENBQUE7QUFBQSxZQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyxvQkFBQSxHQUF1QixPQUFPLENBQUMsSUFBdEM7YUFBTCxFQUFpRCxTQUFBLEdBQUE7cUJBQy9DLEtBQUMsQ0FBQSxJQUFELENBQU0sT0FBTyxDQUFDLEtBQWQsRUFEK0M7WUFBQSxDQUFqRCxDQURBLENBQUE7bUJBR0EsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGNBQUEsT0FBQSxFQUFPLHdCQUFQO2FBQUwsRUFBc0MsU0FBQSxHQUFBO3FCQUNwQyxLQUFDLENBQUEsSUFBRCxDQUFNLE9BQU8sQ0FBQyxJQUFkLEVBRG9DO1lBQUEsQ0FBdEMsRUFKc0I7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4QixFQURRO01BQUEsQ0FBSCxDQURQLENBQUE7QUFRQSxNQUFBLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDBCQUFoQixDQUFIO0FBQ0UsUUFBQSxjQUFBLEdBQWlCLElBQWpCLENBQUE7QUFBQSxRQUNBLE9BQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixVQUFBLGNBQUEsR0FBaUIsRUFBQSxDQUFHLFNBQUEsR0FBQTtBQUNsQixZQUFBLElBQUMsQ0FBQSxJQUFELENBQU8sSUFBQSxHQUFJLE9BQU8sQ0FBQyxNQUFaLEdBQW1CLEdBQTFCLENBQUEsQ0FBQTtBQUNBLFlBQUEsSUFBRyxPQUFPLENBQUMsS0FBWDtxQkFDRSxJQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsZ0JBQUEsT0FBQSxFQUFPLGdEQUFQO2VBQU4sRUFERjthQUZrQjtVQUFBLENBQUgsQ0FBakIsQ0FBQTtpQkFJQSxJQUFJLENBQUMsSUFBTCxDQUFVLGVBQVYsQ0FBMEIsQ0FBQyxNQUEzQixDQUFrQyxjQUFsQyxFQUxRO1FBQUEsQ0FEVixDQUFBO0FBUUEsUUFBQSxJQUFHLE9BQU8sQ0FBQyxVQUFSLENBQUEsQ0FBSDtBQUE2QixVQUFBLE9BQUEsQ0FBQSxDQUFBLENBQTdCO1NBUkE7QUFTQSxRQUFBLElBQUcsQ0FBQSxPQUFXLENBQUMsVUFBUixDQUFBLENBQUosSUFBNEIsT0FBTyxDQUFDLE9BQVIsQ0FBQSxDQUEvQjtBQUNFLFVBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsU0FBQSxHQUFBOztjQUNsQixjQUFjLENBQUUsTUFBaEIsQ0FBQTthQUFBO21CQUNBLE9BQUEsQ0FBQSxFQUZrQjtVQUFBLENBQXBCLENBQUEsQ0FERjtTQVZGO09BUkE7QUFBQSxNQXVCQSxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsT0FBakIsRUFBMEIsSUFBMUIsQ0F2QkEsQ0FBQTtBQXdCQSxhQUFPLElBQVAsQ0F6Qlc7SUFBQSxDQXZFYixDQUFBOzs0QkFBQTs7S0FENkIsZUFOL0IsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/git-projects/lib/views/projects-list-view.coffee
