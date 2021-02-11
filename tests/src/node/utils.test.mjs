/* global describe, it */

import * as assert from 'assert';

import { ArrayUtils, InterfaceUtils } from '../../../src/utils.mjs';

describe('Utils', function() {

  describe('Array', function() {

    it('arrayFy()', function() {
      assert.equal(ArrayUtils.arrayFy('test')[0], 'test');
      assert.equal(ArrayUtils.arrayFy('test')[0], ArrayUtils.arrayFy(['test'])[0]);
    });

  });

  describe('Interface', function() {

    it('getFnPrototype()', function() {

      class Test {}

      const InstanceTest = new Test();

      assert.equal(InterfaceUtils.getFnPrototype(Test), Test);
      assert.equal(InterfaceUtils.getFnPrototype(InstanceTest), Reflect.getPrototypeOf(InstanceTest));
    });

    it('getMethods()', function() {

      class Test {
        static StaticMethod() {}

        InstancedMethod() {}
      }

      assert.ok(InterfaceUtils.getMethods(Test)[0], 'StaticMethod');
      assert.equal(InterfaceUtils.getMethods(new Test())[1], 'InstancedMethod');

    });

    it('isNotDefaultMethod()', function() {

      assert.ok(InterfaceUtils.isNotDefaultMethod('Method'));
      assert.ok(!InterfaceUtils.isNotDefaultMethod('constructor'));

    });

    it('assignFnMethodFromFn()', function() {

      class Test {}

      assert.ok(!Test.method);

      class ClassWithMethod {
        static method() {}
      }

      InterfaceUtils.assignFnMethodFromFn(Test, ClassWithMethod, 'method');

      assert.deepStrictEqual(
        Object.getOwnPropertyDescriptor(Test, 'method'),
        Object.getOwnPropertyDescriptor(ClassWithMethod, 'method')
      );

    });

    it('extendsFnMethodsByFn()', function() {

      class Test {}

      assert.ok(!Test.method1);
      assert.ok(!Test.method2);

      class ClassWithMethod {
        static method1() {}
        static method2() {}
      }

      InterfaceUtils.extendsFnMethodsByFn(Test, ClassWithMethod);

      assert.deepStrictEqual(
        Object.getOwnPropertyDescriptor(Test, 'method1'),
        Object.getOwnPropertyDescriptor(ClassWithMethod, 'method1')
      );

      assert.deepStrictEqual(
        Object.getOwnPropertyDescriptor(Test, 'method2'),
        Object.getOwnPropertyDescriptor(ClassWithMethod, 'method2')
      );

    });

    it('assignFlatMethods()', function() {

      class Test {}

      assert.ok(!Test.method1);
      assert.ok(!Test.method2);

      class ClassWithMethod1 {
        static method1() {}
      }

      class ClassWithMethod2 {
        static method2() {}
      }

      InterfaceUtils.assignFlatMethods(Test, [ClassWithMethod1, ClassWithMethod2]);

      assert.deepStrictEqual(
        Object.getOwnPropertyDescriptor(Test, 'method1'),
        Object.getOwnPropertyDescriptor(ClassWithMethod1, 'method1')
      );

      assert.deepStrictEqual(
        Object.getOwnPropertyDescriptor(Test, 'method2'),
        Object.getOwnPropertyDescriptor(ClassWithMethod2, 'method2')
      );

    });

    it('extendInterfaces()', function() {

      class ClassWithMethod1 {
        static method1() {}
      }

      class ClassWithMethod2 {
        static method2() {}
      }

      const Test = InterfaceUtils.extendInterfaces([ClassWithMethod1, ClassWithMethod2]);

      assert.deepStrictEqual(
        Object.getOwnPropertyDescriptor(Test, 'method1'),
        Object.getOwnPropertyDescriptor(ClassWithMethod1, 'method1')
      );

      assert.deepStrictEqual(
        Object.getOwnPropertyDescriptor(Test, 'method2'),
        Object.getOwnPropertyDescriptor(ClassWithMethod2, 'method2')
      );

    });

  });

});
