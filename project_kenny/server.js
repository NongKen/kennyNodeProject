express = require('express')
app = express()
mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/kenny');
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

Book = mongoose.model('book', { 
	bookId: { type: String, index: { unique: true }},
	name: String,
	author: String
});
require('./models/User')
User = mongoose.model('User')

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
		}
	})
});

///////////////// user call for book list GO GET:/book?number= amount of book user want to call
app.get('/book', function(req, res) {
	var query = Book.find({})
	amount = parseInt(req.param('number')) //amount book show

	if(amount){
		query.limit(amount)
	}

	//add callback
	query.exec(function(err, result){
		if(err){
			console.log(err)
		}
		else{
			res.json(result)
		}
	})

});
/////////// go to GET:/booking
app.post('/booking', function(req, res) {

	bookId = req.body.book_id
	userId = req.body.user_id

	// query book by bookId
	Book.findOne({'bookId': bookId}, function(err, book){
		if(err){
			console.log(err)//can't find bookId
			res.send('error please try again')
		}
		else{
			if(book){
				// query user for add book in user booking list
				User.findOne({'userId': userId}, function(err, user){
					if(err){
						console.log(err)//can't find userId
					}
					else{
						user.money += 10;
						user.book.push(book)//add book in list book
						user.save(function(err,result){
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

	// qury user
	User.findOne({'userId': userId}, function(err, user){
		if(err){
			console.log(err)
		}
		else{
			var isBookInList = false
			bookList = user.book
			for (index in bookList) {
				if (bookList[index].bookId == bookId) { //find bookId from List
					user.money -= 5;
					bookList.splice(index, 1)//remove book from list
					user.book = bookList
					isBookInList = true
					user.save(function(err, result){
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
			if(isBookInList){
				res.send('you dont borrow this book')
			}
		}
	});

})


////////////// add user go GET:/adduser?userId=xxxxxxx
app.get('/adduser', function(req, res) {
	userId = req.param('userId')
	money = 0
	book = []
	user = new User({userId: userId , book: book, money : money})
	user.save(function(err,result){
		if(err){
			res.send(err)
		}
		else{
			res.send('ok')
		}
	})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
