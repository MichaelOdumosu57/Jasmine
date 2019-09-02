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
});
    
});
