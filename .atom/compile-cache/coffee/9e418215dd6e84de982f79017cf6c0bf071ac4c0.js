(function() {
  var getCommands, git;

  git = require('./git');

  getCommands = function() {
    var GitAdd, GitAddAllAndCommit, GitAddAllCommitAndPush, GitAddAndCommit, GitBranch, GitCheckoutAllFiles, GitCheckoutCurrentFile, GitCherryPick, GitCommit, GitCommitAmend, GitDeleteLocalBranch, GitDeleteRemoteBranch, GitDiff, GitDiffAll, GitFetch, GitFetchPrune, GitInit, GitLog, GitMerge, GitPull, GitPush, GitRemove, GitRun, GitShow, GitStageFiles, GitStageHunk, GitStashApply, GitStashDrop, GitStashPop, GitStashSave, GitStatus, GitTags, GitUnstageFiles;
    GitAdd = require('./models/git-add');
    GitAddAllAndCommit = require('./models/git-add-all-and-commit');
    GitAddAllCommitAndPush = require('./models/git-add-all-commit-and-push');
    GitAddAndCommit = require('./models/git-add-and-commit');
    GitBranch = require('./models/git-branch');
    GitDeleteLocalBranch = require('./models/git-delete-local-branch.coffee');
    GitDeleteRemoteBranch = require('./models/git-delete-remote-branch.coffee');
    GitCheckoutAllFiles = require('./models/git-checkout-all-files');
    GitCheckoutCurrentFile = require('./models/git-checkout-current-file');
    GitCherryPick = require('./models/git-cherry-pick');
    GitCommit = require('./models/git-commit');
    GitCommitAmend = require('./models/git-commit-amend');
    GitDiff = require('./models/git-diff');
    GitDiffAll = require('./models/git-diff-all');
    GitFetch = require('./models/git-fetch');
    GitFetchPrune = require('./models/git-fetch-prune.coffee');
    GitInit = require('./models/git-init');
    GitLog = require('./models/git-log');
    GitPull = require('./models/git-pull');
    GitPush = require('./models/git-push');
    GitRemove = require('./models/git-remove');
    GitShow = require('./models/git-show');
    GitStageFiles = require('./models/git-stage-files');
    GitStageHunk = require('./models/git-stage-hunk');
    GitStashApply = require('./models/git-stash-apply');
    GitStashDrop = require('./models/git-stash-drop');
    GitStashPop = require('./models/git-stash-pop');
    GitStashSave = require('./models/git-stash-save');
    GitStatus = require('./models/git-status');
    GitTags = require('./models/git-tags');
    GitUnstageFiles = require('./models/git-unstage-files');
    GitRun = require('./models/git-run');
    GitMerge = require('./models/git-merge');
    return git.getRepo().then(function(repo) {
      var commands;
      git.refresh();
      commands = [];
      commands.push([
        'git-plus:add', 'Add', function() {
          return GitAdd(repo);
        }
      ]);
      commands.push([
        'git-plus:add-all', 'Add All', function() {
          return GitAdd(repo, {
            addAll: true
          });
        }
      ]);
      commands.push([
        'git-plus:log', 'Log', function() {
          return GitLog(repo);
        }
      ]);
      commands.push([
        'git-plus:log-current-file', 'Log Current File', function() {
          return GitLog(repo, {
            onlyCurrentFile: true
          });
        }
      ]);
      commands.push([
        'git-plus:remove-current-file', 'Remove Current File', function() {
          return GitRemove(repo);
        }
      ]);
      commands.push([
        'git-plus:checkout-all-files', 'Checkout All Files', function() {
          return GitCheckoutAllFiles(repo);
        }
      ]);
      commands.push([
        'git-plus:checkout-current-file', 'Checkout Current File', function() {
          return GitCheckoutCurrentFile(repo);
        }
      ]);
      commands.push([
        'git-plus:commit', 'Commit', function() {
          return new GitCommit(repo);
        }
      ]);
      commands.push([
        'git-plus:commit-all', 'Commit All', function() {
          return new GitCommit(repo, {
            stageChanges: true
          });
        }
      ]);
      commands.push([
        'git-plus:commit-amend', 'Commit Amend', function() {
          return GitCommitAmend(repo);
        }
      ]);
      commands.push([
        'git-plus:add-and-commit', 'Add And Commit', function() {
          return GitAddAndCommit(repo);
        }
      ]);
      commands.push([
        'git-plus:add-all-and-commit', 'Add All And Commit', function() {
          return GitAddAllAndCommit(repo);
        }
      ]);
      commands.push([
        'git-plus:add-all-commit-and-push', 'Add All Commit And Push', function() {
          return GitAddAllCommitAndPush(repo);
        }
      ]);
      commands.push([
        'git-plus:checkout', 'Checkout', function() {
          return GitBranch.gitBranches(repo);
        }
      ]);
      commands.push([
        'git-plus:checkout-remote', 'Checkout Remote', function() {
          return GitBranch.gitRemoteBranches(repo);
        }
      ]);
      commands.push([
        'git-plus:new-branch', 'Checkout New Branch', function() {
          return GitBranch.newBranch(repo);
        }
      ]);
      commands.push([
        'git-plus:delete-local-branch', 'Delete Local Branch', function() {
          return GitDeleteLocalBranch(repo);
        }
      ]);
      commands.push([
        'git-plus:delete-remote-branch', 'Delete Remote Branch', function() {
          return GitDeleteRemoteBranch(repo);
        }
      ]);
      commands.push([
        'git-plus:cherry-pick', 'Cherry-Pick', function() {
          return GitCherryPick(repo);
        }
      ]);
      commands.push([
        'git-plus:diff', 'Diff', function() {
          return GitDiff(repo);
        }
      ]);
      commands.push([
        'git-plus:diff-all', 'Diff All', function() {
          return GitDiffAll(repo);
        }
      ]);
      commands.push([
        'git-plus:fetch', 'Fetch', function() {
          return GitFetch(repo);
        }
      ]);
      commands.push([
        'git-plus:fetch-prune', 'Fetch Prune', function() {
          return GitFetchPrune(repo);
        }
      ]);
      commands.push([
        'git-plus:pull', 'Pull', function() {
          return GitPull(repo);
        }
      ]);
      commands.push([
        'git-plus:pull-using-rebase', 'Pull Using Rebase', function() {
          return GitPull(repo, {
            rebase: true
          });
        }
      ]);
      commands.push([
        'git-plus:push', 'Push', function() {
          return GitPush(repo);
        }
      ]);
      commands.push([
        'git-plus:remove', 'Remove', function() {
          return GitRemove(repo, {
            showSelector: true
          });
        }
      ]);
      commands.push([
        'git-plus:reset', 'Reset HEAD', function() {
          return git.reset(repo);
        }
      ]);
      commands.push([
        'git-plus:show', 'Show', function() {
          return GitShow(repo);
        }
      ]);
      commands.push([
        'git-plus:stage-files', 'Stage Files', function() {
          return GitStageFiles(repo);
        }
      ]);
      commands.push([
        'git-plus:unstage-files', 'Unstage Files', function() {
          return GitUnstageFiles(repo);
        }
      ]);
      commands.push([
        'git-plus:stage-hunk', 'Stage Hunk', function() {
          return GitStageHunk(repo);
        }
      ]);
      commands.push([
        'git-plus:stash-save-changes', 'Stash: Save Changes', function() {
          return GitStashSave(repo);
        }
      ]);
      commands.push([
        'git-plus:stash-pop', 'Stash: Apply (Pop)', function() {
          return GitStashPop(repo);
        }
      ]);
      commands.push([
        'git-plus:stash-apply', 'Stash: Apply (Keep)', function() {
          return GitStashApply(repo);
        }
      ]);
      commands.push([
        'git-plus:stash-delete', 'Stash: Delete (Drop)', function() {
          return GitStashDrop(repo);
        }
      ]);
      commands.push([
        'git-plus:status', 'Status', function() {
          return GitStatus(repo);
        }
      ]);
      commands.push([
        'git-plus:tags', 'Tags', function() {
          return GitTags(repo);
        }
      ]);
      commands.push([
        'git-plus:run', 'Run', function() {
          return new GitRun(repo);
        }
      ]);
      commands.push([
        'git-plus:merge', 'Merge', function() {
          return GitMerge(repo);
        }
      ]);
      return commands;
    });
  };

  module.exports = getCommands;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Vyc2thZ2dzLy5hdG9tL3BhY2thZ2VzL2dpdC1wbHVzL2xpYi9naXQtcGx1cy1jb21tYW5kcy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0JBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLE9BQVIsQ0FBTixDQUFBOztBQUFBLEVBRUEsV0FBQSxHQUFjLFNBQUEsR0FBQTtBQUNaLFFBQUEsbWNBQUE7QUFBQSxJQUFBLE1BQUEsR0FBeUIsT0FBQSxDQUFRLGtCQUFSLENBQXpCLENBQUE7QUFBQSxJQUNBLGtCQUFBLEdBQXlCLE9BQUEsQ0FBUSxpQ0FBUixDQUR6QixDQUFBO0FBQUEsSUFFQSxzQkFBQSxHQUF5QixPQUFBLENBQVEsc0NBQVIsQ0FGekIsQ0FBQTtBQUFBLElBR0EsZUFBQSxHQUF5QixPQUFBLENBQVEsNkJBQVIsQ0FIekIsQ0FBQTtBQUFBLElBSUEsU0FBQSxHQUF5QixPQUFBLENBQVEscUJBQVIsQ0FKekIsQ0FBQTtBQUFBLElBS0Esb0JBQUEsR0FBeUIsT0FBQSxDQUFRLHlDQUFSLENBTHpCLENBQUE7QUFBQSxJQU1BLHFCQUFBLEdBQXlCLE9BQUEsQ0FBUSwwQ0FBUixDQU56QixDQUFBO0FBQUEsSUFPQSxtQkFBQSxHQUF5QixPQUFBLENBQVEsaUNBQVIsQ0FQekIsQ0FBQTtBQUFBLElBUUEsc0JBQUEsR0FBeUIsT0FBQSxDQUFRLG9DQUFSLENBUnpCLENBQUE7QUFBQSxJQVNBLGFBQUEsR0FBeUIsT0FBQSxDQUFRLDBCQUFSLENBVHpCLENBQUE7QUFBQSxJQVVBLFNBQUEsR0FBeUIsT0FBQSxDQUFRLHFCQUFSLENBVnpCLENBQUE7QUFBQSxJQVdBLGNBQUEsR0FBeUIsT0FBQSxDQUFRLDJCQUFSLENBWHpCLENBQUE7QUFBQSxJQVlBLE9BQUEsR0FBeUIsT0FBQSxD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

//# sourceURL=/Users/erskaggs/.atom/packages/git-plus/lib/git-plus-commands.coffee
