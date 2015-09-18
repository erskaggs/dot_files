(function() {
  var $, GitProjects, fs, path, utils, workspaceElement;

  $ = require('atom-space-pen-views').$;

  GitProjects = require('../lib/git-projects');

  utils = require('../lib/utils');

  workspaceElement = null;

  fs = require('fs');

  path = require('path');

  describe("GitProjects", function() {
    beforeEach(function() {
      var waitsForPromise;
      workspaceElement = atom.views.getView(atom.workspace);
      return waitsForPromise = atom.packages.activatePackage('git-projects');
    });
    describe("when the git-projects:toggle event is triggered", function() {
      return it("Toggles the view containing the list of projects", function() {
        atom.commands.dispatch(workspaceElement, 'git-projects:toggle');
        expect($(workspaceElement).find('.git-projects')).toExist();
        return setTimeout(function() {
          atom.commands.dispatch(workspaceElement, 'git-projects:toggle');
          return expect($(workspaceElement).find('.git-projects')).not.toExist();
        }, 0);
      });
    });
    return describe("findGitRepos", function() {
      it("should return an array", function() {
        var asserts;
        asserts = 0;
        runs(function() {
          GitProjects.findGitRepos(null, function(repos) {
            expect(repos).toBeArray;
            return asserts++;
          });
          return GitProjects.findGitRepos("~/workspace/;~/workspace; ~/workspace/fake", function(repos) {
            expect(repos).toBeArray;
            return asserts++;
          });
        });
        return waitsFor(function() {
          return asserts === 2;
        });
      });
      it("should not contain any of the ignored patterns", function() {
        var done;
        done = false;
        runs(function() {
          return GitProjects.findGitRepos("~/workspace/;~/workspace; ~/workspace/fake", function(projects) {
            projects.forEach(function(project) {
              return expect(project.path).not.toMatch(/node_modules|\.git/g);
            });
            return done = true;
          });
        });
        return waitsFor(function() {
          return done;
        });
      });
      return it("should not contain any of the ignored paths", function() {
        var done;
        done = false;
        runs(function() {
          return GitProjects.findGitRepos("~/workspace/;~/workspace; ~/workspace/fake", function(projects) {
            projects.forEach(function(project) {
              return expect(project.path).not.toMatch(/\/workspace\/www/g);
            });
            return done = true;
          });
        });
        return waitsFor(function() {
          return done;
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wcm9qZWN0cy9zcGVjL2dpdC1wcm9qZWN0cy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxpREFBQTs7QUFBQSxFQUFDLElBQUssT0FBQSxDQUFRLHNCQUFSLEVBQUwsQ0FBRCxDQUFBOztBQUFBLEVBQ0EsV0FBQSxHQUFjLE9BQUEsQ0FBUSxxQkFBUixDQURkLENBQUE7O0FBQUEsRUFFQSxLQUFBLEdBQVEsT0FBQSxDQUFRLGNBQVIsQ0FGUixDQUFBOztBQUFBLEVBR0EsZ0JBQUEsR0FBbUIsSUFIbkIsQ0FBQTs7QUFBQSxFQUlBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUpMLENBQUE7O0FBQUEsRUFLQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FMUCxDQUFBOztBQUFBLEVBT0EsUUFBQSxDQUFTLGFBQVQsRUFBd0IsU0FBQSxHQUFBO0FBRXRCLElBQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULFVBQUEsZUFBQTtBQUFBLE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsZUFBQSxHQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsY0FBOUIsRUFGVDtJQUFBLENBQVgsQ0FBQSxDQUFBO0FBQUEsSUFJQSxRQUFBLENBQVMsaURBQVQsRUFBNEQsU0FBQSxHQUFBO2FBQzFELEVBQUEsQ0FBRyxrREFBSCxFQUF1RCxTQUFBLEdBQUE7QUFDckQsUUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLHFCQUF6QyxDQUFBLENBQUE7QUFBQSxRQUNBLE1BQUEsQ0FBTyxDQUFBLENBQUUsZ0JB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

//# sourceURL=/Users/erskaggs/.atom/packages/git-projects/spec/git-projects-spec.coffee
