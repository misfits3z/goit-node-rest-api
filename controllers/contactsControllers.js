import * as contactsServices from '../services/contactsServices.js'
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';


export const getAllContacts = ctrlWrapper(async (req, res) => {
  const result = await contactsServices.listContacts();
  res.json(result);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
    const { id } = req.params;
    const result = await contactsServices.getContactById(id);

    if (!result) {
        throw HttpError(404, "Not found");
    }

    res.json(result);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
    const { id } = req.params;
    const result = await contactsServices.removeContact(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }

    // res.status(204).send();
    res.json(result);
});

export const createContact = ctrlWrapper(async (req, res) => {
    const result = await contactsServices.addContact(req.body)

    res.status(201).json(result);
});

export const updateContact = ctrlWrapper(async (req, res) => {
    const { id } = req.params;

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const result = await contactsServices.updateContactById(id, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
})

export const updateStatusContact = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;

  if (!req.body || typeof req.body.favorite !== "boolean") {
    throw HttpError(400, "Missing field favorite");
  }

  const result = await contactsServices.updateStatusContact(
    contactId,
    req.body
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
});