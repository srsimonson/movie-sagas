const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id', (req, res) => {
    let sqlText = `
    SELECT genre_id, name, title FROM movies
    JOIN junction ON movies.id = junction.title_id
    JOIN genres ON junction.genre_id = genres.id
    WHERE movies.id = ${req.params.id}`;
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

// router.get('/', (req, res) => {
//     let sqlText = `SELECT * FROM movies;`;
//     pool.query(sqlText)
//     .then(result => {
//         res.send(result.rows);
//         res.sendStatus(200);
//     })
//     .catch(error => {
//         console.log('ERROR with GET in movie.router', error)
//         res.sendStatus(500);
//     })
// })

// router.get('/Details', (req, res) => {
//     let sqlText = `SELECT title, description, name FROM movies
//     JOIN junction ON movies.id = junction.title_id
//     JOIN genres ON junction.genre_id = genres.id
//     WHERE movies.id = 1;`;
//     pool.query(sqlText)
//     .then( result => {
//         res.sendStatus(200);
//         console.log('results', result);
//     })
//     .catch(error => {
//         console.log('ERROR with movie.router GET /details', error);
//         res.sendStatus(500);
//     })
// })

// router.put('/Edit', (req, res) => {
//     let sqlText = `IDK`;
//     pool.query(sqlText)
//     .then (result => {
//         res.sendStatus(200);
//         console.log('results', result);
//     })
//     .catch(error => {
//         console.log('ERROR with movie.router PUT /Edit', error);
//         res.sendStatus(500);
//     })
// })

module.exports = router;