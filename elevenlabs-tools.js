document.addEventListener('DOMContentLoaded', () => {
  const widget = document.querySelector('elevenlabs-convai');

  if (!widget) {
    console.warn('ElevenLabs widget not found');
    return;
  }

  widget.addEventListener('elevenlabs-convai:call', (event) => {
    event.detail.config.clientTools = {

      redirectToExternalURL: ({ url }) => {
        if (!url) return 'No URL provided';

        window.open(url, '_blank', 'noopener,noreferrer');
        return `Opened ${url}`;
      },

      navigateToPage: ({ pagePath }) => {
        if (!pagePath) return 'No page path provided';

        window.location.href = pagePath;
        return `Navigating to ${pagePath}`;
      }
    };
  });
});
