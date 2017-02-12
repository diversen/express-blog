const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const conf = require('config'); 

var db;

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect(conf.mongoUrl, (err, database) => {
	if (err) return console.log(err)
	db = database
	app.listen(3000, () => {
	console.log('listening on 3000')
	})
})

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err)
		console.log('saved to database')
		res.redirect('/')
	})
})

app.get('/es6', (req, res) => {
	res.send('hello world ES6')
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})
