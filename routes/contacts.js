// const express = require('express');
// const router = express.Router();
// const { ObjectId } = require('mongodb');
// const { getDb } = require('../database/connection');

// // GET all contacts
// /**
//  * @swagger
//  * /contacts:
//  *   get:
//  *     summary: Get all contacts
//  *     tags: [Contacts]
//  *     responses:
//  *       200:
//  *         description: List of contacts
//  */

// router.get('/', async (req, res) => {
//   try {
//     const db = getDb();
//     const contacts = await db.collection('contacts').find().toArray();
//     res.status(200).json(contacts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET one contact by ID
// /**
//  * @swagger
//  * /contacts/{id}:
//  *   get:
//  *     summary: Get contact by ID
//  *     tags: [Contacts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Contact found
//  *       404:
//  *         description: Not found
//  */

// router.get('/:id', async (req, res) => {
//   try {
//     const db = getDb();
//     const contact = await db
//       .collection('contacts')
//       .findOne({ _id: new ObjectId(req.params.id) });
//     if (!contact) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }
//     res.status(200).json(contact);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // POST: Create new contact
// /**
//  * @swagger
//  * /contacts:
//  *   post:
//  *     summary: Create new contact
//  *     tags: [Contacts]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/ContactInput'
//  *     responses:
//  *       201:
//  *         description: Created, returns ID
//  */

// router.post('/', async (req, res) => {
//   const { firstName, lastName, email, favoriteColor, birthday } = req.body;

//   if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const db = getDb();
//     const result = await db.collection('contacts').insertOne({
//       firstName,
//       lastName,
//       email,
//       favoriteColor,
//       birthday: new Date(birthday),
//     });
//     res.status(201).json({ id: result.insertedId.toString() });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // PUT: Update contact by ID
// /**
//  * @swagger
//  * /contacts/{id}:
//  *   put:
//  *     summary: Update contact
//  *     tags: [Contacts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/ContactInput'
//  *     responses:
//  *       200:
//  *         description: Updated
//  */

// router.put('/:id', async (req, res) => {
//   const { firstName, lastName, email, favoriteColor, birthday } = req.body;

//   if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const db = getDb();
//     const result = await db.collection('contacts').updateOne(
//       { _id: new ObjectId(req.params.id) },
//       {
//         $set: {
//           firstName,
//           lastName,
//           email,
//           favoriteColor,
//           birthday: new Date(birthday),
//         },
//       }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }
//     res.status(200).json({ message: 'Contact updated' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // DELETE: Delete contact by ID
// /**
//  * @swagger
//  * /contacts/{id}:
//  *   delete:
//  *     summary: Delete contact
//  *     tags: [Contacts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Deleted
//  */

// router.delete('/:id', async (req, res) => {
//   try {
//     const db = getDb();
//     const result = await db.collection('contacts').deleteOne({
//       _id: new ObjectId(req.params.id),
//     });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }
//     res.status(200).json({ message: 'Contact deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     ContactInput:
//  *       type: object
//  *       required:
//  *         - firstName
//  *         - lastName
//  *         - email
//  *         - favoriteColor
//  *         - birthday
//  *       properties:
//  *         firstName:
//  *           type: string
//  *         lastName:
//  *           type: string
//  *         email:
//  *           type: string
//  *         favoriteColor:
//  *           type: string
//  *         birthday:
//  *           type: string
//  *           format: date
//  */

// module.exports = router;


const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: List of contacts
 */
router.get('/', contactsController.getAll);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact found
 */
router.get('/:id', contactsController.getOne);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Created, returns ID
 */
router.post('/', contactsController.create);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', contactsController.update);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/:id', contactsController.remove);

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         favoriteColor:
 *           type: string
 *         birthday:
 *           type: string
 *           format: date
 */

module.exports = router;