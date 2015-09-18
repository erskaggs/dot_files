(function() {
  var ClipboardItems, CompositeDisposable, Disposable, _ref;

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Disposable = _ref.Disposable;

  module.exports = ClipboardItems = (function() {
    ClipboardItems.prototype.limit = 15;

    ClipboardItems.prototype.items = [];

    ClipboardItems.prototype.destroyed = false;

    function ClipboardItems(state) {
      var _ref1;
      if (state == null) {
        state = {};
      }
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(this.wrapClipboard());
      this.subscriptions.add(atom.config.observe('clipboard-plus.limit', (function(_this) {
        return function(limit) {
          return _this.limit = limit;
        };
      })(this)));
      this.items = (_ref1 = state.items) != null ? _ref1 : [];
    }

    ClipboardItems.prototype.destroy = function() {
      var _ref1;
      if (this.destroyed) {
        return;
      }
      if ((_ref1 = this.subscriptions) != null) {
        _ref1.dispose();
      }
      this.subscriptions = null;
      this.clear();
      return this.destroyed = true;
    };

    ClipboardItems.prototype.wrapClipboard = function() {
      var clipboard, readWithMetadata, write;
      clipboard = atom.clipboard;
      write = clipboard.write, readWithMetadata = clipboard.readWithMetadata;
      clipboard.write = (function(_this) {
        return function(text, metadata) {
          var ignore, replace, _ref1, _ref2, _ref3;
          if (metadata == null) {
            metadata = {};
          }
          ignore = (_ref1 = metadata.ignore) != null ? _ref1 : false;
          delete metadata.ignore;
          replace = (_ref2 = metadata.replace) != null ? _ref2 : false;
          delete metadata.replace;
          write.call(clipboard, text, metadata);
          if (ignore) {
            return;
          }
          if (_this.isIgnoreText(text)) {
            return;
          }
          _ref3 = clipboard.readWithMetadata(), text = _ref3.text, metadata = _ref3.metadata;
          if (metadata == null) {
            metadata = {};
          }
          metadata.time = Date.now();
          if (replace) {
            _this.items.pop();
          }
          return _this.push({
            text: text,
            metadata: metadata
          });
        };
      })(this);
      clipboard.readWithMetadata = function() {
        var result;
        result = readWithMetadata.call(clipboard);
        if (!result.hasOwnProperty('metadata')) {
          clipboard.write(result.text);
        }
        return result;
      };
      return new Disposable(function() {
        clipboard.write = write;
        return clipboard.readWithMetadata = readWithMetadata;
      });
    };

    ClipboardItems.prototype.push = function(_arg) {
      var deleteCount, metadata, text;
      text = _arg.text, metadata = _arg.metadata;
      if (atom.config.get('clipboard-plus.unique')) {
        this.deleteByText(text);
      }
      this.items.push({
        text: text,
        metadata: metadata
      });
      deleteCount = this.items.length - this.limit;
      if (deleteCount > 0) {
        return this.items.splice(0, deleteCount);
      }
    };

    ClipboardItems.prototype.size = function() {
      return this.items.length;
    };

    ClipboardItems.prototype["delete"] = function(item) {
      return this.items.splice(this.items.indexOf(item), 1);
    };

    ClipboardItems.prototype.deleteByText = function(text) {
      return this.items = this.items.filter(function(item) {
        return item.text !== text;
      });
    };

    ClipboardItems.prototype.clear = function() {
      return this.items.length = 0;
    };

    ClipboardItems.prototype.entries = function() {
      return this.items.slice();
    };

    ClipboardItems.prototype.get = function(index) {
      return this.items[index];
    };

    ClipboardItems.prototype.serialize = function() {
      return {
        items: this.items.slice()
      };
    };

    ClipboardItems.prototype.syncSystemClipboard = function() {
      atom.clipboard.readWithMetadata();
      return this;
    };

    ClipboardItems.prototype.isIgnoreText = function(text) {
      var trimmed;
      if (text.match(/^\s+$/)) {
        return true;
      }
      trimmed = text.trim();
      if (trimmed.length < atom.config.get('clipboard-plus.minimumTextLength')) {
        return true;
      }
      if (trimmed.length > atom.config.get('clipboard-plus.maximumTextLength')) {
        return true;
      }
      return false;
    };

    return ClipboardItems;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2NsaXBib2FyZC1wbHVzL2xpYi9jbGlwYm9hcmQtaXRlbXMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFEQUFBOztBQUFBLEVBQUEsT0FBb0MsT0FBQSxDQUFRLE1BQVIsQ0FBcEMsRUFBQywyQkFBQSxtQkFBRCxFQUFzQixrQkFBQSxVQUF0QixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLDZCQUFBLEtBQUEsR0FBTyxFQUFQLENBQUE7O0FBQUEsNkJBQ0EsS0FBQSxHQUFPLEVBRFAsQ0FBQTs7QUFBQSw2QkFFQSxTQUFBLEdBQVcsS0FGWCxDQUFBOztBQUlhLElBQUEsd0JBQUMsS0FBRCxHQUFBO0FBQ1gsVUFBQSxLQUFBOztRQURZLFFBQVE7T0FDcEI7QUFBQSxNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLEdBQUEsQ0FBQSxtQkFBakIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBbkIsQ0FEQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLHNCQUFwQixFQUE0QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEdBQUE7aUJBQzdELEtBQUMsQ0FBQSxLQUFELEdBQVMsTUFEb0Q7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE1QyxDQUFuQixDQUZBLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQSxLQUFELDJDQUF1QixFQUx2QixDQURXO0lBQUEsQ0FKYjs7QUFBQSw2QkFZQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1As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

//# sourceURL=/Users/erskaggs/.atom/packages/clipboard-plus/lib/clipboard-items.coffee
