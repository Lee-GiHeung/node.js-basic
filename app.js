var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/form', function(req, res){
    res.render('form');
});
app.get('/form_receiver', function(req, res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);
});
app.post('/form_receiver', function(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+','+description);
}); 
app.get('/topic/:id', function(req, res){
    var topics = [
        'JavaScript is...',
        'NodeJs is...',
        'Express is...'
    ];
    var output = `
    <a href="/topic/0">JavaScript</a><br>
    <a href="/topic/1">NodeJs</a><br>
    <a href="/topic/2">Express</a><br><br>
    ${topics[req.params.id]}
    `
    res.send(output);
});
app.get('/topic/:id/:mode', function(req, res){
    res.send(req.params.id+','+req.params.mode)
});

app.get('/template', function(req, res) {
    res.render('temp', {time:Date(), title:'Jade'}); 
    /* 
        /template 경로를 통해서 들어온 사용자에게 
        function이 실행이 되면서 temp 템플릿 파일을
        웹 페이지로 렌더링해서 전송
    */
});

app.get('/', function(req, res){
    res.send('<h2>Hello home page</h2>');
});
app.get('/dynamic', function(req, res) {
    var lis = '';
    for(var i=0; i<5; i++) {
        lis = lis + '<li>coding</li>';
    }
    var time = Date();
    var output = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title></title>
        </head>
        <body>
            Hello, Dynamic!
            <ul>
                ${lis}
            </ul> 
            ${time}
        </body>
    </html>`; 
    res.send(output);
});
app.get('/route', function(req, res) {
    res.send('Hello Router, <img src="/route/ex.png">')
});
app.get('/login', function(req, res){
    res.send('<h1>Login please</h1>');
});
app.listen(3001, function(){
    console.log('Conneted 3001 port!');
});