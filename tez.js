// Imports
const firestoreService = require('firestore-export-import')
const firebaseConfig = require('./src/config/firebase.js')
const serviceAccount = require('./serviceAccount.json')
const fs = require('fs')
const fileContents = fs.readFileSync(`${__dirname}/src/data.json`, 'utf8')
  const data = JSON.parse(fileContents)
// procedure
(async () => {
  
  await jsonToFirestore()
})()

// Helper Functions
// -------------------------------------

// JSON To Firestore
async function jsonToFirestore () {
  try {
    console.log('Initialzing Firebase')
    await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL)
    console.log('Firebase Initialized')

    await firestoreService.restore(data)
    console.log('Upload Success')
  } catch (error) {
    console.log(error)
  }
}

// In order to preserve ids in data.json
// as ids in firestore
// must use keyed object (id being the key) instead of array of records
