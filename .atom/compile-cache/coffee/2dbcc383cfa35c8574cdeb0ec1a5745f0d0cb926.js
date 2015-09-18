(function() {
  var AtomGitDiffDetailsView;

  AtomGitDiffDetailsView = require("./git-diff-details-view");

  module.exports = {
    config: {
      closeAfterCopy: {
        type: "boolean",
        "default": false,
        title: "Close diff view after copy"
      },
      keepViewToggled: {
        type: "boolean",
        "default": true,
        title: "Keep view toggled when leaving a diff"
      }
    },
    activate: function() {
      return atom.workspace.observeTextEditors(function(editor) {
        return new AtomGitDiffDetailsView(editor);
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1kaWZmLWRldGFpbHMvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNCQUFBOztBQUFBLEVBQUEsc0JBQUEsR0FBeUIsT0FBQSxDQUFRLHlCQUFSLENBQXpCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLGNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO0FBQUEsUUFFQSxLQUFBLEVBQU8sNEJBRlA7T0FERjtBQUFBLE1BS0EsZUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7QUFBQSxRQUVBLEtBQUEsRUFBTyx1Q0FGUDtPQU5GO0tBREY7QUFBQSxJQVdBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFmLENBQWtDLFNBQUMsTUFBRCxHQUFBO2VBQzVCLElBQUEsc0JBQUEsQ0FBdUIsTUFBdkIsRUFENEI7TUFBQSxDQUFsQyxFQURRO0lBQUEsQ0FYVjtHQUhGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/erskaggs/.atom/packages/git-diff-details/lib/main.coffee
