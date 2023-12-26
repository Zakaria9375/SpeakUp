const fs = require('fs')

// Load the original JSON data from file
const originalData = require('../src/data.json')

// Transform the user array
const transformedUsers = originalData.users.map((user) => {
	return {
		id: user.id,
		name: user.name,
		username: user.username,
		avatar: user.avatar,
		details: {
			avatar: user.avatar,
			bio: user.bio || '',
			email: user.email,
			lastVisitAt: user.lastVisitAt,
			name: user.name,
			registeredAt: user.registeredAt,
			username: user.username,
			userId: user.id,
			website: user.website || '',
		},
	}
})

// Create a new object with the transformed users array
const transformedObject = {
	users: transformedUsers,
}

// Save the transformed data to a new file
fs.writeFileSync('./transformedData.json', JSON.stringify(transformedObject, null, 2))

console.log('Data transformation completed successfully!')
