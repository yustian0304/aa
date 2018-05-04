var express=require('express');
var app=express();
var path=require('path');
var flash = require('connect-flash-plus');
var sessions=require('express-session');
var cookieParser=require('cookie-parser');


app.use(sessions({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 },
  resave:false,
  saveUninitialized:true
}));
 
app.use(flash())

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// var fs=require('fs');
var bodyParser=require('body-parser');
var buku = require('./router/route');
// var router=express.Router();
// var session;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(cookieParser());
// app.use(sessions({
// 	secret:'^&*^&#(&#&##&(!fgs',
// 	resave:false,
// 	saveUninitialized:true
// }));


app.set('view engine', 'ejs');
app.use('/',buku);
app.use('/buku',buku);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('error');
});

// app.use('/update',buku);


// app.get('/login',function(req,res){
// 	db.query("SELECT * FROM buku", function (err, result, fields) {
//     if (err) throw err;
// 		res.render('index',{
// 			'result':result,
// 		});
//   });
// });

// app.post('/login',function(req,res){
// 	// res.end(JSON.stringify(req.body));
// 	session=req.session;
// 	if(req.body.username=='admin' && req.body.password=='admin'){
// 		session.uniqueID=req.body.username;
// 	res.redirect('/redirects');
// 	}else{
// 		req.session.destroy();
// 		res.redirect('/login');
// 	}
	
// });

// app.get('/redirects',function(req,res){
// 	if(session.uniqueID){
// 		res.end('halaman admin'+session.uniqueID);
// 	}else{
// 		res.end('who are you');
// 	}
// });

// app.get(/^(.+)$/,function(req,res){
// 	// console.log(fs.statSync({root:path.join(__dirname, './files/',req.params[0]+'.html')}));
// 	try{
// 		if (fs.statSync(path.join(__dirname, './files/',req.params[0]+'.html')).isFile()) {
// 			res.cookie('mycookie','myFirstCookie')
// 			res.sendFile(req.params[0]+'.html',{root :path.join(__dirname, './files')});
// 		}
// 	}catch(err){
// 		res.sendFile('404.html',{root :path.join(__dirname, './files')});
// 	}
// });
app.listen(3000,function(){
console.log('running in port 3000');
// console.log(__dirname);
});