const db = require('../config/database').Connection;
const jwt = require('jsonwebtoken');
let config = require('../config/config');

exports.get = (req, res, next) => {
    let sql = "SELECT * FROM users";
    db.query(sql, (err, users) => {
        if (err) return next(err);
        res.json(users);
    });
}

exports.save = (req, res, next) => {

    let user = req.body;
    let sql = "INSERT INTO users SET ?";
    db.query(sql, user, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });


}

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
    //let user = req.body;
    let sql = "UPDATE users SET is_active = 0 WHERE id = ?";
    db.query(sql, req.params.id, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
}


