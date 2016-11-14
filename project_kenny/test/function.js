expect = require('expect.js')
sum = require('../test')

describe('function sum', function() {
	it('should calculate correctly', function(done){
		result = sum(5, 9)
		expect(result).to.equal(14)
		done()
	})
})
