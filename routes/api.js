'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req,res) => {
    const input = req.query.input || null;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    let result = "";
    //If the number or unit is invalid, send message and end
    if(!initNum || !initUnit) {
      result = "invalid ";
      if(!initNum){result += "number"};
      if(!initUnit) {
        if(result.length > 9){result += " and ";}
        result+="unit";
      }
      res.send(result);
    } else {
      const returnNum = parseFloat(convertHandler.convert(initNum, initUnit));
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: convertHandler.getString(initNum,initUnit,returnNum,returnUnit)
      });
    }
  });

};
