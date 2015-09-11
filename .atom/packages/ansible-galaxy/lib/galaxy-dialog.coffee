path = require 'path'
fs = require 'fs-plus'
Dialog = require './dialog'
{repoForPath, relativizePath} = require './helpers'

module.exports =
class GalaxyDialog extends Dialog
  constructor: (initialPath) ->
    if fs.isFileSync(initialPath)
      directoryPath = path.dirname(initialPath)
    else
      directoryPath = initialPath

    relativeDirectoryPath = directoryPath
    [@rootProjectPath, relativeDirectoryPath] = relativizePath(directoryPath)
    relativeDirectoryPath += path.sep if relativeDirectoryPath.length > 0

    super
      prompt: "Enter the path for the new ansible-galaxy role."
      initialPath: relativeDirectoryPath
      select: false
      iconClass: 'icon-file-directory-create'

  onConfirm: (newPath) ->
    newPath = newPath.replace(/\s+$/, '') # Remove trailing whitespace
    endsWithDirectorySeparator = newPath[newPath.length - 1] is path.sep
    unless path.isAbsolute(newPath)
      unless @rootProjectPath?
        @showError("You must open a directory to create a file with a relative path")
        return

      newPath = path.join(@rootProjectPath, newPath)

    return unless newPath

    @trigger 'directory-chosen', [newPath]
    @cancel()
