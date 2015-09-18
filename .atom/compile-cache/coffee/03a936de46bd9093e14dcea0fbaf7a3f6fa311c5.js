(function() {
  var TreeViewGitStatusTooltip, path;

  path = require('path');

  module.exports = TreeViewGitStatusTooltip = (function() {
    TreeViewGitStatusTooltip.prototype.tooltip = null;

    TreeViewGitStatusTooltip.prototype.root = null;

    TreeViewGitStatusTooltip.prototype.repo = null;

    TreeViewGitStatusTooltip.prototype.mouseEnterSubscription = null;

    function TreeViewGitStatusTooltip(root, repo) {
      this.root = root;
      this.repo = repo;
      root.header.addEventListener('mouseenter', (function(_this) {
        return function() {
          return _this.onMouseEnter();
        };
      })(this));
      this.mouseEnterSubscription = {
        dispose: (function(_this) {
          return function() {
            _this.root.header.removeEventListener('mouseenter', function() {
              return _this.onMouseEnter();
            });
            return _this.mouseEnterSubscription = null;
          };
        })(this)
      };
    }

    TreeViewGitStatusTooltip.prototype.destruct = function() {
      var repo, root, tooltip, _ref;
      this.destroyTooltip();
      if ((_ref = this.mouseEnterSubscription) != null) {
        _ref.dispose();
      }
      tooltip = null;
      root = null;
      return repo = null;
    };

    TreeViewGitStatusTooltip.prototype.destroyTooltip = function() {
      var _ref;
      return (_ref = this.tooltip) != null ? _ref.dispose() : void 0;
    };

    TreeViewGitStatusTooltip.prototype.generateTooltipContent = function() {
      var branch, container, item, itemElem, itemsContainer, originURL, titleElem, titlesContainer, tooltipItems, workingDir, _base, _base1, _i, _len, _ref, _ref1, _ref2;
      tooltipItems = [];
      branch = (_ref = this.repo.branch) != null ? _ref : null;
      originURL = (_ref1 = typeof (_base = this.repo).getOriginURL === "function" ? _base.getOriginURL() : void 0) != null ? _ref1 : null;
      workingDir = (_ref2 = typeof (_base1 = this.repo).getWorkingDirectory === "function" ? _base1.getWorkingDirectory() : void 0) != null ? _ref2 : null;
      if (branch != null) {
        tooltipItems.push({
          'title': 'Head',
          'content': branch
        });
      }
      if (originURL != null) {
        tooltipItems.push({
          'title': 'Origin',
          'content': originURL
        });
      }
      if (workingDir != null) {
        tooltipItems.push({
          'title': 'Path',
          'content': this.shortenPath(path.normalize(workingDir))
        });
      }
      container = document.createElement('div');
      container.classList.add('git-status-tooltip');
      titlesContainer = document.createElement('div');
      titlesContainer.classList.add('titles-container');
      itemsContainer = document.createElement('div');
      itemsContainer.classList.add('items-container');
      for (_i = 0, _len = tooltipItems.length; _i < _len; _i++) {
        item = tooltipItems[_i];
        titleElem = document.createElement('span');
        titleElem.classList.add('title');
        titleElem.innerText = item.title;
        titlesContainer.appendChild(titleElem);
        if (typeof item.content === 'string') {
          itemElem = document.createElement('span');
          itemElem.classList.add('item');
          itemElem.innerText = item.content;
          itemsContainer.appendChild(itemElem);
        } else if (item.content instanceof HTMLElement) {
          itemsContainer.appendChild(item.content);
        }
      }
      container.appendChild(titlesContainer);
      container.appendChild(itemsContainer);
      return container;
    };

    TreeViewGitStatusTooltip.prototype.onMouseEnter = function() {
      this.destroyTooltip();
      return this.tooltip = atom.tooltips.add(this.root.header, {
        title: this.generateTooltipContent(),
        html: true,
        placement: 'bottom'
      });
    };

    TreeViewGitStatusTooltip.prototype.shortenPath = function(dirPath) {
      var normRootPath, userHome;
      if (process.platform === 'win32') {
        userHome = process.env.USERPROFILE;
      } else {
        userHome = process.env.HOME;
      }
      normRootPath = path.normalize(dirPath);
      if (normRootPath.indexOf(userHome) === 0) {
        return '~' + normRootPath.substring(userHome.length);
      } else {
        return dirPath;
      }
    };

    return TreeViewGitStatusTooltip;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL3RyZWUtdmlldy1naXQtc3RhdHVzL2xpYi90b29sdGlwLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSw4QkFBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUF1QjtBQUNyQix1Q0FBQSxPQUFBLEdBQVMsSUFBVCxDQUFBOztBQUFBLHVDQUNBLElBQUEsR0FBTSxJQUROLENBQUE7O0FBQUEsdUNBRUEsSUFBQSxHQUFNLElBRk4sQ0FBQTs7QUFBQSx1Q0FHQSxzQkFBQSxHQUF3QixJQUh4QixDQUFBOztBQUthLElBQUEsa0NBQUUsSUFBRixFQUFTLElBQVQsR0FBQTtBQUNYLE1BRFksSUFBQyxDQUFBLE9BQUEsSUFDYixDQUFBO0FBQUEsTUFEbUIsSUFBQyxDQUFBLE9BQUEsSUFDcEIsQ0FBQTtBQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBWixDQUE2QixZQUE3QixFQUEyQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFNLEtBQUMsQ0FBQSxZQUFELENBQUEsRUFBTjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTNDLENBQUEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLHNCQUFELEdBQTBCO0FBQUEsUUFBQSxPQUFBLEVBQVMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7QUFDakMsWUFBQSxLQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBYixDQUFpQyxZQUFqQyxFQUErQyxTQUFBLEdBQUE7cUJBQU0sS0FBQyxDQUFBLFlBQUQsQ0FBQSxFQUFOO1lBQUEsQ0FBL0MsQ0FBQSxD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

//# sourceURL=/Users/erskaggs/.atom/packages/tree-view-git-status/lib/tooltip.coffee
