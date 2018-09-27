const db = require('../config/database').Connection;

exports.save = (req, res, next) => {
    let photo = req.body;
    let sql = "INSERT INTO photos SET ?";
    db.query(sql, photo, (err, photo) => {
        if (err) return next(err);
        res.json(photo);
    });
}

/*
exports.get_by_id = (req, res, next) => {
    let sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, req.params.id, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
}

exports.update = (req, res, next) => {
    let user = req.body;
    let sql = "UPDATE users SET ? WHERE id = ?";
    db.query(sql, [user, req.params.id], (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
}

exports.delete = (req, res, next) => {
    let user = req.body;
    let sql = "UPDATE users SET active = ? WHERE id = ?";
    db.query(sql, [user, req.params.id], (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
}
*/


