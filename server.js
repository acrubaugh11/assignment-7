//server.js
"use strict";
const express = require("express");

const app = express();

const multer = require("multer");

app.use(multer().none());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));


require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});


app.get("/jokebook/categories", async function (req, res) {
    try {
        let queryText = "SELECT * FROM categories;"
        const result = await pool.query(queryText);
        res.json(result.rows);
    }
    catch(err){
        console.error(err);
    }
});

app.get("/jokebook/category/:category", async function (req, res) {
    let category = req.params.category;
    // let limit = parseInt(req.query.limit);
    let categories = ['funnyJoke', 'lameJoke', 'funnyjoke', 'lamejoke'];
    if (categories.includes(category)){
        let values = [category];
        let queryText = "SELECT j.* FROM jokes j JOIN categories c ON j.category_id = c.id WHERE c.name = $1 ";
        // if(limit){
        //     queryText += " AND limit <= $2";
        //     values.push(limit);
        // }
        try{
            const result = await pool.query(queryText, values);
            res.json(result.rows);

        }catch(err){
            res.status(500).send("Server error!");
            console.error(err);
        }
    }
    else {
        res.status(400).send("Invalid category type!!")
    }
});

app.get("/jokebook/random", async function (req, res){
    try{
        let queryText = "SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1;";
        const result = await pool.query(queryText);
        res.json(result.rows[0]);
    }catch(err){
        res.status(500).send("Server Error!")
        console.error(err);
    }
});

app.post("/jokebook/add", async function (req, res){
    let category = parseInt(req.body.category_id);
    let setup = req.body.setup;
    let delivery = req.body.delivery;
    if(category && setup && delivery){
        let queryText = "INSERT INTO jokes (category_id, setup, delivery) VALUES ($1, $2, $3) RETURNING *";
        let values = [category, setup, delivery];
        try{
            const result = await pool.query(queryText, values);
            res.json(result.rows);
        }catch(err) {
            res.status(500).send("Server errror!!")
            console.error(err);
        }
    } else{
        res.status(400).send("Missing params!!")
    }
});