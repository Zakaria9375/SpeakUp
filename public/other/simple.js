const { Client, Databases, ID } = require('node-appwrite')
const client = new Client()
client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject('65718378450202a4f926')
	.setKey(
		'a647bdf83e8e98365173046020382f1f96475f69d8600f7f5b23cd529d3800484a19d1580c6e6cba834d208bad253b59860cb6def03951b20b844974041fbaf0f244bb7d5a63476f3d6aa8be80b4572063fa744e0d94929fbd740c4096518723a152e58705a07e56e86b22482a81527af2781d281cd10a775b9081e8de86617e'
	)
	.setSelfSigned()

const databases = new Databases(client)
const jsonData = require('../src./public/transformedData.json')

const databaseId = '657190b4a9dada3a6a64'

async function migrateData() {
	try {
		// Migrate Threads

		console.log('Data migration completed successfully!')
	} catch (error) {
		console.error('Data migration failed:', error)
	}
}

// Run the migration script
migrateData()

console.log('Data creation completed successfully!')
