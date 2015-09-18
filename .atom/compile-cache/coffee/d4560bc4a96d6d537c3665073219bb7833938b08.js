(function() {
  var helpers,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  helpers = require('./spec-helper');

  describe("Vim Surround activation", function() {
    var chars, configPairs, editor, editorElement, names, pairs, vimSurround, _ref;
    _ref = [], editor = _ref[0], pairs = _ref[1], editorElement = _ref[2], vimSurround = _ref[3], configPairs = _ref[4], chars = _ref[5], names = _ref[6];
    beforeEach(function() {
      pairs = ['()', '{}', '[]', '""', "''"];
      atom.config.set('vim-surround.pairs', pairs);
      vimSurround = atom.packages.loadPackage('vim-surround');
      vimSurround.activate();
      configPairs = atom.config.get('vim-surround.pairs');
      return helpers.getEditorElement(function(element) {
        var editorClassList;
        editorElement = element;
        editor = editorElement.getModel();
        editorClassList = editorElement.classList;
        editorClassList.add('editor');
        editorClassList.add('vim-mode');
        return editorClassList.add('visual-mode');
      });
    });
    return describe("When the vim-surround module loads", function() {
      beforeEach(function() {
        var commands;
        chars = [];
        pairs.forEach(function(pair) {
          var char, i, _i, _ref1, _results;
          _results = [];
          for (i = _i = 0, _ref1 = pair.length - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
            char = pair[i];
            if (__indexOf.call(chars, char) < 0) {
              _results.push(chars.push(char));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
        commands = atom.commands.findCommands({
          target: editorElement
        });
        names = [];
        return commands.forEach(function(command) {
          return names.push(command.name);
        });
      });
      it("Creates a surround command for each configured pair character", function() {
        return chars.forEach(function(char) {
          return expect(names).toContain("vim-surround:surround-" + char);
        });
      });
      describe("and the list of pairs changes", function() {
        beforeEach(function() {
          var command, commands;
          pairs = ['()', '{}', '[]', '""', "-+"];
          atom.config.set('vim-surround.pairs', pairs);
          commands = atom.commands.findCommands({
            target: editorElement
          });
          names = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = commands.length; _i < _len; _i++) {
              command = commands[_i];
              _results.push(command.name);
            }
            return _results;
          })();
          chars = [];
          return pairs.forEach(function(pair) {
            var char, i, _i, _ref1, _results;
            _results = [];
            for (i = _i = 0, _ref1 = pair.length - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
              char = pair[i];
              if (__indexOf.call(chars, char) < 0) {
                _results.push(chars.push(char));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          });
        });
        it("should add any new pairs.", function() {
          return chars.forEach(function(char) {
            return expect(names).toContain("vim-surround:surround-" + char);
          });
        });
        return it("should remove any old pairs.", function() {
          return expect(names).not.toContain("vim-surround:surround-'");
        });
      });
      return describe("and then deactivates", function() {
        beforeEach(function() {
          var command, commands;
          vimSurround.deactivate();
          commands = atom.commands.findCommands({
            target: editorElement
          });
          return names = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = commands.length; _i < _len; _i++) {
              command = commands[_i];
              _results.push(command.name);
            }
            return _results;
          })();
        });
        return it("should clear out all commands from the registry", function() {
          return chars.forEach(function(char) {
            return expect(names).not.toContain("vim-surround:surround-" + char);
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3ZpbS1zdXJyb3VuZC9zcGVjL3ZpbS1zdXJyb3VuZC1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxPQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLGVBQVIsQ0FBVixDQUFBOztBQUFBLEVBRUEsUUFBQSxDQUFTLHlCQUFULEVBQW9DLFNBQUEsR0FBQTtBQUNsQyxRQUFBLDBFQUFBO0FBQUEsSUFBQSxPQUF5RSxFQUF6RSxFQUFDLGdCQUFELEVBQVMsZUFBVCxFQUFnQix1QkFBaEIsRUFBK0IscUJBQS9CLEVBQTRDLHFCQUE1QyxFQUF5RCxlQUF6RCxFQUFnRSxlQUFoRSxDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxLQUFBLEdBQVEsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBUixDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isb0JBQWhCLEVBQXNDLEtBQXRDLENBREEsQ0FBQTtBQUFBLE1BR0EsV0FBQSxHQUFjLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBZCxDQUEwQixjQUExQixDQUhkLENBQUE7QUFBQSxNQUlBLFdBQVcsQ0FBQyxRQUFaLENBQUEsQ0FKQSxDQUFBO0FBQUEsTUFNQSxXQUFBLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG9CQUFoQixDQU5kLENBQUE7YUFRQSxPQUFPLENBQUMsZ0JBQVIsQ0FBeUIsU0FBQyxPQUFELEdBQUE7QUFDdkIsWUFBQSxlQUFBO0FBQUEsUUFBQSxhQUFBLEdBQWdCLE9BQWhCLENBQUE7QUFBQSxRQUNBLE1BQUEsR0FBUyxh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

//# sourceURL=/Users/erskaggs/.atom/packages/vim-surround/spec/vim-surround-spec.coffee
