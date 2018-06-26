/*controller like in php freamwork*/
var getCategories = {};
var db = require('../koneksi.js');
var home_controller = require('../controllers/homeController');


// function(){

        // db.query("SELECT * FROM buku where status=1", function (err, result, fields) {
        //     if (err) throw err;
                 
        //     exports.function_satu=function () {
        //         return JSON.stringify(result);
        //     }
        // });

exports.function_dua=function(data)
{
// var methods = [];
//     db.query('SELECT * FROM buku where status=1', function(err, result)
//     {
//         if (err) 
//             return (err,null);
//         else
//             return result;

//     });

return data;
}
// console.log(function_dua('data'));
// methods.function_dua=function(){
//     console.log('Ini adalah function dua');
// }
 
// // exports.data=methods;
// module.exports.data = methods;
