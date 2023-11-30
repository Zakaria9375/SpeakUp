const fs = require('fs');

const inputFile = 'data.json';
const outputFile = 'modified_data.json';

// Read the data from the input file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading ${inputFile}:`, err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Iterate over each collection and modify the structure
    for (const collectionName in jsonData) {
      if (jsonData.hasOwnProperty(collectionName)) {
        const collection = jsonData[collectionName];
        if (Array.isArray(collection)) {
          // Convert array objects to the desired format
          jsonData[collectionName] = convertArrayObjects(collection);
        }
      }
    }

    // Write the modified data back to the output file
    fs.writeFile(outputFile, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(`Error writing to ${outputFile}:`, err);
      } else {
        console.log(`Successfully wrote modified data to ${outputFile}`);
      }
    });
  } catch (parseError) {
    console.error(`Error parsing JSON data:`, parseError);
  }
});

// Function to convert array objects to the desired format
function convertArrayObjects(array) {
  const convertedObject = {};
  array.forEach(obj => {
    if (obj.hasOwnProperty('id')) {
      const id = obj.id.toString();
      delete obj.id;
      convertedObject[id] = obj;
    }
  });
  return convertedObject;
}