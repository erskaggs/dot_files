(function() {
  var AtomGitDiffDetailsView, DiffDetailsDataManager, Highlights, Housekeeping, Point, Range, View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  _ref = require('atom'), Range = _ref.Range, Point = _ref.Point;

  Highlights = require('highlights');

  DiffDetailsDataManager = require('./data-manager');

  Housekeeping = require('./housekeeping');

  module.exports = AtomGitDiffDetailsView = (function(_super) {
    __extends(AtomGitDiffDetailsView, _super);

    function AtomGitDiffDetailsView() {
      this.notifyContentsModified = __bind(this.notifyContentsModified, this);
      return AtomGitDiffDetailsView.__super__.constructor.apply(this, arguments);
    }

    Housekeeping.includeInto(AtomGitDiffDetailsView);

    AtomGitDiffDetailsView.content = function() {
      return this.div({
        "class": "git-diff-details-outer"
      }, (function(_this) {
        return function() {
          _this.div({
            "class": "git-diff-details-main-panel",
            outlet: "mainPanel"
          }, function() {
            return _this.div({
              "class": "editor",
              outlet: "contents"
            });
          });
          return _this.div({
            "class": "git-diff-details-button-panel",
            outlet: "buttonPanel"
          }, function() {
            _this.button({
              "class": 'btn btn-primary inline-block-tight',
              click: "copy"
            }, 'Copy');
            return _this.button({
              "class": 'btn btn-error inline-block-tight',
              click: "undo"
            }, 'Undo');
          });
        };
      })(this));
    };

    AtomGitDiffDetailsView.prototype.initialize = function(editor) {
      this.editor = editor;
      this.editorView = atom.views.getView(this.editor);
      this.initializeHousekeeping();
      this.preventFocusOut();
      this.highlighter = new Highlights();
      this.diffDetailsDataManager = new DiffDetailsDataManager();
      this.showDiffDetails = false;
      this.lineDiffDetails = null;
      return this.updateCurrentRow();
    };

    AtomGitDiffDetailsView.prototype.preventFocusOut = function() {
      this.buttonPanel.on('mousedown', function() {
        return false;
      });
      return this.mainPanel.on('mousedown', function() {
        return false;
      });
    };

    AtomGitDiffDetailsView.prototype.getActiveTextEditor = function() {
      return atom.workspace.getActiveTextEditor();
    };

    AtomGitDiffDetailsView.prototype.updateCurrentRow = function() {
      var newCurrentRow, _ref1, _ref2;
      newCurrentRow = ((_ref1 = this.getActiveTextEditor()) != null ? (_ref2 = _ref1.getCursorBufferPosition()) != null ? _ref2.row : void 0 : void 0) + 1;
      if (newCurrentRow !== this.currentRow) {
        this.currentRow = newCurrentRow;
        return true;
      }
      return false;
    };

    AtomGitDiffDetailsView.prototype.notifyContentsModified = function() {
      if (this.editor.isDestroyed()) {
        return;
      }
      this.diffDetailsDataManager.invalidate(this.repositoryForPath(this.editor.getPath()), this.editor.getPath(), this.editor.getText());
      if (this.showDiffDetails) {
        return this.updateDiffDetailsDisplay();
      }
    };

    AtomGitDiffDetailsView.prototype.updateDiffDetails = function() {
      this.diffDetailsDataManager.invalidatePreviousSelectedHunk();
      this.updateCurrentRow();
      return this.updateDiffDetailsDisplay();
    };

    AtomGitDiffDetailsView.prototype.toggleShowDiffDetails = function() {
      this.showDiffDetails = !this.showDiffDetails;
      return this.updateDiffDetails();
    };

    AtomGitDiffDetailsView.prototype.closeDiffDetails = function() {
      this.showDiffDetails = false;
      return this.updateDiffDetails();
    };

    AtomGitDiffDetailsView.prototype.notifyChangeCursorPosition = function() {
      var currentRowChanged;
      if (this.showDiffDetails) {
        currentRowChanged = this.updateCurrentRow();
        if (currentRowChanged) {
          return this.updateDiffDetailsDisplay();
        }
      }
    };

    AtomGitDiffDetailsView.prototype.copy = function() {
      var selectedHunk;
      selectedHunk = this.diffDetailsDataManager.getSelectedHunk(this.currentRow).selectedHunk;
      if (selectedHunk != null) {
        atom.clipboard.write(selectedHunk.oldString);
        if (atom.config.get('git-diff-details.closeAfterCopy')) {
          return this.closeDiffDetails();
        }
      }
    };

    AtomGitDiffDetailsView.prototype.undo = function() {
      var buffer, selectedHunk;
      selectedHunk = this.diffDetailsDataManager.getSelectedHunk(this.currentRow).selectedHunk;
      if ((selectedHunk != null) && (buffer = this.editor.getBuffer())) {
        if (selectedHunk.kind === "m") {
          buffer.deleteRows(selectedHunk.start - 1, selectedHunk.end - 1);
          buffer.insert([selectedHunk.start - 1, 0], selectedHunk.oldString);
        } else {
          buffer.insert([selectedHunk.start, 0], selectedHunk.oldString);
        }
        if (!atom.config.get('git-diff-details.keepViewToggled')) {
          return this.closeDiffDetails();
        }
      }
    };

    AtomGitDiffDetailsView.prototype.destroyDecoration = function() {
      var _ref1;
      if ((_ref1 = this.marker) != null) {
        _ref1.destroy();
      }
      return this.marker = null;
    };

    AtomGitDiffDetailsView.prototype.attach = function(position) {
      var range;
      this.destroyDecoration();
      range = new Range(new Point(position - 1, 0), new Point(position - 1, 0));
      this.marker = this.editor.markBufferRange(range);
      return this.editor.decorateMarker(this.marker, {
        type: 'overlay',
        item: this
      });
    };

    AtomGitDiffDetailsView.prototype.populate = function(selectedHunk) {
      var html;
      html = this.highlighter.highlightSync({
        filePath: this.editor.getPath(),
        fileContents: selectedHunk.oldString
      });
      html = html.replace('<pre class="editor editor-colors">', '').replace('</pre>', '');
      return this.contents.html(html);
    };

    AtomGitDiffDetailsView.prototype.updateDiffDetailsDisplay = function() {
      var isDifferent, selectedHunk, _ref1;
      if (this.showDiffDetails) {
        _ref1 = this.diffDetailsDataManager.getSelectedHunk(this.currentRow), selectedHunk = _ref1.selectedHunk, isDifferent = _ref1.isDifferent;
        if (selectedHunk != null) {
          if (!isDifferent) {
            return;
          }
          this.attach(selectedHunk.end);
          this.populate(selectedHunk);
          return;
        } else {
          if (!atom.config.get('git-diff-details.keepViewToggled')) {
            this.closeDiffDetails();
          }
        }
        this.previousSelectedHunk = selectedHunk;
      }
      this.destroyDecoration();
    };

    return AtomGitDiffDetailsView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1kaWZmLWRldGFpbHMvbGliL2dpdC1kaWZmLWRldGFpbHMtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0dBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxzQkFBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUNBLE9BQWlCLE9BQUEsQ0FBUSxNQUFSLENBQWpCLEVBQUMsYUFBQSxLQUFELEVBQVEsYUFBQSxLQURSLENBQUE7O0FBQUEsRUFFQSxVQUFBLEdBQWEsT0FBQSxDQUFRLFlBQVIsQ0FGYixDQUFBOztBQUFBLEVBR0Esc0JBQUEsR0FBeUIsT0FBQSxDQUFRLGdCQUFSLENBSHpCLENBQUE7O0FBQUEsRUFJQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGdCQUFSLENBSmYsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0FBQ3JCLDZDQUFBLENBQUE7Ozs7O0tBQUE7O0FBQUEsSUFBQSxZQUFZLENBQUMsV0FBYixDQUF5QixzQkFBekIsQ0FBQSxDQUFBOztBQUFBLElBRUEsc0JBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLHdCQUFQO09BQUwsRUFBc0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNwQyxVQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyw2QkFBUDtBQUFBLFlBQXNDLE1BQUEsRUFBUSxXQUE5QztXQUFMLEVBQWdFLFNBQUEsR0FBQTttQkFDOUQsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGNBQUEsT0FBQSxFQUFPLFFBQVA7QUFBQSxjQUFpQixN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

//# sourceURL=/Users/erskaggs/.atom/packages/git-diff-details/lib/git-diff-details-view.coffee
