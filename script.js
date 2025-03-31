// DOM Elements
const bookNowBtn = document.getElementById('bookNowBtn');
const spaceBookingForm = document.getElementById('spaceBookingForm');
const countdownElement = document.getElementById('countdown');

// Rocket Animation Interaction
const rocket = document.getElementById('rocket');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    rocket.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
});

// Book Now Button Animation
bookNowBtn.addEventListener('click', () => {
    // Animate rocket launch
    rocket.style.transition = 'all 2s ease-in';
    rocket.style.transform = 'translate(0, -100vh) scale(0.5)';
    
    // Scroll to booking form
    setTimeout(() => {
        document.querySelector('.booking-form').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Reset rocket after animation
        setTimeout(() => {
            rocket.style.transition = 'none';
            rocket.style.transform = 'translate(0, 0)';
            setTimeout(() => {
                rocket.style.transition = 'all 0.3s ease';
            }, 10);
        }, 2000);
    }, 500);
});

// Form Submission
spaceBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const departure = document.getElementById('departure').value;
    const destination = document.getElementById('destination').value;
    const seatClass = document.getElementById('seatClass').value;
    
    // In a real app, we would send this data to the backend
    console.log('Booking submitted:', { departure, destination, seatClass });
    
    // Show confirmation
    alert(`Your trip to ${getDestinationName(destination)} in ${getClassname(seatClass)} has been booked!`);
    
    // Reset form
    spaceBookingForm.reset();
});

// Helper functions
function getDestinationName(value) {
    const destinations = {
        'iss': 'International Space Station',
        'moon': 'Lunar Gateway',
        'mars': 'Mars Orbital Station',
        'orbit': 'Zero-Gravity Orbit'
    };
    return destinations[value] || 'Space';
}

function getClassname(value) {
    const classes = {
        'economy': 'Economy Shuttle',
        'business': 'Business Class',
        'first': 'First Class',
        'vip': 'VIP Zero-G Suite'
    };
    return classes[value] || 'Standard Class';
}

// Countdown Timer (for demo purposes)
function updateCountdown() {
    // Set a launch date 14 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 14);
    
    const now = new Date();
    const diff = launchDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    countdownElement.textContent = `${days}d ${Math.floor(hours)}h ${minutes}m`;
}

// Initialize countdown
updateCountdown();
setInterval(updateCountdown, 60000);

// Destination Card Interactions
const destinationCards = document.querySelectorAll('.destination-card');
destinationCards.forEach(card => {
    card.addEventListener('click', () => {
        const destination = card.getAttribute('data-dest');
        document.getElementById('destination').value = destination;
        document.querySelector('.booking-form').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});