/* global describe, it */

export function CommonTests(assert, Interface) {

  describe('Interface', function() {

    it('is a Function', function() {
      assert.ok(Interface instanceof Function);
    });

    it('result instance of implementation', function() {
      class TestImplementation {}

      function ResultFn() {
        return new Interface(new TestImplementation(), class {});
      }

      assert.ok(new ResultFn() instanceof TestImplementation);
    });

    it('validate methods', function() {
      class IPassThru {
        static isOK(target) {
          return target;
        }
      }

      class IReplaceParam {
        static isOK() {
          return function() {
            return 'test';
          };
        }
      }

      class TestImplementation {
        isOK(param) {
          return param;
        }
      }

      function PassThru() {
        return new Interface(new TestImplementation(), IPassThru);
      }

      assert.equal(PassThru().isOK('test1'), 'test1');
      assert.equal(PassThru().isOK('test2'), 'test2');

      function ReplaceParam() {
        return new Interface(new TestImplementation(), IReplaceParam);
      }

      assert.equal(ReplaceParam().isOK('test1'), 'test');
      assert.equal(ReplaceParam().isOK('test2'), 'test');
    });

    it('validate properties', function() {
      class TestImplementation {
        num = 0;
        str = '1';
      }

      class INumbers {
        static num = Number;
        static str = Number;
      }

      function ToNumbers() {
        return new Interface(new TestImplementation(), INumbers);
      }

      assert.equal(ToNumbers().num, 0);
      assert.equal(ToNumbers().str, 1);

      class IStrings {
        static num = String;
        static str = String;
      }

      function ToStrings() {
        return new Interface(new TestImplementation(), IStrings);
      }

      assert.equal(ToStrings().num, '0');
      assert.equal(ToStrings().str, '1');
    });

    it('validate undefined', function() {
      class TestImplementation {
        num = 0;
        str = '1';
      }

      class IUndefined {
      }

      function ToStrings() {
        return new Interface(new TestImplementation(), IUndefined);
      }

      assert.equal(ToStrings().num, undefined);
      assert.equal(ToStrings().str, undefined);
    });

  });

}
