# ES6 Interfaces
Implementation of Interfaces on ES6 JS

This code can be build on NodeJS v6.17.1 and up but you've to use v14.0.0 or higher to run the node tests.

The idea of this code is to use for implement [S.O.L.I.D][solid.pdf] in Javascript, specifically the [Interface segregation principle][solid-isp] and [Dependency inversion principle][solid-dip]. Some examples of implementation are provided [here][examples].

## How to use

### How lo load the module

For ES6 `import()` you can use 

```
import { Interface } from 'InterfaceJS';
```

and with `require()`

```
const { Interface } = require('InterfaceJS');
```

or

```
const Interface = require('InterfaceJS').Interface;
```

### Interface definition

```
// Interface class
class IContainer {
  static method(target) {
    return target;
  }
}

// Implemtation class
class Container {
  static method(param) {
    return param + 1;
  }
}
```

`IContainer` is the interface definition class. Is very common in OOP using the name of the implementation class prefixed with a capital 'i'.
`method()` is the interface for the method in the implementation class. The parameter `target` is the function `method()` of the implementation class. In this case the interface is a simple passthru from the interface to the inplementation class.

```
// Interface class
class IContainer {
  static method(target) {
    return param => target(String(param);
  }
}
```

In this portion of code the interface for `method()` is passing an arrow funtion instead of the `target` just to adquire the parameter and transform it to string before pass it to the `target` function.

```
// Interface class
class IContainer {
  static method(target) {
    return param => String(target(param);
  }
}
```

This one is very similar to the previous but instead of change the parameter to string is change the return of the `target` function.

The same behavior is applied to the properties.

```
// Interface class
class IContainer {
  static value = String;
}

// Implemtation class
class Container {
  static value = 0;
}
```

On this example `value` will be converted to `String` by the interface side. In this case `target` is the value of the variable.
The interface can be used to type validation, transformation or sustitution.

__**NOTE:** If the method/property of the implementation class is not defined on the interface class, this interface will not publish this method/property. In other words this method will be undefined for this interface__

### Interface implementation

```
const container = new Interface(Container, IContainer);
```

This interface implements the interface definition class `IContainer` with the implementation class `Container`.

To understand this the execution will be on this way `container.method() = IContainer.method() -> Container.method()`

```
const container = new Interface(Container, [IContainer1, IContainer2]);
```

The Interface can use more than one interface class to extend the interface.

```
const containerA = new Interface(Container, [IContainer1, IContainer2]);

const containerB = new Interface(Container, [IContainer1, IContainer3]);
```

Or you can use differents interface classes with the same implemtation class for interface segregation.

Check the [examples][examples] for more information.

[solid.pdf]: https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf
[solid-isp]: https://en.wikipedia.org/wiki/Interface_segregation_principle
[solid-dip]: https://en.wikipedia.org/wiki/Dependency_inversion_principle
[examples]: examples
