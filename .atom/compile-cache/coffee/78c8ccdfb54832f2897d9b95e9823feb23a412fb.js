(function() {
  var Linter, LinterPuppetParse, linterPath,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  linterPath = atom.packages.getLoadedPackage("linter").path;

  Linter = require("" + linterPath + "/lib/linter");

  LinterPuppetParse = (function(_super) {
    __extends(LinterPuppetParse, _super);

    LinterPuppetParse.syntax = ['source.puppet'];

    LinterPuppetParse.prototype.cmd = 'puppet parser validate';

    LinterPuppetParse.prototype.executablePath = null;

    LinterPuppetParse.prototype.linterName = 'puppet-parse';

    LinterPuppetParse.prototype.errorStream = 'stderr';

    LinterPuppetParse.prototype.regex = '((?<warning>Warning)|(?<error>Error)): Could not parse for environment production: (?<message>.+) at [^:]+:(?<line>\\d+)';

    function LinterPuppetParse(editor) {
      LinterPuppetParse.__super__.constructor.call(this, editor);
      this.executablePathListener = atom.config.observe('linter-pupppet-parse.puppetParseArguments', (function(_this) {
        return function() {
          return _this.updateCmd();
        };
      })(this));
      this.argumentsListener = atom.config.observe('linter-pupppet-parse.puppetParseExecutablePath', (function(_this) {
        return function() {
          return _this.executablePath = atom.config.get('linter-pupppet-parse.puppetParseExecutablePath');
        };
      })(this));
    }

    LinterPuppetParse.prototype.updateCmd = function() {
      var args, cmd;
      cmd = this.cmd.split(' ');
      args = atom.config.get('linter-pupppet-parse.puppetParseArguments');
      if (args) {
        return this.cmd = "" + cmd[0] + " " + args;
      }
    };

    LinterPuppetParse.prototype.destroy = function() {
      this.executablePathListener.dispose();
      return this.argumentsListener.dispose();
    };

    return LinterPuppetParse;

  })(Linter);

  module.exports = LinterPuppetParse;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1wdXBwZXQtcGFyc2UvbGliL2xpbnRlci1wdXBwZXQtcGFyc2UuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZCxDQUErQixRQUEvQixDQUF3QyxDQUFDLElBQXRELENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLEVBQUEsR0FBRyxVQUFILEdBQWMsYUFBdEIsQ0FEVCxDQUFBOztBQUFBLEVBR007QUFHSix3Q0FBQSxDQUFBOztBQUFBLElBQUEsaUJBQUMsQ0FBQSxNQUFELEdBQVMsQ0FBQyxlQUFELENBQVQsQ0FBQTs7QUFBQSxnQ0FJQSxHQUFBLEdBQUssd0JBSkwsQ0FBQTs7QUFBQSxnQ0FNQSxjQUFBLEdBQWdCLElBTmhCLENBQUE7O0FBQUEsZ0NBUUEsVUFBQSxHQUFZLGNBUlosQ0FBQTs7QUFBQSxnQ0FVQSxXQUFBLEdBQWEsUUFWYixDQUFBOztBQUFBLGdDQWFBLEtBQUEsR0FBTywwSEFiUCxDQUFBOztBQWVhLElBQUEsMkJBQUMsTUFBRCxHQUFBO0FBQ1gsTUFBQSxtREFBTSxNQUFOLENBQUEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLHNCQUFELEdBQTBCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQiwyQ0FBcEIsRUFBaUUsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDekYsS0FBQyxDQUFBLFNBQUQsQ0FBQSxFQUR5RjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpFLENBRjFCLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQSxpQkFBRCxHQUFxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0IsZ0RBQXBCLEVBQXNFLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3pGLEtBQUMsQ0FBQSxjQUFELEdBQWtCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixnREFBaEIsRUFEdUU7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0RSxDQUxyQixDQURXO0lBQUEsQ0FmYjs7QUFBQSxnQ0F3QkEsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNULFVBQUEsU0FBQTtBQUFBLE1BQUEsR0FBQSxHQUFNLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxDQUFXLEdBQVgsQ0FBTixDQUFBO0FBQUEsTUFDQSxJQUFBLEdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDJDQUFoQixDQURQLENBQUE7QUFHQSxNQUFBLElBQUcsSUFBSDtlQUNFLElBQUMsQ0FBQSxHQUFELEdBQU8sRUFBQSxHQUFHLEdBQUksQ0FBQSxDQUFBLENBQVAsR0FBVSxHQUFWLEdBQWEsS0FEdEI7T0FKUztJQUFBLENBeEJYLENBQUE7O0FBQUEsZ0NBK0JBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxNQUFBLElBQUMsQ0FBQSxzQkFBc0IsQ0FBQyxPQUF4QixDQUFBLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxpQkFBaUIsQ0FBQyxPQUFuQixDQUFBLEVBRk87SUFBQSxDQS9CVCxDQUFBOzs2QkFBQTs7S0FIOEIsT0FIaEMsQ0FBQTs7QUFBQSxFQXlDQSxNQUFNLENBQUMsT0FBUCxHQUFpQixpQkF6Q2pCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/erskaggs/.atom/packages/linter-puppet-parse/lib/linter-puppet-parse.coffee
