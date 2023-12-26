const { Client, Databases, ID } = require('node-appwrite')
const client = new Client()
client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject('65718378450202a4f926')
	.setKey(
		'a647bdf83e8e98365173046020382f1f96475f69d8600f7f5b23cd529d3800484a19d1580c6e6cba834d208bad253b59860cb6def03951b20b844974041fbaf0f244bb7d5a63476f3d6aa8be80b4572063fa744e0d94929fbd740c4096518723a152e58705a07e56e86b22482a81527af2781d281cd10a775b9081e8de86617e'
	)
const databases = new Databases(client)
const jsonData = require('../../src/data.json')

const databaseId = '657190b4a9dada3a6a64'
const categoriesCollectionId = 'categories'
const forumsCollectionId = 'forums'
const threadsCollectionId = 'threads'
const postsCollectionId = 'posts'
const usersCollectionId = 'users'

async function migrateData() {
	try {
		// Migrate Categories
		for (const category of jsonData.categories) {
			const { id, ...categoryData } = category
			const categoryRecord = await databases.createDocument(
				databaseId,
				categoriesCollectionId,
				categoryData
			)

			// Migrate Forums
			for (const forumId of forums) {
				const forum = jsonData.forums.find((f) => f.id === forumId)
				const { threads, ...forumData } = forum
				const forumRecord = await client.database.createDocument(forumsCollectionId, {
					...forumData,
					categoryId: categoryRecord['$id'],
				})

				// Migrate Threads
				for (const threadId of threads) {
					const thread = jsonData.threads.find((t) => t.id === threadId)
					const { posts, contributors, ...threadData } = thread
					const threadRecord = await client.database.createDocument(threadsCollectionId, {
						...threadData,
						forumId: forumRecord['$id'],
					})

					// Migrate Posts
					for (const postId of posts) {
						const post = jsonData.posts.find((p) => p.id === postId)
						const postData = {
							...post,
							threadId: threadRecord['$id'],
						}
						await client.database.createDocument(postsCollectionId, postData)
					}

					// Migrate Contributors (Users)
					for (const userId of contributors) {
						const user = jsonData.users.find((u) => u.id === userId)
						await client.database.createDocument(usersCollectionId, user)
					}
				}
			}
		}

		console.log('Data migration completed successfully!')
	} catch (error) {
		console.error('Data migration failed:', error)
	}
}

// Run the migration script
migrateData()
