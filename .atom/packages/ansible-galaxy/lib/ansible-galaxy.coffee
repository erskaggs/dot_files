GalaxyDialog = null  # Defer requiring until actually needed

module.exports =

  config:
    ansiblePath:
      type: 'string'
      default: '/usr/local/bin/'

  activate: ->
    console.log "ansible-galaxy activated"
    atom.commands.add 'atom-workspace',
      'ansible-galaxy:init',
      => @init()

  init: ->
    atom
      .packages
      .activatePackage('tree-view')
      .then (treeViewPackage) ->
        treeView = treeViewPackage.mainModule.treeView
        selectedPath = treeView.selectedPath
        console.log "selectPath:" + selectedPath

        GalaxyDialog ?= require './galaxy-dialog'
        dialog = new GalaxyDialog(selectedPath)

        dialog.on 'directory-chosen', (event, chosenPath) ->
          console.log "directory chosen", chosenPath
          # Execute command here

          exec = require('child_process').exec

          child = exec(atom.config.get('ansible-galaxy').ansiblePath + 'ansible-galaxy init' + ' ' + chosenPath, {}, (error, stdout, stderr) ->
                console.log "stdout: " + stdout
                console.log "stderr: " + stderr
                console.log "exec error: " + error  if error isnt null
                return
          )

          false

        dialog.attach()
