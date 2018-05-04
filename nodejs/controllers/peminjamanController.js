//var Author = require('../models/author');
var db = require('../koneksi.js');

// Display home  of all Authors.
// exports.home = function(req, res) {
//     // res.send('NOT IMPLEMENTED: Book list')
//     res.render('layout',{
//         	'render_view'	:{'model':'buku','view':'home'},
//   			'result'     	:'welcome',
//   		});
// };

// Display list of all Authors.
exports.index = function(req, res) {
	// res.send('NOT IMPLEMENTED: Author All');
  db.query("SELECT * FROM peminjaman a "+
           "inner join  anggota b on a.id_anggota =b.id", function (err, result, fields) {
    if (err) throw err;
  		res.render('layout',{
        'render_view'	 :{'model':'peminjaman','view':'index'},
        'result'     	 :JSON.stringify(result),
  		});
     
  	});
};

// Display detail page for a specific Author.
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.book_create_get = function(req, res) {
    // res.send('NOT IMPLEMENTED: Author create GET');
    db.query("select*from buku where status='1'",function (err, result, fields) {
    if (err) throw err;
    res.render('layout',{
          'render_view' :{'model':'peminjaman','view':'create'},
          'result'      :JSON.stringify(result),
      });
  });
};

// Handle Author create on POST.
exports.book_create_post = function(req, res) {
    // res.send('NOT IMPLEMENTED: Author create POST');
    var judul_buku =req.body.judul_buku ;
    var pengarang =req.body.pengarang ;
    var penerbit =req.body.penerbit ;
    var tahun_terbit =req.body.tahun_terbit ;

    var sql="insert into buku (judul_buku,pengarang,penerbit,tahun_terbit) values ('"+judul_buku+"','"+pengarang+"','"+penerbit+"','"+tahun_terbit+"')";
      db.query(sql, function (err, result) {
      if (err) throw err;
      res.redirect('/buku');
    });  
};

// Display Author delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.book_delete_post = function(req, res) {
	var id= req.body.id_buku;
	var sql="update buku set status='0'  where id="+id+"";
    db.query(sql, function (err, result) {
    if (err) throw err;
    res.redirect('/buku');
  });
};

// Display Author update form on GET.
exports.book_update_get = function(req, res) {
    // res.send('NOT IMPLEMENTED: Author update GET');
  var id=req.params.id;
  var sql="select* from buku where id="+id+"";
    db.query(sql, function(err, result) {
      if (err) {
        throw err;
      }
  res.render('layout',{
            'render_view' :{'model':'buku','view':'update'},
            'result'      :result,
        });
  });
};

// Handle Author update on POST.
exports.book_update_post = function(req, res) {
    // res.send('NOT IMPLEMENTED: Author update POST');
  var id= req.body.id_buku;
  var judul_buku =req.body.judul_buku ;
  var pengarang =req.body.pengarang ;
  var penerbit =req.body.penerbit ;
  var tahun_terbit =req.body.tahun_terbit ;
  var sql="update buku set judul_buku='"+judul_buku+"',pengarang='"+pengarang+"',penerbit='"+penerbit+"',tahun_terbit='"+tahun_terbit+"'  where id="+id+"";
    db.query(sql, function (err, result) {
    if (err) throw err;
    res.redirect('/buku');
  });
};