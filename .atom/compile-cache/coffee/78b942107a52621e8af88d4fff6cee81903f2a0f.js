(function() {
  var TaskPool, os,
    __slice = [].slice;

  os = require('os');

  TaskPool = (function() {
    TaskPool.prototype.liveCount = 0;

    TaskPool.prototype.tasks = [];

    TaskPool.prototype.working = false;

    function TaskPool(size) {
      this.size = size != null ? size : 4;
    }

    TaskPool.prototype.run = function() {
      var interval, work;
      this.working = true;
      interval = null;
      work = (function(_this) {
        return function() {
          var args, callback, task, _ref;
          if (!_this.working) {
            return clearInterval(interval);
          }
          if (_this.liveCount >= _this.size) {
            return;
          }
          if (!_this.tasks.length) {
            return _this.stop();
          }
          _ref = _this.tasks.shift(), task = _ref.task, args = _ref.args, callback = _ref.callback;
          task.on('result', callback);
          _this.liveCount++;
          return task.start.apply(task, __slice.call(args).concat([function() {
            return _this.liveCount--;
          }]));
        };
      })(this);
      return interval = setInterval(work, 10);
    };

    TaskPool.prototype.stop = function() {
      return this.working = false;
    };

    TaskPool.prototype.add = function() {
      var args, callback, task, _i;
      task = arguments[0], args = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), callback = arguments[_i++];
      this.tasks.push({
        task: task,
        args: args,
        callback: callback
      });
      if (!this.working) {
        return this.run();
      }
    };

    return TaskPool;

  })();

  module.exports = new TaskPool(Math.max(os.cpus().length - 2, 1));

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wcm9qZWN0cy9saWIvdGFzay1wb29sLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxZQUFBO0lBQUEsa0JBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBRU07QUFDSix1QkFBQSxTQUFBLEdBQVcsQ0FBWCxDQUFBOztBQUFBLHVCQUNBLEtBQUEsR0FBTyxFQURQLENBQUE7O0FBQUEsdUJBRUEsT0FBQSxHQUFTLEtBRlQsQ0FBQTs7QUFJYSxJQUFBLGtCQUFFLElBQUYsR0FBQTtBQUFXLE1BQVYsSUFBQyxDQUFBLHNCQUFBLE9BQUssQ0FBSSxDQUFYO0lBQUEsQ0FKYjs7QUFBQSx1QkFNQSxHQUFBLEdBQUssU0FBQSxHQUFBO0FBQ0gsVUFBQSxjQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQVgsQ0FBQTtBQUFBLE1BQ0EsUUFBQSxHQUFXLElBRFgsQ0FBQTtBQUFBLE1BR0EsSUFBQSxHQUFPLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDTCxjQUFBLDBCQUFBO0FBQUEsVUFBQSxJQUFBLENBQUEsS0FBdUMsQ0FBQSxPQUF2QztBQUFBLG1CQUFPLGFBQUEsQ0FBYyxRQUFkLENBQVAsQ0FBQTtXQUFBO0FBQ0EsVUFBQSxJQUFVLEtBQUMsQ0FBQSxTQUFELElBQWMsS0FBQyxDQUFBLElBQXpCO0FBQUEsa0JBQUEsQ0FBQTtXQURBO0FBRUEsVUFBQSxJQUFBLENBQUEsS0FBdUIsQ0FBQSxLQUFLLENBQUMsTUFBN0I7QUFBQSxtQkFBTyxLQUFDLENBQUEsSUFBRCxDQUFBLENBQVAsQ0FBQTtXQUZBO0FBQUEsVUFJQSxPQUF5QixLQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsQ0FBQSxDQUF6QixFQUFDLFlBQUEsSUFBRCxFQUFPLFlBQUEsSUFBUCxFQUFhLGdCQUFBLFFBSmIsQ0FBQTtBQUFBLFVBS0EsSUFBSSxDQUFDLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLFFBQWxCLENBTEEsQ0FBQTtBQUFBLFVBT0EsS0FBQyxDQUFBLFNBQUQsRUFQQSxDQUFBO2lCQVFBLElBQUksQ0FBQyxLQUFMLGFBQVcsYUFBQSxJQUFBLENBQUEsUUFBUyxDQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsU0FBRCxHQUFIO1VBQUEsQ0FBQSxDQUFULENBQVgsRUFUSztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBSFAsQ0FBQTthQWNBLFFBQUEsR0FBVyxXQUFBLENBQVksSUFBWixFQUFrQixFQUFsQixFQWZSO0lBQUEsQ0FOTCxDQUFBOztBQUFBLHVCQXVCQSxJQUFBLEdBQU0sU0FBQSxHQUFBO2FBQ0osSUFBQyxDQUFBLE9BQUQsR0FBVyxNQURQO0lBQUEsQ0F2Qk4sQ0FBQTs7QUFBQSx1QkEwQkEsR0FBQSxHQUFLLFNBQUEsR0FBQTtBQUNILFVBQUEsd0JBQUE7QUFBQSxNQURJLHFCQUFNLHFHQUFTLDBCQUNuQixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWTtBQUFBLFFBQUMsTUFBQSxJQUFEO0FBQUEsUUFBTyxNQUFBLElBQVA7QUFBQSxRQUFhLFVBQUEsUUFBYjtPQUFaLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBQSxDQUFBLElBQWUsQ0FBQSxPQUFmO2VBQUEsSUFBQyxDQUFBLEdBQUQsQ0FBQSxFQUFBO09BRkc7SUFBQSxDQTFCTCxDQUFBOztvQkFBQTs7TUFIRixDQUFBOztBQUFBLEVBaUNBLE1BQU0sQ0FBQyxPQUFQLEdBQ00sSUFBQSxRQUFBLENBQVMsSUFBSSxDQUFDLEdBQUwsQ0FBUyxFQUFFLENBQUMsSUFBSCxDQUFBLENBQVMsQ0FBQyxNQUFWLEdBQW1CLENBQTVCLEVBQStCLENBQS9CLENBQVQsQ0FsQ04sQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/erskaggs/.atom/packages/git-projects/lib/task-pool.coffee
