(function() {
  var CompositeDisposable, Linter, LinterPuppet, linterPath,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  linterPath = atom.packages.getLoadedPackage("linter").path;

  Linter = require("" + linterPath + "/lib/linter");

  CompositeDisposable = require('atom').CompositeDisposable;

  LinterPuppet = (function(_super) {
    __extends(LinterPuppet, _super);

    LinterPuppet.syntax = ['source.puppet'];

    LinterPuppet.prototype.cmd = 'puppet parser validate';

    LinterPuppet.prototype.executablePath = null;

    LinterPuppet.prototype.linterName = 'puppet';

    LinterPuppet.prototype.errorStream = 'stderr';

    LinterPuppet.prototype.regex = '.*: (?<message>(Syntax|Unclosed|Could) (.|\\n)*) at (.|\\n)*:(?<line>\\d+)';

    function LinterPuppet(editor) {
      this.disposables = new CompositeDisposable;
      LinterPuppet.__super__.constructor.call(this, editor);
      this.disposables.add(atom.config.observe('linter-puppet.puppetExecutablePath', (function(_this) {
        return function() {
          return _this.executablePath = atom.config.get('linter-puppet.puppetExecutablePath');
        };
      })(this)));
    }

    LinterPuppet.prototype.destroy = function() {
      LinterPuppet.__super__.destroy.apply(this, arguments);
      return this.disposables.dispose();
    };

    LinterPuppet.prototype.createMessage = function(match) {
      var message;
      if (match && match.type === 'parse' && !match.message) {
        message = 'parse error';
      }
      return LinterPuppet.__super__.createMessage.call(this, match);
    };

    return LinterPuppet;

  })(Linter);

  module.exports = LinterPuppet;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1wdXBwZXQvbGliL2xpbnRlci1wdXBwZXQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixRQUEvQixDQUF3QyxDQUFDLElBQXRELENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLEVBQUEsR0FBRyxVQUFILEdBQWMsYUFBdEIsQ0FEVCxDQUFBOztBQUFBLEVBRUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUZELENBQUE7O0FBQUEsRUFJTTtBQUdKLG1DQUFBLENBQUE7O0FBQUEsSUFBQSxZQUFDLENBQUEsTUFBRCxHQUFTLENBQUMsZUFBRCxDQUFULENBQUE7O0FBQUEsMkJBSUEsR0FBQSxHQUFLLHdCQUpMLENBQUE7O0FBQUEsMkJBTUEsY0FBQSxHQUFnQixJQU5oQixDQUFBOztBQUFBLDJCQVFBLFVBQUEsR0FBWSxRQVJaLENBQUE7O0FBQUEsMkJBVUEsV0FBQSxHQUFhLFFBVmIsQ0FBQTs7QUFBQSwyQkFjQSxLQUFBLEdBQU8sNEVBZFAsQ0FBQTs7QUFnQmEsSUFBQSxzQkFBQyxNQUFELEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQSxXQUFELEdBQWUsR0FBQSxDQUFBLG1CQUFmLENBQUE7QUFBQSxNQUNBLDhDQUFNLE1BQU4sQ0FEQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLG9DQUFwQixFQUEwRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUN6RSxLQUFDLENBQUEsY0FBRCxHQUFrQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isb0NBQWhCLEVBRHVEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUQsQ0FBakIsQ0FIQSxDQURXO0lBQUEsQ0FoQmI7O0FBQUEsMkJBdUJBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDTCxNQUFBLDJDQUFBLFNBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxPQUFiLENBQUEsRUFGSztJQUFBLENBdkJULENBQUE7O0FBQUEsMkJBMkJBLGFBQUEsR0FBZSxTQUFDLEtBQUQsR0FBQTtBQUViLFVBQUEsT0FBQTtBQUFBLE1BQUEsSUFBRyxLQUFBLElBQVUsS0FBSyxDQUFDLElBQU4sS0FBYyxPQUF4QixJQUFvQyxDQUFBLEtBQVMsQ0FBQyxPQUFqRDtBQUNFLFFBQUEsT0FBQSxHQUFVLGFBQVYsQ0FERjtPQUFBO2FBRUEsZ0RBQU0sS0FBTixFQUphO0lBQUEsQ0EzQmYsQ0FBQTs7d0JBQUE7O0tBSHlCLE9BSjNCLENBQUE7O0FBQUEsRUF3Q0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsWUF4Q2pCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/erskaggs/.atom/packages/linter-puppet/lib/linter-puppet.coffee
