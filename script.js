document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Temple Modal
    const templeCards = document.querySelectorAll('.temple-card');
    const modal = document.getElementById('templeModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');

    // Temple data (would typically come from a database in a real application)
    const templeData = {
        1: {
            title: "Shriji Mandir (Radha Rani Temple)",
            image: "images/shriji-mandir-large.jpg",
            description: "The Shriji Mandir, also known as the Radha Rani Temple, is the most famous and sacred temple in Barsana. It is situated at the top of Bhanugarh hill, which is about 250 meters high. The temple is dedicated to Radha Rani, who is worshipped as the queen of Barsana.",
            history: "The temple was built by Raja Bhagwan Das in 1675 AD. The main deities are Radha (as Shriji) and Krishna (as Laddu Gopal). The temple architecture reflects the Mughal style with its red sandstone construction.",
            darshan: "The temple opens at 5:00 AM with Mangala Aarti and closes at 12:00 PM. It reopens at 4:00 PM for evening darshan and closes after Shayan Aarti at 9:00 PM. The best time for darshan is during the morning aarti.",
            special: "The temple is famous for its unique celebrations during Radhashtami (Radha's birthday) and Lathmar Holi. The view from the temple offers a panoramic sight of the entire Braj region."
        },
        2: {
            title: "Mor Kutir",
            image: "images/mor-kutir-large.jpg",
            description: "Mor Kutir is the sacred spot where Lord Krishna danced like a peacock to please Radha and her sakhis (friends). The name 'Mor Kutir' literally means 'Peacock's Cottage'.",
            history: "According to legend, Radha and her friends were once imitating peacocks in their dance. Krishna, wanting to join them, took the form of a beautiful peacock and danced so gracefully that Radha was enchanted.",
            darshan: "Open all day for visitors. There's no strict timing for darshan as it's an open area. Early morning or late afternoon visits are recommended to avoid the midday heat.",
            special: "The place has beautiful murals depicting Krishna's peacock dance. Visitors often sit here and sing devotional songs remembering this divine pastime."
        },
        // Add similar data for other temples (3-12)
        3: {
            title: "Prem Sarovar",
            image: "images/prem-sarovar-large.jpg",
            description: "Prem Sarovar is the sacred pond where the divine love between Radha and Krishna blossomed. 'Prem' means love and 'Sarovar' means pond.",
            history: "This is where Radha and Krishna would meet secretly. The pond is said to have been created by Krishna's flute when he played it with such emotion that water sprang from the ground.",
            darshan: "Open 24 hours. Devotees can visit anytime, but the most peaceful times are sunrise and sunset.",
            special: "Taking a dip in Prem Sarovar is considered highly auspicious, especially on Radhashtami and Janmashtami."
        }
        // Continue for all 12 temples...
    };

    // Open modal with temple details
    templeCards.forEach(card => {
        card.addEventListener('click', function() {
            const templeId = this.getAttribute('data-id');
            const temple = templeData[templeId];
            
            if (temple) {
                modalBody.innerHTML = `
                    <img src="${temple.image}" alt="${temple.title}">
                    <h2>${temple.title}</h2>
                    <p>${temple.description}</p>
                    
                    <h3>History</h3>
                    <p>${temple.history}</p>
                    
                    <h3>Darshan Information</h3>
                    <p>${temple.darshan}</p>
                    
                    <h3>Special Features</h3>
                    <p>${temple.special}</p>
                    
                    <div class="modal-actions">
                        <button class="btn" onclick="window.location.href='#map'">View on Map</button>
                    </div>
                `;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Festival slider navigation
    const festivalSlider = document.querySelector('.festival-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    festivalSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - festivalSlider.offsetLeft;
        scrollLeft = festivalSlider.scrollLeft;
    });

    festivalSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    festivalSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    festivalSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - festivalSlider.offsetLeft;
        const walk = (x - startX) * 2;
        festivalSlider.scrollLeft = scrollLeft - walk;
    });
});