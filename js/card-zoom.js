function zoomOutCard(element) {
    // Add zoom out effect
    element.classList.add('scale-95');
    
    // Remove the zoom out effect after animation
    setTimeout(() => {
        element.classList.remove('scale-95');
    }, 200);
}
