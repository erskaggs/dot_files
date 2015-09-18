(function() {
  var Base, Change, CompositeDisposable, Selector,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  CompositeDisposable = require('atom').CompositeDisposable;

  Base = require('./base');

  Selector = require('./selector');

  module.exports = Change = (function() {
    function Change(config) {
      this.command = config.changeSurroundCommand;
      this.context = "atom-text-editor.vim-mode.normal-mode";
      this.disposables = new CompositeDisposable;
      this.curPairs = [];
      this.curPairsWithTarget = [];
      this.registerPairs(config.pairs);
    }

    Change.prototype.getName = function(key, targetKey) {
      return "change-" + key + "-to-" + targetKey;
    };

    Change.prototype.registerPairs = function(pairs) {
      var pair, target, x, _i, _len, _results;
      pairs = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = pairs.length; _i < _len; _i++) {
          x = pairs[_i];
          if (x.length > 0 && x.length % 2 === 0) {
            _results.push(x);
          }
        }
        return _results;
      })();
      _results = [];
      for (_i = 0, _len = pairs.length; _i < _len; _i++) {
        pair = pairs[_i];
        _results.push((function() {
          var _j, _len1, _ref, _results1;
          _results1 = [];
          for (_j = 0, _len1 = pairs.length; _j < _len1; _j++) {
            target = pairs[_j];
            if (_ref = "" + pair + target, __indexOf.call(this.curPairs, _ref) < 0) {
              this.registerPair(pair, target);
              _results1.push(this.curPairs.push("" + pair + target));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Change.prototype.registerPair = function(pair, target) {
      var contextArg, fullCommand, key, keymapArg, left, name, right, targetKey, target_left, target_right, _i, _len, _ref, _ref1, _ref2, _results;
      _ref = this.splitPair(pair), left = _ref[0], right = _ref[1];
      _ref1 = this.splitPair(target), target_left = _ref1[0], target_right = _ref1[1];
      _ref2 = [left, right];
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        key = _ref2[_i];
        _results.push((function() {
          var _j, _len1, _ref3, _ref4, _results1;
          _ref3 = [target_left, target_right];
          _results1 = [];
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            targetKey = _ref3[_j];
            if (_ref4 = "" + key + targetKey, __indexOf.call(this.curPairsWithTarget, _ref4) < 0) {
              name = "vim-surround:" + (this.getName(key, targetKey));
              if (pair !== target) {
                this.disposables.add(atom.commands.add(this.context, name, this.getRunner(pair, target)));
              }
              keymapArg = {};
              fullCommand = "" + this.command + " " + key + " " + targetKey;
              keymapArg[fullCommand] = name;
              contextArg = {};
              contextArg[this.context] = keymapArg;
              if (pair !== target) {
                this.disposables.add(atom.keymaps.add(name, contextArg));
              }
              _results1.push(this.curPairsWithTarget.push("" + key + targetKey));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Change.prototype.splitPair = function(pair) {
      return [pair.slice(0, +((pair.length / 2) - 1) + 1 || 9e9), pair.slice(pair.length / 2)];
    };

    Change.prototype.getRunner = function(from, to) {
      return function() {
        var editor, left, right, selector, target_left, target_right, _ref, _ref1;
        _ref = [from[0], from[1]], left = _ref[0], right = _ref[1];
        _ref1 = [to[0], to[1]], target_left = _ref1[0], target_right = _ref1[1];
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
              return selection.insertText("" + target_left + text + target_right);
            });
          });
          return editor.setCursorBufferPosition(cursorPos);
        });
      };
    };

    return Change;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3ZpbS1zdXJyb3VuZC9saWIvY29tbWFuZC9jaGFuZ2UuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJDQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFlBQVIsQ0FIWCxDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FBdUI7QUFDUixJQUFBLGdCQUFDLE1BQUQsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxNQUFNLENBQUMscUJBQWxCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsdUNBRFgsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxHQUFBLENBQUEsbUJBRmYsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFFBQUQsR0FBWSxFQUhaLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxrQkFBRCxHQUFzQixFQUp0QixDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsYUFBRCxDQUFlLE1BQU0sQ0FBQyxLQUF0QixDQUxBLENBRFc7SUFBQSxDQUFiOztBQUFBLHFCQVFBLE9BQUEsR0FBUyxTQUFDLEdBQUQsRUFBTSxTQUFOLEdBQUE7YUFBcUIsU0FBQSxHQUFTLEdBQVQsR0FBYSxNQUFiLEdBQW1CLFVBQXhDO0lBQUEsQ0FSVCxDQUFBOztBQUFBLHFCQVVBLGFBQUEsR0FBZSxTQUFDLEtBQUQsR0FBQTtBQUNiLFVBQUEsbUNBQUE7QUFBQSxNQUFBLEtBQUE7O0FBQVM7YUFBQSw0Q0FBQTt3QkFBQTtj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

//# sourceURL=/Users/erskaggs/.atom/packages/vim-surround/lib/command/change.coffee
