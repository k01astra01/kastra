document.addEventListener("DOMContentLoaded", () => {
  const widget = document.querySelector("elevenlabs-convai");

  if (!widget) {
    console.error("❌ ElevenLabs widget not found");
    return;
  }

  widget.addEventListener("elevenlabs-convai:ready", (event) => {
    console.log("✅ ElevenLabs widget ready");

    event.detail.config.clientTools = {
      navigate: ({ url }) => {
        console.log("➡️ Navigate tool called with:", url);

        if (!url) return "No URL provided";

        // External
        if (url.startsWith("http")) {
          window.open(url, "_blank", "noopener,noreferrer");
          return `Opened ${url}`;
        }

        // Internal (GitHub Pages safe)
        window.location.href = url;
        return `Navigating to ${url}`;
      }
    };
  });
});
