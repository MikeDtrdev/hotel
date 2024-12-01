// admin.js
const reservationTable = document.getElementById('reservation-table');
const reservationData = document.getElementById('reservation-data');

// assume you have a backend API to fetch reservation data
fetch('/api/reservations')
    .then(response => response.json())
    .then(data => {
        data.forEach(reservation => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reservation.id}</td>
                <td>${reservation.name}</td>
                <td>${reservation.email}</td>
                <td>${reservation.roomType}</td>
                <td>${reservation.checkIn}</td>
                <td>${reservation.checkOut}</td>
                <td>
                    <button class="delete-btn" data-id="${reservation.id}">Delete</button>
                    <button class="update-btn" data-id="${reservation.id}">Update</button>
                </td>
            `;
            reservationData.appendChild(row);
        });
    });

// add event listeners for delete and update buttons
reservationTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const deleteReservation = (id) => {
            fetch(`/api/reservations/${id}`, { method: 'DELETE' })
                .then(() => {
                    // remove row from table
                    const row = e.target.parentNode.parentNode;
                    row.remove();
                });
        };
        deleteReservation(e.target.dataset.id);
    } else if (e.target.classList.contains('update-btn')) {
        const updateReservation = (id) => {
            // call API to update reservation
            fetch(`/api/reservations/${id}`, { method: 'PUT' })
                .then(() => {
                    // update row in table
                    const row = e.target.parentNode.parentNode;
                    // update row data here
                });
        };
        updateReservation(e.target.dataset.id);
    }
});