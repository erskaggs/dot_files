(function() {
  var AnsibleGalaxy;

  AnsibleGalaxy = require('../lib/ansible-galaxy');

  describe("AnsibleGalaxy", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('ansible-galaxy');
    });
    return describe("when the ansible-galaxy:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.ansible-galaxy')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'ansible-galaxy:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var ansibleGalaxyElement, ansibleGalaxyPanel;
          expect(workspaceElement.querySelector('.ansible-galaxy')).toExist();
          ansibleGalaxyElement = workspaceElement.querySelector('.ansible-galaxy');
          expect(ansibleGalaxyElement).toExist();
          ansibleGalaxyPanel = atom.workspace.panelForItem(ansibleGalaxyElement);
          expect(ansibleGalaxyPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'ansible-galaxy:toggle');
          return expect(ansibleGalaxyPanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.ansible-galaxy')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'ansible-galaxy:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var ansibleGalaxyElement;
          ansibleGalaxyElement = workspaceElement.querySelector('.ansible-galaxy');
          expect(ansibleGalaxyElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'ansible-galaxy:toggle');
          return expect(ansibleGalaxyElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2Fuc2libGUtZ2FsYXh5L3NwZWMvYW5zaWJsZS1nYWxheHktc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsYUFBQTs7QUFBQSxFQUFBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLHVCQUFSLENBQWhCLENBQUE7O0FBQUEsRUFPQSxRQUFBLENBQVMsZUFBVCxFQUEwQixTQUFBLEdBQUE7QUFDeEIsUUFBQSx5Q0FBQTtBQUFBLElBQUEsT0FBd0MsRUFBeEMsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLGdCQUE5QixFQUZYO0lBQUEsQ0FBWCxDQUZBLENBQUE7V0FNQSxRQUFBLENBQVMsbURBQVQsRUFBOEQsU0FBQSxHQUFBO0FBQzVELE1BQUEsRUFBQSxDQUFHLGlDQUFILEVBQXNDLFNBQUEsR0FBQTtBQUdwQyxRQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixpQkFBL0IsQ0FBUCxDQUF5RCxDQUFDLEdBQUcsQ0FBQyxPQUE5RCxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBSUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5Qyx1QkFBekMsQ0FKQSxDQUFBO0FBQUEsUUFNQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBTkEsQ0FBQTtlQVNBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxjQUFBLHdDQUFBO0FBQUEsVUFBQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsaUJBQS9CLENBQVAsQ0FBeUQsQ0FBQyxPQUExRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFVBRUEsb0JBQUEsR0FBdUIsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsaUJBQS9CLENBRnZCLENBQUE7QUFBQSxVQUdBLE1BQUEsQ0FBTyxvQkFBUCxDQUE0QixDQUFDLE9BQTdCLENBQUEsQ0FIQSxDQUFBO0FBQUEsVUFLQSxrQkFBQSxHQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsb0JBQTVCLENBTHJCLENBQUE7QUFBQSxVQU1BLE1BQUEsQ0FBTyxrQkFBa0IsQ0FBQyxTQUFuQixDQUFBLENBQVAsQ0FBc0MsQ0FBQyxJQUF2QyxDQUE0QyxJQUE1QyxDQU5BLENBQUE7QUFBQSxVQU9BLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsdUJBQXpDLENBUEEsQ0FBQTtpQkFRQSxNQUFBLENBQU8sa0JBQWtCLENBQUMsU0FBbkIsQ0FBQSxDQUFQLENBQXNDLENBQUMsSUFBdkMsQ0FBNEMsS0FBNUMsRUFURztRQUFBLENBQUwsRUFab0M7TUFBQSxDQUF0QyxDQUFBLENBQUE7YUF1QkEsRUFBQSxDQUFHLDBCQUFILEVBQStCLFNBQUEsR0FBQTtBQU83QixRQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLGdCQUFwQixDQUFBLENBQUE7QUFBQSxRQUVBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixpQkFBL0IsQ0FBUCxDQUF5RCxDQUFDLEdBQUcsQ0FBQyxPQUE5RCxDQUFBLENBRkEsQ0FBQTtBQUFBLFFBTUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5Qyx1QkFBekMsQ0FOQSxDQUFBO0FBQUEsUUFRQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBUkEsQ0FBQTtlQVdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFFSCxjQUFBLG9CQUFBO0FBQUEsVUFBQSxvQkFBQSxHQUF1QixnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixpQkFBL0IsQ0FBdkIsQ0FBQTtBQUFBLFVBQ0EsTUFBQSxDQUFPLG9CQUFQLENBQTRCLENBQUMsV0FBN0IsQ0FBQSxDQURBLENBQUE7QUFBQSxVQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsdUJBQXpDLENBRkEsQ0FBQTtpQkFHQSxNQUFBLENBQU8sb0JBQVAsQ0FBNEIsQ0FBQyxHQUFHLENBQUMsV0FBakMsQ0FBQSxFQUxHO1FBQUEsQ0FBTCxFQWxCNkI7TUFBQSxDQUEvQixFQXhCNEQ7SUFBQSxDQUE5RCxFQVB3QjtFQUFBLENBQTFCLENBUEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/ansible-galaxy/spec/ansible-galaxy-spec.coffee
