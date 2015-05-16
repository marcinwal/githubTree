describe('homepage',function(){

  var host = 'http://localhost:3000'

  before(function(){
    casper.start(host);
  });

  it('hello Github',function() {
    casper.then(function(){
      expect('body').to.contain.text('Github');
    });
  });


});


describe('startpage',function(){

  var host = 'http://localhost:3000/start'

  before(function(){
    casper.start(host);
  });

  it('hello Github start',function() {
    casper.then(function(){
      expect('body').to.contain.text('Github');
    });
  });

  // it('should click the button',function(){
  //   casper.then(function(){
  //     this.fillSelectors("form[name='userForm']",{
  //       'input#userName' : 'marcinwal',
  //       'input#howDeep' : '1'
  //     };
  //   });
  // });


});