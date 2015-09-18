(function() {
  var Base, CompositeDisposable, Surround,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  Base = require('./base');

  module.exports = Surround = (function(_super) {
    __extends(Surround, _super);

    function Surround(config) {
      this.command = config.surroundCommand;
      this.context = "atom-text-editor.vim-mode.visual-mode";
      Surround.__super__.constructor.call(this, config);
    }

    Surround.prototype.getName = function(key) {
      return "surround-" + key;
    };

    Surround.prototype.getRunner = function(left, right) {
      return function() {
        var editor;
        editor = atom.workspace.getActiveTextEditor();
        return editor.transact(function() {
          return editor.selections.forEach(function(selection) {
            var text;
            text = selection.getText();
            return selection.insertText("" + left + text + right);
          });
        });
      };
    };

    return Surround;

  })(Base);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3ZpbS1zdXJyb3VuZC9saWIvY29tbWFuZC9zdXJyb3VuZC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsbUNBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxRQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0FBQ3JCLCtCQUFBLENBQUE7O0FBQWEsSUFBQSxrQkFBQyxNQUFELEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQSxPQUFELEdBQVcsTUFBTSxDQUFDLGVBQWxCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsdUNBRFgsQ0FBQTtBQUFBLE1BRUEsMENBQU0sTUFBTixDQUZBLENBRFc7SUFBQSxDQUFiOztBQUFBLHVCQUtBLE9BQUEsR0FBUyxTQUFDLEdBQUQsR0FBQTthQUFVLFdBQUEsR0FBVyxJQUFyQjtJQUFBLENBTFQsQ0FBQTs7QUFBQSx1QkFPQSxTQUFBLEdBQVcsU0FBQyxJQUFELEVBQU8sS0FBUCxHQUFBO2FBQWlCLFNBQUEsR0FBQTtBQUMxQixZQUFBLE1BQUE7QUFBQSxRQUFBLE1BQUEsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUEsQ0FBVCxDQUFBO2VBQ0EsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBbEIsQ0FBMEIsU0FBQyxTQUFELEdBQUE7QUFDeEIsZ0JBQUEsSUFBQTtBQUFBLFlBQUEsSUFBQSxHQUFPLFNBQVMsQ0FBQyxPQUFWLENBQUEsQ0FBUCxDQUFBO21CQUNBLFNBQVMsQ0FBQyxVQUFWLENBQXFCLEVBQUEsR0FBRyxJQUFILEdBQVUsSUFBVixHQUFpQixLQUF0QyxFQUZ3QjtVQUFBLENBQTFCLEVBRGM7UUFBQSxDQUFoQixFQUYwQjtNQUFBLEVBQWpCO0lBQUEsQ0FQWCxDQUFBOztvQkFBQTs7S0FEc0MsS0FKeEMsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/vim-surround/lib/command/surround.coffee
