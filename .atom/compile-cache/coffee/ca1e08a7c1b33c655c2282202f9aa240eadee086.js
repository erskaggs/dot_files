(function() {
  var DiffDetailsDataManager;

  module.exports = DiffDetailsDataManager = (function() {
    function DiffDetailsDataManager() {
      this.invalidate();
    }

    DiffDetailsDataManager.prototype.liesBetween = function(hunk, row) {
      return (hunk.start <= row && row <= hunk.end);
    };

    DiffDetailsDataManager.prototype.isDifferentHunk = function() {
      if ((this.previousSelectedHunk != null) && (this.previousSelectedHunk.start != null) && (this.selectedHunk != null) && (this.selectedHunk.start != null)) {
        return this.selectedHunk.start !== this.previousSelectedHunk.start;
      }
      return true;
    };

    DiffDetailsDataManager.prototype.getSelectedHunk = function(currentRow) {
      var isDifferent;
      if ((this.selectedHunk == null) || this.selectedHunkInvalidated || !this.liesBetween(this.selectedHunk, currentRow)) {
        this.updateLineDiffDetails();
        this.updateSelectedHunk(currentRow);
      }
      this.selectedHunkInvalidated = false;
      isDifferent = this.isDifferentHunk();
      this.previousSelectedHunk = this.selectedHunk;
      return {
        selectedHunk: this.selectedHunk,
        isDifferent: isDifferent
      };
    };

    DiffDetailsDataManager.prototype.updateSelectedHunk = function(currentRow) {
      var hunk, _i, _len, _ref, _results;
      this.selectedHunk = null;
      if (this.lineDiffDetails != null) {
        _ref = this.lineDiffDetails;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          hunk = _ref[_i];
          if (this.liesBetween(hunk, currentRow)) {
            this.selectedHunk = hunk;
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    DiffDetailsDataManager.prototype.updateLineDiffDetails = function() {
      if ((this.lineDiffDetails == null) || this.lineDiffDetailsInvalidated) {
        this.prepareLineDiffDetails(this.repo, this.path, this.text);
      }
      this.lineDiffDetailsInvalidated = false;
      return this.lineDiffDetails;
    };

    DiffDetailsDataManager.prototype.prepareLineDiffDetails = function(repo, path, text) {
      var hunk, kind, line, newEnd, newLineNumber, newLines, newStart, oldLineNumber, oldLines, oldStart, rawLineDiffDetails, _i, _len, _ref, _results;
      this.lineDiffDetails = null;
      repo = repo.getRepo(path);
      repo.getLineDiffDetails(repo.relativize(path), text);
      rawLineDiffDetails = repo.getLineDiffDetails(repo.relativize(path), text);
      if (rawLineDiffDetails == null) {
        return;
      }
      this.lineDiffDetails = [];
      hunk = null;
      _results = [];
      for (_i = 0, _len = rawLineDiffDetails.length; _i < _len; _i++) {
        _ref = rawLineDiffDetails[_i], oldStart = _ref.oldStart, newStart = _ref.newStart, oldLines = _ref.oldLines, newLines = _ref.newLines, oldLineNumber = _ref.oldLineNumber, newLineNumber = _ref.newLineNumber, line = _ref.line;
        if (!(oldLines === 0 && newLines > 0)) {
          if ((hunk == null) || (newStart !== hunk.start)) {
            newEnd = null;
            kind = null;
            if (newLines === 0 && oldLines > 0) {
              newEnd = newStart;
              kind = "d";
            } else {
              newEnd = newStart + newLines - 1;
              kind = "m";
            }
            hunk = {
              start: newStart,
              end: newEnd,
              oldLines: [],
              newLines: [],
              newString: "",
              oldString: "",
              kind: kind
            };
            this.lineDiffDetails.push(hunk);
          }
          if (newLineNumber >= 0) {
            hunk.newLines.push(line);
            _results.push(hunk.newString += line);
          } else {
            hunk.oldLines.push(line);
            _results.push(hunk.oldString += line);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    DiffDetailsDataManager.prototype.invalidate = function(repo, path, text) {
      this.repo = repo;
      this.path = path;
      this.text = text;
      this.selectedHunkInvalidated = true;
      this.lineDiffDetailsInvalidated = true;
      return this.invalidatePreviousSelectedHunk();
    };

    DiffDetailsDataManager.prototype.invalidatePreviousSelectedHunk = function() {
      return this.previousSelectedHunk = null;
    };

    return DiffDetailsDataManager;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1kaWZmLWRldGFpbHMvbGliL2RhdGEtbWFuYWdlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsc0JBQUE7O0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUF1QjtBQUNSLElBQUEsZ0NBQUEsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUFBLENBRFc7SUFBQSxDQUFiOztBQUFBLHFDQUdBLFdBQUEsR0FBYSxTQUFDLElBQUQsRUFBTyxHQUFQLEdBQUE7YUFDWCxDQUFBLElBQUksQ0FBQyxLQUFMLElBQWMsR0FBZCxJQUFjLEdBQWQsSUFBcUIsSUFBSSxDQUFDLEdBQTFCLEVBRFc7SUFBQSxDQUhiLENBQUE7O0FBQUEscUNBTUEsZUFBQSxHQUFpQixTQUFBLEdBQUE7QUFDZixNQUFBLElBQUcsbUNBQUEsSUFBMkIseUNBQTNCLElBQTRELDJCQUE1RCxJQUErRSxpQ0FBbEY7QUFDRSxlQUFPLElBQUMsQ0FBQSxZQUFZLENBQUMsS0FBZCxLQUF1QixJQUFDLENBQUEsb0JBQW9CLENBQUMsS0FBcEQsQ0FERjtPQUFBO0FBRUEsYUFBTyxJQUFQLENBSGU7SUFBQSxDQU5qQixDQUFBOztBQUFBLHFDQVdBLGVBQUEsR0FBaUIsU0FBQyxVQUFELEdBQUE7QUFDZixVQUFBLFdBQUE7QUFBQSxNQUFBLElBQUksMkJBQUQsSUFBbUIsSUFBQyxDQUFBLHVCQUFwQixJQUErQyxDQUFBLElBQUUsQ0FBQSxXQUFELENBQWEsSUFBQyxDQUFBLFlBQWQsRUFBNEIsVUFBNUIsQ0FBbkQ7QUFDRSxRQUFBLElBQUMsQ0FBQSxxQkFBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLGtCQUFELENBQW9CLFVBQXBCLENBREEsQ0FERjtPQUFB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

//# sourceURL=/Users/erskaggs/.atom/packages/git-diff-details/lib/data-manager.coffee
