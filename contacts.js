const fs = require('fs/promises');
const path = require('path');

function generateUniqueId() {
  const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return uniqueId;
}

async function listContacts() {
  const contactsPath = path.join(__dirname, './data/contacts.json');
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getContactById(contactId) {
  const contactsPath = path.join(__dirname, './data/contacts.json');
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const foundContact = contacts.find(contact => contact.id === contactId);
    return foundContact || null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function removeContact(contactId) {
  const contactsPath = path.join(__dirname, './data/contacts.json');

  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);

    if (contactIndex === -1) {
      console.log(null);
      return;
    }

    const removedContact = contacts.splice(contactIndex, 1)[0];

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function addContact(name, email, phone) {
  const contactsPath = path.join(__dirname, './data/contacts.json');
  
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    const newContact = {
      id: generateUniqueId(),
      name,
      email,
      phone
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
