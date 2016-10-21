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

app.post('/demo', function (req, res) {
    var result = []
    var requestData = req.body.data
    var promise = new Promise((resolve, reject)=> {
        let timeout = 300
        if (requestData === 'bug') {
            timeout = 1000
        } else if (R.contains('BUG', requestData)) {
            timeout = 3000
        }
        setTimeout(()=> {
            resolve()
        }, timeout)
    })
    promise.then(()=> {
        result = R.times((index)=> {
            return `${requestData}-${index}`
        }, 10)
        res.send(result)
    })
})

app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
});