document.addEventListener('DOMContentLoaded', function () {
    const shareButtons = document.querySelectorAll('.share');
  
    function shareButtonClick(event) {
      const button = event.currentTarget;
      const container = button.nextElementSibling;
  
      if (container.style.display === 'block') {
        // If container is already visible, hide it
        container.style.display = 'none';
      } else {
        // Clear previous content
        container.innerHTML = '';
  
        // Add your share button logic here
        const link = encodeURI('https://example.com');
        const msg = encodeURIComponent('Check out this link');
        const title = encodeURIComponent('Page Title');
  
        const socialMedia = [
          { name: 'Facebook', icon: 'fab fa-facebook', url: `https://www.facebook.com/share.php?u=${link}` },
          { name: 'Twitter', icon: 'fab fa-twitter', url: `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming` },
          { name: 'LinkedIn', icon: 'fab fa-linkedin', url: `https://www.linkedin.com/sharing/share-offsite/?url=${link}` },
          { name: 'Reddit', icon: 'fab fa-reddit', url: `http://www.reddit.com/submit?url=${link}&title=${title}` },
          { name: 'WhatsApp', icon: 'fab fa-whatsapp', url: `https://api.whatsapp.com/send?text=${msg}: ${link}` },
          { name: 'Telegram', icon: 'fab fa-telegram', url: `https://telegram.me/share/url?url=${link}&text=${msg}` },
          // Add more social media platforms as needed
        ];
  
        socialMedia.forEach(function (platform) {
          const shareLink = document.createElement('a');
          shareLink.href = platform.url;
          shareLink.className = platform.name.toLowerCase();
          shareLink.target = '_blank';
  
          const icon = document.createElement('i');
          icon.className = platform.icon;
          icon.style.fontSize = '40px'; // Increase icon size
  
          shareLink.appendChild(icon);
          container.appendChild(shareLink);
        });
  
        // Show the popup
        container.style.display = 'block';
      }
    }
  
    shareButtons.forEach(function (button) {
      button.addEventListener('click', shareButtonClick);
    });
  });
  