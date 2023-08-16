const yargs = require('yargs');
const contacts = require('./contacts');

const argv = yargs.argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts((err, contacts) => {
        if (err) {
          console.error(err);
          return;
        }
        console.table(contacts);
      });
      break;

    case 'get':
      contacts.getContactById(id, (err, contact) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(contact);
      });
      break;

    case 'add':
      contacts.addContact(name, email, phone, (err, newContact) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("New contact added:", newContact);
      });
      break;

    case 'remove':
      contacts.removeContact(id, (err, removedContact) => {
        if (err) {
          console.error(err);
          return;
        }
       
      });
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
