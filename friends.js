document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
});

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        document.getElementById('friends-container').innerHTML = '<p>Error loading friends. Please try again later.</p>';
    }
}

function displayUsers(users) {
    const friendsContainer = document.getElementById('friends-container');
    
    if (users.length > 0) {
        friendsContainer.innerHTML = '';
        const displayCount = Math.min(users.length, 10);
        
        for (let i = 0; i < displayCount; i++) {
            const user = users[i];
            const friendCard = document.createElement('div');
            friendCard.className = 'friend-card';
            
            friendCard.innerHTML = `
                <h3>${user.name}</h3>
                <p class="city">City: ${user.address.city}</p>
                <p class="website">Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                <p class="company">${user.company.name}</p>
                <p class="tagline">${user.company.catchPhrase}</p>
            `;
            
            friendsContainer.appendChild(friendCard);
        }
    } else {
        friendsContainer.innerHTML = '<p>No friends found.</p>';
    }
}
