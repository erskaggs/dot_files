(function() {
  var Base, CompositeDisposable,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = Base = (function() {
    function Base(config) {
      this.disposables = new CompositeDisposable;
      this.curPairs = [];
      this.registerPairs(config.pairs);
    }

    Base.prototype.registerPairs = function(pairs) {
      var pair, x, _i, _len, _results;
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
        if (__indexOf.call(this.curPairs, pair) < 0) {
          this.registerPair(pair);
          _results.push(this.curPairs.push(pair));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Base.prototype.registerPair = function(pair) {
      var left, right, _ref;
      _ref = this.splitPair(pair), left = _ref[0], right = _ref[1];
      if (left !== right) {
        this.createPairBindings(left, "" + left + " ", " " + right);
      }
      return this.createPairBindings(right, left, right);
    };

    Base.prototype.createPairBindings = function(key, left, right) {
      var contextArg, fullCommand, i, keymapArg, keys, name, _i, _ref;
      name = "vim-surround:" + (this.getName(key));
      this.disposables.add(atom.commands.add(this.context, name, this.getRunner(left, right)));
      keys = "";
      for (i = _i = 0, _ref = key.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (i === 0) {
          keys = key[i];
        } else {
          keys = "" + keys + " " + key[i];
        }
      }
      keymapArg = {};
      fullCommand = "" + this.command + " " + keys;
      keymapArg[fullCommand] = name;
      contextArg = {};
      contextArg[this.context] = keymapArg;
      return this.disposables.add(atom.keymaps.add(name, contextArg));
    };

    Base.prototype.splitPair = function(pair) {
      return [pair.slice(0, +((pair.length / 2) - 1) + 1 || 9e9), pair.slice(pair.length / 2)];
    };

    return Base;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3ZpbS1zdXJyb3VuZC9saWIvY29tbWFuZC9iYXNlLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx5QkFBQTtJQUFBLHFKQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUF1QjtBQUVSLElBQUEsY0FBQyxNQUFELEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQSxXQUFELEdBQWUsR0FBQSxDQUFBLG1CQUFmLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxRQUFELEdBQVksRUFGWixDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsYUFBRCxDQUFlLE1BQU0sQ0FBQyxLQUF0QixDQUhBLENBRFc7SUFBQSxDQUFiOztBQUFBLG1CQU1BLGFBQUEsR0FBZSxTQUFDLEtBQUQsR0FBQTtBQUNiLFVBQUEsMkJBQUE7QUFBQSxNQUFBLEtBQUE7O0FBQVM7YUFBQSw0Q0FBQTt3QkFBQTtjQUFzQixDQUFDLENBQUMsTUFBRixHQUFXLENBQVgsSUFBaUIsQ0FBQyxDQUFDLE1BQUYsR0FBVSxDQUFWLEtBQWU7QUFBdEQsMEJBQUEsRUFBQTtXQUFBO0FBQUE7O1VBQVQsQ0FBQTtBQUVBO1dBQUEsNENBQUE7eUJBQUE7QUFDRSxRQUFBLElBQUcsZUFBWSxJQUFDLENBQUEsUUFBYixFQUFBLElBQUEsS0FBSDtBQUNFLFVBQUEsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFkLENBQUEsQ0FBQTtBQUFBLHdCQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLElBQWYsRUFEQSxDQURGO1NBQUEsTUFBQTtnQ0FBQTtTQURGO0FBQUE7c0JBSGE7SUFBQSxDQU5mLENBQUE7O0FBQUEsbUJBY0EsWUFBQSxHQUFjLFNBQUMsSUFBRCxHQUFBO0FBQ1osVUFBQSxpQkFBQTtBQUFBLE1BQUEsT0FBZ0IsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFYLENBQWhCLEVBQUMsY0FBRCxFQUFPLGVBQVAsQ0FBQTtBQUVBLE1BQUEsSUFBRyxJQUFBLEtBQVEsS0FBWDtBQUNFLFFBQUEsSUFBQyxDQUFBLGtCQUFELENBQW9CLElBQXBCLEVBQTBCLEVBQUEsR0FBRyxJQUFILEdBQVEsR0FBbEMsRUFBdUMsR0FBQSxHQUFHLEtBQTFDLENBQUEsQ0FERjtPQUZBO2FBSUEsSUFBQyxDQUFBLGtCQUFELENBQW9CLEtBQXBCLEVBQTJCLElBQTNCLEVBQWlDLEtBQWpDLEVBTFk7SUFBQSxDQWRkLENBQUE7O0FBQUEsbUJBcUJBLGtCQUFBLEdBQW9CLFNBQUMsR0FBRCxFQUFNLElBQU4sRUFBWSxLQUFaLEdBQUE7QUFDbEIsVUFBQSwyREFBQTtBQUFBLE1BQUEsSUFBQSxHQUFRLGVBQUEsR0FBYyxDQUFDLElBQUMsQ0FBQSxPQUFELENBQVMsR0FBVCxDQUFELENBQXRCLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsSUFBQyxDQUFBLE9BQW5CLEVBQTRCLElBQTVCLEVBQWtDLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBWCxFQUFpQixLQUFqQixDQUFsQyxDQUFqQixDQUpBLENBQUE7QUFBQSxNQVNBLElBQUEsR0FBTyxFQVRQLENBQUE7QUFVQSxXQUFTLG1HQUFULEdBQUE7QUFDRSxRQUFBLElBQUcsQ0FBQSxLQUFLLENBQVI7QUFDRSxVQUFBLElBQUEsR0FBTyxHQUFJLENBQUEsQ0FBQSxDQUFYLENBREY7U0FBQSxNQUFBO0FBR0UsVUFBQSxJQUFBLEdBQU8sRUFBQSxHQUFHLElBQUgsR0FBUSxHQUFSLEdBQVcsR0FBSSxDQUFBLENBQUEsQ0FBdEIsQ0FIRjtTQURGO0FBQUEsT0FWQTtBQUFBLE1BcUJBLFNBQUEsR0FBWSxFQXJCWixDQUFBO0FBQUEsTUFzQkEsV0FBQSxHQUFjLEVBQUEsR0FBRyxJQUFDLENBQUEsT0FBSixHQUFZLEdBQVosR0FBZSxJQXRCN0IsQ0FBQTtBQUFBLE1BdUJBLFNBQVUsQ0FBQSxXQUFBLENBQVYsR0FBeUIsSUF2QnpCLENBQUE7QUFBQSxNQXlCQSxVQUFBLEdBQWEsRUF6QmIsQ0FBQTtBQUFBLE1BMEJBLFVBQVcsQ0FBQSxJQUFDLENBQUEsT0FBRCxDQUFYLEdBQXVCLFNBMUJ2QixDQUFBO2FBNkJBLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQWIsQ0FBaUIsSUFBakIsRUFBdUIsVUFBdkIsQ0FBakIsRUE5QmtCO0lBQUEsQ0FyQnBCLENBQUE7O0FBQUEsbUJBcURBLFNBQUEsR0FBVyxTQUFDLElBQUQsR0FBQTtBQUNULGFBQU8sQ0FBQyxJQUFLLDhDQUFOLEVBQTRCLElBQUssdUJBQWpDLENBQVAsQ0FEUztJQUFBLENBckRYLENBQUE7O2dCQUFBOztNQUpGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/erskaggs/.atom/packages/vim-surround/lib/command/base.coffee
