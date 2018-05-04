/*controller like in php freamwork*/
var express = require('express');
// var app=express();
var router = express.Router();
// var bodyParser=require('body-parser');
var book_controller = require('../controllers/bukuController');
var anggota_controller = require('../controllers/anggotaController');
var peminjaman_controller = require('../controllers/peminjamanController');

/*home all*/
router.get('/', book_controller.home);

/*list buku*/
router.get('/buku', book_controller.index);

/*list buku*/
// router.get('/buku', book_controller.book_list);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/buku/create', book_controller.book_create_get);

// POST request for creating Book.
router.post('/buku/create', book_controller.book_create_post);

/*GET one record*/
router.get('/buku/:id', book_controller.book_detail);

// GET request to delete Book.
router.get('/buku/:id/delete', book_controller.book_delete_get);

// POST request to delete Book.
router.post('/buku/:id/delete', book_controller.book_delete_post);

// GET request to update Book.
router.get('/buku/:id/update', book_controller.book_update_get);

// POST request to update Book.
router.post('/buku/:id/update', book_controller.book_update_post);

/*===============ANGGOTA===============*/

/*list anggota*/
router.get('/anggota', anggota_controller.index);

/*list anggota*/
// router.get('/anggota', book_controller.book_list);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/anggota/create', anggota_controller.book_create_get);

// POST request for creating Book.
router.post('/anggota/create', anggota_controller.book_create_post);

/*GET one record*/
router.get('/anggota/:id', anggota_controller.book_detail);

// GET request to delete Book.
router.get('/anggota/:id/delete', anggota_controller.book_delete_get);

// POST request to delete Book.
router.post('/anggota/:id/delete', anggota_controller.book_delete_post);

// GET request to update Book.
router.get('/anggota/:id/update', anggota_controller.book_update_get);

// POST request to update Book.
router.post('/anggota/:id/update', anggota_controller.book_update_post);

// GET request to doenload Book.
router.get('/anggota/:id/download', anggota_controller.book_download_file);


/*===============PEMINJAMAN===============*/

/*list anggota*/
router.get('/peminjaman', peminjaman_controller.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/peminjaman/create', peminjaman_controller.book_create_get);

// // POST request for creating Book.
router.post('/peminjaman/create', peminjaman_controller.book_create_post);

/*GET one record*/
router.get('/peminjaman/:id', peminjaman_controller.book_detail);

// GET request to delete Book.
router.get('/peminjaman/:id/delete', peminjaman_controller.book_delete_get);

// POST request to delete Book.
router.post('/peminjaman/:id/delete', peminjaman_controller.book_delete_post);

// GET request to update Book.
router.get('/peminjaman/:id/update', peminjaman_controller.book_update_get);

// POST request to update Book.
router.post('/peminjaman/:id/update', peminjaman_controller.book_update_post);

// // GET request to doenload Book.
// router.get('/peminjaman/:id/download', peminjaman_controller.book_download_file);

// define the about route
// router.get('/update', function (req, res) {
  // res.render('layout',{
  //     'render_view':'update',
  //     // res.end(fs.statSync({root:path.join(__dirname, './files/',req.params[0]+'.html')})),
  //   });
// })

module.exports = router