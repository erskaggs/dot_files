(function() {
  var SelectInsideBrackets, SelectInsideQuotes, Selector, vimModePath, _ref;

  vimModePath = atom.packages.resolvePackagePath('vim-mode') || atom.packages.resolvePackagePath('vim-mode-next');

  _ref = require("" + vimModePath + "/lib/text-objects"), SelectInsideQuotes = _ref.SelectInsideQuotes, SelectInsideBrackets = _ref.SelectInsideBrackets;

  module.exports = Selector = (function() {
    function Selector(editor, left, right) {
      this.editor = editor;
      this.left = left.trim();
      this.right = right.trim();
    }

    Selector.prototype.inside = function() {
      if (this.isBraket()) {
        return new SelectInsideBrackets(this.editor, this.left, this.right, false);
      } else {
        return new SelectInsideQuotes(this.editor, this.left, false);
      }
    };

    Selector.prototype.outside = function() {
      if (this.isBraket()) {
        return new SelectInsideBrackets(this.editor, this.left, this.right, true);
      } else {
        return new SelectInsideQuotes(this.editor, this.left, true);
      }
    };

    Selector.prototype.isBraket = function() {
      var _base;
      return (typeof (_base = ['[', ']', '{', '}', '<', '>', '(', ')']).indexOf === "function" ? _base.indexOf(this.left.trim()) : void 0) >= 0;
    };

    return Selector;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3ZpbS1zdXJyb3VuZC9saWIvY29tbWFuZC9zZWxlY3Rvci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEscUVBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBZCxDQUFpQyxVQUFqQyxDQUFBLElBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBZCxDQUFpQyxlQUFqQyxDQURkLENBQUE7O0FBQUEsRUFHQSxPQUE2QyxPQUFBLENBQVEsRUFBQSxHQUFHLFdBQUgsR0FBZSxtQkFBdkIsQ0FBN0MsRUFBQywwQkFBQSxrQkFBRCxFQUFxQiw0QkFBQSxvQkFIckIsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0FBQ1IsSUFBQSxrQkFBRSxNQUFGLEVBQVUsSUFBVixFQUFnQixLQUFoQixHQUFBO0FBQ1gsTUFEWSxJQUFDLENBQUEsU0FBQSxNQUNiLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBSSxDQUFDLElBQUwsQ0FBQSxDQUFSLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxLQUFELEdBQVMsS0FBSyxDQUFDLElBQU4sQ0FBQSxDQURULENBRFc7SUFBQSxDQUFiOztBQUFBLHVCQUlBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBQSxDQUFIO2VBQ00sSUFBQSxvQkFBQSxDQUFxQixJQUFDLENBQUEsTUFBdEIsRUFBOEIsSUFBQyxDQUFBLElBQS9CLEVBQXFDLElBQUMsQ0FBQSxLQUF0QyxFQUE2QyxLQUE3QyxFQUROO09BQUEsTUFBQTtlQUdNLElBQUEsa0JBQUEsQ0FBbUIsSUFBQyxDQUFBLE1BQXBCLEVBQTRCLElBQUMsQ0FBQSxJQUE3QixFQUFtQyxLQUFuQyxFQUhOO09BRE07SUFBQSxDQUpSLENBQUE7O0FBQUEsdUJBVUEsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNQLE1BQUEsSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFBLENBQUg7ZUFDTSxJQUFBLG9CQUFBLENBQXFCLElBQUMsQ0FBQSxNQUF0QixFQUE4QixJQUFDLENBQUEsSUFBL0IsRUFBcUMsSUFBQyxDQUFBLEtBQXRDLEVBQTZDLElBQTdDLEVBRE47T0FBQSxNQUFBO2VBR00sSUFBQSxrQkFBQSxDQUFtQixJQUFDLENBQUEsTUFBcEIsRUFBNEIsSUFBQyxDQUFBLElBQTdCLEVBQW1DLElBQW5DLEVBSE47T0FETztJQUFBLENBVlQsQ0FBQTs7QUFBQSx1QkFnQkEsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNSLFVBQUEsS0FBQTtzR0FBd0MsQ0FBQyxRQUFTLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFBLFlBQWxELElBQW1FLEVBRDNEO0lBQUEsQ0FoQlYsQ0FBQTs7b0JBQUE7O01BTkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/vim-surround/lib/command/selector.coffee
