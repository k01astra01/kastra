document.addEventListener("DOMContentLoaded", () => {
  const waitForWidget = setInterval(() => {
    const widget = document.querySelector("elevenlabs-convai");

    if (!widget) return;

    clearInterval(waitForWidget);

    widget.addEventListener("elevenlabs-convai:call", (event) => {
      event.detail.config.clientTools = {
        navigate: ({ url }) => {
          console.log("➡️ navigate tool called with:", url);

          if (!url) return "No URL provided";

          if (url.startsWith("http")) {
            window.open(url, "_blank", "noopener,noreferrer");
            return `Opened ${url}`;
          }

          window.location.href = url;
          return `Navigating to ${url}`;
        }
      };
    });

    console.log("✅ ElevenLabs navigation tool registered");
  }, 100);
});

