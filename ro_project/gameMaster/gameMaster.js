require('../models/monster.js')
require('../models/player.js')

app.get('/gameMaster', function(req, res){
	res.send('Will show stupid admin menu page')
})

app.get('/gameMaster/createMonster', function(req, res){
	res.sendFile(__dirname + '/createMonster.html')
})

app.post('/gameMaster/checkLogin', function(req, res){
	name = req.body.name
	pass = req.body.password
	Player.findOne({'name' : name, 'password' : pass}, function(err, player){
		if(player){
			res.redirect('/index/'+player.name)
		}
		else{
			res.send('Incorrect Username or Password')
		}
	})
	
})

app.post('/gameMaster/createMonster', function(req, res){
	console.log(req.body.id)
	monster = new Monster({
		_id : req.body.id,
		name : req.body.name,
		healthPoint : req.body.hp,
		attackDamage : req.body.atk,
		experience : req.body.exp,
	})
	monster.save(function(err, result){
		if(err){
			res.send(err)
		}
		else{
			res.send(result)
		}
	})
})

app.get('/gameMaster/createPlayer', function(req, res){
	res.sendFile(__dirname + '/createPlayer.html')
})

app.post('/gameMaster/createPlayer', function(req, res){
	player = new Player({
		name : req.body.name,
		password : req.body.password,
		class : 'Novice',
		status:{
			str : 1,
			agi : 1,
			vit : 1,
			int : 1,
			dex : 1,
			luk : 1
		},
		statusPoint : 48,
		experienceBese : 0,
		experienceJob : 0
	})

	player.save(function(err, result){
		if(err){
			res.send(err)
		}
		else{
			res.send(result)
		}
	})
})