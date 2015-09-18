(function() {
  var AnsibleSnippetsView;

  module.exports = AnsibleSnippetsView = (function() {
    function AnsibleSnippetsView(serializedState) {
      var message;
      this.element = document.createElement('div');
      this.element.classList.add('ansible-snippets');
      message = document.createElement('div');
      message.textContent = "The AnsibleSnippets package is Alive! It's ALIVE!";
      message.classList.add('message');
      this.element.appendChild(message);
    }

    AnsibleSnippetsView.prototype.serialize = function() {};

    AnsibleSnippetsView.prototype.destroy = function() {
      return this.element.remove();
    };

    AnsibleSnippetsView.prototype.getElement = function() {
      return this.element;
    };

    return AnsibleSnippetsView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2Fuc2libGUtc25pcHBldHMvbGliL2Fuc2libGUtc25pcHBldHMtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsbUJBQUE7O0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ1MsSUFBQSw2QkFBQyxlQUFELEdBQUE7QUFFWCxVQUFBLE9BQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxPQUFELEdBQVcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWCxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFuQixDQUF1QixrQkFBdkIsQ0FEQSxDQUFBO0FBQUEsTUFJQSxPQUFBLEdBQVUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FKVixDQUFBO0FBQUEsTUFLQSxPQUFPLENBQUMsV0FBUixHQUFzQixtREFMdEIsQ0FBQTtBQUFBLE1BTUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFsQixDQUFzQixTQUF0QixDQU5BLENBQUE7QUFBQSxNQU9BLElBQUMsQ0FBQSxPQUFPLENBQUMsV0FBVCxDQUFxQixPQUFyQixDQVBBLENBRlc7SUFBQSxDQUFiOztBQUFBLGtDQVlBLFNBQUEsR0FBVyxTQUFBLEdBQUEsQ0FaWCxDQUFBOztBQUFBLGtDQWVBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsQ0FBQSxFQURPO0lBQUEsQ0FmVCxDQUFBOztBQUFBLGtDQWtCQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFFBRFM7SUFBQSxDQWxCWixDQUFBOzsrQkFBQTs7TUFGRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/erskaggs/.atom/packages/ansible-snippets/lib/ansible-snippets-view.coffee
