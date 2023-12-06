(() => {
  const script = document.currentScript;

  const loadWidget = () => {
    const widget = document.createElement("div");
    const floatBtn = document.createElement("div");

    const floatBtnStyle = floatBtn.style;
    floatBtnStyle.position = "fixed";
    floatBtnStyle.bottom = "20px";
    floatBtnStyle.right = "20px";
    floatBtnStyle.zIndex = 123654;
    floatBtnStyle.width = "40px";
    floatBtnStyle.height = "40px";
    floatBtnStyle.borderRadius = "25px";
    floatBtnStyle.background = "#0f0";

    const widgetStyle = widget.style;
    widgetStyle.display = "none";
    widgetStyle.boxSizing = "border-box";
    widgetStyle.width = "350px";
    widgetStyle.height = "450px";
    widgetStyle.position = "fixed";
    widgetStyle.bottom = "65px";
    widgetStyle.right = "35px";

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

    floatBtn.addEventListener("click", function () {
      if (widgetStyle.display == "none") {
        widgetStyle.display = "block";
      } else {
        widgetStyle.display = "none";
      }
    });

    const greeting = script.getAttribute("data-greeting");

    iframe.addEventListener("load", () => {});

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
