'use babel'

import {CompositeDisposable} from 'atom'
import fs from 'fs'
import path from 'path'

import json5 from 'json5'


const displayError = (operation, error) => {
    atom.notifications.addError(
        `[package-json5] Error while ${operation}: ${error.message}`
    )
}

const subscriptions = new CompositeDisposable()

export default {
    config: {
        indentation: {
            type: 'integer',
            default: 2,
            minimum: 0,
        },
    },

    activate(state) {
        const indentation = atom.config.get('package-json5.indentation')
        subscriptions.add(atom.project.onDidChangeFiles(events => {
            for (const event of events) {
                const {action, path: filePath} = event

                if (path.basename(filePath) === 'package.json5') {
                    if (action === 'deleted') {

                    }
                    else {
                        console.log('parsing', filePath)
                        fs.readFile(filePath, 'utf8', (error, data) => {
                            if (error) {
                                displayError('reading file', error)
                                return
                            }
                            const pkg = json5.parse(data)
                            fs.writeFile(
                                filePath.replace(/\.json5$/, '.json'),
                                JSON.stringify(pkg, null, indentation),
                                error => {
                                    if (error) {
                                        displayError('save package.json', error)
                                    }
                                }
                            )
                        })
                    }
                }
            }
        }))
    },

    deactivate() {
        subscriptions.dispose()
    },
}
