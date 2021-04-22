let express = require('express')
let router = express.Router() //maps or connects paths in urls to functiosn that run to provide a response
// /api/state-list
// /api/state/fact/Minnesota

let stateData = require('./state_fact.json')
//req = request sent
//res = responce back
router.get('/about', function(req, res, next) {
    return res.json({
        'about': 'This is a state fact API'
    })
})

//route to respond a list of states
router.get('/state-list', function(req, res,next){
    let stateNames = Object.keys(stateData) // array of keys from objects

    res.json(stateNames) //send that data back to the client
    //return some kind of response
    // talk to a database
    // talk to api
    // calculate some kind of response
})

// /fact/Minnesota responds with a fact about Minnesota
// /fact/qwerty responds with 404 State Not Found 
router.get('/fact/:stateName', function(req, res, next){
    let stateName = req.params.stateName 
    let fact = 'This state is home to ' + stateData[stateName]
    if (fact) {
        res.json({ name: stateName, fact: fact })
    } else {
        res.status(404).send('State not found')
    }

    /* To send an error to the error handlers
    next(Error('Oops')) // not in a callback/then/catch
    return next(Error('Oops'))  // from a callback/then/catch
    You'd obviously provide more useful info in the message.
    You may have an error object, for example, from Sequelize, that you can pass to the error handler. 
    */
})

module.exports = router