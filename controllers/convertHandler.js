function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let regex = /[a-zA-Z]+$/;
    result = input.replace(regex, "");
    //No input #
    if(result.length == 0){return 1;}

    //result should have only numbers, periods, or forward slashes
    const validCharRegex = /[^0-9.\/]/;
    if(validCharRegex.test(result)){return null;} 

    //result should have at most 1 forward slash
    let slashRegex = /\/.*\//;
    if(result.match(slashRegex)){return null;}
    
    //Separate the two numbers if there is a forward slash.
    let slashArray = result.split('\/');

    //Ensure that there is at most 1 period per group, and that each group has atleast one number in it.
    for(let i = 0; i < slashArray.length; i++){if(slashArray[i].split('.').length > 2 || slashArray[i].length == 0 || slashArray[i].length == 1 && slashArray[i].charAt(0) == '.') {return null;}} 
    //Input at this point has has only digits, at most one division, and at most 1 period per side(if there is a division symbol)
    //Coerce groups from strings to numbers.
    if(slashArray.length == 2){result = slashArray[0]/slashArray[1];}
    else {result = slashArray[0] / 1.0 ;}

    if(!isFinite(result)){return null;}
    //return result if it is not infinite.
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let regex = /[a-zA-Z]+$/;
    result = input.match(regex)[0].toLowerCase() || "";
    switch(result) {
      case 'l':
        result = 'L';
      case 'gal':
      case 'mi':
      case 'km':
      case 'lbs':
      case 'kg':
        break;
      default: 
        result = null;
        break;
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = null;
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case 'mi':
        result = "miles";
        break;
      case 'km':
        result = "kilometers";
        break;
      case 'gal':
        result = "gallons";
        break;
      case 'L':
        result = "liters";
        break;
      case 'lbs':
        result = "pounds";
        break;
      case 'kg':
        result = "kilograms";
        break;
      default:
        result = null;
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L': 
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }

    if(parseInt(result) != result) {result = result.toFixed(5);}
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
