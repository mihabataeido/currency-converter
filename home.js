function scrollToSection(sectionId, targetIndex) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const scrollTargets = targetSection.querySelectorAll('.scroll-target');
        if (scrollTargets.length > targetIndex) {
            scrollTargets[targetIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }
}