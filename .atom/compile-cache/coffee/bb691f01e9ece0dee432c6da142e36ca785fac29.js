(function() {
  module.exports = {
    activate: function() {
      atom.config.set('vim-mode.useClipboardAsDefaultRegister', true);
      return this.installPackageDependencies();
    },
    deactivate: function() {},
    consumeClipboardPlus: function(_arg) {
      var registerPasteAction;
      registerPasteAction = _arg.registerPasteAction;
      return registerPasteAction(function(editor, item) {
        var editorElement;
        editorElement = atom.views.getView(editor);
        return atom.commands.dispatch(editorElement, 'vim-mode:put-after');
      });
    },
    installPackageDependencies: function() {
      var message, notification;
      if (atom.packages.getLoadedPackage('clipboard-plus')) {
        return;
      }
      message = 'vim-mode-clipboard-plus: Some dependencies not found. Running "apm install" on these for you. Please wait for a success confirmation!';
      notification = atom.notifications.addInfo(message, {
        dismissable: true
      });
      return require('atom-package-dependencies').install(function() {
        atom.notifications.addSuccess('vim-mode-clipboard-plus: Dependencies installed correctly.', {
          dismissable: true
        });
        notification.dismiss();
        return atom.packages.activatePackage('clipboard-plus');
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3ZpbS1tb2RlLWNsaXBib2FyZC1wbHVzL2xpYi9tYWluLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isd0NBQWhCLEVBQTBELElBQTFELENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSwwQkFBRCxDQUFBLEVBRlE7SUFBQSxDQUFWO0FBQUEsSUFJQSxVQUFBLEVBQVksU0FBQSxHQUFBLENBSlo7QUFBQSxJQU1BLG9CQUFBLEVBQXNCLFNBQUMsSUFBRCxHQUFBO0FBQ3BCLFVBQUEsbUJBQUE7QUFBQSxNQURzQixzQkFBRCxLQUFDLG1CQUN0QixDQUFBO2FBQUEsbUJBQUEsQ0FBb0IsU0FBQyxNQUFELEVBQVMsSUFBVCxHQUFBO0FBQ2xCLFlBQUEsYUFBQTtBQUFBLFFBQUEsYUFBQSxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsTUFBbkIsQ0FBaEIsQ0FBQTtlQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixhQUF2QixFQUFzQyxvQkFBdEMsRUFGa0I7TUFBQSxDQUFwQixFQURvQjtJQUFBLENBTnRCO0FBQUEsSUFZQSwwQkFBQSxFQUE0QixTQUFBLEdBQUE7QUFDMUIsVUFBQSxxQkFBQTtBQUFBLE1BQUEsSUFBVSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFkLENBQStCLGdCQUEvQixDQUFWO0FBQUEsY0FBQSxDQUFBO09BQUE7QUFBQSxNQUNBLE9BQUEsR0FBVSx1SUFEVixDQUFBO0FBQUEsTUFFQSxZQUFBLEdBQWUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixPQUEzQixFQUFvQztBQUFBLFFBQUUsV0FBQSxFQUFhLElBQWY7T0FBcEMsQ0FGZixDQUFBO2FBR0EsT0FBQSxDQUFRLDJCQUFSLENBQW9DLENBQUMsT0FBckMsQ0FBNkMsU0FBQSxHQUFBO0FBQzNDLFFBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFuQixDQUE4Qiw0REFBOUIsRUFBNEY7QUFBQSxVQUFBLFdBQUEsRUFBYSxJQUFiO1NBQTVGLENBQUEsQ0FBQTtBQUFBLFFBQ0EsWUFBWSxDQUFDLE9BQWIsQ0FBQSxDQURBLENBQUE7ZUFFQSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsZ0JBQTlCLEVBSDJDO01BQUEsQ0FBN0MsRUFKMEI7SUFBQSxDQVo1QjtHQURGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/erskaggs/.atom/packages/vim-mode-clipboard-plus/lib/main.coffee
