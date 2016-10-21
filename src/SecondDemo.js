/**
 * Created by duc on 10/18/16.
 */
import  React, { PropTypes, Component } from 'react'
import axios from 'axios'


class SecondDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            secondQuery: '',
            list: [],
            secondList: [],
        }
    }

    getAutoComplete = (query)=> {
        return axios.post('http://localhost:3001/firstList', { data: query })
    }

    onQueryChange = (e)=> {
        if (e.target.value.trim()) {
            this.setState({
                ...this.state,
                query: e.target.value
            }, ()=> {
                this.getAutoComplete(this.state.query)
                    .then((successData) => {
                        this.setState({
                            ...this.state,
                            list: successData.data
                        })
                    })
            })
        } else {
            this.reset()
        }
    }

    onSecondQueryChange = (e)=> {
        if (e.target.value.trim()) {
            this.setState({
                ...this.state,
                secondQuery: e.target.value
            }, ()=> {
                this.getAutoComplete(this.state.secondQuery)
                    .then((successData) => {
                        this.setState({
                            ...this.state,
                            secondList: successData.data
                        })
                    })
            })
        } else {
            this.reset()
        }
    }

    reset = () => {
        this.setState({
            ...this.state,
            query: '',
            list: [],
        })
    }

    resetSecondList = () => {
        this.setState({
            ...this.state,
            secondQuery: '',
            secondList: [],
        })
    }
    render() {
        return <div>
            <div className="page-header">Second Demo</div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <input type="text" value={this.state.query} onChange={this.onQueryChange}/>
                    <button onClick={this.reset}>reset</button>
                    <div className="item-list-container">
                        <div>
                            First List
                            <ul className="item-list-ul">
                                {
                                    this.state.list.map((item)=> {
                                        return <li className="item-list" key={item}>{item}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <input type="text" value={this.state.secondQuery} onChange={this.onSecondQueryChange}/>
                    <button onClick={this.resetSecondList}>reset</button>
                    <div className="item-list-container">
                        <div>
                            Second List
                            <ul className="item-list-ul">
                                {
                                    this.state.secondList.map((item)=> {
                                        return <li className="item-list" key={item}>{item}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default SecondDemo