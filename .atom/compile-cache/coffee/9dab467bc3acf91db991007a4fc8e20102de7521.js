(function() {
  describe("ClipboardPlus", function() {
    var clipboardPlus, editor, editorElement, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], editor = _ref[1], editorElement = _ref[2], clipboardPlus = _ref[3];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      jasmine.attachToDOM(workspaceElement);
      waitsForPromise(function() {
        return atom.packages.activatePackage('clipboard-plus').then(function(pack) {
          return clipboardPlus = pack.mainModule;
        });
      });
      return waitsForPromise(function() {
        return atom.workspace.open().then(function(_editor) {
          editor = _editor;
          return editorElement = atom.views.getView(editor);
        });
      });
    });
    describe("when the clipboard-plus:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        var clipboardPlusPanel;
        expect(workspaceElement.querySelector('.clipboard-plus')).not.toExist();
        atom.commands.dispatch(editorElement, 'clipboard-plus:toggle');
        expect(workspaceElement.querySelector('.clipboard-plus')).toExist();
        clipboardPlusPanel = atom.workspace.getModalPanels()[0];
        expect(clipboardPlusPanel.isVisible()).toBe(true);
        atom.commands.dispatch(editorElement, 'clipboard-plus:toggle');
        return expect(clipboardPlusPanel.isVisible()).toBe(false);
      });
      return it("hides and shows the view", function() {
        var clipboardPlusElement;
        expect(workspaceElement.querySelector('.clipboard-plus')).not.toExist();
        atom.commands.dispatch(editorElement, 'clipboard-plus:toggle');
        clipboardPlusElement = workspaceElement.querySelector('.clipboard-plus');
        expect(clipboardPlusElement).toBeVisible();
        atom.commands.dispatch(editorElement, 'clipboard-plus:toggle');
        return expect(clipboardPlusElement).not.toBeVisible();
      });
    });
    return describe('provide', function() {
      var clipboardItems, clipboardListView, service, _ref1;
      _ref1 = [], clipboardListView = _ref1[0], clipboardItems = _ref1[1], service = _ref1[2];
      beforeEach(function() {
        clipboardItems = clipboardPlus.clipboardItems;
        return service = clipboardPlus.provide();
      });
      return it('registerPasteAction', function() {
        service.registerPasteAction(function(_editor, item) {
          var text;
          text = "hello " + item.text;
          return _editor.insertText(text);
        });
        expect(editor.getText()).toBe('');
        atom.clipboard.write('world');
        atom.commands.dispatch(editorElement, 'clipboard-plus:toggle');
        clipboardListView = atom.workspace.getModalPanels()[0].getItem();
        clipboardListView.confirmed(clipboardItems.get(0));
        return expect(editor.getText()).toBe('hello world');
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2NsaXBib2FyZC1wbHVzL3NwZWMvY2xpcGJvYXJkLXBsdXMtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFLQTtBQUFBLEVBQUEsUUFBQSxDQUFTLGVBQVQsRUFBMEIsU0FBQSxHQUFBO0FBQ3hCLFFBQUEsNERBQUE7QUFBQSxJQUFBLE9BQTJELEVBQTNELEVBQUMsMEJBQUQsRUFBbUIsZ0JBQW5CLEVBQTJCLHVCQUEzQixFQUEwQyx1QkFBMUMsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO0FBQUEsTUFDQSxPQUFPLENBQUMsV0FBUixDQUFvQixnQkFBcEIsQ0FEQSxDQUFBO0FBQUEsTUFHQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixnQkFBOUIsQ0FBK0MsQ0FBQyxJQUFoRCxDQUFxRCxTQUFDLElBQUQsR0FBQTtpQkFDbkQsYUFBQSxHQUFnQixJQUFJLENBQUMsV0FEOEI7UUFBQSxDQUFyRCxFQURjO01BQUEsQ0FBaEIsQ0FIQSxDQUFBO2FBT0EsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBQSxDQUFxQixDQUFDLElBQXRCLENBQTJCLFNBQUMsT0FBRCxHQUFBO0FBQ3pCLFVBQUEsTUFBQSxHQUFTLE9BQVQsQ0FBQTtpQkFDQSxhQUFBLEdBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixNQUFuQixFQUZTO1FBQUEsQ0FBM0IsRUFEYztNQUFBLENBQWhCLEVBUlM7SUFBQSxDQUFYLENB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

//# sourceURL=/Users/erskaggs/.atom/packages/clipboard-plus/spec/clipboard-plus-spec.coffee
