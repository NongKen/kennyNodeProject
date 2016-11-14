mongoose = require('mongoose')
Schema = mongoose.Schema

userSchema = new Schema({
	userId: { type: String, index: { unique: true }},
	book: [],
	money: Number
});

userSchema.method.checkPermission = function(){
	if(this.money){

	}
}

//static
//method
//pre

userSchema.pre('save', function(done){
	console.log
	done()
})

mongoose.model('User', userSchema)