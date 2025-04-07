const galleryContainer = document.querySelector('.gallery-container');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

const imageSources = [];
for (let i = 1; i <= 30; i++) {
    imageSources.push(`https://picsum.photos/id/${i + 10}/900/900`);
}

// Dynamically create cards
imageSources.forEach((src, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
  <img src="${src}" data-index="${index}" loading="lazy" />
    <p>Image ${index + 1} details</p>
  `;
    galleryContainer.appendChild(card);
});

let currentIndex = 0;

// Open modal
galleryContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        currentIndex = parseInt(e.target.getAttribute('data-index'));
        showModal(currentIndex);
    }
});

// toggle navigation menu on the hamburger icon click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
    document.body.classList.toggle('nav-open'); // Locks scroll
});


function showModal(index) {
    modalImage.src = imageSources[index];
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
});

// Prev button
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
    showModal(currentIndex);
});

// Next button
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imageSources.length;
    showModal(currentIndex);
});



// Close modal on 'Esc' key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
});

// Close modal on outside click (not the image)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
});


// changing the modal image with arrow keys
document.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'flex') return;

    switch (e.key) {
        case 'Escape':
            closeModalFunc();
            break;
        case 'ArrowRight':
            navigateModal(1);
            break;
        case 'ArrowLeft':
            navigateModal(-1);
            break;
    }
});

function closeModalFunc() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

function navigateModal(direction) {
    currentIndex = (currentIndex + direction + imageSources.length) % imageSources.length;
    showModal(currentIndex);
}