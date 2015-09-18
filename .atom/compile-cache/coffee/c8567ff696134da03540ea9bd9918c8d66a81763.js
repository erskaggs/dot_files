(function() {
  var Base, Delete, Selector, compositedisposable,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  compositedisposable = require('atom').compositedisposable;

  Base = require('./base');

  Selector = require('./selector');

  module.exports = Delete = (function(_super) {
    __extends(Delete, _super);

    function Delete(config) {
      this.command = config.deleteSurroundCommand;
      this.context = "atom-text-editor.vim-mode.normal-mode";
      Delete.__super__.constructor.call(this, config);
    }

    Delete.prototype.getName = function(key) {
      return "delete-" + key;
    };

    Delete.prototype.getRunner = function(left, right) {
      return function() {
        var editor, selector;
        editor = atom.workspace.getActiveTextEditor();
        selector = new Selector(editor, left, right);
        return editor.transact(function() {
          var cursorPos;
          cursorPos = editor.getCursorBufferPosition();
          selector.inside().select();
          editor.selections.forEach(function(selection) {
            var text;
            text = selection.getText();
            editor.setCursorBufferPosition(cursorPos);
            selector.outside().select();
            return editor.selections.forEach(function(selection) {
              return selection.insertText(text);
            });
          });
          return editor.setCursorBufferPosition(cursorPos);
        });
      };
    };

    return Delete;

  })(Base);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3ZpbS1zdXJyb3VuZC9saWIvY29tbWFuZC9kZWxldGUuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFlBQVIsQ0FIWCxDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FBdUI7QUFDckIsNkJBQUEsQ0FBQTs7QUFBYSxJQUFBLGdCQUFDLE1BQUQsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxNQUFNLENBQUMscUJBQWxCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsdUNBRFgsQ0FBQTtBQUFBLE1BRUEsd0NBQU0sTUFBTixDQUZBLENBRFc7SUFBQSxDQUFiOztBQUFBLHFCQUtBLE9BQUEsR0FBUyxTQUFDLEdBQUQsR0FBQTthQUFVLFNBQUEsR0FBUyxJQUFuQjtJQUFBLENBTFQsQ0FBQTs7QUFBQSxxQkFPQSxTQUFBLEdBQVcsU0FBQyxJQUFELEVBQU8sS0FBUCxHQUFBO2FBQWlCLFNBQUEsR0FBQTtBQUMxQixZQUFBLGdCQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBLENBQVQsQ0FBQTtBQUFBLFFBQ0EsUUFBQSxHQUFlLElBQUEsUUFBQSxDQUFTLE1BQVQsRUFBaUIsSUFBakIsRUFBdUIsS0FBdkIsQ0FEZixDQUFBO2VBR0EsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsU0FBQSxHQUFBO0FBQ2QsY0FBQSxTQUFBO0FBQUEsVUFBQSxTQUFBLEdBQVksTUFBTSxDQUFDLHVCQUFQLENBQUEsQ0FBWixDQUFBO0FBQUEsVUFFQSxRQUFRLENBQUMsTUFBVCxDQUFBLENBQWlCLENBQUMsTUFBbEIsQ0FBQSxDQUZBLENBQUE7QUFBQSxVQUdBLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBbEIsQ0FBMEIsU0FBQyxTQUFELEdBQUE7QUFDeEIsZ0JBQUEsSUFBQTtBQUFBLFlBQUEsSUFBQSxHQUFPLFNBQVMsQ0FBQyxPQUFWLENBQUEsQ0FBUCxDQUFBO0FBQUEsWUFHQSxNQUFNLENBQUMsdUJBQVAsQ0FBK0IsU0FBL0IsQ0FIQSxDQUFBO0FBQUEsWUFJQSxRQUFRLENBQUMsT0FBVCxDQUFBLENBQWtCLENBQUMsTUFBbkIsQ0FBQSxDQUpBLENBQUE7bUJBTUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFsQixDQUEwQixTQUFDLFNBQUQsR0FBQTtxQkFDeEIsU0FBUyxDQUFDLFVBQVYsQ0FBcUIsSUFBckIsRUFEd0I7WUFBQSxDQUExQixFQVB3QjtVQUFBLENBQTFCLENBSEEsQ0FBQTtpQkFjQSxNQUFNLENBQUMsdUJBQVAsQ0FBK0IsU0FBL0IsRUFmYztRQUFBLENBQWhCLEVBSjBCO01BQUEsRUFBakI7SUFBQSxDQVBYLENBQUE7O2tCQUFBOztLQURvQyxLQUx0QyxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/vim-surround/lib/command/delete.coffee
