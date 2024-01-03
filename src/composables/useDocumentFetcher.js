// useDataFetcher.js
import { ref, onMounted, onUnmounted } from 'vue'
import { client, databases } from '@/config/AppWrite.js'

export function useDocumentFetcher(colId, docId, events, resSubMsg, resFetchMsg) {
	const response = ref(null)
	const isReady = ref(false)
	const fetchData = async () => {
		try {
			response.value = await databases.getDocument('appData', colId, docId)
			console.log('DocF', resFetchMsg)
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			isReady.value = true
			// emit('data-loaded', isReady.value)
		}
	}

	const unsub = client.subscribe(events, (response) => {
		isReady.value = false
		fetchData()
		console.log('DocSub', resSubMsg, response)
	})
	onMounted(() => fetchData())

	onUnmounted(() => unsub())

	return { response, isReady }
}
