(function () {
  function registerNavigationTool(widget) {
    widget.addEventListener("elevenlabs-convai:call", (event) => {
      event.detail.config.clientTools = {
        navigate: ({ url }) => {
          console.log("➡️ navigate called:", url);

          if (!url) {
            return "No URL provided";
          }

          // External links
          if (url.startsWith("http")) {
            window.open(url, "_blank", "noopener,noreferrer");
            return `Opened ${url}`;
          }

          // Internal SPA navigation
          fetch(url)
            .then((res) => res.text())
            .then((html) => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, "text/html");
              const newMain = doc.querySelector("main");
              const currentMain = document.querySelector("main");

              if (newMain && currentMain) {
                currentMain.innerHTML = newMain.innerHTML;
                window.history.pushState({}, "", url);
              } else {
                window.location.href = url;
              }
            })
            .catch(() => {
              window.location.href = url;
            });

          return `Navigating to ${url}`;
        }
      };
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const widget = document.querySelector("elevenlabs-convai");
    if (!widget) return;
    registerNavigationTool(widget);
    console.log("✅ ElevenLabs navigation tool registered");
  });
})();
