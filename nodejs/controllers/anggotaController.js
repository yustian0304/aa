//var Author = require('../models/author');
var db = require('../koneksi.js');
var formidable = require('formidable'); //upload file liblary
var fs = require('fs');
var path_new = require('path');
// Display home  of all Authors.
// exports.home = function(req, res) {
//     // res.send('NOT IMPLEMENTED: Book list')
//     res.render('layout',{
//         	'render_view'	:{'model':'anggota','view':'home'},
//   			'result'     	:'welcome',
//   		});
// };

// Display list of all Authors.
exports.index = function(req, res) {
	db.query("SELECT * FROM anggota", function (err, result, fields) {
    if (err) throw err;
  		res.render('layout',{
        'render_view'	 :{'model':'anggota','view':'index'},
        'result'     	:result,
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
    res.render('layout',{
        	'render_view'	:{'model':'anggota','view':'create'},
  			'result'     	:'welcome',
  		});
};

// Handle Author create on POST.
exports.book_create_post = function(req, res) {
    // res.send('NOT IMPLEMENTED: Author create POST');
    // var judul_anggota= req.body.judul_anggota;
    var nama_anggota =req.body.nama_anggota;
    var alamat =req.body.alamat;
    var no_telepon =req.body.no_telepon;
    var foto =req.body.foto;

    var sql="insert into anggota (nama_anggota,alamat,no_telepon,foto) values ('"+nama_anggota+"','"+alamat+"','"+no_telepon+"','"+foto+"')";
      db.query(sql, function (err, result) {
      if (err) throw err;
      res.redirect('/anggota');
    });  
};

// Display Author delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.book_delete_post = function(req, res) {
	var id= req.body.id_anggota;
	var sql="update anggota set status='0'  where id="+id+"";
    db.query(sql, function (err, result) {
    if (err) throw err;
    res.redirect('/anggota');
  });
};

// Display Author update form on GET.
exports.book_update_get = function(req, res) {
    // res.send('NOT IMPLEMENTED: Author update GET');
  var id=req.params.id;
  var sql="select* from anggota where id="+id+"";
    db.query(sql, function(err, result) {
      if (err) {
        throw err;
      }
  res.render('layout',{
            'render_view' :{'model':'anggota','view':'update'},
            'result'      :result,
        });
  });
};

// Handle Author update on POST.
exports.book_update_post = function(req, res) {
    // res.send('NOT IMPLEMENTED: Author update POST');
  var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
      //   // `file` is the name of the <input> field of type `file`
        var old_path = form.openedFiles[0].path,
            file_size = form.openedFiles[0].size,
            file_ext = form.openedFiles[0].name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            file_name = form.openedFiles[0].name,
            new_path = path_new.join(__dirname, '../protect/', file_name);

            fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
                fs.unlink(old_path, function(err) {
                    if (err) {
                        res.status(500);
                        // res.json({'success': false});
                    } else {
                        res.status(200);
                        // res.json({'success': fields.id_anggota});
                        var sql="update anggota set nama_anggota='"+fields.nama_anggota+"',alamat='"+fields.alamat+"',no_telepon='"+fields.no_telepon+"',foto='"+file_name+"'  where id="+fields.id_anggota+"";
                      db.query(sql, function (err, result) {
                        // if (err) throw err;
                      });
                        res.redirect('/anggota');
                    }
                });
            });
        });
    });
};

exports.book_download_file=function(req,res){
  var file = path_new.join(__dirname, '../protect/img_avatar.png');
  res.download(file);
};

    


// app.post('/upload', function(req, res) {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files) {
//         // `file` is the name of the <input> field of type `file`
//         var old_path = files.file.path,
//             file_size = files.file.size,
//             file_ext = files.file.name.split('.').pop(),
//             index = old_path.lastIndexOf('/') + 1,
//             file_name = old_path.substr(index),
//             new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);

//         fs.readFile(old_path, function(err, data) {
//             fs.writeFile(new_path, data, function(err) {
//                 fs.unlink(old_path, function(err) {
//                     if (err) {
//                         res.status(500);
//                         res.json({'success': false});
//                     } else {
//                         res.status(200);
//                         res.json({'success': true});
//                     }
//                 });
//             });
//         });
//     });
// });
