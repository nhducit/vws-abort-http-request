import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DemoOne from './DemoOne'
import DemoOneFixed from './DemoOneFixed'
import SecondDemo from './SecondDemo'
import SecondDemoFixed from './SecondDemoFixed'

const DEMO_ONE = 'DEMO_ONE'
const DEMO_ONE_FIXED = 'DEMO_ONE_FIXED'
const SECOND_DEMO = 'SECOND_DEMO'
const SECOND_DEMO_FIXED = 'SECOND_DEMO_FIXED'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 'DEMO_ONE',
        }
    }

    demoRenderer = () => {
        let demoComponent = null
        if (this.state.currentPage === DEMO_ONE) {
            demoComponent = <DemoOne />
        } else if (this.state.currentPage === DEMO_ONE_FIXED) {
            demoComponent = <DemoOneFixed/>
        } else if (this.state.currentPage === SECOND_DEMO) {
            demoComponent = <SecondDemo/>
        } else if (this.state.currentPage === SECOND_DEMO_FIXED) {
            demoComponent = <SecondDemoFixed/>
        }
        return demoComponent
    }

    changeDemoPage = (page) => {
        this.setState({
            ...this.state,
            currentPage: page
        })
    }

    showFirstDemo = () => {
        this.changeDemoPage(DEMO_ONE)
    }
    showFirstDemoFixed = () => {
        this.changeDemoPage(DEMO_ONE_FIXED)
    }
    showSecondDemo = () => {
        this.changeDemoPage(SECOND_DEMO)
    }
    showSecondDemoFixed = () => {
        this.changeDemoPage(SECOND_DEMO_FIXED)
    }

    render() {
        return (
            <div className="App">
                <div className="App-Container">
                    <h3 className="App-title">
                        Viet Nam Web Summit - 2016
                    </h3>
                    <div className="App-navigation">
                        <button onClick={this.showFirstDemo}>
                            Demo 1
                        </button>
                        <button onClick={this.showFirstDemoFixed}>
                            Demo 1 Fixed
                        </button>
                        <button onClick={this.showSecondDemo}>
                            Demo 2
                        </button>
                        <button onClick={this.showSecondDemoFixed}>
                            Demo 2 Fixed
                        </button>
                    </div>
                    {this.demoRenderer()}
                </div>
            </div>
        );
    }
}

export default App;

// <div className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <h2>Welcome to React</h2>
// </div>
// <p className="App-intro">
//     To get started, edit <code>src/App.js</code> and save to reload.
// </p>