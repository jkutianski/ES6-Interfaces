import { InterfaceUtils } from './utils.mjs';

// Proxy Wrapper to allow extends from Class
const ProxyWrapper = function(T, I) {
  return new Proxy(T, I);
}

export class Interface extends ProxyWrapper {

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

}
