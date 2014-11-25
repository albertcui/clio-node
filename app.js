var solr = require('solr-client'),
    client = solr.createClient('clio-lab.cul.columbia.edu', 8983, null, '/solr-4.2.1/spectrum_lab'),
    express = require('express'),
    app = express()

app.route('/').get(function(req, res){
    client.search('q=potato', function(err, obj){
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
