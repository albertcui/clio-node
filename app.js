var config = require('./config.js'),
    solr = require('solr-client'),
    client = solr.createClient(config.host, config.port, null, config.route),
    express = require('express'),
    app = express()

app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/views'));

app.route('/search.json').get(function(req, res){
    var search = req.query.search

    var query = client.createQuery()
                  .q(search)
                  .start(0)
                  .rows(10);

    client.search(query, function(err, obj){
        res.send(obj.response.docs)
    })
})

app.listen(5000)

/*                 
var request = client.search('q=hello', function(err, obj){
    obj.response.docs.forEach(function(doc){
        console.log(doc)
    })
});

request.setTimeout(200, function(){
    console.log('search timeout');
});

*/
