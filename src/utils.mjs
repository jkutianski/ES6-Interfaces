export class ArrayUtils {
  static arrayFy(variable) {
    if (!Array.isArray(variable)) {
      return variable = Array(variable);
    }

    return variable;
  }
}

// Function() default methods
const fnDefaultMethods = [
  'prototype',
  'constructor',
  ...Reflect.ownKeys(Function.prototype),
  ...Reflect.ownKeys(Function.constructor)
].filter((method, index, methods) => methods.indexOf(method) === index);

export class InterfaceUtils {

  static getFnPrototype(fn) {
    return fn.prototype ? fn : Reflect.getPrototypeOf(fn);
  }

  static getMethods(fn) {
    return Reflect.ownKeys(InterfaceUtils.getFnPrototype(fn))
      .filter(n => fn[n] instanceof Function);
  }

  static isNotDefaultMethod(methodName) {
    return !fnDefaultMethods.includes(methodName);
  }

  static assignFnMethodFromFn(target, source, methodName) {
    return target[methodName] = source[methodName];
  }

  static extendsFnMethodsByFn(target, source) {
    return InterfaceUtils.getMethods(source)
      .filter(InterfaceUtils.isNotDefaultMethod)
      .map(methodName => InterfaceUtils.assignFnMethodFromFn(target, source, methodName));
  }

  static assignFlatMethods(target, sourceList) {
    return sourceList.reduce((target, source) => {
      InterfaceUtils.extendsFnMethodsByFn(target, source);
      return target;
    }, target);
  }

  static extendInterfaces(Interfaces) {
    return InterfaceUtils.assignFlatMethods(class Interfaces {}, ArrayUtils.arrayFy(Interfaces));
  }
}
