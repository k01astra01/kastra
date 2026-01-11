document.addEventListener('DOMContentLoaded', () => {
  const widget = document.querySelector('elevenlabs-convai');

  if (!widget) {
    console.warn('ElevenLabs widget not found');
    return;
  }

  widget.addEventListener('elevenlabs-convai:call', (event) => {
    event.detail.config.clientTools = {

      navigate: ({ url }) => {
        if (!url) return 'No URL provided';

        // External link
        if (url.startsWith('http')) {
          window.open(url, '_blank', 'noopener,noreferrer');
          return `Opened ${url}`;
        }

        // Internal navigation
        window.location.href = url;
        return `Navigating to ${url}`;
      }
console.log('ElevenLabs widget detected');
console.log('Navigate tool called with:', url);
    };
  });
});

