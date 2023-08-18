const yargs = require('yargs');
const contacts = require('./contacts');

const argv = yargs.argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      try {
        const contactList = await contacts.listContacts();
        console.table(contactList);
      } catch (err) {
        console.error(err);
      }
      break;

    case 'get':
      try {
        const contact = await contacts.getContactById(id);
        console.log(contact);
      } catch (err) {
        console.error(err);
      }
      break;

    case 'add':
      try {
        const newContact = await contacts.addContact(name, email, phone);
        console.log("New contact added:", newContact);
      } catch (err) {
        console.error(err);
      }
      break;

    case 'remove':
      try {
        const removedContact = await contacts.removeContact(id);
        if (removedContact === null) {
          console.log(null);
        } else {
          console.log( removedContact);
        }
      } catch (err) {
        console.error(err);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
