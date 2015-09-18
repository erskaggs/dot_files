(function() {
  var Change, CompositeDisposable, Delete, Surround;

  CompositeDisposable = require('atom').CompositeDisposable;

  Surround = require('./command/surround');

  Delete = require('./command/delete');

  Change = require('./command/change');

  module.exports = {
    config: {
      pairs: {
        type: 'array',
        "default": ['()', '{}', '[]', '""', "''"],
        items: {
          type: 'string'
        }
      },
      changeSurroundCommand: {
        type: 'string',
        "default": 'c s'
      },
      deleteSurroundCommand: {
        type: 'string',
        "default": 'd s'
      },
      surroundCommand: {
        type: 'string',
        "default": 's'
      },
      deleteCommand: {
        type: 'string',
        "default": 'd s'
      }
    },
    activate: function(state) {
      this.commandClasses = [Surround, Delete, Change];
      return this.configLoop = atom.config.observe('vim-surround', (function(_this) {
        return function(config) {
          var cls, command, _i, _len, _ref, _results;
          if (_this.disposables != null) {
            _this.disposables.dispose();
          }
          _this.disposables = new CompositeDisposable;
          _this.commands = [];
          _ref = _this.commandClasses;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cls = _ref[_i];
            command = new cls(config);
            _this.commands.push(command);
            _results.push(_this.disposables.add(command.disposables));
          }
          return _results;
        };
      })(this));
    },
    consumeVimMode: function(vimMode) {
      return this.vimMode = vimMode;
    },
    deactivate: function() {
      return this.disposables.dispose();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3ZpbS1zdXJyb3VuZC9saWIvdmltLXN1cnJvdW5kLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw2Q0FBQTs7QUFBQSxFQUFDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFBRCxDQUFBOztBQUFBLEVBRUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxvQkFBUixDQUZYLENBQUE7O0FBQUEsRUFHQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGtCQUFSLENBSFQsQ0FBQTs7QUFBQSxFQUlBLE1BQUEsR0FBUyxPQUFBLENBQVEsa0JBQVIsQ0FKVCxDQUFBOztBQUFBLEVBTUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxLQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxPQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FEVDtBQUFBLFFBRUEsS0FBQSxFQUNFO0FBQUEsVUFBQSxJQUFBLEVBQU0sUUFBTjtTQUhGO09BREY7QUFBQSxNQUtBLHFCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsS0FEVDtPQU5GO0FBQUEsTUFRQSxxQkFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEtBRFQ7T0FURjtBQUFBLE1BV0EsZUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEdBRFQ7T0FaRjtBQUFBLE1BY0EsYUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEtBRFQ7T0FmRjtLQURGO0FBQUEsSUFtQkEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsY0FBRCxHQUFrQixDQUNoQixRQURnQixFQUNOLE1BRE0sRUFDRSxNQURGLENBQWxCLENBQUE7YUFJQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQixjQUFwQixFQUFvQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxNQUFELEdBQUE7QUFDaEQsY0FBQSxzQ0FBQTtBQUFBLFVBQUEsSUFBMEIseUJBQTFCO0FBQUEsWUFBQSxLQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBQSxDQUFBLENBQUE7V0FBQTtBQUFBLFVBQ0EsS0FBQyxDQUFBLFdBQUQsR0FBZSxHQUFBLENBQUEsbUJBRGYsQ0FBQTtBQUFBLFVBR0EsS0FBQyxDQUFBLFFBQUQsR0FBWSxFQUhaLENBQUE7QUFLQTtBQUFBO2VBQUEsMkNBQUE7MkJBQUE7QUFDRSxZQUFBLE9BQUEsR0FBYyxJQUFBLEdBQUEsQ0FBSSxNQUFKLENBQWQsQ0FBQTtBQUFBLFlBQ0EsS0FBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQWUsT0FBZixDQURBLENBQUE7QUFBQSwwQkFFQSxLQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsT0FBTyxDQUFDLFdBQXpCLEVBRkEsQ0FERjtBQUFBOzBCQU5nRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXBDLEVBTE47SUFBQSxDQW5CVjtBQUFBLElBbUNBLGNBQUEsRUFBZ0IsU0FBQyxPQUFELEdBQUE7YUFBYSxJQUFDLENBQUEsT0FBRCxHQUFXLFFBQXhCO0lBQUEsQ0FuQ2hCO0FBQUEsSUFxQ0EsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUFNLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFBLEVBQU47SUFBQSxDQXJDWjtHQVBGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/erskaggs/.atom/packages/vim-surround/lib/vim-surround.coffee
