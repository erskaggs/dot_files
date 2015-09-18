Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = treeViewGitRepository;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _treeViewGitBranchListJs = require('./tree-view-git-branch-list.js');

var _treeViewGitBranchListJs2 = _interopRequireDefault(_treeViewGitBranchListJs);

'use babel';

var prototype = {
  initialize: function initialize(repository, projectRootEl) {
    this.repository = repository;
    this.createElements(projectRootEl);
  },

  createElements: function createElements(projectRootEl) {
    var _repository$getReferences = this.repository.getReferences();

    var heads = _repository$getReferences.heads;
    var remotes = _repository$getReferences.remotes;
    var tags = _repository$getReferences.tags;

    this.locals = (0, _treeViewGitBranchListJs2['default'])({
      repository: this.repository,
      icon: 'git-branch',
      title: 'local branches',
      entries: heads
    });
    projectRootEl.parentNode.insertBefore(this.locals, projectRootEl);
    // this.remotes = treeViewGitBranchList({
    //   repository: this.repository,
    //   icon: 'git-branch',
    //   title: 'remote branches',
    //   entries: remotes,
    // });
    // projectRootEl.parentNode.insertBefore(this.remotes, projectRootEl);
    // this.tags = treeViewGitBranchList({
    //   repository: this.repository,
    //   icon: 'tag',
    //   title: 'tags',
    //   entries: tags,
    // });
    // projectRootEl.parentNode.insertBefore(this.tags, projectRootEl);
  },

  destroy: function destroy() {
    this.locals.destroy();
    this.locals.parentNode.removeChild(this.locals);

    // this.remotes.destroy();
    // this.tags.destroy();
    // [ this.locals, this.remotes, this.tags, this.repository ] = [];
    var _ref = [];
    this.locals = _ref[0];
    this.repository = _ref[1];
  },

  update: function update() {
    var _repository$getReferences2 = this.repository.getReferences();

    var heads = _repository$getReferences2.heads;
    var remotes = _repository$getReferences2.remotes;
    var tags = _repository$getReferences2.tags;

    this.locals.setEntries(heads);
    // this.remotes.setEntries(remotes);
    // this.tags.setEntries(tags);
  }
};

function treeViewGitRepository() {
  var treeViewGitRepository = Object.create(prototype);

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length) treeViewGitRepository.initialize.apply(treeViewGitRepository, args);
  return treeViewGitRepository;
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9lcnNrYWdncy8uYXRvbS9wYWNrYWdlcy90cmVlLXZpZXctZ2l0LWJyYW5jaC9saWIvdHJlZS12aWV3LWdpdC1yZXBvc2l0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFtRHdCLHFCQUFxQjs7Ozt1Q0FsRFgsZ0NBQWdDOzs7O0FBRGxFLFdBQVcsQ0FBQzs7QUFHWixJQUFJLFNBQVMsR0FBRztBQUNkLFlBQVUsRUFBQSxvQkFBQyxVQUFVLEVBQUUsYUFBYSxFQUFFO0FBQ3BDLFFBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzdCLFFBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7R0FDcEM7O0FBRUQsZ0JBQWMsRUFBQSx3QkFBQyxhQUFhLEVBQUU7b0NBQ0csSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7O1FBQXhELEtBQUssNkJBQUwsS0FBSztRQUFFLE9BQU8sNkJBQVAsT0FBTztRQUFFLElBQUksNkJBQUosSUFBSTs7QUFDMUIsUUFBSSxDQUFDLE1BQU0sR0FBRywwQ0FBc0I7QUFDbEMsZ0JBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtBQUMzQixVQUFJLEVBQUUsWUFBWTtBQUNsQixXQUFLLEVBQUUsZ0JBQWdCO0FBQ3ZCLGFBQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQyxDQUFDO0FBQ0gsaUJBQWEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7OztHQWVuRTs7QUFFRCxTQUFPLEVBQUEsbUJBQUc7QUFDUixRQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7O2VBQ2IsRUFBRTtBQUFuQyxRQUFJLENBQUMsTUFBTTtBQUFFLFFBQUksQ0FBQyxVQUFVO0dBSS9COztBQUVELFFBQU0sRUFBQSxrQkFBRztxQ0FDd0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUU7O1FBQXhELEtBQUssOEJBQUwsS0FBSztRQUFFLE9BQU8sOEJBQVAsT0FBTztRQUFFLElBQUksOEJBQUosSUFBSTs7QUFDMUIsUUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7OztHQUcvQjtDQUNGLENBQUM7O0FBRWEsU0FBUyxxQkFBcUIsR0FBVTtBQUNyRCxNQUFJLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7O29DQUROLElBQUk7QUFBSixRQUFJOzs7QUFFbkQsTUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLFVBQVUsTUFBQSxDQUFoQyxxQkFBcUIsRUFBZSxJQUFJLENBQUMsQ0FBQztBQUMxRCxTQUFPLHFCQUFxQixDQUFDO0NBQzlCIiwiZmlsZSI6Ii9Vc2Vycy9lcnNrYWdncy8uYXRvbS9wYWNrYWdlcy90cmVlLXZpZXctZ2l0LWJyYW5jaC9saWIvdHJlZS12aWV3LWdpdC1yZXBvc2l0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5pbXBvcnQgdHJlZVZpZXdHaXRCcmFuY2hMaXN0IGZyb20gJy4vdHJlZS12aWV3LWdpdC1icmFuY2gtbGlzdC5qcyc7XG5cbnZhciBwcm90b3R5cGUgPSB7XG4gIGluaXRpYWxpemUocmVwb3NpdG9yeSwgcHJvamVjdFJvb3RFbCkge1xuICAgIHRoaXMucmVwb3NpdG9yeSA9IHJlcG9zaXRvcnk7XG4gICAgdGhpcy5jcmVhdGVFbGVtZW50cyhwcm9qZWN0Um9vdEVsKTtcbiAgfSxcblxuICBjcmVhdGVFbGVtZW50cyhwcm9qZWN0Um9vdEVsKSB7XG4gICAgdmFyIHsgaGVhZHMsIHJlbW90ZXMsIHRhZ3MgfSA9IHRoaXMucmVwb3NpdG9yeS5nZXRSZWZlcmVuY2VzKCk7XG4gICAgdGhpcy5sb2NhbHMgPSB0cmVlVmlld0dpdEJyYW5jaExpc3Qoe1xuICAgICAgcmVwb3NpdG9yeTogdGhpcy5yZXBvc2l0b3J5LFxuICAgICAgaWNvbjogJ2dpdC1icmFuY2gnLFxuICAgICAgdGl0bGU6ICdsb2NhbCBicmFuY2hlcycsXG4gICAgICBlbnRyaWVzOiBoZWFkcyxcbiAgICB9KTtcbiAgICBwcm9qZWN0Um9vdEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMubG9jYWxzLCBwcm9qZWN0Um9vdEVsKTtcbiAgICAvLyB0aGlzLnJlbW90ZXMgPSB0cmVlVmlld0dpdEJyYW5jaExpc3Qoe1xuICAgIC8vICAgcmVwb3NpdG9yeTogdGhpcy5yZXBvc2l0b3J5LFxuICAgIC8vICAgaWNvbjogJ2dpdC1icmFuY2gnLFxuICAgIC8vICAgdGl0bGU6ICdyZW1vdGUgYnJhbmNoZXMnLFxuICAgIC8vICAgZW50cmllczogcmVtb3RlcyxcbiAgICAvLyB9KTtcbiAgICAvLyBwcm9qZWN0Um9vdEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMucmVtb3RlcywgcHJvamVjdFJvb3RFbCk7XG4gICAgLy8gdGhpcy50YWdzID0gdHJlZVZpZXdHaXRCcmFuY2hMaXN0KHtcbiAgICAvLyAgIHJlcG9zaXRvcnk6IHRoaXMucmVwb3NpdG9yeSxcbiAgICAvLyAgIGljb246ICd0YWcnLFxuICAgIC8vICAgdGl0bGU6ICd0YWdzJyxcbiAgICAvLyAgIGVudHJpZXM6IHRhZ3MsXG4gICAgLy8gfSk7XG4gICAgLy8gcHJvamVjdFJvb3RFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLnRhZ3MsIHByb2plY3RSb290RWwpO1xuICB9LFxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5sb2NhbHMuZGVzdHJveSgpO1xuICAgIHRoaXMubG9jYWxzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5sb2NhbHMpO1xuICAgIFsgdGhpcy5sb2NhbHMsIHRoaXMucmVwb3NpdG9yeSBdID0gW107XG4gICAgLy8gdGhpcy5yZW1vdGVzLmRlc3Ryb3koKTtcbiAgICAvLyB0aGlzLnRhZ3MuZGVzdHJveSgpO1xuICAgIC8vIFsgdGhpcy5sb2NhbHMsIHRoaXMucmVtb3RlcywgdGhpcy50YWdzLCB0aGlzLnJlcG9zaXRvcnkgXSA9IFtdO1xuICB9LFxuXG4gIHVwZGF0ZSgpIHtcbiAgICB2YXIgeyBoZWFkcywgcmVtb3RlcywgdGFncyB9ID0gdGhpcy5yZXBvc2l0b3J5LmdldFJlZmVyZW5jZXMoKTtcbiAgICB0aGlzLmxvY2Fscy5zZXRFbnRyaWVzKGhlYWRzKTtcbiAgICAvLyB0aGlzLnJlbW90ZXMuc2V0RW50cmllcyhyZW1vdGVzKTtcbiAgICAvLyB0aGlzLnRhZ3Muc2V0RW50cmllcyh0YWdzKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyZWVWaWV3R2l0UmVwb3NpdG9yeSguLi5hcmdzKSB7XG4gIHZhciB0cmVlVmlld0dpdFJlcG9zaXRvcnkgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG4gIGlmKGFyZ3MubGVuZ3RoKSB0cmVlVmlld0dpdFJlcG9zaXRvcnkuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgcmV0dXJuIHRyZWVWaWV3R2l0UmVwb3NpdG9yeTtcbn1cbiJdfQ==
//# sourceURL=/Users/erskaggs/.atom/packages/tree-view-git-branch/lib/tree-view-git-repository.js
