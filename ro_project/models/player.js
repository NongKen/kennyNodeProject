mongoose = require('mongoose')
Schema = mongoose.Schema

playerSchema = new Schema({
	name : {type: String, required: true, unique: true},
	password : {type: String, required: true},
	class : {type: String, required: true},
	status:{
		str : {type: Number, required: true},
		agi : {type: Number, required: true},
		vit : {type: Number, required: true},
		int : {type: Number, required: true},
		dex : {type: Number, required: true},
		luk : {type: Number, required: true}
	},
	statusPoint : {type: Number, required: true},
	experienceBese : {type: Number, required: true},
	experienceJob : {type: Number, required: true}
})

playerSchema.pre('save', function(done){
	console.log('player save')
	done()
})

Player = mongoose.model('player', playerSchema)