require('./setup.js')
//call all model
require('./models/monster.js')
require('./models/player.js')


require('./gameMaster/gameMaster.js')
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
})

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
})

app.get('/test', function(req, res){
	num = req.param('num')
	num -= 1
	numFloor = Math.floor(num / 10)
	statPoint = 0

	for (var i = 1; i <= numFloor; i++) {
		statPoint += 10 * (i + 1)
	}
	statPoint += (num % 10) * (numFloor + 2)
	console.log(statPoint)
	res.send(""+statPoint)
})

app.get('/:id/index', function(req, res){
	id = req.param('id');
	Player.findOne({'name' : id}, function(err, player){
		if(player){
			res.send(player)
		}
		else{
			res.send('Dont have this player')
		}
	})

})


app.get('/status/:id', function(req, res){
	id = req.param('id');
	Player.findOne({'name' : id}, function(err, player){
		if(player){
			for (x in player.status) {
				console.log(x)
			}
		}
		else{
			res.send('Dont have this player')
		}
	})
	res.send('Hello ' + id + '<br><br> <a href="/status/' + id +'"> see your status </a>')

})

app.get('/:id/status/upgrade/:stat', function(req, res){
	id = req.params.id;
	stat = req.params.stat;
	Player.findOne({'name' : id}, function(err, player){
		if(player){
			pointToUpStat = Math.floor(player.status[stat] / 10) + 2
			if(pointToUpStat <= player.statusPoint){
				player.status[stat] += 1
				player.statusPoint -= pointToUpStat
				player.save(function(err, result){
					if(err){
						res.send(err)
					}
					else{
						res.send('up status compleate')
					}
				})
			}
			else{
				res.send('you cant up ' + stat + ' you dont have enough status point. you want ' + pointToUpStat + ', but you have ' + player.statusPoint + ' please come again jub jub')
			}
			
		}
		else{
			res.send('Dont have this player')
		}
	})

})

app.get('/:id/atk/:monsterID', function(req, res){
	id = req.params.id;
	monsterID = req.params.monsterID;
	Player.findOne({'name' : id}, function(err, player){
		if(player){
			Monster.findOne({'_id' : monsterID}, function(err, monster){
				if(monster){
					playerAtk = player.status.str * 2

					monster.healthPoint -= playerAtk

					if(monster.healthPoint <= 0){
						player.experienceBese += monster.experience
						monster.remove(function(err, result){
							if(err){
								console.log('monster remove err')
							}
							else{
								console.log('monster die')
							}
						})
					}
					else{
						monster.save(function(err, result){
							if(err){
								console.log('monster save err')
							}
							else{
								console.log('monster arive')
							}
						})
					}
					player.save(function(err, result){
						if(err){
							res.send(err)
						}
						else{
							res.send(player + monster)
						}
					})
				}
				res.send('Dont have this monster_id')
			})
			
		}
		else{
			res.send('Dont have this player')
		}
	})

})

app.listen(3000, function(req, res){
	console.log('connected at port 3000');
})