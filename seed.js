const { MongoClient } = require('mongodb');
require('dotenv').config();

const contacts = [
  { firstName: "John", lastName: "Okoro", email: "johnokoro@gmail.com", favoriteColor: "blue", birthday: "1990-01-01" },
  { firstName: "Okafor", lastName: "Smith", email: "okaforsmith@gmail.com", favoriteColor: "green", birthday: "1992-02-02" },
  { firstName: "Onwude", lastName: "Johnson", email: "onwudejohnson@gmail.com", favoriteColor: "red", birthday: "1985-03-03" },
  { firstName: "Chritabel", lastName: "Agwu", email: "christabelagwu@gmail.com", favoriteColor: "purple", birthday: "1995-04-04" },
  { firstName: "Christopher", lastName: "Adashu", email: "christopheradashu@gmail.com", favoriteColor: "yellow", birthday: "1988-05-05" },
  { firstName: "Ada", lastName: "Maduka", email: "adamaduka@byuipathway.edu", favoriteColor: "indigo", birthday: "2005-12-10" },
  { firstName: "Eze", lastName: "Daniella", email: "ezedan123@byuipathway.edu", favoriteColor: "white", birthday: "2005-12-10" }
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    await db.collection('contacts').deleteMany({});
    await db.collection('contacts').insertMany(contacts);
    console.log('7 contacts seeded!');
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

seed();