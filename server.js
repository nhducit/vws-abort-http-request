var express = require('express')
var cors = require('cors')
var app = express();
var R = require('ramda')
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.post('/firstList', fakeRequest)
app.post('/secondList', fakeRequest)

app.get('/product', (req, res)=> {
    setTimeout(()=> {
        const product = R.times((i)=> {
            return `product-${i}`
        }, 10)
        res.send(product)
    }, 300)
})


function fakeRequest(req, res) {
    let result = []
    const requestData = req.body.data
    let timeout = null
    var promise = new Promise((resolve, reject)=> {
        let timeout = 200
        if (requestData === 'abc') {
            timeout = 500
        } else if (requestData === 'bug') {
            timeout = 1000
        } else if (R.contains('BUG', requestData)) {
            timeout = 3000
        } else if (R.contains('BOOM', requestData)) {
            timeout = 10000
        }
        timeout = setTimeout(()=> {
            resolve()
        }, timeout)
        //
        req.on('close', ()=> {
            // request closed unexpectedly
            clearTimeout(timeout)
            reject({ reason: 'requestClosed' })
        })
    })
    promise
        .then(()=> {
            result = R.times((index)=> {
                return `${requestData}-${index}`
            }, 10)
            res.send(result)
        })
        .catch((error)=> {
            if (error.reason === 'requestClosed') {
                console.log('request closed unexpectedly')
            }
        })

}
app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
});