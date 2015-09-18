Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = treeViewGitBranch;

require('object-assign-shim');

var _atom = require('atom');

var _utilsJs = require('./utils.js');

'use babel';

var prototype = Object.create(HTMLElement.prototype);

Object.assign(prototype, {
  createdCallback: function createdCallback() {
    var _this = this;

    this.classList.add('list-item', 'file', 'tree-view-git-branch');

    this.label = this.appendChild(document.createElement('span'));
    this.label.classList.add('name', 'icon');

    this.disposables = new _atom.CompositeDisposable((0, _utilsJs.addEventListener)(this, 'click', function (event) {
      return _this.onClick(event);
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
    var repository = _ref2.repository;

    this.repository = repository;
    this.setIcon(icon);
    this.setTitle(title);
  },

  setIcon: function setIcon(icon) {
    if (!icon) return;
    this.label.className.replace(/\bicon-[^\s]+/, '');
    this.label.classList.add('icon-' + icon);
  },

  setTitle: function setTitle(ref) {
    this.setAttribute('data-ref', ref);

    var _ref$match = ref.match(/refs\/(?:heads|tags|remotes\/([^/]+))\/(.+)/);

    var _ref$match2 = _slicedToArray(_ref$match, 3);

    var remote = _ref$match2[1];
    var shortRef = _ref$match2[2];

    this.label.innerHTML = remote ? remote + '/' + shortRef : shortRef;

    if (shortRef == this.repository.getShortHead()) {
      this.classList.add('text-info');
    }
  },

  onClick: function onClick(event) {
    for (var element of Array.from(document.querySelectorAll('.tree-view .selected'))) {
      element.classList.remove('selected');
    }
    this.classList.add('selected');

    // only checkout branch on double click
    if (event.detail != 2) return;

    for (var element of Array.from(document.querySelectorAll('.tree-view .tree-view-git-branch.text-info'))) {
      element.classList.remove('text-info');
    }
    this.classList.add('text-info');

    var ref = this.getAttribute('data-ref');

    if (this.repository.checkoutReference(ref)) {
      atom.notifications.addSuccess('Checkout ' + ref + '.');
    } else {
      atom.notifications.addError('Checkout of ' + ref + ' failed.');
    }
  }
});

var TreeViewGitBranch = document.registerElement('tree-view-git-branch', {
  prototype: prototype,
  'extends': 'li'
});

function treeViewGitBranch() {
  var treeViewGitBranch = new TreeViewGitBranch();

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length) treeViewGitBranch.initialize.apply(treeViewGitBranch, args);
  return treeViewGitBranch;
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lcnNrYWdncy8uYXRvbS9wYWNrYWdlcy90cmVlLXZpZXctZ2l0LWJyYW5jaC9saWIvdHJlZS12aWV3LWdpdC1icmFuY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FCQThFd0IsaUJBQWlCOztRQTdFbEMsb0JBQW9COztvQkFFUyxNQUFNOzt1QkFFVCxZQUFZOztBQUw3QyxXQUFXLENBQUM7O0FBT1osSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRXJELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO0FBQ3ZCLGlCQUFlLEVBQUEsMkJBQUc7OztBQUNoQixRQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLHNCQUFzQixDQUFDLENBQUM7O0FBRWhFLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDOUQsUUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFekMsUUFBSSxDQUFDLFdBQVcsR0FBRyw4QkFDakIsK0JBQWlCLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBQSxLQUFLO2FBQUksTUFBSyxPQUFPLENBQUMsS0FBSyxDQUFDO0tBQUEsQ0FBQyxDQUM5RCxDQUFDO0dBQ0g7O0FBRUQsU0FBTyxFQUFBLG1CQUFHO0FBQ1IsUUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztlQUNhLEVBQUU7QUFBeEMsUUFBSSxDQUFDLFdBQVc7QUFBRSxRQUFJLENBQUMsVUFBVTtHQUNwQzs7QUFFRCxZQUFVLEVBQUEsb0JBQUMsS0FBMkIsRUFBRTtRQUEzQixJQUFJLEdBQU4sS0FBMkIsQ0FBekIsSUFBSTtRQUFFLEtBQUssR0FBYixLQUEyQixD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LWdpdC1icmFuY2gvbGliL3RyZWUtdmlldy1naXQtYnJhbmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5pbXBvcnQgJ29iamVjdC1hc3NpZ24tc2hpbSc7XG5cbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcblxuaW1wb3J0IHsgYWRkRXZlbnRMaXN0ZW5lciB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG52YXIgcHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xuXG5PYmplY3QuYXNzaWduKHByb3RvdHlwZSwge1xuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdsaXN0LWl0ZW0nLCAnZmlsZScsICd0cmVlLXZpZXctZ2l0LWJyYW5jaCcpO1xuXG4gICAgdGhpcy5sYWJlbCA9IHRoaXMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcbiAgICB0aGlzLmxhYmVsLmNsYXNzTGlzdC5hZGQoJ25hbWUnLCAnaWNvbicpO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKFxuICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0aGlzLCAnY2xpY2snLCBldmVudCA9PiB0aGlzLm9uQ2xpY2soZXZlbnQpKVxuICAgICk7XG4gIH0sXG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICBbIHRoaXMuZGlzcG9zYWJsZXMsIHRoaXMucmVwb3NpdG9yeSBdID0gW107XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZSh7IGljb24sIHRpdGxlLCByZXBvc2l0b3J5IH0pIHtcbiAgICB0aGlzLnJlcG9zaXRvcnkgPSByZXBvc2l0b3J5O1xuICAgIHRoaXMuc2V0SWNvbihpY29uKTtcbiAgICB0aGlzLnNldFRpdGxlKHRpdGxlKTtcbiAgfSxcblxuICBzZXRJY29uKGljb24pIHtcbiAgICBpZighaWNvbikgcmV0dXJuO1xuICAgIHRoaXMubGFiZWwuY2xhc3NOYW1lLnJlcGxhY2UoL1xcYmljb24tW15cXHNdKy8sICcnKTtcbiAgICB0aGlzLmxhYmVsLmNsYXNzTGlzdC5hZGQoYGljb24tJHtpY29ufWApO1xuICB9LFxuXG4gIHNldFRpdGxlKHJlZikge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdkYXRhLXJlZicsIHJlZik7XG5cbiAgICB2YXIgWywgcmVtb3RlLCBzaG9ydFJlZl0gPSByZWYubWF0Y2goL3JlZnNcXC8oPzpoZWFkc3x0YWdzfHJlbW90ZXNcXC8oW14vXSspKVxcLyguKykvKTtcbiAgICB0aGlzLmxhYmVsLmlubmVySFRNTCA9IHJlbW90ZSA/IGAke3JlbW90ZX0vJHtzaG9ydFJlZn1gIDogc2hvcnRSZWY7XG5cbiAgICBpZihzaG9ydFJlZiA9PSB0aGlzLnJlcG9zaXRvcnkuZ2V0U2hvcnRIZWFkKCkpIHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgndGV4dC1pbmZvJyk7XG4gICAgfVxuICB9LFxuXG4gIG9uQ2xpY2soZXZlbnQpIHtcbiAgICBmb3IobGV0IGVsZW1lbnQgb2YgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHJlZS12aWV3IC5zZWxlY3RlZCcpKSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG5cbiAgICAvLyBvbmx5IGNoZWNrb3V0IGJyYW5jaCBvbiBkb3VibGUgY2xpY2tcbiAgICBpZihldmVudC5kZXRhaWwgIT0gMikgcmV0dXJuO1xuXG4gICAgZm9yKGxldCBlbGVtZW50IG9mIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRyZWUtdmlldyAudHJlZS12aWV3LWdpdC1icmFuY2gudGV4dC1pbmZvJykpKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3RleHQtaW5mbycpO1xuICAgIH1cbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ3RleHQtaW5mbycpO1xuXG4gICAgdmFyIHJlZiA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLXJlZicpO1xuXG4gICAgaWYodGhpcy5yZXBvc2l0b3J5LmNoZWNrb3V0UmVmZXJlbmNlKHJlZikpIHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRTdWNjZXNzKGBDaGVja291dCAke3JlZn0uYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihgQ2hlY2tvdXQgb2YgJHtyZWZ9IGZhaWxlZC5gKTtcbiAgICB9XG4gIH0sXG59KTtcblxudmFyIFRyZWVWaWV3R2l0QnJhbmNoID0gZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCd0cmVlLXZpZXctZ2l0LWJyYW5jaCcsIHtcbiAgcHJvdG90eXBlLFxuICBleHRlbmRzOiAnbGknLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyZWVWaWV3R2l0QnJhbmNoKC4uLmFyZ3MpIHtcbiAgdmFyIHRyZWVWaWV3R2l0QnJhbmNoID0gbmV3IFRyZWVWaWV3R2l0QnJhbmNoKCk7XG4gIGlmKGFyZ3MubGVuZ3RoKSB0cmVlVmlld0dpdEJyYW5jaC5pbml0aWFsaXplKC4uLmFyZ3MpO1xuICByZXR1cm4gdHJlZVZpZXdHaXRCcmFuY2g7XG59XG4iXX0=
//# sourceURL=/Users/erskaggs/.atom/packages/tree-view-git-branch/lib/tree-view-git-branch.js
