const db = require('../config/database').Connection;

exports.get = (req, res, next) => {
    let sql = "SELECT * FROM arthropods";
    db.query(sql, (err, arthropods) => {
        if (err) return next(err);
        res.json(arthropods);
    });
}

exports.getSearch = (req, res, next) => {
 
    let sql = "SELECT * FROM arthropods WHERE common_name = ? || order_subphylum = ? || order_subphylum = ? || subphylum = ? || body_size = ?;";
    db.query(sql,[req.params.word,req.params.word,req.params.word,req.params.word,req.params.word], (err, arthropods) => {
        if (err) return next(err);
        res.json(arthropods);
    });
}

exports.getAdvance = (req, res, next) => {
 
    let sql = "SELECT users.name,users.email,arthropods.subphylum, arthropods.order_subphylum, arthropods.scientific_name,arthropods.description,arthropods.common_name,arthropods.insert_date "+
    "FROM arthropods INNER JOIN users ON arthropods.user_id=users.id WHERE subphylum =  ?;";
    db.query(sql,req.params.word, (err, arthropods) => {
        if (err) return next(err);
        res.json(arthropods);
    });
}

exports.save = (req, res, next) => {
    let arthropod = req.body;
    let sql = "INSERT INTO arthropods SET ?";
    db.query(sql, arthropod, (err, arthropod) => {
        if (err) return next(err);
        res.json(arthropod);
        console.log(arthropod);
    });
}

exports.get_by_id = (req, res, next) => {
    let sql = "SELECT * FROM arthropods WHERE id = ?";
    db.query(sql, req.params.id, (err, arthropod) => {
        if (err) return next(err);
        res.json(arthropod);
    });
}

exports.update = (req, res, next) => {
    let arthropod = req.body;
    let sql = "UPDATE arthropods SET ? WHERE id = ?";
    db.query(sql, [arthropod, req.params.id], (err, arthropod) => {
        if (err) return next(err);
        res.json(arthropod);
    });
}


exports.delete = (req, res) => {
    let sql = "DELETE FROM arthropods WHERE id = ?";
    db.query(sql, [req.params.id],function (err,arthropod) {
        if (err) throw err;
      });
        
    }


