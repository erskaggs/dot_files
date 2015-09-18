(function() {
  module.exports = {
    title: 'Git-Plus',
    addInfo: function(message, _arg) {
      var dismissable;
      dismissable = (_arg != null ? _arg : {}).dismissable;
      return atom.notifications.addInfo(this.title, {
        detail: message,
        dismissable: dismissable
      });
    },
    addSuccess: function(message, _arg) {
      var dismissable;
      dismissable = (_arg != null ? _arg : {}).dismissable;
      return atom.notifications.addSuccess(this.title, {
        detail: message,
        dismissable: dismissable
      });
    },
    addError: function(message, _arg) {
      var dismissable;
      dismissable = (_arg != null ? _arg : {}).dismissable;
      return atom.notifications.addError(this.title, {
        detail: message,
        dismissable: dismissable
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9ub3RpZmllci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsS0FBQSxFQUFPLFVBQVA7QUFBQSxJQUNBLE9BQUEsRUFBUyxTQUFDLE9BQUQsRUFBVSxJQUFWLEdBQUE7QUFDUCxVQUFBLFdBQUE7QUFBQSxNQURrQiw4QkFBRCxPQUFjLElBQWIsV0FDbEIsQ0FBQTthQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsSUFBQyxDQUFBLEtBQTVCLEVBQW1DO0FBQUEsUUFBQSxNQUFBLEVBQVEsT0FBUjtBQUFBLFFBQWlCLFdBQUEsRUFBYSxXQUE5QjtPQUFuQyxFQURPO0lBQUEsQ0FEVDtBQUFBLElBR0EsVUFBQSxFQUFZLFNBQUMsT0FBRCxFQUFVLElBQVYsR0FBQTtBQUNWLFVBQUEsV0FBQTtBQUFBLE1BRHFCLDhCQUFELE9BQWMsSUFBYixXQUNyQixDQUFBO2FBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFuQixDQUE4QixJQUFDLENBQUEsS0FBL0IsRUFBc0M7QUFBQSxRQUFBLE1BQUEsRUFBUSxPQUFSO0FBQUEsUUFBaUIsV0FBQSxFQUFhLFdBQTlCO09BQXRDLEVBRFU7SUFBQSxDQUhaO0FBQUEsSUFLQSxRQUFBLEVBQVUsU0FBQyxPQUFELEVBQVUsSUFBVixHQUFBO0FBQ1IsVUFBQSxXQUFBO0FBQUEsTUFEbUIsOEJBQUQsT0FBYyxJQUFiLFdBQ25CLENBQUE7YUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQW5CLENBQTRCLElBQUMsQ0FBQSxLQUE3QixFQUFvQztBQUFBLFFBQUEsTUFBQSxFQUFRLE9BQVI7QUFBQSxRQUFpQixXQUFBLEVBQWEsV0FBOUI7T0FBcEMsRUFEUTtJQUFBLENBTFY7R0FERixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/notifier.coffee
