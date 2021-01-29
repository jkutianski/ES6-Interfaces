import { Interface } from 'InterfaceJS';

// Common message interface method
class IMessage {
  static SendMessage(target) {
    // target is the SendMessage fn of the implementation class
    return target;
  }
}

// Email data interface
class IEmailData {
  // email is the value of ToAddress of the implementation class
  static ToAddress = (email) => {
    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return email;
    }

    return 'Invalid email';
  };

  // This converts to strings the values of Subject & Content of the implementation class
  static Subject = String;
  static Content = String;
}

// Email implementation class
class EmailClass {
  ToAddress = 'someone@somewhere.net';
  Subject = 'Eeeeeeeeeeeeeeeeeeeeeeeeee!';
  Content = 'Eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee...';

  SendMessage() {
    console.log('\nEmail:\tto: %s, subject: %s, body: %s', this.ToAddress, this.Subject, this.Content);
  }
}

class ISMSData {
  static PhoneNumber = (number) => {

    const regx = /\+(?<country>\d{1,3}) \((?<area>\d{2,4})\) (?<number1>\d{2,4})-(?<number2>\d{4,4})/;

    if (number.match(regx)) {
      return Number(number.replace(regx, '$<country>$<area>$<number1>$<number2>'));
    }

    return NaN;
  };

  static Message = String;
}

class SMSClass {
  PhoneNumber = '+1 (555) 555-5555';
  Message = 'Booo!!!';

  SendMessage() {
    console.log('\nSMS:\tto: %s, message: %s', this.PhoneNumber, this.Message);
  }
}

export function Email() {
  return new Interface(new EmailClass(), [IMessage, IEmailData]);
}

export function SMS() {
  return new Interface(new SMSClass(), [IMessage, ISMSData]);
}

class Notification {#
  messages;

  setTransport(...messages) {
    this.#messages = messages;
  }

  send() {
    this.#messages.forEach(message => message.SendMessage());
  }
}

// instance of the Notification class
const notify = new Notification();
// set the transports interfaces
notify.setTransport(new Email(), new SMS());
// send the messages via transports
notify.send();
