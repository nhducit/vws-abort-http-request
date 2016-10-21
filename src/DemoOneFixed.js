/**
 * Created by duc on 10/18/16.
 */
import  React, { PropTypes, Component } from 'react'
import axios from 'axios'
import _debounce from 'lodash/debounce'

class DemoOneFixed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            list: [],
        }
        this.data = {}
    }

    getAutoComplete = ()=> {
        this.data[this.state.query] = []
        const tempData = this.data[this.state.query]
        const requestQuery = this.state.query
        axios.post('http://localhost:3001/firstList', { data: this.state.query })
            .then((successData) => {
                console.log(requestQuery, successData.data)
                successData.data.forEach((item)=> {
                    tempData.push(item)
                })
                this.setState({
                    ...this.state,
                    list: this.data[this.state.query]
                })
            })
    }

    getAutoCompleteDebounced = _debounce(this.getAutoComplete, 500)


    onQueryChange = (e)=> {
        if (e.target.value.trim()) {
            this.setState({
                ...this.state,
                query: e.target.value
            }, ()=> {
                this.getAutoCompleteDebounced()
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
            <div className="page-header">Demo One Fixed</div>
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

export default DemoOneFixed