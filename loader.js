(() => {
  const script = document.currentScript;

  const loadWidget = () => {
    const widget = document.createElement("div");
    const floatBtn = document.createElement("div");

    const floatBtnStyle = floatBtn.style;
    floatBtnStyle.position = "absolute";
    floatBtnStyle.bottom = "30px";
    floatBtnStyle.right = "30px";
    floatBtnStyle.zIndex = 123654;
    floatBtnStyle.width = "50px";
    floatBtnStyle.height = "50px";
    floatBtnStyle.borderRadius = "25px";
    floatBtnStyle.background = "red";

    const widgetStyle = widget.style;
    widgetStyle.display = "none";
    widgetStyle.boxSizing = "border-box";
    widgetStyle.width = "350px";
    widgetStyle.height = "450px";
    widgetStyle.position = "absolute";
    widgetStyle.bottom = "35px";
    widgetStyle.right = "20px";

    const iframe = document.createElement("iframe");

    const iframeStyle = iframe.style;
    iframeStyle.boxSizing = "borderBox";
    iframeStyle.position = "absolute";
    iframeStyle.right = 0;
    iframeStyle.top = 0;
    iframeStyle.width = "100%";
    iframeStyle.height = "100%";
    iframeStyle.border = 0;
    iframeStyle.borderRadius = "0.5rem";
    iframeStyle.margin = 0;
    iframeStyle.padding = 0;
    iframeStyle.width = "350px";

    widget.appendChild(iframe);
    document.body.appendChild(floatBtn);
    window.console.log("hey");

    const greeting = script.getAttribute("data-greeting");

    const api = {
      sendMessage: (message) => {
        iframe.contentWindow.postMessage(
          {
            sendMessage: message,
          },
          "http://localhost:3000"
        );
      },

      show: () => {
        widget.style.display = "block";
      },

      hide: () => {
        widget.style.display = "none";
      },

      toggle: () => {
        const display = window.getComputedStyle(widget, null).display;
        widget.style.display = display === "none" ? "block" : "none";
      },

      onHide: () => {},
    };

    iframe.addEventListener("load", () => {
      window.addEventListener("getWidgetApi", () => {
        const event = new CustomEvent("widgetApi", { detail: api });
        window.dispatchEvent(event);
      });

      // window.addEventListener("message", (evt) => {
      //   if (evt.origin !== "http://localhost:3000/chat") {
      //     return;
      //   }

      //   if (evt.data === "hide") {
      //     api.hide();
      //     api.onHide();
      //   }
      // });

      iframe.contentWindow.postMessage({ greeting }, "http://localhost:3000");
      widgetStyle.display = "block";
    });

    const license = script.getAttribute("data-license");
    const widgetUrl = `http://localhost:3000/chat`;

    iframe.src = widgetUrl;

    document.body.appendChild(widget);
  };

  if (document.readyState === "complete") {
    loadWidget();
  } else {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        loadWidget();
      }
    });
  }
})();
