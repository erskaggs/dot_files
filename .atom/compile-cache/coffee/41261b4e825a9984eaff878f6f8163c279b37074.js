(function() {
  var BufferedProcess, CompositeDisposable, _ref;

  _ref = require('atom'), BufferedProcess = _ref.BufferedProcess, CompositeDisposable = _ref.CompositeDisposable;

  module.exports = {
    config: {
      puppetExecutablePath: {
        "default": 'puppet',
        title: 'Puppet Executable Path',
        type: 'string'
      },
      puppetArguments: {
        "default": '--disable_warnings=deprecations',
        title: 'Puppet Arguments',
        type: 'string'
      }
    },
    activate: function() {
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.config.observe('linter-puppet-parser.puppetExecutablePath', (function(_this) {
        return function(executablePath) {
          return _this.executablePath = executablePath;
        };
      })(this)));
      return this.subscriptions.add(atom.config.observe('linter-puppet-parser.puppetArguments', (function(_this) {
        return function(args) {
          return _this.args = args.split(' ');
        };
      })(this)));
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    },
    puppetParserLinter: function() {
      var provider;
      return provider = {
        grammarScopes: ['source.puppet'],
        scope: 'file',
        lintOnFly: false,
        lint: (function(_this) {
          return function(textEditor) {
            return new Promise(function(resolve, reject) {
              var arg, filePath, filter, msg, process, regex;
              filePath = textEditor.getPath();
              regex = [/(Warning|Error): (.+?) at [^\s]+?:(\d+):?(\d*)/, /(Warning|Error): (.+?) in file [^\s]+ [oa][nt] line (\d+):?(\d*)/, /(Warning|Error): (.+?) on line (\d+):?(\d*) in file [^\s]+/];
              filter = [];
              msg = '';
              arg = ['parser', 'validate', '--color=false', '--render-as=s'];
              arg = arg.concat(_this.args.slice(0));
              arg.push(filePath);
              process = new BufferedProcess({
                command: _this.executablePath,
                args: arg,
                stdout: function(data) {
                  var out;
                  return out = data;
                },
                stderr: function(errdata) {
                  return msg = errdata;
                },
                exit: function(code) {
                  var msgA;
                  if (code !== 0 && code !== 1) {
                    atom.notifications.addError("Failed to run " + this.executablePath + " " + (JSON.stringify(arg)), {
                      detail: "Exit Code: " + code + "\n" + msg,
                      dismissable: true
                    });
                    return resolve([]);
                  }
                  if (msg === '') {
                    return resolve([]);
                  }
                  msgA = msg.split('\n');
                  msgA = msgA.filter(function(m) {
                    return m !== '';
                  });
                  msgA = msgA.filter(function(m) {
                    var re, _i, _len;
                    for (_i = 0, _len = regex.length; _i < _len; _i++) {
                      re = regex[_i];
                      if (m.match(re)) {
                        return true;
                      }
                    }
                    return false;
                  });
                  msgA = msgA.filter(function(m) {
                    var f, _i, _len;
                    for (_i = 0, _len = filter.length; _i < _len; _i++) {
                      f = filter[_i];
                      if (m.match(f)) {
                        return false;
                      }
                    }
                    return true;
                  });
                  return resolve(msgA.map(function(err) {
                    var mAll, mCol, mLine, mText, mType, re, _i, _len, _ref1;
                    for (_i = 0, _len = regex.length; _i < _len; _i++) {
                      re = regex[_i];
                      if (err.match(re)) {
                        _ref1 = err.match(re), mAll = _ref1[0], mType = _ref1[1], mText = _ref1[2], mLine = _ref1[3], mCol = _ref1[4];
                      }
                    }
                    if (mCol === '') {
                      mCol = 1;
                    }
                    return {
                      type: mType,
                      text: mAll,
                      filePath: filePath,
                      range: [[parseInt(mLine) - 1, parseInt(mCol) - 1], [parseInt(mLine) - 1, parseInt(mCol) - 1]]
                    };
                  }));
                }
              });
              return process.onWillThrowError(function(_arg) {
                var error, handle;
                error = _arg.error, handle = _arg.handle;
                atom.notifications.addError("Failed to run " + this.executablePath, {
                  detail: "" + error.messages,
                  dismissable: true
                });
                handle();
                return resolve([]);
              });
            });
          };
        })(this)
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1wdXBwZXQtcGFyc2VyL2xpYi9pbml0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwQ0FBQTs7QUFBQSxFQUFBLE9BQXlDLE9BQUEsQ0FBUSxNQUFSLENBQXpDLEVBQUMsdUJBQUEsZUFBRCxFQUFrQiwyQkFBQSxtQkFBbEIsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsb0JBQUEsRUFDRTtBQUFBLFFBQUEsU0FBQSxFQUFTLFFBQVQ7QUFBQSxRQUNBLEtBQUEsRUFBTyx3QkFEUDtBQUFBLFFBRUEsSUFBQSxFQUFNLFFBRk47T0FERjtBQUFBLE1BSUEsZUFBQSxFQUNFO0FBQUEsUUFBQSxTQUFBLEVBQVMsaUNBQVQ7QUFBQSxRQUNBLEtBQUEsRUFBTyxrQkFEUDtBQUFBLFFBRUEsSUFBQSxFQUFNLFFBRk47T0FMRjtLQURGO0FBQUEsSUFVQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBQWpCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0IsMkNBQXBCLEVBQ2pCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLGNBQUQsR0FBQTtpQkFDRSxLQUFDLENBQUEsY0FBRCxHQUFrQixlQURwQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRGlCLENBQW5CLENBREEsQ0FBQTthQUlBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0Is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

//# sourceURL=/Users/erskaggs/.atom/packages/linter-puppet-parser/lib/init.coffee
