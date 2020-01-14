
 function soon() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, 1);
    });
  }

  describe("Using promises", function() {
    // if (!browserHasPromises()) {
    //   return;
    // }


    beforeEach(function() {
      return soon().then(function() {
        value = 0;
      });
    });




    it("should support async execution of test preparation and expectations", function() {
      return soon().then(function() {
        value++;
        expect(value).toBeGreaterThan(0);
      });
    });
  })

