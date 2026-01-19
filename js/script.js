
console.log("Trip on Tap-JavaScript Loaded");

/*********************************
 DESTINATIONS & PACKAGES
**********************************/
const DEST_TRANSYLVANIA = "Transylvania";
const DEST_CARPATHIANS = "Vale of the Carpathians";
const DEST_RAVENCREST = "Ravencrest Village";
const DEST_NOCTURNE = "Nocturne Highlands";

const packages = {
    moonlit: {
        name: "Moonlit Transylvania Escape",
        destination: DEST_TRANSYLVANIA,
        duration: "5 Days / 4 Nights",
        price: 45000
    },
    autumn: {
        name: "Autumn Carpathian Retreat",
        destination: DEST_CARPATHIANS,
        duration: "7 Days / 6 Nights",
        price: 62000
    },
    ravencrest: {
        name: "Ravencrest Village Getaway",
        destination: DEST_RAVENCREST,
        duration: "3 Days / 2 Nights",
        price: 28000
    },
    nocturne: {
        name: "Nocturne Highlands Adventure",
        destination: DEST_NOCTURNE,
        duration: "6 Days / 5 Nights",
        price: 58000
    }
};

console.log("Available Packages:", packages);

/*********************************
 DOM SELECTION
**********************************/
const bookingForm = document.getElementById("bookingForm");
const statusMessage = document.getElementById("bookingStatus");
const tripContainer = document.getElementById("tripDetails");

/*********************************
 HELPER FUNCTIONS
**********************************/
function showBookingStatus(message, type) {
    if (!statusMessage) return;

    statusMessage.textContent = message;
    statusMessage.className = "status_message";

    if (type === "success") {
        statusMessage.classList.add("success");
    } else {
        statusMessage.classList.add("error");
    }
}

/*********************************
 FORM VALIDATION
**********************************/
function validateForm(name, email, destination, payment) {
    if (name === "" || email === "" || destination === "" || payment === "") {
        showBookingStatus("⚠ Please fill in all required fields.", "error");
        return false;
    }

    if (!email.includes("@")) {
        showBookingStatus("⚠ Please enter a valid email address.", "error");
        return false;
    }

    return true;
}

/*********************************
 FORM SUBMISSION EVENT
**********************************/
if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const destinationKey = document.getElementById("destination").value;
        const payment = document.getElementById("payment").value;
        const message = document.getElementById("message")?.value.trim() || "";

        if (!validateForm(name, email, destinationKey, payment)) return;

        console.log(destinationKey);

        const selectedPackage = packages[destinationKey];
        const bookingDate = new Date().toLocaleDateString();

        console.log(selectedPackage);

        const bookingData = {
            name: name,
            email: email,
            destination: selectedPackage.destination,
            packageName: selectedPackage.name,
            duration: selectedPackage.duration,
            price: selectedPackage.price,
            payment: payment,
            message: message,
            date: bookingDate
        };

        console.log("Booking Data:", bookingData);

        localStorage.setItem("tripBooking", JSON.stringify(bookingData));

        showBookingStatus("🎃 Booking confirmed! Redirecting...", "success");

        const loader = document.getElementById("loader");

loader.style.display = "block";

setTimeout(() => {
    loader.style.display = "none";
    window.location.href = "yourtrips.html";
}, 1500);
    });
}

/*********************************
 DISPLAY ON yourtrips.html
**********************************/
if (tripContainer) {
    const booking = JSON.parse(localStorage.getItem("tripBooking"));

    if (booking) {
        tripContainer.innerHTML = `
            <article class="trip_card fade-in">
                <h2>${booking.packageName}</h2>
                <p><strong>Traveler:</strong> ${booking.name}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Destination:</strong> ${booking.destination}</p>
                <p><strong>Duration:</strong> ${booking.duration}</p>
                <p><strong>Price:</strong> ₹${booking.price}</p>
                <p><strong>Payment Method:</strong> ${booking.payment}</p>
                <p><strong>Booking Date:</strong> ${booking.bookingDate}</p>
            </article>
        `;
    } else {
        tripContainer.innerHTML = "<p>No trips booked yet.</p>";
    }
}
