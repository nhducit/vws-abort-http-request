/**
 * Created by duc on 10/18/16.
 */
import  React, { PropTypes, Component } from 'react'
import axios from 'axios'


class DemoOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            list: [],
        }
    }

    getAutoComplete = ()=> {
        axios.post('http://localhost:3001/demo', { data: this.state.query })
            .then((successData) => {
                this.setState({
                    ...this.state,
                    list: successData.data
                })
            })
    }

    onQueryChange = (e)=> {
        if (e.target.value.trim()) {
            this.setState({
                ...this.state,
                query: e.target.value
            }, ()=> {
                this.getAutoComplete()
            })
        } else {
            this.reset()
        }
    }

    reset = () => {
        this.setState({
            query: '',
            list: [],
        })
    }

    render() {
        return <div>
            <div className="page-header">Demo One</div>
            <input type="text" value={this.state.query} onChange={this.onQueryChange}/>
            <button onClick={this.reset}>reset</button>
            <div className="item-list-container">
                <ul className="item-list-ul">
                    {
                        this.state.list.map((item)=> {
                            return <li className="item-list" key={item}>{item}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
}

export default DemoOne