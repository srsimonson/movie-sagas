const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM movies;`;
    pool.query(sqlText)
    .then(result => {
        res.send(result.rows);
        res.sendStatus(200);
    })
    .catch(error => {
        console.log('ERROR with GET in movie.router', error)
        res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
    let sqlText = `UPDATE movies 
    SET description = '${req.body.description}', title = '${req.body.title}' 
    WHERE id = ${req.params.id};`;
    pool.query(sqlText)
    .then (result => {
        res.sendStatus(200);
        console.log('results', result);
    })
    .catch(error => {
        console.log('ERROR with movie.router PUT /Edit', error);
        res.sendStatus(500);
    })
})

module.exports = router;