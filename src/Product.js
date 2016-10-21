/**
 * Created by duc on 10/21/16.
 */
/**
 * Created by duc on 10/18/16.
 */
import  React, { PropTypes, Component } from 'react'
import axios from 'axios'


class DemoOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
        }
        this.getProduct()
    }

    getProduct = ()=> {
        axios.get('http://localhost:3001/product')
            .then((successData) => {
                this.setState({
                    ...this.state,
                    list: successData.data
                })
            })
    }

    render() {
        return <div>
            <div className="page-header">Product</div>
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