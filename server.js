const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const conf = require('config'); 

var db;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

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

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, result) => {
		if (err) return console.log(err)
		// renders index.ejs
		res.render('index.ejs', {quotes: result})
	})
})
