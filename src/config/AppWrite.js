import { Client, Account, Databases } from 'appwrite'

export const client = new Client()
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65718378450202a4f926')


export const account = new Account(client)
export const databases = new Databases(client)


client.subscribe(
	['databases.appData.collections.posts.documents', 'account', 'files'],
	(response) => {
		// Callback will be executed on changes for documents A and all files.
		console.log(response)
	}
)