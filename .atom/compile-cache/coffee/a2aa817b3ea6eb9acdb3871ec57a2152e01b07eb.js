(function() {
  var CSON, Project, ProjectDeserialized, ReadGitInfoTask, Task, TaskPool, fs, git, _path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  git = require('git-utils');

  _path = require('path');

  CSON = require('season');

  fs = require('fs');

  Task = require('atom').Task;

  ReadGitInfoTask = require.resolve('../read-git-info-task');

  TaskPool = require('../task-pool');

  Project = (function() {
    Project.prototype._stale = false;

    Project.prototype.setStale = function(value) {
      return this._stale = value;
    };

    Project.prototype.isStale = function() {
      return this._stale;
    };

    Project.prototype.dirty = null;

    Project.prototype.branch = null;

    Project.deserialize = function(instance) {
      return new ProjectDeserialized(instance);
    };

    function Project(path) {
      this.path = path;
      this.icon = "icon-repo";
      this.ignored = false;
      this.title = _path.basename(this.path);
      this.readConfigFile();
    }

    Project.prototype.readGitInfo = function(cb) {
      var task;
      task = new Task(ReadGitInfoTask);
      return TaskPool.add(task, this.path, (function(_this) {
        return function(data) {
          _this.branch = data.branch;
          _this.dirty = data.dirty;
          return cb();
        };
      })(this));
    };

    Project.prototype.hasGitInfo = function() {
      return (this.branch != null) && (this.dirty != null);
    };

    Project.prototype.readConfigFile = function() {
      var data, filepath;
      filepath = this.path + _path.sep + ".git-project";
      if (fs.existsSync(filepath)) {
        data = CSON.readFileSync(filepath);
        if (data != null) {
          if (data['title'] != null) {
            this.title = data['title'];
          }
          if (data['ignore'] != null) {
            this.ignored = data['ignore'];
          }
          if (data['icon'] != null) {
            return this.icon = data['icon'];
          }
        }
      }
    };

    return Project;

  })();

  ProjectDeserialized = (function(_super) {
    __extends(ProjectDeserialized, _super);

    function ProjectDeserialized(instance) {
      this.path = instance.path;
      this.icon = instance.icon;
      this.ignored = instance.ignored;
      this.title = instance.title;
      this.dirty = instance.dirty;
      this.branch = instance.branch;
    }

    return ProjectDeserialized;

  })(Project);

  module.exports = Project;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wcm9qZWN0cy9saWIvbW9kZWxzL3Byb2plY3QuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1GQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFdBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0EsS0FBQSxHQUFRLE9BQUEsQ0FBUSxNQUFSLENBRFIsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FITCxDQUFBOztBQUFBLEVBS0MsT0FBUSxPQUFBLENBQVEsTUFBUixFQUFSLElBTEQsQ0FBQTs7QUFBQSxFQU1BLGVBQUEsR0FBa0IsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsdUJBQWhCLENBTmxCLENBQUE7O0FBQUEsRUFPQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGNBQVIsQ0FQWCxDQUFBOztBQUFBLEVBU007QUFFSixzQkFBQSxNQUFBLEdBQVEsS0FBUixDQUFBOztBQUFBLHNCQUNBLFFBQUEsR0FBVSxTQUFDLEtBQUQsR0FBQTthQUFXLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFBckI7SUFBQSxDQURWLENBQUE7O0FBQUEsc0JBRUEsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxPQUFKO0lBQUEsQ0FGVCxDQUFBOztBQUFBLHNCQUtBLEtBQUEsR0FBTyxJQUxQLENBQUE7O0FBQUEsc0JBTUEsTUFBQSxHQUFRLElBTlIsQ0FBQTs7QUFBQSxJQVFBLE9BQUMsQ0FBQSxXQUFELEdBQWMsU0FBQyxRQUFELEdBQUE7YUFDUixJQUFBLG1CQUFBLENBQW9CLFFBQXBCLEVBRFE7SUFBQSxDQVJkLENBQUE7O0FB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

//# sourceURL=/Users/erskaggs/.atom/packages/git-projects/lib/models/project.coffee
