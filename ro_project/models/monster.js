mongoose = require('mongoose')
Schema = mongoose.Schema

monsterSchema = new Schema({
	_id:{type: Number, required: true, unique: true},
	name:{type: String, required: true},
	healthPoint:{type: Number, required: true},
	attackDamage:{type: Number, required: true},
	experience:{type: Number, required: true}
})

Monster = mongoose.model('monster', monsterSchema)