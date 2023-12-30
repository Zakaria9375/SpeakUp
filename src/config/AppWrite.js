import { Client, Account, Databases, Functions } from 'appwrite'

export const client = new Client()
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65718378450202a4f926')

export const account = new Account(client)
export const databases = new Databases(client)
const functions = new Functions(client)

// client.subscribe(
// 	['databases.appData.collections.posts.documents', 'account', 'files'],
// 	(response) => {
// 		// Callback will be executed on changes for documents A and all files.
// 		console.log(response)
// 	}
// )

export function updateUserStatus(userId, isActive) {
	const data = { userId, isActive }
	functions
		.createExecution('658fc32f58c191e05288', JSON.stringify(data))
		.then((response) => console.log('Function executed', response))
		.catch((error) => console.error('Error:', error))
}
