// useDataFetcher.js
import { ref, onMounted, onUnmounted } from 'vue'
import { client, databases, account } from '@/config/AppWrite.js'

export function useAcountFetcher(fetchDataFunction, events, resSubMsg) {
	const response = ref(null)
	const isReady = ref(false)

	const fetchData = async () => {
		try {
			response.value = await fetchDataFunction
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			isReady.value = true
			const event = new CustomEvent('data-loaded', { detail: { isReady: isReady.value } })
			window.dispatchEvent(event)
		}
	}

	const unsub = client.subscribe(events, (response) => {
		isReady.value = false
		fetchData()
		console.log('UDF', resSubMsg, response)
	})
	onMounted(() => fetchData())

	onUnmounted(() => unsub())

	return { response, isReady }
}
