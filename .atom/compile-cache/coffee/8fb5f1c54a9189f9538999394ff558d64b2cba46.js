(function() {
  var AnsibleSnippets;

  AnsibleSnippets = require('../lib/ansible-snippets');

  describe("AnsibleSnippets", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('ansible-snippets');
    });
    return describe("when the ansible-snippets:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.ansible-snippets')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'ansible-snippets:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var ansibleSnippetsElement, ansibleSnippetsPanel;
          expect(workspaceElement.querySelector('.ansible-snippets')).toExist();
          ansibleSnippetsElement = workspaceElement.querySelector('.ansible-snippets');
          expect(ansibleSnippetsElement).toExist();
          ansibleSnippetsPanel = atom.workspace.panelForItem(ansibleSnippetsElement);
          expect(ansibleSnippetsPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'ansible-snippets:toggle');
          return expect(ansibleSnippetsPanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.ansible-snippets')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'ansible-snippets:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var ansibleSnippetsElement;
          ansibleSnippetsElement = workspaceElement.querySelector('.ansible-snippets');
          expect(ansibleSnippetsElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'ansible-snippets:toggle');
          return expect(ansibleSnippetsElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2Fuc2libGUtc25pcHBldHMvc3BlYy9hbnNpYmxlLXNuaXBwZXRzLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGVBQUE7O0FBQUEsRUFBQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSx5QkFBUixDQUFsQixDQUFBOztBQUFBLEVBT0EsUUFBQSxDQUFTLGlCQUFULEVBQTRCLFNBQUEsR0FBQTtBQUMxQixRQUFBLHlDQUFBO0FBQUEsSUFBQSxPQUF3QyxFQUF4QyxFQUFDLDBCQUFELEVBQW1CLDJCQUFuQixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxnQkFBQSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQW5CLENBQUE7YUFDQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsa0JBQTlCLEVBRlg7SUFBQSxDQUFYLENBRkEsQ0FBQTtXQU1BLFFBQUEsQ0FBUyxxREFBVCxFQUFnRSxTQUFBLEdBQUE7QUFDOUQsTUFBQSxFQUFBLENBQUcsaUNBQUgsRUFBc0MsU0FBQSxHQUFBO0FBR3BDLFFBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLG1CQUEvQixDQUFQLENBQTJELENBQUMsR0FBRyxDQUFDLE9BQWhFLENBQUEsQ0FBQSxDQUFBO0FBQUEsUUFJQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLHlCQUF6QyxDQUpBLENBQUE7QUFBQSxRQU1BLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLGtCQURjO1FBQUEsQ0FBaEIsQ0FOQSxDQUFBO2VBU0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILGNBQUEsNENBQUE7QUFBQSxVQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixtQkFBL0IsQ0FBUCxDQUEyRCxDQUFDLE9BQTVELENBQUEsQ0FBQSxDQUFBO0FBQUEsVUFFQSxzQkFBQSxHQUF5QixnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixtQkFBL0IsQ0FGekIsQ0FBQTtBQUFBLFVBR0EsTUFBQSxDQUFPLHNCQUFQLENBQThCLENBQUMsT0FBL0IsQ0FBQSxDQUhBLENBQUE7QUFBQSxVQUtBLG9CQUFBLEdBQXVCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBZixDQUE0QixzQkFBNUIsQ0FMdkIsQ0FBQTtBQUFBLFVBTUEsTUFBQSxDQUFPLG9CQUFvQixDQUFDLFNBQXJCLENBQUEsQ0FBUCxDQUF3QyxDQUFDLElBQXpDLENBQThDLElBQTlDLENBTkEsQ0FBQTtBQUFBLFVBT0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5Qyx5QkFBekMsQ0FQQSxDQUFBO2lCQVFBLE1BQUEsQ0FBTyxvQkFBb0IsQ0FBQyxTQUFyQixDQUFBLENBQVAsQ0FBd0MsQ0FBQyxJQUF6QyxDQUE4QyxLQUE5QyxFQVRHO1FBQUEsQ0FBTCxFQVpvQztNQUFBLENBQXRDLENBQUEsQ0FBQTthQXVCQSxFQUFBLENBQUcsMEJBQUgsRUFBK0IsU0FBQSxHQUFBO0FBTzdCLFFBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsZ0JBQXBCLENBQUEsQ0FBQTtBQUFBLFFBRUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLG1CQUEvQixDQUFQLENBQTJELENBQUMsR0FBRyxDQUFDLE9BQWhFLENBQUEsQ0FGQSxDQUFBO0FBQUEsUUFNQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLHlCQUF6QyxDQU5BLENBQUE7QUFBQSxRQVFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLGtCQURjO1FBQUEsQ0FBaEIsQ0FSQSxDQUFBO2VBV0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUVILGNBQUEsc0JBQUE7QUFBQSxVQUFBLHNCQUFBLEdBQXlCLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLG1CQUEvQixDQUF6QixDQUFBO0FBQUEsVUFDQSxNQUFBLENBQU8sc0JBQVAsQ0FBOEIsQ0FBQyxXQUEvQixDQUFBLENBREEsQ0FBQTtBQUFBLFVBRUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5Qyx5QkFBekMsQ0FGQSxDQUFBO2lCQUdBLE1BQUEsQ0FBTyxzQkFBUCxDQUE4QixDQUFDLEdBQUcsQ0FBQyxXQUFuQyxDQUFBLEVBTEc7UUFBQSxDQUFMLEVBbEI2QjtNQUFBLENBQS9CLEVBeEI4RDtJQUFBLENBQWhFLEVBUDBCO0VBQUEsQ0FBNUIsQ0FQQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/ansible-snippets/spec/ansible-snippets-spec.coffee
