import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContact = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
  //  Повертає масив контактів.
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact || null;
  //  Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index === -1) return null;

  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;

  //  Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
  //  Повертає об'єкт доданого контакту (з id).
}

async function updateContactById(id, data) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  contacts[idx] = { ...contacts[idx], ...data };
  await updateContact(contacts);
  return contacts[idx];
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
  
  