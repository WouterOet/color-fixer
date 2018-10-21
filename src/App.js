import React, { Component } from 'react'
import './App.css'

class App extends Component {

    constructor(props) {
        super(props)
        this.input = React.createRef()
        this.onClick = this.onClick.bind(this)

        this.replacements = [
            { word: "switch", color: "orange" },
            { word: "case", color: "orange" },
            { word: "private", color: "orange" },
            { word: "int", color: "orange" },
            { word: "double", color: "orange" },
            { word: "float", color: "orange" },
            { word: "var", color: "orange" },
            { word: "return", color: "orange" },
            { word: "(", color: "darkgrey" },
            { word: ")", color: "darkgrey" },
            { word: "{", color: "darkgrey" },
            { word: "}", color: "darkgrey" },
            { word: ";", color: "darkgrey" },
            { word: "static", color: "orange" },
            { word: "final", color: "orange" },
            { word: "->", replacement: "⭢" }
        ]

        this.state = {
            text: "",
            log: [],
            logEnabled: false
        }
    }

    onClick = (e) => {
        let replaced = e.clipboardData.getData('Text')
        replaced = replaced.replace(new RegExp('\n', 'g'), "<br>")
        replaced = replaced.replace(new RegExp(' ', 'g'), "PLACEHOLDER")

        let log = []
        for (let replacement of this.replacements) {
            if (replacement.color)
                replaced = replaced.replace(new RegExp(this.escapeRegExp(replacement.word), 'g'), "<span style=\"color: " + replacement.color + "\">" + replacement.word + "</span>")
            else {
                replaced = replaced.replace(new RegExp(this.escapeRegExp(replacement.word), 'g'), replacement.replacement)
            }
            log.push(replaced)
        }

        replaced = replaced.replace(new RegExp('PLACEHOLDER', 'g'), "&nbsp;")
        log.push(replaced)

        this.setState({
            text: replaced,
            log
        })
    }

    escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
    }

    render() {
        return (
            <div style={{margin: "10px"}}>
                <div className="App" style={ { display: "flex" } }>
                    <div style={ { flex: "1 1 auto" } }>
                        <textarea onPaste={ this.onClick } ref={ this.input }
                                  style={ { width: "100%", height: "400px" } } />
                    </div>
                    <div style={ { flex: "1 1 auto", textAlign: "left", paddingLeft: "20px" } }>
                        <code dangerouslySetInnerHTML={ { __html: this.state.text } } />
                    </div>
                </div>
                { this.state.logEnabled && <div>
                    { this.state.log.map(entry => (
                        <div dangerouslySetInnerHTML={ { __html: entry } } />
                    )) }
                </div> }
            </div>
        )
    }
}

export default App
