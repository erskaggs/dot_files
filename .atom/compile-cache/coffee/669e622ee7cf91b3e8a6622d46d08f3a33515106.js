(function() {
  var Dialog, GalaxyDialog, fs, path, relativizePath, repoForPath, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  path = require('path');

  fs = require('fs-plus');

  Dialog = require('./dialog');

  _ref = require('./helpers'), repoForPath = _ref.repoForPath, relativizePath = _ref.relativizePath;

  module.exports = GalaxyDialog = (function(_super) {
    __extends(GalaxyDialog, _super);

    function GalaxyDialog(initialPath) {
      var directoryPath, relativeDirectoryPath, _ref1;
      if (fs.isFileSync(initialPath)) {
        directoryPath = path.dirname(initialPath);
      } else {
        directoryPath = initialPath;
      }
      relativeDirectoryPath = directoryPath;
      _ref1 = relativizePath(directoryPath), this.rootProjectPath = _ref1[0], relativeDirectoryPath = _ref1[1];
      if (relativeDirectoryPath.length > 0) {
        relativeDirectoryPath += path.sep;
      }
      GalaxyDialog.__super__.constructor.call(this, {
        prompt: "Enter the path for the new ansible-galaxy role.",
        initialPath: relativeDirectoryPath,
        select: false,
        iconClass: 'icon-file-directory-create'
      });
    }

    GalaxyDialog.prototype.onConfirm = function(newPath) {
      var endsWithDirectorySeparator;
      newPath = newPath.replace(/\s+$/, '');
      endsWithDirectorySeparator = newPath[newPath.length - 1] === path.sep;
      if (!path.isAbsolute(newPath)) {
        if (this.rootProjectPath == null) {
          this.showError("You must open a directory to create a file with a relative path");
          return;
        }
        newPath = path.join(this.rootProjectPath, newPath);
      }
      if (!newPath) {
        return;
      }
      this.trigger('directory-chosen', [newPath]);
      return this.cancel();
    };

    return GalaxyDialog;

  })(Dialog);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2Fuc2libGUtZ2FsYXh5L2xpYi9nYWxheHktZGlhbG9nLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxpRUFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQURMLENBQUE7O0FBQUEsRUFFQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVIsQ0FGVCxDQUFBOztBQUFBLEVBR0EsT0FBZ0MsT0FBQSxDQUFRLFdBQVIsQ0FBaEMsRUFBQyxtQkFBQSxXQUFELEVBQWMsc0JBQUEsY0FIZCxDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLG1DQUFBLENBQUE7O0FBQWEsSUFBQSxzQkFBQyxXQUFELEdBQUE7QUFDWCxVQUFBLDJDQUFBO0FBQUEsTUFBQSxJQUFHLEVBQUUsQ0FBQyxVQUFILENBQWMsV0FBZCxDQUFIO0FBQ0UsUUFBQSxhQUFBLEdBQWdCLElBQUksQ0FBQyxPQUFMLENBQWEsV0FBYixDQUFoQixDQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsYUFBQSxHQUFnQixXQUFoQixDQUhGO09BQUE7QUFBQSxNQUtBLHFCQUFBLEdBQXdCLGFBTHhCLENBQUE7QUFBQSxNQU1BLFFBQTRDLGNBQUEsQ0FBZSxhQUFmLENBQTVDLEVBQUMsSUFBQyxDQUFBLDBCQUFGLEVBQW1CLGdDQU5uQixDQUFBO0FBT0EsTUFBQSxJQUFxQyxxQkFBcUIsQ0FBQyxNQUF0QixHQUErQixDQUFwRTtBQUFBLFFBQUEscUJBQUEsSUFBeUIsSUFBSSxDQUFDLEdBQTlCLENBQUE7T0FQQTtBQUFBLE1BU0EsOENBQ0U7QUFBQSxRQUFBLE1BQUEsRUFBUSxpREFBUjtBQUFBLFFBQ0EsV0FBQSxFQUFhLHFCQURiO0FBQUEsUUFFQSxNQUFBLEVBQVEsS0FGUjtBQUFBLFFBR0EsU0FBQSxFQUFXLDRCQUhYO09BREYsQ0FUQSxDQURXO0lBQUEsQ0FBYjs7QUFBQSwyQkFnQkEsU0FBQSxHQUFXLFNBQUMsT0FBRCxHQUFBO0FBQ1QsVUFBQSwwQkFBQTtBQUFBLE1BQUEsT0FBQSxHQUFVLE9BQU8sQ0FBQyxPQUFSLENBQWdCLE1BQWhCLEVBQXdCLEVBQXhCLENBQVYsQ0FBQTtBQUFBLE1BQ0EsMEJBQUEsR0FBNkIsT0FBUSxDQUFBLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLENBQWpCLENBQVIsS0FBK0IsSUFBSSxDQUFDLEdBRGpFLENBQUE7QUFFQSxNQUFBLElBQUEsQ0FBQSxJQUFXLENBQUMsVUFBTCxDQUFnQixPQUFoQixDQUFQO0FBQ0UsUUFBQSxJQUFPLDRCQUFQO0FBQ0UsVUFBQSxJQUFDLENBQUEsU0FBRCxDQUFXLGlFQUFYLENBQUEsQ0FBQTtBQUNBLGdCQUFBLENBRkY7U0FBQTtBQUFBLFFBSUEsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBQyxDQUFBLGVBQVgsRUFBNEIsT0FBNUIsQ0FKVixDQURGO09BRkE7QUFTQSxNQUFBLElBQUEsQ0FBQSxPQUFBO0FBQUEsY0FBQSxDQUFBO09BVEE7QUFBQSxNQVdBLElBQUMsQ0FBQSxPQUFELENBQVMsa0JBQVQsRUFBNkIsQ0FBQyxPQUFELENBQTdCLENBWEEsQ0FBQTthQVlBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFiUztJQUFBLENBaEJYLENBQUE7O3dCQUFBOztLQUR5QixPQU4zQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/ansible-galaxy/lib/galaxy-dialog.coffee
