// src/utils.mjs
var ArrayUtils = class {
  static arrayFy(variable) {
    if (!Array.isArray(variable)) {
      variable = Array(variable);
    }
    return variable;
  }
};
var fnDefaultMethods = [
  "prototype",
  "constructor",
  ...Reflect.ownKeys(Function.prototype),
  ...Reflect.ownKeys(Function.constructor)
].filter((method, index, methods) => methods.indexOf(method) === index);
var InterfaceUtils = class {
  static getFnPrototype(fn) {
    return fn.prototype ? fn : Reflect.getPrototypeOf(fn);
  }
  static getMethods(fn) {
    return Reflect.ownKeys(InterfaceUtils.getFnPrototype(fn)).filter((n) => fn[n] instanceof Function);
  }
  static isNotDefaultMethod(methodName) {
    return !fnDefaultMethods.includes(methodName);
  }
  static assignFnMethodFromFn(target, source, methodName) {
    Object.defineProperty(target, methodName, Object.getOwnPropertyDescriptor(source, methodName));
  }
  static extendsFnMethodsByFn(target, source) {
    return InterfaceUtils.getMethods(source).filter(InterfaceUtils.isNotDefaultMethod).map((methodName) => InterfaceUtils.assignFnMethodFromFn(target, source, methodName));
  }
  static assignFlatMethods(target, sourceList) {
    return sourceList.reduce((target2, source) => {
      InterfaceUtils.extendsFnMethodsByFn(target2, source);
      return target2;
    }, target);
  }
  static extendInterfaces(Interfaces) {
    return InterfaceUtils.assignFlatMethods(class Interfaces {
    }, ArrayUtils.arrayFy(Interfaces));
  }
};

// src/interface.mjs
var ProxyWrapper = function(T, I) {
  return new Proxy(T, I);
};
var Interface = class extends ProxyWrapper {
  constructor(Target, Interfaces) {
    const extendedInterface = InterfaceUtils.extendInterfaces(Interfaces);
    super(Target, {
      get(target, name) {
        if (extendedInterface[name] instanceof Function) {
          return extendedInterface[name](target[name]);
        }
      }
    });
  }
};
export {
  Interface
};
