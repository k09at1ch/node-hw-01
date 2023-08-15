const fs = require('fs');
const path = require('path');

function generateUniqueId() {
  const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return uniqueId;
}

function listContacts(callback) {
  const contactsPath = path.join(__dirname, './data/contacts.json');
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    const contacts = JSON.parse(data);
    callback(null, contacts);
  });
}

function getContactById(contactId, callback) {
  const contactsPath = path.join(__dirname, './data/contacts.json');
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    const contacts = JSON.parse(data);
    const foundContact = contacts.find(contact => contact.id === contactId);
    callback(null, foundContact || null);
  });
}

function removeContact(contactId, callback) {
  const contactsPath = path.join(__dirname, './data/contacts.json');

  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      callback(err);
      return;
    }

    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);

    if (contactIndex === -1) {
      console.log("Contact not found");
      callback(null, "Contact not found");
      return;
    }

    const removedContact = contacts.splice(contactIndex, 1)[0];

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), err => {
      if (err) {
        console.error(err);
        callback(err);
        return;
      }
      callback(null, removedContact);
    });
  });
}

function addContact(name, email, phone, callback) {
  const contactsPath = path.join(__dirname, './data/contacts.json');
  const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));

  const newContact = {
    id: generateUniqueId(),
    name,
    email,
    phone
  };

  contacts.push(newContact);

  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));

  callback(null, newContact);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
