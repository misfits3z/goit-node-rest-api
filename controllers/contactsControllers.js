import * as contactsServices from '../services/contactsServices.js'

export const getAllContacts = async (req, res) => {
    const result = await contactsServices.listContacts()

    res.json(result)

};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsServices.getContactById(id);

    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(result);
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsServices.removeContact(id);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }

    // res.status(204).send();
    res.json(result);
};

export const createContact = async (req, res) => {
    const result = await contactsServices.addContact(req.body)

    res.status(201).json(result);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsServices.updateContactById(id, req.body); 

    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
};

