Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = treeViewGitBranchList;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('object-assign-shim');

require('array.from');

var _atom = require('atom');

var _treeViewGitBranchJs = require('./tree-view-git-branch.js');

var _treeViewGitBranchJs2 = _interopRequireDefault(_treeViewGitBranchJs);

var _utilsJs = require('./utils.js');

'use babel';

var prototype = Object.create(HTMLElement.prototype);

Object.assign(prototype, {
  createdCallback: function createdCallback() {
    var _this = this;

    this.classList.add('list-nested-item', 'directory', 'tree-view-git-branch-list');

    this.header = this.appendChild(document.createElement('div'));
    this.header.classList.add('header', 'list-item');

    this.label = this.header.appendChild(document.createElement('span'));
    this.label.classList.add('name', 'icon');

    this.entriesByReference = {};
    this.entries = this.appendChild(document.createElement('ol'));
    this.entries.classList.add('list-tree');
    this.collapse();

    this.disposables = new _atom.CompositeDisposable((0, _utilsJs.addEventListener)(this.header, 'click', function () {
      return _this.toggle();
    }));
  },

  destroy: function destroy() {
    this.disposables.dispose();
    var _ref = [];
    this.disposables = _ref[0];
    this.repository = _ref[1];
  },

  initialize: function initialize(_ref2) {
    var icon = _ref2.icon;
    var title = _ref2.title;
    var entries = _ref2.entries;
    var repository = _ref2.repository;

    this.repository = repository;
    this.setIcon(icon);
    this.setTitle(title);
    this.setEntries(entries);
  },

  setIcon: function setIcon(icon) {
    if (!icon) return;
    this.label.className.replace(/\bicon-[^\s]+/, '');
    this.label.classList.add('icon-' + icon);
  },

  setTitle: function setTitle(title) {
    this.title = title;
    this.label.innerHTML = title;
  },

  setEntries: function setEntries(references) {
    this.entries.innerHTML = '';
    for (var reference of references) {
      this.entries.appendChild((0, _treeViewGitBranchJs2['default'])({
        title: reference,
        repository: this.repository
      }));
    }
  },

  expand: function expand() {
    if (!this.collapsed) return;
    this.collapsed = false;
    this.classList.remove('collapsed');

    this.entries.style.display = '';
  },

  collapse: function collapse() {
    if (this.collapsed) return;
    this.collapsed = true;
    this.classList.add('collapsed');

    this.entries.style.display = 'none';
  },

  toggle: function toggle() {
    for (var element of Array.from(document.querySelectorAll('.tree-view .selected'))) {
      element.classList.remove('selected');
    }
    this.classList.add('selected');
    this.collapsed ? this.expand() : this.collapse();
  }
});

var TreeViewGitBranchList = document.registerElement('tree-view-git-branch-list', {
  prototype: prototype,
  'extends': 'li'
});

function treeViewGitBranchList() {
  var treeViewGitBranchList = new TreeViewGitBranchList();

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length) treeViewGitBranchList.initialize.apply(treeViewGitBranchList, args);
  return treeViewGitBranchList;
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lcnNrYWdncy8uYXRvbS9wYWNrYWdlcy90cmVlLXZpZXctZ2l0LWJyYW5jaC9saWIvdHJlZS12aWV3LWdpdC1icmFuY2gtbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBZ0d3QixxQkFBcUI7Ozs7UUEvRnRDLG9CQUFvQjs7UUFFcEIsWUFBWTs7b0JBRWlCLE1BQU07O21DQUVaLDJCQUEyQjs7Ozt1QkFFeEIsWUFBWTs7QUFUN0MsV0FBVyxDQUFDOztBQVdaLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVyRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtBQUN2QixpQkFBZSxFQUFBLDJCQUFHOzs7QUFDaEIsUUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLDJCQUEyQixDQUFDLENBQUM7O0FBRWpGLFFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDOUQsUUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQzs7QUFFakQsUUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDckUsUUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFekMsUUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUM3QixRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzlE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QUNELFFBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9CLFFBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztHQUNsRDtDQUNGLENBQUMsQ0FBQzs7QUFFSCxJQUFJLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsMkJBQTJCLEVBQUU7QUFDaEYsV0FBUyxFQUFULFNBQVM7QUFDVCxhQUFTLElBQUk7Q0FDZCxDQUFDLENBQUM7O0FBRVksU0FBUyxxQkFBcUIsR0FBVTtBQUNyRCxNQUFJLHFCQUFxQixHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQzs7b0NBRFQsSUFBSTtBQUFKLFFBQUk7OztBQUVuRCxNQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUscUJBQXFCLENBQUMsVUFBVSxNQUFBLENBQWhDLHFCQUFxQixFQUFlLElBQUksQ0FBQyxDQUFDO0FBQzFELFNBQU8scUJBQXFCLENBQUM7Q0FDOUIiLCJmaWxlIjoiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3RyZWUtdmlldy1naXQtYnJhbmNoL2xpYi90cmVlLXZpZXctZ2l0LWJyYW5jaC1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5pbXBvcnQgJ29iamVjdC1hc3NpZ24tc2hpbSc7XG5cbmltcG9ydCAnYXJyYXkuZnJvbSc7XG5cbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcblxuaW1wb3J0IHRyZWVWaWV3R2l0QnJhbmNoIGZyb20gJy4vdHJlZS12aWV3LWdpdC1icmFuY2guanMnO1xuXG5pbXBvcnQgeyBhZGRFdmVudExpc3RlbmVyIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbnZhciBwcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSk7XG5cbk9iamVjdC5hc3NpZ24ocHJvdG90eXBlLCB7XG4gIGNyZWF0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2xpc3QtbmVzdGVkLWl0ZW0nLCAnZGlyZWN0b3J5JywgJ3RyZWUtdmlldy1naXQtYnJhbmNoLWxpc3QnKTtcblxuICAgIHRoaXMuaGVhZGVyID0gdGhpcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgdGhpcy5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyJywgJ2xpc3QtaXRlbScpO1xuXG4gICAgdGhpcy5sYWJlbCA9IHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XG4gICAgdGhpcy5sYWJlbC5jbGFzc0xpc3QuYWRkKCduYW1lJywgJ2ljb24nKTtcblxuICAgIHRoaXMuZW50cmllc0J5UmVmZXJlbmNlID0ge307XG4gICAgdGhpcy5lbnRyaWVzID0gdGhpcy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbCcpKTtcbiAgICB0aGlzLmVudHJpZXMuY2xhc3NMaXN0LmFkZCgnbGlzdC10cmVlJyk7XG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKFxuICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmhlYWRlciwgJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGUoKSlcbiAgICApO1xuICB9LFxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgWyB0aGlzLmRpc3Bvc2FibGVzLCB0aGlzLnJlcG9zaXRvcnkgXSA9IFtdO1xuICB9LFxuXG4gIGluaXRpYWxpemUoeyBpY29uLCB0aXRsZSwgZW50cmllcywgcmVwb3NpdG9yeSB9KSB7XG4gICAgdGhpcy5yZXBvc2l0b3J5ID0gcmVwb3NpdG9yeTtcbiAgICB0aGlzLnNldEljb24oaWNvbik7XG4gICAgdGhpcy5zZXRUaXRsZSh0aXRsZSk7XG4gICAgdGhpcy5zZXRFbnRyaWVzKGVudHJpZXMpO1xuICB9LFxuXG4gIHNldEljb24oaWNvbikge1xuICAgIGlmKCFpY29uKSByZXR1cm47XG4gICAgdGhpcy5sYWJlbC5jbGFzc05hbWUucmVwbGFjZSgvXFxiaWNvbi1bXlxcc10rLywgJycpO1xuICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LmFkZChgaWNvbi0ke2ljb259YCk7XG4gIH0sXG5cbiAgc2V0VGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5sYWJlbC5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfSxcblxuICBzZXRFbnRyaWVzKHJlZmVyZW5jZXMpIHtcbiAgICB0aGlzLmVudHJpZXMuaW5uZXJIVE1MID0gJyc7XG4gICAgZm9yKGxldCByZWZlcmVuY2Ugb2YgcmVmZXJlbmNlcykge1xuICAgICAgdGhpcy5lbnRyaWVzLmFwcGVuZENoaWxkKHRyZWVWaWV3R2l0QnJhbmNoKHtcbiAgICAgICAgdGl0bGU6IHJlZmVyZW5jZSxcbiAgICAgICAgcmVwb3NpdG9yeTogdGhpcy5yZXBvc2l0b3J5LFxuICAgICAgfSkpO1xuICAgIH1cbiAgfSxcblxuICBleHBhbmQoKSB7XG4gICAgaWYoIXRoaXMuY29sbGFwc2VkKSByZXR1cm47XG4gICAgdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNlZCcpO1xuXG4gICAgdGhpcy5lbnRyaWVzLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgfSxcblxuICBjb2xsYXBzZSgpIHtcbiAgICBpZih0aGlzLmNvbGxhcHNlZCkgcmV0dXJuO1xuICAgIHRoaXMuY29sbGFwc2VkID0gdHJ1ZTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNlZCcpO1xuXG4gICAgdGhpcy5lbnRyaWVzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH0sXG5cbiAgdG9nZ2xlKCkge1xuICAgIGZvcihsZXQgZWxlbWVudCBvZiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50cmVlLXZpZXcgLnNlbGVjdGVkJykpKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgfVxuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICB0aGlzLmNvbGxhcHNlZCA/IHRoaXMuZXhwYW5kKCkgOiB0aGlzLmNvbGxhcHNlKCk7XG4gIH0sXG59KTtcblxudmFyIFRyZWVWaWV3R2l0QnJhbmNoTGlzdCA9IGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgndHJlZS12aWV3LWdpdC1icmFuY2gtbGlzdCcsIHtcbiAgcHJvdG90eXBlLFxuICBleHRlbmRzOiAnbGknLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyZWVWaWV3R2l0QnJhbmNoTGlzdCguLi5hcmdzKSB7XG4gIHZhciB0cmVlVmlld0dpdEJyYW5jaExpc3QgPSBuZXcgVHJlZVZpZXdHaXRCcmFuY2hMaXN0KCk7XG4gIGlmKGFyZ3MubGVuZ3RoKSB0cmVlVmlld0dpdEJyYW5jaExpc3QuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgcmV0dXJuIHRyZWVWaWV3R2l0QnJhbmNoTGlzdDtcbn1cbiJdfQ==
//# sourceURL=/Users/erskaggs/.atom/packages/tree-view-git-branch/lib/tree-view-git-branch-list.js
