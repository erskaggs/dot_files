(function() {
  var ClipboardItems, ClipboardListView, CompositeDisposable;

  CompositeDisposable = require('atom').CompositeDisposable;

  ClipboardListView = null;

  ClipboardItems = require('./clipboard-items');

  module.exports = {
    subscription: null,
    clipboardListView: null,
    config: {
      limit: {
        order: 1,
        description: 'limit of the history count',
        type: 'integer',
        "default": 50,
        minimum: 2,
        maximum: 500
      },
      unique: {
        order: 2,
        description: 'remove duplicate',
        type: 'boolean',
        "default": true
      },
      minimumTextLength: {
        order: 3,
        type: 'integer',
        "default": 3,
        minimum: 1,
        maximum: 10
      },
      maximumTextLength: {
        order: 4,
        type: 'integer',
        "default": 1000,
        minimum: 10,
        maximum: 5000
      },
      maximumLinesNumber: {
        order: 5,
        type: 'integer',
        "default": 5,
        minimum: 0,
        maximum: 20,
        description: 'Max number of lines displayed per history.If zero (disabled), don\'t truncate candidate, show all.'
      }
    },
    activate: function(state) {
      this.clipboardItems = new ClipboardItems(state.clipboardItemsState);
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-text-editor', {
        'clipboard-plus:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this),
        'clipboard-plus:clear': (function(_this) {
          return function() {
            return _this.clipboardItems.clear();
          };
        })(this)
      }));
      return this.subscriptions.add(atom.config.onDidChange('clipboard-plus.useSimpleView', (function(_this) {
        return function() {
          return _this.destroyView();
        };
      })(this)));
    },
    deactivate: function() {
      var _ref, _ref1;
      if ((_ref = this.subscriptions) != null) {
        _ref.dispose();
      }
      this.subscriptions = null;
      if ((_ref1 = this.clipboardItems) != null) {
        _ref1.destroy();
      }
      this.clipboardItems = null;
      return this.destroyView();
    },
    serialize: function() {
      return {
        clipboardItemsState: this.clipboardItems.serialize()
      };
    },
    toggle: function() {
      return this.getView().toggle();
    },
    provide: function() {
      var view;
      view = this.getView();
      return {
        registerPasteAction: view.registerPasteAction.bind(view)
      };
    },
    getView: function() {
      if (ClipboardListView == null) {
        ClipboardListView = require('./clipboard-list-view');
      }
      return this.clipboardListView != null ? this.clipboardListView : this.clipboardListView = new ClipboardListView(this.clipboardItems);
    },
    destroyView: function() {
      var _ref;
      if ((_ref = this.clipboardListView) != null) {
        _ref.destroy();
      }
      return this.clipboardListView = null;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2NsaXBib2FyZC1wbHVzL2xpYi9tYWluLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxzREFBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBQ0EsaUJBQUEsR0FBb0IsSUFEcEIsQ0FBQTs7QUFBQSxFQUVBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG1CQUFSLENBRmpCLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxZQUFBLEVBQWMsSUFBZDtBQUFBLElBQ0EsaUJBQUEsRUFBbUIsSUFEbkI7QUFBQSxJQUdBLE1BQUEsRUFDRTtBQUFBLE1BQUEsS0FBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sQ0FBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLDRCQURiO0FBQUEsUUFFQSxJQUFBLEVBQU0sU0FGTjtBQUFBLFFBR0EsU0FBQSxFQUFTLEVBSFQ7QUFBQSxRQUlBLE9BQUEsRUFBUyxDQUpUO0FBQUEsUUFLQSxPQUFBLEVBQVMsR0FMVDtPQURGO0FBQUEsTUFPQSxNQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxDQUFQO0FBQUEsUUFDQSxXQUFBLEVBQWEsa0JBRGI7QUFBQSxRQUVBLElBQUEsRUFBTSxTQUZOO0FBQUEsUUFHQSxTQUFBLEVBQVMsSUFIVDtPQVJGO0FBQUEsTUFZQSxpQkFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sQ0FBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxDQUZUO0FBQUEsUUFHQSxPQUFBLEVBQVMsQ0FIVDtBQUFBLFFBSUEsT0FBQSxFQUFTLEVBSlQ7T0FiRjtBQUFBLE1Ba0JBLGlCQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxDQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sU0FETjtBQUFBLFFBRUEsU0FBQSxFQUFTLElBRlQ7QUFBQSxRQUdBLE9BQUEsRUFBUyxFQUhUO0FBQUEsUUFJQSxPQUFBLEVBQVMsSUFKVDtPQW5CRjtBQUFBLE1Bd0JBLGtCQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxDQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sU0FETjtBQUFBLFFBRUEsU0FBQSxFQUFTLENBRlQ7QUFBQSxRQUdBLE9BQUEsRUFBUyxDQUhUO0FBQUEsUUFJQSxPQUFBLEVBQVMsRUFKVDtBQUFBLFFBS0EsV0FBQSxFQUFhLG9HQUxiO09BekJGO0tBSkY7QUFBQSxJQW9DQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxjQUFELEdBQXNCLElBQUEsY0FBQSxDQUFlLEtBQUssQ0FBQyxtQkFBckIsQ0FBdEIsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUZqQixDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFkLENBQWtCLGtCQUFsQixFQUNqQjtBQUFBLFFBQUEsdUJBQUEsRUFBeUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7bUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBekI7QUFBQSxRQUNBLHNCQUFBLEVBQXdCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxjQUFjLENBQUMsS0FBaEIsQ0FBQSxFQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FEeEI7T0FEaUIsQ0FBbkIsQ0FIQSxDQUFBO2FBT0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBWixDQUF3Qiw4QkFBeEIsRUFBd0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDekUsS0FBQyxDQUFBLFdBQUQsQ0FBQSxFQUR5RTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhELENBQW5CLEVBUlE7SUFBQSxDQXBDVjtBQUFBLElBZ0RBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixVQUFBLFdBQUE7O1lBQWMsQ0FBRSxPQUFoQixDQUFBO09BQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBRGpCLENBQUE7O2FBRWUsQ0FBRSxPQUFqQixDQUFBO09BRkE7QUFBQSxNQUdBLElBQUMsQ0FBQSxjQUFELEdBQWtCLElBSGxCLENBQUE7YUFJQSxJQUFDLENBQUEsV0FBRCxDQUFBLEVBTFU7SUFBQSxDQWhEWjtBQUFBLElBdURBLFNBQUEsRUFBVyxTQUFBLEdBQUE7YUFDVDtBQUFBLFFBQUEsbUJBQUEsRUFBcUIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxTQUFoQixDQUFBLENBQXJCO1FBRFM7SUFBQSxDQXZEWDtBQUFBLElBMERBLE1BQUEsRUFBUSxTQUFBLEdBQUE7YUFDTixJQUFDLENBQUEsT0FBRCxDQUFBLENBQVUsQ0FBQyxNQUFYLENBQUEsRUFETTtJQUFBLENBMURSO0FBQUEsSUE2REEsT0FBQSxFQUFTLFNBQUEsR0FBQTtBQUNQLFVBQUEsSUFBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FBUCxDQUFBO2FBQ0E7QUFBQSxRQUNFLG1CQUFBLEVBQXFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUF6QixDQUE4QixJQUE5QixDQUR2QjtRQUZPO0lBQUEsQ0E3RFQ7QUFBQSxJQW1FQSxPQUFBLEVBQVMsU0FBQSxHQUFBOztRQUNQLG9CQUFxQixPQUFBLENBQVEsdUJBQVI7T0FBckI7OENBQ0EsSUFBQyxDQUFBLG9CQUFELElBQUMsQ0FBQSxvQkFBeUIsSUFBQSxpQkFBQSxDQUFrQixJQUFDLENBQUEsY0FBbkIsRUFGbkI7SUFBQSxDQW5FVDtBQUFBLElBdUVBLFdBQUEsRUFBYSxTQUFBLEdBQUE7QUFDWCxVQUFBLElBQUE7O1lBQWtCLENBQUUsT0FBcEIsQ0FBQTtPQUFBO2FBQ0EsSUFBQyxDQUFBLGlCQUFELEdBQXFCLEtBRlY7SUFBQSxDQXZFYjtHQUxGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/erskaggs/.atom/packages/clipboard-plus/lib/main.coffee
