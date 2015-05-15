var chai = require('chai');               
var expect = chai.expect;  
var casper = require('casperjs');

describe('basic test',function(){
     it('should do simple',function(){
          expect(1+1).to.equal(2);
     });
});