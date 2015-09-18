(function() {
  var getEditorElement;

  getEditorElement = function(callback) {
    var textEditor;
    textEditor = null;
    waitsForPromise(function() {
      return atom.project.open().then(function(e) {
        return textEditor = e;
      });
    });
    return runs(function() {
      var element;
      element = document.createElement("atom-text-editor");
      element.setModel(textEditor);
      return callback(element);
    });
  };

  module.exports = {
    getEditorElement: getEditorElement
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3ZpbS1zdXJyb3VuZC9zcGVjL3NwZWMtaGVscGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnQkFBQTs7QUFBQSxFQUFBLGdCQUFBLEdBQW1CLFNBQUMsUUFBRCxHQUFBO0FBQ2pCLFFBQUEsVUFBQTtBQUFBLElBQUEsVUFBQSxHQUFhLElBQWIsQ0FBQTtBQUFBLElBRUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7YUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQWIsQ0FBQSxDQUFtQixDQUFDLElBQXBCLENBQXlCLFNBQUMsQ0FBRCxHQUFBO2VBQ3ZCLFVBQUEsR0FBYSxFQURVO01BQUEsQ0FBekIsRUFEYztJQUFBLENBQWhCLENBRkEsQ0FBQTtXQU1BLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxVQUFBLE9BQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsQ0FBVixDQUFBO0FBQUEsTUFDQSxPQUFPLENBQUMsUUFBUixDQUFpQixVQUFqQixDQURBLENBQUE7YUFFQSxRQUFBLENBQVMsT0FBVCxFQUhHO0lBQUEsQ0FBTCxFQVBpQjtFQUFBLENBQW5CLENBQUE7O0FBQUEsRUFZQSxNQUFNLENBQUMsT0FBUCxHQUFpQjtBQUFBLElBQUUsa0JBQUEsZ0JBQUY7R0FaakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/vim-surround/spec/spec-helper.coffee
