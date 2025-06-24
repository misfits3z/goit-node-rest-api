import fs from "fs/promises";
import path from "path";
import Contact from "../models/Contact.js";

const contactsPath = path.resolve("db", "contacts.json");

const updateContact = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts(query) {
  const contacts = await Contact.findAll({
    where: query,
  });
  return contacts;
}

async function getContactById(query) {
  return await Contact.findOne({
    where: query
  });
}

async function removeContact(query) {
  const contact = await getContactById(query);
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

async function addContact(payload) {
  const contact = await Contact.create(payload);
  return contact;
}

async function updateContactById(query, data) {
  const contact = await getContactById(query);
  if (!contact) return null;
  await contact.update(data);
  return contact;
}

async function updateStatusContact(query, body) {
  const contact = await getContactById(query);
  if (!contact) return null;

  await contact.update({ favorite: body.favorite });
  return contact;
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
};
