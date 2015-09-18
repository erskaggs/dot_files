(function() {
  var Path, git, pathToRepoFile, pathToSubmoduleFile;

  git = require('../lib/git');

  Path = require('flavored-path');

  pathToRepoFile = Path.get("~/.atom/packages/git-plus/lib/git.coffee");

  pathToSubmoduleFile = Path.get("~/.atom/packages/git-plus/spec/foo/foo.txt");

  describe("Git-Plus git module", function() {
    describe("git.getRepo", function() {
      return it("returns a promise", function() {
        return waitsForPromise(function() {
          return git.getRepo().then(function(repo) {
            return expect(repo.getWorkingDirectory()).toContain('git-plus');
          });
        });
      });
    });
    describe("git.dir", function() {
      return it("returns a promise", function() {
        return waitsForPromise(function() {
          return git.dir().then(function(dir) {
            return expect(dir).toContain('git-plus');
          });
        });
      });
    });
    return describe("git.getSubmodule", function() {
      it("returns undefined when there is no submodule", function() {
        return expect(git.getSubmodule(pathToRepoFile)).toBe(void 0);
      });
      return it("returns a submodule when given file is in a submodule of a project repo", function() {
        return expect(git.getSubmodule(pathToSubmoduleFile)).toBeTruthy();
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL3NwZWMvZ2l0LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhDQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxZQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsZUFBUixDQURQLENBQUE7O0FBQUEsRUFHQSxjQUFBLEdBQWlCLElBQUksQ0FBQyxHQUFMLENBQVMsMENBQVQsQ0FIakIsQ0FBQTs7QUFBQSxFQUlBLG1CQUFBLEdBQXNCLElBQUksQ0FBQyxHQUFMLENBQVMsNENBQVQsQ0FKdEIsQ0FBQTs7QUFBQSxFQU1BLFFBQUEsQ0FBUyxxQkFBVCxFQUFnQyxTQUFBLEdBQUE7QUFDOUIsSUFBQSxRQUFBLENBQVMsYUFBVCxFQUF3QixTQUFBLEdBQUE7YUFDdEIsRUFBQSxDQUFHLG1CQUFILEVBQXdCLFNBQUEsR0FBQTtlQUN0QixlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxHQUFHLENBQUMsT0FBSixDQUFBLENBQWEsQ0FBQyxJQUFkLENBQW1CLFNBQUMsSUFBRCxHQUFBO21CQUNqQixNQUFBLENBQU8sSUFBSSxDQUFDLG1CQUFMLENBQUEsQ0FBUCxDQUFrQyxDQUFDLFNBQW5DLENBQTZDLFVBQTdDLEVBRGlCO1VBQUEsQ0FBbkIsRUFEYztRQUFBLENBQWhCLEVBRHNCO01BQUEsQ0FBeEIsRUFEc0I7SUFBQSxDQUF4QixDQUFBLENBQUE7QUFBQSxJQU1BLFFBQUEsQ0FBUyxTQUFULEVBQW9CLFNBQUEsR0FBQTthQUNsQixFQUFBLENBQUcsbUJBQUgsRUFBd0IsU0FBQSxHQUFBO2VBQ3RCLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLEdBQUcsQ0FBQyxHQUFKLENBQUEsQ0FBUyxDQUFDLElBQVYsQ0FBZSxTQUFDLEdBQUQsR0FBQTttQkFDYixNQUFBLENBQU8sR0FBUCxDQUFXLENBQUMsU0FBWixDQUFzQixVQUF0QixFQURhO1VBQUEsQ0FBZixFQURjO1FBQUEsQ0FBaEIsRUFEc0I7TUFBQSxDQUF4QixFQURrQjtJQUFBLENBQXBCLENBTkEsQ0FBQTtXQVlBLFFBQUEsQ0FBUyxrQkFBVCxFQUE2QixTQUFBLEdBQUE7QUFDM0IsTUFBQSxFQUFBLENBQUcsOENBQUgsRUFBbUQsU0FBQSxHQUFBO2VBQ2pELE1BQUEsQ0FBTyxHQUFHLENBQUMsWUFBSixDQUFpQixjQUFqQixDQUFQLENBQXdDLENBQUMsSUFBekMsQ0FBOEMsTUFBOUMsRUFEaUQ7TUFBQSxDQUFuRCxDQUFBLENBQUE7YUFHQSxFQUFBLENBQUcseUVBQUgsRUFBOEUsU0FBQSxHQUFBO2VBQzVFLE1BQUEsQ0FBTyxHQUFHLENBQUMsWUFBSixDQUFpQixtQkFBakIsQ0FBUCxDQUE2QyxDQUFDLFVBQTlDLENBQUEsRUFENEU7TUFBQSxDQUE5RSxFQUoyQjtJQUFBLENBQTdCLEVBYjhCO0VBQUEsQ0FBaEMsQ0FOQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/spec/git-spec.coffee
