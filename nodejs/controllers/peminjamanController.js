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
  db.query("SELECT a.*,b.nama_anggota FROM peminjaman a "+
           "inner join  anggota b on a.id_anggota =b.id", function (err, result, fields) {
    if (err) throw err;
  		res.render('layout',{
        'render_view'	 :{'model':'peminjaman','view':'index','msg':req.flash('info')},
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

      db.query("select*from anggota where status='1'",function (err, result_anggota, fields) {
      if (err) throw err;
        res.render('layout',{
              'render_view' :{'model':'peminjaman','view':'create'},
              'result'      :JSON.stringify(result),
              'resultAnggota'      :JSON.stringify(result_anggota),
          });
      // return JSON.stringify(result);
    // console.log(result_anggota);
      });
  }); 
};

// Handle Author create on POST.
exports.book_create_post = function(req, res) {
    // res.send('NOT IMPLEMENTED: Author create POST');
    var id =req.body.id ;
    var judul_buku =req.body.judul_buku ;
    var jumlah =req.body.jumlah ;
    var id_anggota =req.body.id_anggota ;
    var tanggal =req.body.tanggal ;
    var no_faktur =req.body.no_faktur ;
    /*jumlah buku yang di pinjam*/
    var counter=req.body.id.length;
    // console.log(req.body.jumlah[1]);

    var sql="insert into peminjaman (tanggal,no_faktur,id_anggota) values ('"+tanggal+"','"+no_faktur+"','"+id_anggota+"')";
      db.query(sql, function (err, result) {
      if (err) throw err;
      for (var i = 0; i < counter; i++) {
          var sql_detail="insert into peminjaman_detail (id_buku,id_peminjaman,judul_buku,jumlah) values ('"+req.body.id[i]+"','"+req.body.id[i]+"','"+req.body.judul_buku[i]+"','"+req.body.jumlah[i]+"')";
              db.query(sql_detail, function (err, result) {
              if (err) throw err;
              });
      }
      res.redirect('/peminjaman');

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
 db.query("select a.*, b.nama_anggota from peminjaman a  inner join anggota b on a.id_anggota=b.id where a.id=1",function (err, result) {
    if (err) throw err;

      db.query("select a.*,c.pengarang,c.penerbit from peminjaman_detail a"+
              " inner join peminjaman b on a.id_peminjaman=b.id"+
              " inner join buku c on a.id_buku=c.id"+
              " where id_peminjaman="+id+"",function (err, result_buku) {
      if (err) throw err;
        res.render('layout',{
              'render_view' :{'model':'peminjaman','view':'update','msg':req.flash('info')},
              'result'      :result,
              'resultBuku'  :JSON.stringify(result_buku),
          });
      // return JSON.stringify(result);
    // console.log(result_anggota);
      });
  }); 
}

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