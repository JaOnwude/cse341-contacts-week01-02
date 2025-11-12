const { ObjectId } = require('mongodb');
const { getDb } = require('../database/connection');

// Getting all
exports.getAll = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Getting only one
exports.getOne = async (req, res) => {
  try {
    const db = getDb();
    const contact = await db
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST an item
exports.create = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const db = getDb();
    const result = await db.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday: new Date(birthday),
    });
    res.status(201).json({ id: result.insertedId.toString() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT - edit
exports.update = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const db = getDb();
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { firstName, lastName, email, favoriteColor, birthday: new Date(birthday) } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE an item
exports.remove = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('contacts').deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found!' });
    }
    res.status(200).json({ message: 'Contact has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};