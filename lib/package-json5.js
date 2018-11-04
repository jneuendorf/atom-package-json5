'use babel'

import PackageJson5View from './package-json5-view'
import {
    CompositeDisposable
} from 'atom'

export default {

    packageJson5View: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable()

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'package-json5:generate': () => this.generate()
        }))
    },

    deactivate() {
        this.subscriptions.dispose()
    },

    serialize() {
        return {
            packageJson5ViewState: this.packageJson5View.serialize()
        }
    },

    generate() {
        console.log('PackageJson5 was toggled!')
        return (
            this.modalPanel.isVisible() ?
            this.modalPanel.hide() :
            this.modalPanel.show()
        )
    }

}
