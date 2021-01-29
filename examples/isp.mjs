import { Interface } from 'InterfaceJS';

class IPrinter {
  static print(target) {
    return target;
  }
}

class IFax {
  static fax(target) {
    return target;
  }
}

class IScanner {
  static scan(target) {
    return target;
  }
}

class MFP {
  constructor(config) {
    this.config = config;
  }

  print(page) {
    console.log('Print:', page);
  }

  fax(page) {
    console.log('Fax:', page);
  }

  scan() {
    console.log('Scan');
  }
}

export function AllInOnePrinter(config) {
  return new Interface(new MFP(config), [IPrinter, IFax, IScanner]);
}

export function EconomicPrinter(config) {
  return new Interface(new MFP(config), IPrinter);
}

console.info('\nAllInOnePrinter');
const epInstance = new AllInOnePrinter();
epInstance.print('page');
epInstance.fax('page');
epInstance.scan();

console.info('\nEconomicPrinter');
const ecInstance = new EconomicPrinter();
ecInstance.print('page');
// ecInstance.fax('page');
// ecInstance.scan();
