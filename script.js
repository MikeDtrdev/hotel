// script.js
const roomDetails = document.getElementById('room-list');
const reservationForm = document.getElementById('reservation-form');
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Retrieve room details from Firebase
db.collection('rooms').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const room = doc.data();
        const html = `
            <h2>Room ${room.number}</h2>
            <p>Capacity: ${room.capacity}</p>
            <p>Rate: ${room.rate}</p>
        `;
        roomDetails.innerHTML += html;
    });
});

// Send reservation data to Firebase when form is submitted
reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reservationData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        roomNumber: document.getElementById('roomType').value,
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
    };
    db.collection('reservations').add(reservationData).then(() => {
        console.log('Reservation added successfully!');
    }).catch(error => {
        console.error('Error adding reservation:', error);
    });
});