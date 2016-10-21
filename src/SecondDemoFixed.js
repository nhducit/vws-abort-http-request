/**
 * Created by duc on 10/18/16.
 */
import  React, { PropTypes, Component } from 'react'
import axios, {CancelToken} from 'axios'

class SecondDemoFixed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            secondQuery: '',
            list: [],
            secondList: [],
        }
        this.firstListToken = CancelToken.source();
        this.secondListToken = CancelToken.source();
    }

    componentWillUnmount() {
        this.firstListToken.cancel('Operation canceled by the user.');
        this.secondListToken.cancel('Operation canceled by the user.');
    }


    getFirstList = (query)=> {
        this.firstListToken.cancel('Operation canceled by the user.');
        this.firstListToken = CancelToken.source();
        return axios.post(
            'http://localhost:3001/firstList',
            { data: query },
            { cancelToken: this.firstListToken.token }
        )
            .then((successData) => {
                this.setState({
                    ...this.state,
                    list: successData.data
                })
            })
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    // handle error
                }
            })
    }


    getSecondList = (query)=> {
        this.secondListToken.cancel('Operation canceled by the user.');
        this.secondListToken = CancelToken.source();
        return axios.post(
            'http://localhost:3001/secondList',
            { data: query },
            { cancelToken: this.secondListToken.token }
        )
            .then((successData) => {
                this.setState({
                    ...this.state,
                    secondList: successData.data
                })
            })
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    // handle error
                }
            })
    }

    onQueryChange = (e)=> {
        if (e.target.value.trim()) {
            this.setState({
                ...this.state,
                query: e.target.value
            }, ()=> {
                this.getFirstList(this.state.query)
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
                this.getSecondList(this.state.secondQuery)
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
            <div className="page-header">Second Demo Fixed</div>
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

export default SecondDemoFixed



