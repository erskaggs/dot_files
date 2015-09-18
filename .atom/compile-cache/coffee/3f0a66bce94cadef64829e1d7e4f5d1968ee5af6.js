(function() {
  var ActionSelectListView, ClipboardListView, match,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  match = require('fuzzaldrin').match;

  ActionSelectListView = require('@aki77/atom-select-action');

  module.exports = ClipboardListView = (function(_super) {
    __extends(ClipboardListView, _super);

    ClipboardListView.prototype.panelClass = 'clipboard-plus';

    function ClipboardListView(clipboardItems) {
      this.clipboardItems = clipboardItems;
      this.contentForItem = __bind(this.contentForItem, this);
      this.remove = __bind(this.remove, this);
      this.paste = __bind(this.paste, this);
      this.getItems = __bind(this.getItems, this);
      ClipboardListView.__super__.constructor.call(this, {
        items: this.getItems,
        filterKey: 'text',
        actions: [
          {
            name: 'Paste',
            callback: this.paste
          }, {
            name: 'Remove',
            callback: this.remove
          }
        ]
      });
      this.registerPasteAction(this.defaultPasteAction);
    }

    ClipboardListView.prototype.getItems = function() {
      return this.clipboardItems.entries().reverse();
    };

    ClipboardListView.prototype.paste = function(item) {
      var editor;
      this.clipboardItems["delete"](item);
      atom.clipboard.write(item.text, item.metadata);
      editor = atom.workspace.getActiveTextEditor();
      return this.pasteAction(editor, item);
    };

    ClipboardListView.prototype.remove = function(item) {
      return this.clipboardItems["delete"](item);
    };

    ClipboardListView.prototype.registerPasteAction = function(fn) {
      return this.pasteAction = fn;
    };

    ClipboardListView.prototype.defaultPasteAction = function(editor, item) {
      return editor.pasteText();
    };

    ClipboardListView.prototype.contentForItem = function(_arg, filterQuery) {
      var matches, text, truncateText;
      text = _arg.text;
      matches = match(text, filterQuery);
      truncateText = this.truncateText;
      return function(_arg1) {
        var highlighter;
        highlighter = _arg1.highlighter;
        return this.li((function(_this) {
          return function() {
            return _this.div(function() {
              return _this.pre(function() {
                return highlighter(truncateText(text), matches, 0);
              });
            });
          };
        })(this));
      };
    };

    ClipboardListView.prototype.truncateText = function(text) {
      var maximumLinesNumber, newText;
      maximumLinesNumber = atom.config.get('clipboard-plus.maximumLinesNumber');
      if (maximumLinesNumber === 0) {
        return text;
      }
      if (text.split("\n").length <= maximumLinesNumber) {
        return text;
      }
      newText = text.split("\n").slice(0, maximumLinesNumber).join("\n");
      return "" + newText + "[...]";
    };

    return ClipboardListView;

  })(ActionSelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2NsaXBib2FyZC1wbHVzL2xpYi9jbGlwYm9hcmQtbGlzdC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw4Q0FBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFDLFFBQVMsT0FBQSxDQUFRLFlBQVIsRUFBVCxLQUFELENBQUE7O0FBQUEsRUFDQSxvQkFBQSxHQUF1QixPQUFBLENBQVEsMkJBQVIsQ0FEdkIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSix3Q0FBQSxDQUFBOztBQUFBLGdDQUFBLFVBQUEsR0FBWSxnQkFBWixDQUFBOztBQUVhLElBQUEsMkJBQUUsY0FBRixHQUFBO0FBQ1gsTUFEWSxJQUFDLENBQUEsaUJBQUEsY0FDYixDQUFBO0FBQUEsNkRBQUEsQ0FBQTtBQUFBLDZDQUFBLENBQUE7QUFBQSwyQ0FBQSxDQUFBO0FBQUEsaURBQUEsQ0FBQTtBQUFBLE1BQUEsbURBQU07QUFBQSxRQUNKLEtBQUEsRUFBTyxJQUFDLENBQUEsUUFESjtBQUFBLFFBRUosU0FBQSxFQUFXLE1BRlA7QUFBQSxRQUdKLE9BQUEsRUFBUztVQUNQO0FBQUEsWUFDRSxJQUFBLEVBQU0sT0FEUjtBQUFBLFlBRUUsUUFBQSxFQUFVLElBQUMsQ0FBQSxLQUZiO1dBRE8sRUFLUDtBQUFBLFlBQ0UsSUFBQSxFQUFNLFFBRFI7QUFBQSxZQUVFLFFBQUEsRUFBVSxJQUFDLENBQUEsTUFGYjtXQUxPO1NBSEw7T0FBTixDQUFBLENBQUE7QUFBQSxNQWVBLElBQUMsQ0FBQSxtQkFBRCxDQUFxQixJQUFDLENBQUEsa0JBQXRCLENBZkEsQ0FEVztJQUFBLENBRmI7O0FBQUEsZ0NBb0JBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsY0FBYyxD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

//# sourceURL=/Users/erskaggs/.atom/packages/clipboard-plus/lib/clipboard-list-view.coffee
