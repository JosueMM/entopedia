const db = require('../config/database').Connection;

exports.get = (req, res, next) => {
    let sql = "SELECT * FROM calendar";
    db.query(sql, (err, calendar) => {
        if (err) return next(err);
        res.json(calendar);
    });
}

exports.save = (req, res, next) => {
    let calendar = req.body;
    let sql = "INSERT INTO calendar SET ?";
    db.query(sql, calendar, (err, calendar) => {
        if (err) return next(err);
        res.json(calendar);
    });
}

exports.get_by_id = (req, res, next) => {
    let sql = "SELECT * FROM calendar WHERE id = ?";
    db.query(sql, req.params.id, (err, calendar) => {
        if (err) return next(err);
        res.json(calendar);
    });
}

exports.update = (req, res, next) => {
    let calendar = req.body;
    let sql = "UPDATE calendar SET ? WHERE id = ?";
    db.query(sql, [calendar, req.params.id], (err, calendar) => {
        if (err) return next(err);
        res.json(calendar);
    });
}

exports.delete = (req, res) => {
    let sql = "DELETE FROM calendar WHERE id = ?";
    db.query(sql, [req.params.id],function (err,calendar) {
        if (err) throw err;
      });
        
    }

    



