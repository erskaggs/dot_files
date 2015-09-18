(function() {
  var AnsibleSnippets, AnsibleSnippetsView, CompositeDisposable;

  AnsibleSnippetsView = require('./ansible-snippets-view');

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = AnsibleSnippets = {
    ansibleSnippetsView: null,
    modalPanel: null,
    subscriptions: null,
    activate: function(state) {
      this.ansibleSnippetsView = new AnsibleSnippetsView(state.ansibleSnippetsViewState);
      this.modalPanel = atom.workspace.addModalPanel({
        item: this.ansibleSnippetsView.getElement(),
        visible: false
      });
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'ansible-snippets:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
    },
    deactivate: function() {
      this.modalPanel.destroy();
      this.subscriptions.dispose();
      return this.ansibleSnippetsView.destroy();
    },
    serialize: function() {
      return {
        ansibleSnippetsViewState: this.ansibleSnippetsView.serialize()
      };
    },
    toggle: function() {
      console.log('AnsibleSnippets was toggled!');
      if (this.modalPanel.isVisible()) {
        return this.modalPanel.hide();
      } else {
        return this.modalPanel.show();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2Fuc2libGUtc25pcHBldHMvbGliL2Fuc2libGUtc25pcHBldHMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlEQUFBOztBQUFBLEVBQUEsbUJBQUEsR0FBc0IsT0FBQSxDQUFRLHlCQUFSLENBQXRCLENBQUE7O0FBQUEsRUFDQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBREQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGVBQUEsR0FDZjtBQUFBLElBQUEsbUJBQUEsRUFBcUIsSUFBckI7QUFBQSxJQUNBLFVBQUEsRUFBWSxJQURaO0FBQUEsSUFFQSxhQUFBLEVBQWUsSUFGZjtBQUFBLElBSUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsbUJBQUQsR0FBMkIsSUFBQSxtQkFBQSxDQUFvQixLQUFLLENBQUMsd0JBQTFCLENBQTNCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxVQUFELEdBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQTZCO0FBQUEsUUFBQSxJQUFBLEVBQU0sSUFBQyxDQUFBLG1CQUFtQixDQUFDLFVBQXJCLENBQUEsQ0FBTjtBQUFBLFFBQXlDLE9BQUEsRUFBUyxLQUFsRDtPQUE3QixDQURkLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFKakIsQ0FBQTthQU9BLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DO0FBQUEsUUFBQSx5QkFBQSxFQUEyQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsTUFBRCxDQUFBLEVBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEzQjtPQUFwQyxDQUFuQixFQVJRO0lBQUEsQ0FKVjtBQUFBLElBY0EsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxPQUFaLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsYUFBYSxDQUFDLE9BQWYsQ0FBQSxDQURBLENBQUE7YUFFQSxJQUFDLENBQUEsbUJBQW1CLENBQUMsT0FBckIsQ0FBQSxFQUhVO0lBQUEsQ0FkWjtBQUFBLElBbUJBLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFDVDtBQUFBLFFBQUEsd0JBQUEsRUFBMEIsSUFBQyxDQUFBLG1CQUFtQixDQUFDLFNBQXJCLENBQUEsQ0FBMUI7UUFEUztJQUFBLENBbkJYO0FBQUEsSUFzQkEsTUFBQSxFQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSw4QkFBWixDQUFBLENBQUE7QUFFQSxNQUFBLElBQUcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxTQUFaLENBQUEsQ0FBSDtlQUNFLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFBLEVBREY7T0FBQSxNQUFBO2VBR0UsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQUEsRUFIRjtPQUhNO0lBQUEsQ0F0QlI7R0FKRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/ansible-snippets/lib/ansible-snippets.coffee
