var config = require('./config.js'),
    solr = require('solr-client'),
    client = solr.createClient(config.host, config.port, null, config.route),
    express = require('express'),
    app = express()

app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/views'));

app.route('/search.json').get(function(req, res){
    var search = req.query.search
    var start = req.query.offset
    console.log(req.query.types)
    var query = client.createQuery()
                  .q(search)
                  .start(start)
                  .rows(10);

    client.search(query, function(err, obj){
        res.send(obj.response)
    })
})

/*
var query = client.createQuery()
                .q({id: 2140607})

client.search(query, function(err, obj){
    console.log(obj.response.docs)
})
*/

app.listen(5000)

/*  "2140607"  */

http://clio-lab.cul.columbia.edu:8983/solr-4.2.1/spectrum_lab/select?q=hello&fq=format:(%22Music%20-%20Recording%22%20OR%20Book)
var request = client.search('q=hello&facet=on&facet.field=format&fq=format:[Book]', function(err, obj){
    console.log(err)
    console.log(obj)
    // obj.response.docs.forEach(function(doc){
    //     console.log(doc)
    // })
});