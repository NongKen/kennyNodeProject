var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/kenny');
app.use(bodyParser.urlencoded({ extended: false }))

var Book = mongoose.model('book', { 
	bookId: { type: String, index: { unique: true }},
	name: String,
	author: String
});

var User = mongoose.model('user', { 
	userId: { type: String, index: { unique: true }},
	book: [],
	money: Number
});

app.get('/admin/book', function(req, res) {
	res.sendFile(__dirname + '/admin.html')
});
app.get('/booking', function(req, res) {
	res.sendFile(__dirname + '/booking.html')
});
app.get('/returning', function(req, res) {
	res.sendFile(__dirname + '/returning.html')
});

////////////// admin add book go link GET:/admin/book
app.post('/admin/book', function(req, res) {
	// Book.find({name: req.params.book_name}, function(err, result){
	// 	if(err){
	// 		console.log(err)
	// 	}
	// 	else{
	// 		res.send(result)
	// 	}
	// })
	book_id = req.body.book_id
	book_name = req.body.book_name
	author = req.body.author_name

	book = new Book({bookId: book_id, name: book_name, author: author})
	book.save(function(err, result){
		if(err){
			res.send(err)
		}
		else{
			res.send("Add "+book_name+" success")
			// setTimeout(function(){
			// 	res.sendFile(__dirname + '/admin.html')
			// 	console.log("asd")
			// },1000);
			
		}
	})
});

///////////////// user call for book list GO GET:/book?number= amount of book user want to call
app.get('/book', function(req, res) {
	var query = Book.find({})
	if(req.param('number')){
		query.limit(parseInt(req.param('number')))
	}
	query.exec(function(err, result){
		if(err){
			console.log(err)
		}
		else{
			res.json(result)
		}
	})


	// Book.find({}, function(err, result){
	// 	if(err){
	// 		console.log(err)
	// 	}
	// 	else{
	// 		res.send(result + req.param('number'))
	// 	}
	// })
});
/////////// go to GET:/booking
app.post('/booking', function(req, res) {
	bookId = req.body.book_id
	userId = req.body.user_id
	Book.findOne({'bookId': bookId}, function(err, bookFind){
		if(err){
			console.log(err)
		}
		else{
			if(bookFind){
				User.findOne({'userId': userId}, function(err, result){
					if(err){
						console.log(err)
					}
					else{
						result.money += 10;
						result.book.push(bookFind)
						result.save(function(err,result){
							if(err){
								res.send(err)
							}
							else{
								res.send('finish booking')
							}
						})
					}
				});
			}
			else{
				res.send('cant find thid book')
			}
			
		}
	});

})

/////////// go to GET:/returning
app.post('/returning', function(req, res) {
	bookId = req.body.book_id
	userId = req.body.user_id
	User.findOne({'userId': userId}, function(err, userFind){
		if(err){
			console.log(err)
		}
		else{
			var temp = 0
			for (x in userFind.book) {
				if (userFind.book[x].bookId == bookId) {
					userFind.money -= 5;
					userFind.book.pull(userFind.book[x]);
					temp = 1
					userFind.save(function(err,result){
						if(err){
							res.send(err)
						}
						else{
							res.send('finish returning')
						}
					})
					break;
				}
			}
			if(temp == 0){
				res.send('you dont borrow this book')
			}

			// User.findOne({'userId': userId}, function(err, result){
			// 	if(err){
			// 		console.log(err)
			// 	}
			// 	else{
			// 		result.money += 5;
			// 		result.book.push(bookFind)
			// 		result.save(function(err,result){
			// 			if(err){
			// 				res.send(err)
			// 			}
			// 			else{
			// 				res.send('ok')
			// 			}
			// 		})
			// 	}
			// });
		}
	});

})

// app.get('/test', function(req, res) {
// 	res.sendFile(__dirname + '/test.html')
// 	console.log("test")
// })

////////////// add user go GET:/adduser?userId=xxxxxxx
app.get('/adduser', function(req, res) {
	userId = req.param('userId')
	money = 0;
	book = [];
	user = new User({userId : userId , book : book , money : money})
	user.save(function(err,result){
		if(err){
			res.send(err)
		}
		else{
			res.send('ok')
		}
	})
})

// app.post('/api/book', function(req, res) {
// 	book_name = req.body.book_name
// 	author = req.body.author
// 	book = new Book({name: book_name, author: author})
// 	book.save(function(err, result){
// 		if(err){
// 			res.send(err)
// 		}
// 		else{
// 			res.send('ok')
// 		}
// 	})
// })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
