(function() {
  var OpenGitModifiedFiles;

  OpenGitModifiedFiles = require('../lib/open-git-modified-files');

  describe("OpenGitModifiedFiles", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('open-git-modified-files');
    });
    return describe("when the open-git-modified-files:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.open-git-modified-files')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'open-git-modified-files:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var openGitModifiedFilesElement, openGitModifiedFilesPanel;
          expect(workspaceElement.querySelector('.open-git-modified-files')).toExist();
          openGitModifiedFilesElement = workspaceElement.querySelector('.open-git-modified-files');
          expect(openGitModifiedFilesElement).toExist();
          openGitModifiedFilesPanel = atom.workspace.panelForItem(openGitModifiedFilesElement);
          expect(openGitModifiedFilesPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'open-git-modified-files:toggle');
          return expect(openGitModifiedFilesPanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.open-git-modified-files')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'open-git-modified-files:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var openGitModifiedFilesElement;
          openGitModifiedFilesElement = workspaceElement.querySelector('.open-git-modified-files');
          expect(openGitModifiedFilesElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'open-git-modified-files:toggle');
          return expect(openGitModifiedFilesElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL29wZW4tZ2l0LW1vZGlmaWVkLWZpbGVzL3NwZWMvb3Blbi1naXQtbW9kaWZpZWQtZmlsZXMtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsb0JBQUE7O0FBQUEsRUFBQSxvQkFBQSxHQUF1QixPQUFBLENBQVEsZ0NBQVIsQ0FBdkIsQ0FBQTs7QUFBQSxFQU9BLFFBQUEsQ0FBUyxzQkFBVCxFQUFpQyxTQUFBLEdBQUE7QUFDL0IsUUFBQSx5Q0FBQTtBQUFBLElBQUEsT0FBd0MsRUFBeEMsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLHlCQUE5QixFQUZYO0lBQUEsQ0FBWCxDQUZBLENBQUE7V0FNQSxRQUFBLENBQVMsNERBQVQsRUFBdUUsU0FBQSxHQUFBO0FBQ3JFLE1BQUEsRUFBQSxDQUFHLGlDQUFILEVBQXNDLFNBQUEsR0FBQTtBQUdwQyxRQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQiwwQkFBL0IsQ0FBUCxDQUFrRSxDQUFDLEdBQUcsQ0FBQyxPQUF2RSxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBSUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QyxnQ0FBekMsQ0FKQSxDQUFBO0FBQUEsUUFNQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBTkEsQ0FBQTtlQVNBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxjQUFBLHNEQUFBO0FBQUEsVUFBQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsMEJBQS9CLENBQVAsQ0FBa0UsQ0FBQyxPQUFuRSxDQUFBLENBQUEsQ0FBQTtBQUFBLFVBRUEsMkJBQUEsR0FBOEIsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsMEJBQS9CLENBRjlCLENBQUE7QUFBQSxVQUdBLE1BQUEsQ0FBTywyQkFBUCxDQUFtQyxDQUFDLE9BQXBDLENBQUEsQ0FIQSxDQUFBO0FBQUEsVUFLQSx5QkFBQSxHQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsMkJBQTVCLENBTDVCLENBQUE7QUFBQSxVQU1BLE1BQUEsQ0FBTyx5QkFBeUIsQ0FBQyxTQUExQixDQUFBLENBQVAsQ0FBNkMsQ0FBQyxJQUE5QyxDQUFtRCxJQUFuRCxDQU5BLENBQUE7QUFBQSxVQU9BLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsZ0NBQXpDLENBUEEsQ0FBQTtpQkFRQSxNQUFBLENBQU8seUJBQXlCLENBQUMsU0FBMUIsQ0FBQSxDQUFQLENBQTZDLENBQUMsSUFBOUMsQ0FBbUQsS0FBbkQsRUFURztRQUFBLENBQUwsRUFab0M7TUFBQSxDQUF0QyxDQUFBLENBQUE7YUF1QkEsRUFBQSxDQUFHLDBCQUFILEVBQStCLFNBQUEsR0FBQTtBQU83QixRQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLGdCQUFwQixDQUFBLENBQUE7QUFBQSxRQUVBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQiwwQkFBL0IsQ0FBUCxDQUFrRSxDQUFDLEdBQUcsQ0FBQyxPQUF2RSxDQUFBLENBRkEsQ0FBQTtBQUFBLFFBTUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QyxnQ0FBekMsQ0FOQSxDQUFBO0FBQUEsUUFRQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBUkEsQ0FBQTtlQVdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFFSCxjQUFBLDJCQUFBO0FBQUEsVUFBQSwyQkFBQSxHQUE4QixnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQiwwQkFBL0IsQ0FBOUIsQ0FBQTtBQUFBLFVBQ0EsTUFBQSxDQUFPLDJCQUFQLENBQW1DLENBQUMsV0FBcEMsQ0FBQSxDQURBLENBQUE7QUFBQSxVQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsZ0NBQXpDLENBRkEsQ0FBQTtpQkFHQSxNQUFBLENBQU8sMkJBQVAsQ0FBbUMsQ0FBQyxHQUFHLENBQUMsV0FBeEMsQ0FBQSxFQUxHO1FBQUEsQ0FBTCxFQWxCNkI7TUFBQSxDQUEvQixFQXhCcUU7SUFBQSxDQUF2RSxFQVArQjtFQUFBLENBQWpDLENBUEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/open-git-modified-files/spec/open-git-modified-files-spec.coffee
