(function() {
  var GalaxyDialog;

  GalaxyDialog = null;

  module.exports = {
    config: {
      ansiblePath: {
        type: 'string',
        "default": '/usr/local/bin/'
      }
    },
    activate: function() {
      console.log("ansible-galaxy activated");
      return atom.commands.add('atom-workspace', 'ansible-galaxy:init', (function(_this) {
        return function() {
          return _this.init();
        };
      })(this));
    },
    init: function() {
      return atom.packages.activatePackage('tree-view').then(function(treeViewPackage) {
        var dialog, selectedPath, treeView;
        treeView = treeViewPackage.mainModule.treeView;
        selectedPath = treeView.selectedPath;
        console.log("selectPath:" + selectedPath);
        if (GalaxyDialog == null) {
          GalaxyDialog = require('./galaxy-dialog');
        }
        dialog = new GalaxyDialog(selectedPath);
        dialog.on('directory-chosen', function(event, chosenPath) {
          var child, exec;
          console.log("directory chosen", chosenPath);
          exec = require('child_process').exec;
          child = exec(atom.config.get('ansible-galaxy').ansiblePath + 'ansible-galaxy init' + ' ' + chosenPath, {}, function(error, stdout, stderr) {
            console.log("stdout: " + stdout);
            console.log("stderr: " + stderr);
            if (error !== null) {
              console.log("exec error: " + error);
            }
          });
          return false;
        });
        return dialog.attach();
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2Fuc2libGUtZ2FsYXh5L2xpYi9hbnNpYmxlLWdhbGF4eS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsWUFBQTs7QUFBQSxFQUFBLFlBQUEsR0FBZSxJQUFmLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUVFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLFdBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxpQkFEVDtPQURGO0tBREY7QUFBQSxJQUtBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksMEJBQVosQ0FBQSxDQUFBO2FBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGdCQUFsQixFQUNFLHFCQURGLEVBRUUsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsSUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUZGLEVBRlE7SUFBQSxDQUxWO0FBQUEsSUFXQSxJQUFBLEVBQU0sU0FBQSxHQUFBO2FBQ0osSUFDRSxDQUFDLFFBQ0QsQ0FBQyxlQUZILENBRW1CLFdBRm5CLENBR0UsQ0FBQyxJQUhILENBR1EsU0FBQyxlQUFELEdBQUE7QUFDSixZQUFBLDhCQUFBO0FBQUEsUUFBQSxRQUFBLEdBQVcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxRQUF0QyxDQUFBO0FBQUEsUUFDQSxZQUFBLEdBQWUsUUFBUSxDQUFDLFlBRHhCLENBQUE7QUFBQSxRQUVBLE9BQU8sQ0FBQyxHQUFSLENBQVksYUFBQSxHQUFnQixZQUE1QixDQUZBLENBQUE7O1VBSUEsZUFBZ0IsT0FBQSxDQUFRLGlCQUFSO1NBSmhCO0FBQUEsUUFLQSxNQUFBLEdBQWEsSUFBQSxZQUFBLENBQWEsWUFBYixDQUxiLENBQUE7QUFBQSxRQU9BLE1BQU0sQ0FBQyxFQUFQLENBQVUsa0JBQVYsRUFBOEIsU0FBQyxLQUFELEVBQVEsVUFBUixHQUFBO0FBQzVCLGNBQUEsV0FBQTtBQUFBLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxVQUFoQyxDQUFBLENBQUE7QUFBQSxVQUdBLElBQUEsR0FBTyxPQUFBLENBQVEsZUFBUixDQUF3QixDQUFDLElBSGhDLENBQUE7QUFBQSxVQUtBLEtBQUEsR0FBUSxJQUFBLENBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGdCQUFoQixDQUFpQyxDQUFDLFdBQWxDLEdBQWdELHFCQUFoRCxHQUF3RSxHQUF4RSxHQUE4RSxVQUFuRixFQUErRixFQUEvRixFQUFtRyxTQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLE1BQWhCLEdBQUE7QUFDckcsWUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFVBQUEsR0FBYSxNQUF6QixDQUFBLENBQUE7QUFBQSxZQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBQSxHQUFhLE1BQXpCLENBREEsQ0FBQTtBQUVBLFlBQUEsSUFBdUMsS0FBQSxLQUFXLElBQWxEO0FBQUEsY0FBQSxPQUFPLENBQUMsR0FBUixDQUFZLGNBQUEsR0FBaUIsS0FBN0IsQ0FBQSxDQUFBO2FBSHFHO1VBQUEsQ0FBbkcsQ0FMUixDQUFBO2lCQVlBLE1BYjRCO1FBQUEsQ0FBOUIsQ0FQQSxDQUFBO2VBc0JBLE1BQU0sQ0FBQyxNQUFQLENBQUEsRUF2Qkk7TUFBQSxDQUhSLEVBREk7SUFBQSxDQVhOO0dBSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/ansible-galaxy/lib/ansible-galaxy.coffee
