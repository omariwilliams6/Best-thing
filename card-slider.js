// ========================================
// Card Slider Functionality
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Card Slider State
  let selectedIndex = 2; // Middle card starts selected
  const cards = document.querySelectorAll('.card');
  const totalCards = cards.length;
  const transitionUrl = 'https://scheduler.zoom.us/heatherdollandtamam';
  
  // Get navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const selectBtn = document.getElementById('selectBtn');
  
  // ========================================
  // Update Cards Display
  // ========================================
  function updateCards() {
    cards.forEach((card, index) => {
      // Remove all state classes
      card.classList.remove('highlighted', 'greyed-out');
      
      // Apply appropriate class based on selection
      if (index === selectedIndex) {
        card.classList.add('highlighted');
      } else {
        card.classList.add('greyed-out');
      }
    });
  }
  
  // ========================================
  // Navigation Functions
  // ========================================
  function handlePrev() {
    selectedIndex = (selectedIndex - 1 + totalCards) % totalCards;
    updateCards();
  }
  
  function handleNext() {
    selectedIndex = (selectedIndex + 1) % totalCards;
    updateCards();
  }
  
  function handleCardClick(index) {
    selectedIndex = index;
    updateCards();

    const clickedCard = cards[index];
    const cardLabel = clickedCard?.querySelector('img')?.alt?.trim().toLowerCase();
    if (cardLabel === 'transition') {
      window.location.href = transitionUrl;
    }
  }
  
  function handleSelect() {
    const selectedCard = cards[selectedIndex];
    if (!selectedCard) return;
    
    const cardLabel = selectedCard.querySelector('img')?.alt?.trim() || `Card ${selectedIndex + 1}`;
    const cardLink = selectedCard.dataset.link;
    
    if (cardLink) {
      window.location.href = cardLink;
      return;
    }

    if (cardLabel.toLowerCase() === 'transition') {
      window.location.href = transitionUrl;
      return;
    }
    
    if (cardLabel.toLowerCase() === 'clarity') {
      window.location.href = 'clarity.html';
      return;
    }
    
    console.log(`Selected category: ${cardLabel}`);
    alert(`You selected: ${cardLabel}\n\nThis would navigate to the ${cardLabel} program page.`);
  }
  
  // ========================================
  // Event Listeners
  // ========================================
  
  // Navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', handlePrev);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', handleNext);
  }
  
  // Select button
  if (selectBtn) {
    selectBtn.addEventListener('click', handleSelect);
  }
  
  // Card click handlers
  cards.forEach((card, index) => {
    card.addEventListener('click', () => handleCardClick(index));
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Only handle keyboard if card slider is in view
    const sliderSection = document.querySelector('.card-slider-section');
    if (!sliderSection) return;
    
    const rect = sliderSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isInView) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        handlePrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        handleNext();
        break;
      case 'Enter':
        e.preventDefault();
        handleSelect();
        break;
    }
  });
  
  // Initialize cards
  updateCards();
  
  // ========================================
  // Mobile Menu Toggle
  // ========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navbarLinks = document.getElementById('navbarLinks');
  
  if (mobileMenuBtn && navbarLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navbarLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navbarLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }
  
  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========================================
  // Scroll Animation (Fade In on Scroll)
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe sections for animation
  const animatedSections = document.querySelectorAll('.about-section, .book-section, .testimonials-section, .cta-section');
  animatedSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });
});
