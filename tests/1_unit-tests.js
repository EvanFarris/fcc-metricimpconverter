const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
	test('Whole number input', function() {
		assert.strictEqual(convertHandler.getNum('7L'), 7);
	});
	test('Decimal number input', function(){
		assert.strictEqual(convertHandler.getNum('3.2mi'), 3.2);
	});
	test('Fractional input', function(){
		assert.strictEqual(convertHandler.getNum('1/2kg'), .5);
	});
	test('Fractional input with a decimal', function(){
		assert.strictEqual(convertHandler.getNum('5.0/2.5mi'), 2);
	});
	test('Double-fraction error', function(){
		assert.isNull(convertHandler.getNum('6/2/6mi'));
	});
	test('No numerical input defaults to 1', function(){
		assert.strictEqual(convertHandler.getNum('kg'), 1);
	});
	test('Read each valid input unit', function(){
		assert.strictEqual(convertHandler.getUnit('2kg'), 'kg');
		assert.strictEqual(convertHandler.getUnit('2mi'), 'mi');
		assert.strictEqual(convertHandler.getUnit('2gal'), 'gal');
		assert.strictEqual(convertHandler.getUnit('2L'), 'L');
		assert.strictEqual(convertHandler.getUnit('2lbs'), 'lbs');
		assert.strictEqual(convertHandler.getUnit('2km'), 'km');
	});
	test('Invalid input error', function(){
		assert.isNull(convertHandler.getUnit('2mdsfklmgklmsdgklm'));
	});
	test('Correct return unit for each valid input unit', function(){
		assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
		assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
		assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
		assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
		assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
		assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
	});
	test('spelled-out-string is valid for every valid input unit', function(){
		assert.strictEqual(convertHandler.getString(1.2, "mi", 1.93121, "km"), "1.2 miles converts to 1.93121 kilometers");
		assert.strictEqual(convertHandler.getString(3, "km", 1.86412, "mi"), "3 kilometers converts to 1.86412 miles");
		assert.strictEqual(convertHandler.getString(72, "kg", 158.73296, "lbs"), "72 kilograms converts to 158.73296 pounds");
		assert.strictEqual(convertHandler.getString(10, "lbs", 4.53592, "kg"), "10 pounds converts to 4.53592 kilograms");
		assert.strictEqual(convertHandler.getString(4.2, "gal", 15.89872, "L"), "4.2 gallons converts to 15.89872 liters");
		assert.strictEqual(convertHandler.getString(20, "L", 5.28344, "gal"), "20 liters converts to 5.28344 gallons");
	});
	test('gal to L', function(){
		assert.strictEqual(convertHandler.getReturnUnit('gal'), "L");
	});
	test('L to gal', function(){
		assert.strictEqual(convertHandler.getReturnUnit('L'), "gal");
	});
	test('mi to km', function(){
		assert.strictEqual(convertHandler.getReturnUnit('mi'), "km");
	});
	test('km to mi', function(){
		assert.strictEqual(convertHandler.getReturnUnit('km'), "mi");
	});
	test('lbs to kg', function(){
		assert.strictEqual(convertHandler.getReturnUnit('lbs'), "kg");
	});
	test('kg to lbs', function(){
		assert.strictEqual(convertHandler.getReturnUnit('kg'), "lbs");
	});
});