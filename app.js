var config = require('./config.js'),
    solr = require('solr-client'),
    client = solr.createClient(config.host, config.port, null, config.route),
    express = require('express'),
    app = express(),
    sendgrid  = require('sendgrid')(config.s_u, config.s_p),
    twilio = require('twilio')(config.t_u, config.t_p)

app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/views'));

app.route('/search.json').get(function(req, res){
    var search = req.query.search
    var start = req.query.offset
    var types = req.query.types

    var query = client.createQuery()
                      .q(search)

    if (types) {

        if (Array.isArray(types)) {
            types = types.join(" OR ")    
        }

        query.set('fq=format:(' + encodeURI(types) + ")")
        
    }

    query.start(start)
         .rows(10);

    console.log(query)

    client.search(query, function(err, obj){
        res.send(obj.response)
    })
})

app.route('/email').post(function(req, res){
    var payload   = {
      to      : req.param('email'),
      from    : 'teamlima@columbia.edu',
      subject : 'Message from CLIO',
      text    : req.param('name') + ' \n ' + req.param('location') + ' \n ' + req.param('call')
    }

    sendgrid.send(payload, function(err, json) {
      if (err) { console.error(err); }
      console.log(json); res.end()
    });
})

app.route('/text').post(function(req, res){
    twilio.sendMessage({
        to: '+1' + req.param('number'),
        from: '+15037136288', 
        body: req.param('name') + ' \n ' + req.param('location') + ' \n ' + req.param('call')
    }, function(err, responseData) {
        if (!err) {
            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."
        } else {
            console.log(err)
        }

        res.end()
    });
})
/*
var query = client.createQuery()
                .q({id: 2140607})

client.search(query, function(err, obj){
    console.log(obj.response.docs)
})
*/

app.listen(5000)