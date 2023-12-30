import { databases } from '@/config/AppWrite.js'
import { ID } from 'appwrite'

export function handleResponse(response, message) {
	console.log(message, response)
}

export function handleError(message, error) {
	console.log(message, error)
	return `${message} ${error}`
}

export async function executeOperation(operation, successMessage, faliureMessage) {
	try {
		const response = await operation
		handleResponse(response, successMessage)
		return response
	} catch (error) {
		handleError(faliureMessage, error)
	}
}
export async function executeAccBb(
	accOperation,
	dbOperation,
	successMessage,
	failureMessage
) {
	try {
		const accResponse = await accOperation()
		const dbResponse = await dbOperation()
		handleResponse({ accResponse, dbResponse }, successMessage)
		return { accResponse, dbResponse }
	} catch (error) {
		handleError(failureMessage, error)
	}
}
export async function getCollection(refVal, collectionId, successMessage) {
	const operation = databases.listDocuments('appData', collectionId)
	return await executeOperation(
		operation,
		successMessage,
		`DB Err while getting ${collectionId} collection`
	).then((response) => {
		if (response) refVal.value = response.documents
	})
}

export async function getDocument(refVal, collectionId, documentId, successMessage) {
	const operation = databases.getDocument('appData', collectionId, documentId)
	return await executeOperation(
		operation,
		successMessage,
		`DB Err while getting Doc from ${collectionId} collection with id ${documentId}`
	).then((response) => {
		if (response) refVal.value = response
	})
}

export async function createDocument(collectionId, data, successMessage) {
	const operation = databases.createDocument('appData', collectionId, ID.unique(), data)
	return await executeOperation(
		operation,
		successMessage,
		`DB Err while creating Doc in ${collectionId} collection`
	)
}

export async function updateDocument(collectionId, documentId, data, successMessage) {
	const operation = databases.updateDocument('appData', collectionId, documentId, data)
	return await executeOperation(
		operation,
		successMessage,
		`DB Err while updating Doc in ${collectionId} collection with id ${documentId}`
	)
}

export async function deleteDocument(collectionId, documentId, successMessage) {
	const operation = databases.deleteDocument('appData', collectionId, documentId)
	return await executeOperation(
		operation,
		successMessage,
		`DB Err while deleting Doc in ${collectionId} collection`
	)
}
