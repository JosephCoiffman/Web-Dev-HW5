var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 0530);

app.get('/get-or-post',function(req,res){
  var params = [];
  for (var p in req.query){
    params.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataTable = params;
  res.render('get', context);
});

app.post('/get-or-post', function(req,res){
  var badyParams = [];
  for (var p in req.query){
    params.push({'name':p,'value':req.query[p]})
  }
  for (var p in req.body){
    bodyParams.push({'name':p,'value':req.body[p]})
  }
  console.log(bodyParams);
  console.log(req.body);
  var context = {};
  context.dataTable = params;
  context.bodyTable = bodyParams;
  res.render('post', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});