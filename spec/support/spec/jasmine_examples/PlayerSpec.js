


var myReporter = {

  jasmineStarted: function(suiteInfo) {

    console.log('Running suite with '
      + suiteInfo.totalSpecsDefined);
  },

  suiteStarted: function(result) {

    console.log('Suite started: '
      + result.description
      + ' whose full description is: '
      + result.fullName);
  },

  specStarted: function(result) {

    console.log('Spec started: '
      + result.description
      + ' whose full description is: '
      + result.fullName);
  },

  specDone: function(result) {

    console.log('Spec: '
      + result.description
      + ' was '
      + result.status);

    for(var i = 0; i < result.failedExpectations.length; i++) {

      console.log('Failure: '
        + result.failedExpectations[i].message);
      console.log(result.failedExpectations[i].stack);
    }

    console.log(result.passedExpectations.length);
  },

  suiteDone: function(result) {

    console.log('Suite: '
      + result.description
      + ' was '
      + result.status);
    for(var i = 0; i < result.failedExpectations.length; i++) {

      console.log('Suite '
        + result.failedExpectations[i].message);
      console.log(result.failedExpectations[i].stack);
    }
  },

  jasmineDone: function(result) {
    console.log('Finished suite: '
      + result.overallStatus);
    for(var i = 0; i < result.failedExpectations.length; i++) {

      console.log('Global '
        + result.failedExpectations[i].message);
      console.log(result.failedExpectations[i].stack);
    }
  }
};


jasmine.getEnv().addReporter(myReporter);


describe("Player", function() {
  var Player = require('../../lib/jasmine_examples/Player');
  var Song = require('../../lib/jasmine_examples/Song');
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
  
  
    xdescribe("skips this test",()=>{
        beforeEach(function() {
            foo = 0;
            foo += 1;
        });
        
        it("is just a function, so it can contain any code", function() {
            expect(foo).toEqual(1);
        });
    })
    
    describe("Pending specs", function() {
        xit("can be declared 'xit'", function() {
            expect(true).toBe(false);
        });
        
        it("can be declared with 'it' but without a function");
        
        it("can be declared by calling 'pending' in the spec body", function() {
            expect(true).toBe(false);
            pending('this is why it is pending');
        });
    });
    
    
describe("A spy", function() {
  var foo, bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };
    
    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });
  
  
it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
  });
  
it("tracks that the spy was called x times", function() {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });
  
it("tracks all the arguments of its calls", function() {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

it("stops all execution on a function", function() {
    expect(bar).toBeNull();
  });
  
it("tracks if it was called at all", function() {
    foo.setBar();

    expect(foo.setBar.calls.any()).toEqual(true);
  });
});
  
describe("A spy, when created manually", function() {
  var whatAmI;

  beforeEach(function() {
    whatAmI = jasmine.createSpy('whatAmI');

    whatAmI("I", "am", "a", "spy");
  });

  it("tracks that the spy was called", function() {
    expect(whatAmI).toHaveBeenCalled();
  });
});


describe("Multiple spies, when created manually", function() {
  var tape;

  beforeEach(function() {
    tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

    tape.play();
    tape.pause();
    tape.rewind(0);
  });

  it("creates spies for each requested function", function() {
    expect(tape.play).toBeDefined();
    expect(tape.pause).toBeDefined();
    expect(tape.stop).toBeDefined();
    expect(tape.rewind).toBeDefined();
  });
});



  describe("jasmine.any", function() {
    it("matches any value", function() {
      expect({}).toEqual(jasmine.any(Object));
      expect(12).toEqual(jasmine.any(Number));
    });

    describe("when used with a spy", function() {
      it("is useful for comparing arguments", function() {
        var foo = jasmine.createSpy('foo');
        foo(12, function() {
          return true;
        });

        expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));
      });
    });
  });
  
  
    describe("jasmine.objectContaining", function() {
        var foo;
        
        beforeEach(function() {
          foo = {
            a: 1,
            b: 2,
            bar: "baz"
          };
        });
        
        it("matches objects with the expect key/value pairs", function() {
          expect(foo).toEqual(jasmine.objectContaining({
            bar: "baz"
          }));
          expect(foo).not.toEqual(jasmine.objectContaining({
            c: 37
          }));
        });
        
        describe("when used with a spy", function() {
          it("is useful for comparing arguments", function() {
            var callback = jasmine.createSpy('callback');
        
            callback({
              bar: "baz"
            });
        
            expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
              bar: "baz"
            }));
          });
        });
    });
        
         
      describe("jasmine.arrayContaining", function() {
        var foo;
    
        beforeEach(function() {
          foo = [1, 2, 3, 4];
        });
    
        it("matches arrays with some of the values", function() {
          expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
          expect(foo).not.toEqual(jasmine.arrayContaining([6]));
        });
    
        describe("when used with a spy", function() {
          it("is useful when comparing arguments", function() {
            var callback = jasmine.createSpy('callback');
    
            callback([1, 2, 3, 4]);
    
            expect(callback).toHaveBeenCalledWith(jasmine.arrayContaining([4, 2, 3]));
            expect(callback).not.toHaveBeenCalledWith(jasmine.arrayContaining([5, 2]));
          });
        });
      });
      
      
    describe('jasmine.stringMatching', function() {
        it("matches as a regexp", function() {
          expect({foo: 'bar'}).toEqual({foo: jasmine.stringMatching(/^bar$/)});
          expect({foo: 'foobarbaz'}).toEqual({foo: jasmine.stringMatching('bar')});
        });
    
        describe("when used with a spy", function() {
          it("is useful for comparing arguments", function() {
            var callback = jasmine.createSpy('callback');
        
            callback('foobarbaz');
        
            expect(callback).toHaveBeenCalledWith(jasmine.stringMatching('bar'));
            expect(callback).not.toHaveBeenCalledWith(jasmine.stringMatching(/^bar$/));
          });
        });
    });
    
    
describe("custom asymmetry", function() {
    var tester = {
      asymmetricMatch: function(actual) {
        var secondValue = actual.split(',')[1];
        return secondValue === 'bar';
      }
    };

    it("dives in deep", function() {
      expect("foo,bar,baz,quux").toEqual(tester);
    });

    describe("when used with a spy", function() {
      it("is useful for comparing arguments", function() {
        var callback = jasmine.createSpy('callback');

        callback('foo,bar,baz');

        expect(callback).toHaveBeenCalledWith(tester);
      });
    });
  });
  
  
  
describe("Manually ticking the Jasmine Clock", function() {
  var timerCallback;

  beforeEach(function() {
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });


  it("causes a timeout to be called synchronously", function() {
    setTimeout(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);

    expect(timerCallback).toHaveBeenCalled();
  });

  it("causes an interval to be called synchronously", function() {
    setInterval(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(2);
  });



    describe("Mocking the Date object", function(){
        it("mocks the Date object and sets it to a given time", function() {
          var baseTime = new Date(2013, 9, 23);
        
        
          jasmine.clock().mockDate(baseTime);
        
          jasmine.clock().tick(50);
          expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
        });
    });
  
    describe("A spec using done", function() {
        beforeEach(function(done) {
          setTimeout(function() {
        
            // do some stuff
        
            done();
        
          }, 100);
        });
        
        
        it('does a thing', function(done) {
          someAsyncFunction(result) {
            expect(result).toEqual(someExpectedValue);
            done();
          });
        });
    });
    
    
describe("Using promises", function() {
    beforeEach(function() {
      return new Promise(function(resolve, reject) {
        // do something asynchronous
        resolve();
      });
    });
    
    it('does a thing', function() {
      return someAsyncFunction().then(function (result) {
        expect(result).toEqual(someExpectedValue);
      });
    });
});



describe("Using async/await", function() {
    beforeEach(async function() {
      await someLongSetupFunction();
    });
    
    it('does a thing', async function() {
      const result = await someAsyncFunction();
      expect(result).toEqual(someExpectedValue);
    });
});

function doSomethingLater(callback) {
  setTimeout(function() {
    callback(12345);
  }, 10000);
}

describe('doSomethingLater', function() {
  beforeEach(function() {
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('does something after 10 seconds', function() {
    const callback = jasmine.createSpy('callback');
    doSomethingLater(callback);
    jasmine.clock().tick(10000);
    expect(callback).toHaveBeenCalledWith(12345);
  });
});

describe("mocking ajax", function() {

  describe("suite wide usage", function() {

    beforeEach(function() {
      jasmine.Ajax.install();


    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    it("specifying response when you need it", function() {
      var doneFn = jasmine.createSpy("success");

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(args) {
        if (this.readyState == this.DONE) {
          doneFn(this.responseText);
        }
      };

      xhr.open("GET", "/some/cool/url");
      xhr.send();

      expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
      expect(doneFn).not.toHaveBeenCalled();

      jasmine.Ajax.requests.mostRecent().respondWith({

        "status": 200,

        "contentType": 'text/plain',

        "responseText": 'awesome response'
      });

      expect(doneFn).toHaveBeenCalledWith('awesome response');
    });

    it("allows responses to be setup ahead of time", function () {
      var doneFn = jasmine.createSpy("success");

      jasmine.Ajax.stubRequest('/another/url').andReturn({
        "responseText": 'immediate response'
      });

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(args) {
        if (this.readyState == this.DONE) {
          doneFn(this.responseText);
        }
      };

      xhr.open("GET", "/another/url");
      xhr.send();

      expect(doneFn).toHaveBeenCalledWith('immediate response');
    });
  });

  it("allows use in a single spec", function() {
    var doneFn = jasmine.createSpy('success');
    jasmine.Ajax.withMock(function() {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(args) {
        if (this.readyState == this.DONE) {
          doneFn(this.responseText);
        }
      };

      xhr.open("GET", "/some/cool/url");
      xhr.send();

      expect(doneFn).not.toHaveBeenCalled();

      jasmine.Ajax.requests.mostRecent().respondWith({
        "status": 200,
        "responseText": 'in spec response'
      });

      expect(doneFn).toHaveBeenCalledWith('in spec response');
    });
  });
});
    
});
});


(function() {

  window.jasmine = jasmineRequire.core(jasmineRequire);

  jasmineRequire.html(jasmine);

  var env = jasmine.getEnv();


  var jasmineInterface = jasmineRequire.interface(jasmine, env);


  jasmineInterface.before = jasmineInterface.beforeEach;


  jasmineInterface.after = jasmineInterface.afterEach;


  jasmineInterface.context = jasmineInterface.describe;

  if (typeof window == "undefined" && typeof exports == "object") {
    extend(exports, jasmineInterface);
  } else {
    extend(window, jasmineInterface);
  }


  var specFilter = new jasmine.HtmlSpecFilter({
    filterString: function() { return queryString.getParam("spec"); }
  });

  env.specFilter = function(spec) {
    return specFilter.matches(spec.getFullName());
  };

  window.setTimeout = window.setTimeout;
  window.setInterval = window.setInterval;
  window.clearTimeout = window.clearTimeout;
  window.clearInterval = window.clearInterval;


  var currentWindowOnload = window.onload;

  window.onload = function() {
    if (currentWindowOnload) {
      currentWindowOnload();
    }
    env.execute(env.topSuite().id);
  };


  function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  }

}());



describe("custom equality", function() {


  var myCustomEquality = function(first, second) {


    if (typeof first == "string" && typeof second == "string") {
      return first[0] == second[1];
    }

  };

  beforeEach(function() {
    jasmine.addCustomEqualityTester(myCustomEquality);
  });

  it("should be custom equal", function() {
    expect("abc").toEqual("aaa");
  });

  it("should be custom not equal", function() {
    expect("abc").not.toEqual("abc");
  });
});


var customMatchers = {

  toBeGoofy: function(util, customEqualityTesters) {

    return {


      compare: function(actual, expected) {

        if (expected === undefined) {
          expected = '';
        }

        var result = {};
        result.pass = util.equals(actual.hyuk, "gawrsh" + expected, customEqualityTesters);

        if (result.pass) {

          result.message = "Expected " + actual + " not to be quite so goofy";
        } else {

          result.message = "Expected " + actual + " to be goofy, but it was not very goofy";
        }
    return result;
      }
    };
  }
};


  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });

  it("is available on an expectation", function() {
    expect({
      hyuk: 'gawrsh'
    }).toBeGoofy();
  });

  it("can take an 'expected' parameter", function() {
    expect({
      hyuk: 'gawrsh is fun'
    }).toBeGoofy(' is fun');
  });

  it("can be negated", function() {
    expect({
      hyuk: 'this is fun'
    }).not.toBeGoofy();
  });
});
});


