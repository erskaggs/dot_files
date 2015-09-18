(function() {
  var path;

  path = require("path");

  module.exports = {
    repoForPath: function(goalPath) {
      var i, projectPath, _i, _len, _ref;
      _ref = atom.project.getPaths();
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        projectPath = _ref[i];
        if (goalPath === projectPath || goalPath.indexOf(projectPath + path.sep) === 0) {
          return atom.project.getRepositories()[i];
        }
      }
      return null;
    },
    relativizePath: function(goalPath) {
      var projectPath, _i, _len, _ref;
      _ref = atom.project.getPaths();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        projectPath = _ref[_i];
        if (goalPath === projectPath || goalPath.indexOf(projectPath + path.sep) === 0) {
          return [projectPath, path.relative(projectPath, goalPath)];
        }
      }
      return [null, goalPath];
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2Fuc2libGUtZ2FsYXh5L2xpYi9oZWxwZXJzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxJQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFdBQUEsRUFBYSxTQUFDLFFBQUQsR0FBQTtBQUNYLFVBQUEsOEJBQUE7QUFBQTtBQUFBLFdBQUEsbURBQUE7OEJBQUE7QUFDRSxRQUFBLElBQUcsUUFBQSxLQUFZLFdBQVosSUFBMkIsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsV0FBQSxHQUFjLElBQUksQ0FBQyxHQUFwQyxDQUFBLEtBQTRDLENBQTFFO0FBQ0UsaUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFiLENBQUEsQ0FBK0IsQ0FBQSxDQUFBLENBQXRDLENBREY7U0FERjtBQUFBLE9BQUE7YUFHQSxLQUpXO0lBQUEsQ0FBYjtBQUFBLElBTUEsY0FBQSxFQUFnQixTQUFDLFFBQUQsR0FBQTtBQUNkLFVBQUEsMkJBQUE7QUFBQTtBQUFBLFdBQUEsMkNBQUE7K0JBQUE7QUFDRSxRQUFBLElBQUcsUUFBQSxLQUFZLFdBQVosSUFBMkIsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsV0FBQSxHQUFjLElBQUksQ0FBQyxHQUFwQyxDQUFBLEtBQTRDLENBQTFFO0FBQ0UsaUJBQU8sQ0FBQyxXQUFELEVBQWMsSUFBSSxDQUFDLFFBQUwsQ0FBYyxXQUFkLEVBQTJCLFFBQTNCLENBQWQsQ0FBUCxDQURGO1NBREY7QUFBQSxPQUFBO2FBR0EsQ0FBQyxJQUFELEVBQU8sUUFBUCxFQUpjO0lBQUEsQ0FOaEI7R0FIRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/ansible-galaxy/lib/helpers.coffee
