(function() {
  var FindGitReposTask, Project, ProjectsListView, Task, fs, path, utils;

  fs = require('fs-plus');

  path = require('path');

  Task = require('atom').Task;

  utils = null;

  Project = null;

  ProjectsListView = null;

  FindGitReposTask = null;

  module.exports = {
    config: {
      rootPath: {
        title: "Root paths",
        description: "Paths to folders containing Git repositories, separated by semicolons.",
        type: "string",
        "default": fs.absolute(fs.getHomeDirectory() + ("" + path.sep + "repos"))
      },
      ignoredPath: {
        title: "Ignored paths",
        description: "Paths to folders that should be ignored, separated by semicolons.",
        type: "string",
        "default": ""
      },
      ignoredPatterns: {
        title: "Ignored patterns",
        description: "Patterns that should be ignored (e.g.: node_modules), separated by semicolons.",
        type: "string",
        "default": "node_modules;\\.git"
      },
      sortBy: {
        title: "Sort by",
        type: "string",
        "default": "Project name",
        "enum": ["Project name", "Latest modification date", "Size"]
      },
      maxDepth: {
        title: "Max Folder Depth",
        type: 'integer',
        "default": 5,
        minimum: 1
      },
      openInDevMode: {
        title: "Open in development mode",
        type: "boolean",
        "default": false
      },
      notificationsEnabled: {
        title: "Notifications enabled",
        type: "boolean",
        "default": true
      },
      showGitInfo: {
        title: "Show repositories status",
        description: "Display the branch and a status icon in the list of projects",
        type: "boolean",
        "default": true
      }
    },
    projects: null,
    view: null,
    activate: function(state) {
      var filter, map;
      if (state.projectsCache != null) {
        if (utils == null) {
          utils = require('./utils');
        }
        if (Project == null) {
          Project = require('./models/project');
        }
        filter = function(project) {
          return utils.isRepositorySync(project.path);
        };
        map = function(project) {
          return Project.deserialize(project);
        };
        this.projects = state.projectsCache.filter(filter).map(map);
      }
      return atom.commands.add('atom-workspace', {
        'git-projects:toggle': (function(_this) {
          return function() {
            return _this.createView().toggle(_this);
          };
        })(this)
      });
    },
    serialize: function() {
      return {
        projectsCache: this.projects
      };
    },
    openProject: function(project) {
      var options;
      return atom.open(options = {
        pathsToOpen: [project.path],
        devMode: atom.config.get('git-projects.openInDevMode')
      });
    },
    createView: function() {
      if (ProjectsListView == null) {
        ProjectsListView = require('./views/projects-list-view');
      }
      return this.view != null ? this.view : this.view = new ProjectsListView();
    },
    findGitRepos: function(root, cb) {
      var config, rootPaths, task;
      if (root == null) {
        root = atom.config.get('git-projects.rootPath');
      }
      if (utils == null) {
        utils = require('./utils');
      }
      if (Project == null) {
        Project = require('./models/project');
      }
      if (FindGitReposTask == null) {
        FindGitReposTask = require.resolve('./find-git-repos-task');
      }
      rootPaths = utils.parsePathString(root);
      if (rootPaths == null) {
        return cb(this.projects);
      }
      config = {
        maxDepth: atom.config.get('git-projects.maxDepth'),
        sortBy: atom.config.get('git-projects.sortBy'),
        ignoredPath: atom.config.get('git-projects.ignoredPath'),
        ignoredPatterns: atom.config.get('git-projects.ignoredPatterns')
      };
      task = Task.once(FindGitReposTask, root, config, (function(_this) {
        return function() {
          return cb(_this.projects);
        };
      })(this));
      return task.on('found-repos', (function(_this) {
        return function(data) {
          return _this.projects = data.map(function(project) {
            return Project.deserialize(project);
          });
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wcm9qZWN0cy9saWIvZ2l0LXByb2plY3RzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxrRUFBQTs7QUFBQSxFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUFMLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FEUCxDQUFBOztBQUFBLEVBRUMsT0FBUSxPQUFBLENBQVEsTUFBUixFQUFSLElBRkQsQ0FBQTs7QUFBQSxFQUtBLEtBQUEsR0FBUSxJQUxSLENBQUE7O0FBQUEsRUFNQSxPQUFBLEdBQVUsSUFOVixDQUFBOztBQUFBLEVBT0EsZ0JBQUEsR0FBbUIsSUFQbkIsQ0FBQTs7QUFBQSxFQVFBLGdCQUFBLEdBQW1CLElBUm5CLENBQUE7O0FBQUEsRUFVQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLFFBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLFlBQVA7QUFBQSxRQUNBLFdBQUEsRUFBYSx3RUFEYjtBQUFBLFFBRUEsSUFBQSxFQUFNLFFBRk47QUFBQSxRQUdBLFNBQUEsRUFBUyxFQUFFLENBQUMsUUFBSCxDQUFZLEVBQUUsQ0FBQyxnQkFBSCxDQUFBLENBQUEsR0FBd0IsQ0FBQSxFQUFBLEdBQUcsSUFBSSxDQUFDLEdBQVIsR0FBWSxPQUFaLENBQXBDLENBSFQ7T0FERjtBQUFBLE1BS0EsV0FBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sZUFBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLG1FQURiO0FBQUEsUUFFQSxJQUFBLEVBQU0sUUFGTjtBQUFBLFFBR0EsU0FBQSxFQUFTLEVBSFQ7T0FORjtBQUFBLE1BVUEsZUFBQSxFQUNFO0FBQUEsUUFBQSxLQUFB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

//# sourceURL=/Users/erskaggs/.atom/packages/git-projects/lib/git-projects.coffee
