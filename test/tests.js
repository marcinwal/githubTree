describe('homepage',function(){

  var host = 'http://localhost:3000'

  before(function(){
    casper.start(host);
  });

  it('hello worlds',function() {
    casper.then(function(){
      expect('body').to.contain.text('Github');
    });
  });


});