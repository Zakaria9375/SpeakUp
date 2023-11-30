const { Firestore } = require('@google-cloud/firestore');
const fs = require('fs');

const db = new Firestore();

(async () => {
  const fileContents = fs.readFileSync(`${__dirname}/mdata.json`, 'utf8');
  const data = JSON.parse(fileContents);

  try {
    await writeToDatabase(data);
    console.log('Data written to Firestore successfully!');
  } catch (e) {
    console.error('Error writing to Firestore:', e);
  }
})();

async function writeToDatabase(data) {
  try {
    console.log('Initializing Firebase');

    // Iterate over each collection in your JSON data
    for (const collectionName in data) {
      if (data.hasOwnProperty(collectionName)) {
        const collectionData = data[collectionName];

        // Reference to the Firestore collection
        const collectionRef = db.collection(collectionName);

        // Iterate over each document in the collection
        for (const documentId in collectionData) {
          if (collectionData.hasOwnProperty(documentId)) {
            const documentData = collectionData[documentId];

            // Reference to the document in the collection
            const documentRef = collectionRef.doc(documentId);

            // Set the data for the document
            await documentRef.set(documentData);
          }
        }
      }
    }

    console.log('Data written to Firestore collections');

  } catch (error) {
    console.error('Error writing to Firestore:', error);
  }
}

