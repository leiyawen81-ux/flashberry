const appShell = document.querySelector(".app-shell");
const siteNav = document.querySelector(".site-nav");
const startButton = document.getElementById("startButton");
const welcomeContinueButton = document.getElementById("welcomeContinueButton");
const welcomeBackButton = document.getElementById("welcomeBackButton");
const layoutHomeButton = document.getElementById("layoutHomeButton");
const layoutGallery = document.getElementById("layoutGallery");
const layoutContinueButton = document.getElementById("layoutContinueButton");
const backToLayoutsButton = document.getElementById("backToLayoutsButton");
const retryCameraButton = document.getElementById("retryCameraButton");
const permissionCard = document.getElementById("permissionCard");
const permissionTitle = document.getElementById("permissionTitle");
const permissionText = document.getElementById("permissionText");
const previewCanvas = document.getElementById("previewCanvas");
const previewCtx = previewCanvas.getContext("2d");
const shootLiveCanvas = document.getElementById("shootLiveCanvas");
const shootLiveCtx = shootLiveCanvas.getContext("2d");
const cameraVideo = document.getElementById("cameraVideo");
const statusText = document.getElementById("statusText");
const frameButtons = document.getElementById("frameButtons");
const confirmDesignButton = document.getElementById("confirmDesignButton");
const captureButton = document.getElementById("captureButton");
const liveButton = document.getElementById("liveButton");
const downloadButton = document.getElementById("downloadButton");
const startShootButton = document.getElementById("startShootButton");
const retakeButton = document.getElementById("retakeButton");
const doneButton = document.getElementById("doneButton");
const shootStatus = document.getElementById("shootStatus");
const countdownOverlay = document.getElementById("countdownOverlay");
const countdownNumber = document.getElementById("countdownNumber");
const finishOverlay = document.getElementById("finishOverlay");
const finishCard = finishOverlay.querySelector(".finish-card");
const finishCanvas = document.getElementById("finishCanvas");
const finishCtx = finishCanvas.getContext("2d");
const finishAgainButton = document.getElementById("finishAgainButton");
const saveFinalButton = document.getElementById("saveFinalButton");
const printFinalButton = document.getElementById("printFinalButton");

const paperTextureImage = new Image();
paperTextureImage.src = "assets/reference-paper-texture.jpg?v=5";
paperTextureImage.addEventListener("load", () => {
  state.frameCache = null;
  restartRenderLoop();
});

const starSpriteImages = Array.from({ length: 5 }, (_, index) => {
  const image = new Image();
  image.src = `assets/star-sprites/star-${index + 1}.png?v=clean-reference-stars`;
  image.addEventListener("load", () => {
    state.frameCache = null;
    restartRenderLoop();
  });
  return image;
});

const sixLayoutFrameImage = new Image();
sixLayoutFrameImage.src = "assets/layout-frame-six.png?v=larger-slots";
sixLayoutFrameImage.addEventListener("load", () => {
  state.frameCache = null;
  restartRenderLoop();
});

const defaultFrameOptions = [
  {
    id: "plain",
    src: "assets/layout-polaroid-plain.svg?v=clean-reference-stars",
    alt: "Star paper border style",
  },
  {
    id: "midnight",
    src: "assets/template-midnight-heart.jpg",
    alt: "Black polka heart border style",
  },
  {
    id: "instagram",
    src: "assets/template-instagram.jpg",
    alt: "Instagram caption border style",
  },
  {
    id: "mint",
    src: "assets/template-mint-star.jpg",
    alt: "Mint star border style",
  },
];

const layout2Designs = [
  {
    id: "cake-mint",
    src: "assets/layout2-designs/design-1.png?v=layout2-designs",
    width: 709,
    height: 1772,
    slots: [
      { x: 78, y: 124, width: 552, height: 374 },
      { x: 78, y: 558, width: 552, height: 374 },
      { x: 78, y: 994, width: 552, height: 374 },
    ],
  },
  {
    id: "hello-kitty-blue",
    src: "assets/layout2-designs/design-2.jpg?v=layout2-designs",
    width: 882,
    height: 2458,
    slots: [
      { x: 87, y: 54, width: 720, height: 516 },
      { x: 87, y: 618, width: 705, height: 531 },
      { x: 0, y: 1173, width: 795, height: 507 },
      { x: 87, y: 1725, width: 708, height: 507 },
    ],
  },
  {
    id: "crayon-yellow",
    src: "assets/layout2-designs/design-3.jpg?v=layout2-designs",
    width: 882,
    height: 2458,
    slots: [
      { x: 6, y: 21, width: 864, height: 1104 },
      { x: 33, y: 1161, width: 780, height: 1071 },
    ],
  },
  {
    id: "chiikawa-pink",
    src: "assets/layout2-designs/design-4.jpg?v=layout2-designs",
    width: 614,
    height: 1703,
    slots: [
      { x: 60, y: 0, width: 498, height: 388 },
      { x: 60, y: 416, width: 498, height: 386 },
      { x: 60, y: 808, width: 498, height: 360 },
      { x: 56, y: 1196, width: 502, height: 398 },
    ],
  },
  {
    id: "rilakkuma-pink",
    src: "assets/layout2-designs/design-5.jpg?v=layout2-designs",
    width: 613,
    height: 1701,
    slots: [
      { x: 62, y: 30, width: 490, height: 356 },
      { x: 62, y: 418, width: 488, height: 354 },
      { x: 62, y: 806, width: 490, height: 364 },
      { x: 62, y: 1190, width: 490, height: 360 },
    ],
  },
  {
    id: "chiikawa-cheer",
    src: "assets/layout2-designs/design-6.jpg?v=layout2-designs",
    width: 575,
    height: 1615,
    slots: [
      { x: 2, y: 6, width: 518, height: 376 },
      { x: 56, y: 400, width: 462, height: 364 },
      { x: 52, y: 768, width: 468, height: 338 },
      { x: 50, y: 1132, width: 470, height: 372 },
    ],
  },
  {
    id: "powerpuff",
    src: "assets/layout2-designs/design-7.jpg?v=layout2-designs",
    width: 615,
    height: 1720,
    slots: [
      { x: 54, y: 30, width: 498, height: 366 },
      { x: 58, y: 422, width: 492, height: 382 },
      { x: 54, y: 802, width: 498, height: 390 },
      { x: 54, y: 1202, width: 498, height: 368 },
    ],
  },
  {
    id: "hello-kitty-red",
    src: "assets/layout2-designs/design-8.jpg?v=layout2-designs",
    width: 607,
    height: 1677,
    slots: [
      { x: 60, y: 38, width: 484, height: 348 },
      { x: 60, y: 416, width: 484, height: 396 },
      { x: 60, y: 762, width: 484, height: 386 },
      { x: 60, y: 1178, width: 482, height: 348 },
    ],
  },
];

const layout2DesignImages = new Map();
layout2Designs.forEach((design) => {
  const image = new Image();
  image.src = design.src;
  image.addEventListener("load", () => {
    state.frameCache = null;
    restartRenderLoop();
  });
  layout2DesignImages.set(design.id, image);
});

const layoutSpecs = {
  polaroid: {
    label: "Layout1",
    width: 900,
    height: 1096,
    count: 1,
    slots: [{ x: 64, y: 56, width: 772, height: 772 }],
  },
  two: {
    label: "Two-cut",
    width: 900,
    height: 1460,
    count: 2,
    slots: [
      { x: 64, y: 70, width: 772, height: 560 },
      { x: 64, y: 680, width: 772, height: 560 },
    ],
  },
  three: {
    label: "Three-cut",
    width: 900,
    height: 2078,
    count: 3,
    slots: [
      { x: 64, y: 70, width: 772, height: 560 },
      { x: 64, y: 684, width: 772, height: 560 },
      { x: 64, y: 1298, width: 772, height: 560 },
    ],
  },
  four: {
    label: "Four-cut",
    width: 900,
    height: 2694,
    count: 4,
    slots: [
      { x: 88, y: 86, width: 724, height: 520 },
      { x: 88, y: 702, width: 724, height: 520 },
      { x: 88, y: 1318, width: 724, height: 520 },
      { x: 88, y: 1934, width: 724, height: 520 },
    ],
  },
  fourgrid: {
    label: "Traditional",
    width: 900,
    height: 1160,
    count: 4,
    slots: [
      { x: 42, y: 48, width: 386, height: 488 },
      { x: 472, y: 48, width: 386, height: 488 },
      { x: 42, y: 624, width: 386, height: 488 },
      { x: 472, y: 624, width: 386, height: 488 },
    ],
  },
  six: {
    label: "Six-grid",
    width: 900,
    height: 1090,
    count: 6,
    slots: [
      { x: 42, y: 60, width: 396, height: 306 },
      { x: 462, y: 60, width: 396, height: 306 },
      { x: 42, y: 392, width: 396, height: 306 },
      { x: 462, y: 392, width: 396, height: 306 },
      { x: 42, y: 724, width: 396, height: 306 },
      { x: 462, y: 724, width: 396, height: 306 },
    ],
  },
};

const templateStyles = {
  plain: {
    label: "Star Paper",
    page: "#e4decf",
    slotFill: "#f8f8f5",
    slotStroke: "rgba(58, 55, 50, 0.28)",
    text: "#232020",
    accent: "#d2a32f",
  },
  polka: {
    label: "Polka Bow",
    page: "#fff7fb",
    dot: "#725c53",
    slotFill: "#705b52",
    slotStroke: "rgba(94, 74, 68, 0.34)",
    text: "#6c5a55",
    accent: "#725c53",
  },
  midnight: {
    label: "Midnight Heart",
    page: "#050505",
    dot: "#ffffff",
    slotFill: "#050505",
    slotStroke: "rgba(255, 220, 238, 0.18)",
    text: "#fffaf3",
    accent: "#f2f2f2",
  },
  instagram: {
    label: "Instagram",
    page: "#ffffff",
    slotFill: "#f4f4f4",
    slotStroke: "rgba(214, 214, 214, 0.7)",
    text: "#232020",
    accent: "#f23b62",
  },
  mint: {
    label: "Mint Stars",
    page: "#daf9e3",
    dot: "#5c3d07",
    slotFill: "#1d1d23",
    slotStroke: "rgba(77, 55, 16, 0.25)",
    text: "#51380f",
    accent: "#6a4a08",
  },
};

const state = {
  layout: null,
  frame: "plain",
  confirmed: false,
  shooting: false,
  currentShot: 0,
  countdown: null,
  countdownTimer: null,
  captures: [],
  stream: null,
  live: true,
  frozenFrame: null,
  demoMode: false,
  animationFrame: null,
  permissionGranted: false,
  cameraRequestId: 0,
  finishButtonTimer: null,
  finishOverlayTimer: null,
  layoutAutoTimer: null,
  suppressShootLive: false,
  transitioningToShoot: false,
  frameCache: null,
  lastRenderAt: 0,
  frameOptionsMode: "",
  layout2Design: null,
};

function pinPageToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
  window.setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, 0);
  window.setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, 80);
}

function setScreen(screen) {
  appShell.classList.remove("screen-transition");
  void appShell.offsetWidth;
  appShell.dataset.screen = screen;
  appShell.classList.add("screen-transition");
  window.setTimeout(() => {
    appShell.classList.remove("screen-transition");
  }, 460);
  pinPageToTop();
}

function setActiveNav(target) {
  siteNav.querySelectorAll("button[data-nav-target]").forEach((button) => {
    if (button.dataset.navTarget === target) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function setCameraReady(isReady) {
  document.getElementById("booth").classList.toggle("camera-ready", isReady);
}

function setStudioVisible(isVisible) {
  document.getElementById("booth").classList.toggle("studio-visible", isVisible);
}

function setShootMode(isShootMode) {
  document.getElementById("booth").classList.toggle("shoot-mode", isShootMode);
}

function pulseBoothModeTransition() {
  const booth = document.getElementById("booth");
  booth.classList.remove("mode-transition");
  void booth.offsetWidth;
  booth.classList.add("mode-transition");
  window.setTimeout(() => {
    booth.classList.remove("mode-transition");
  }, 460);
}

function setPermissionState(title, text, showRetry = true, buttonText = "Allow Camera") {
  permissionTitle.textContent = title;
  permissionText.textContent = text;
  retryCameraButton.style.display = showRetry ? "inline-block" : "none";
  retryCameraButton.disabled = false;
  retryCameraButton.textContent = buttonText;
}

function cameraErrorMessage(error) {
  if (error?.name === "NotAllowedError" || error?.name === "PermissionDeniedError") {
    return "Camera permission was blocked. You can still choose layouts and styles below, or allow camera access from the browser permission prompt and try again.";
  }

  if (error?.name === "NotFoundError" || error?.name === "DevicesNotFoundError") {
    return "No camera was found. You can still choose layouts and styles below, then try again after connecting a camera.";
  }

  if (error?.name === "NotReadableError" || error?.name === "TrackStartError") {
    return "Your camera is already being used by another app. You can still choose layouts and styles below, then try again after closing that app.";
  }

  if (error?.name === "AbortError" || error?.name === "CameraTimeoutError") {
    return "The browser did not return a camera permission result. You can still design the layout below, or open this page in Chrome or Safari for live camera access.";
  }

  if (error?.name === "NotSupportedError") {
    return "This browser does not expose camera access to the page. You can still design the layout below, or open the site in Chrome or Safari on localhost.";
  }

  return "The camera could not start. You can still choose layouts and styles below, then try again after checking browser permissions.";
}

function requestCameraStream() {
  if (!navigator.mediaDevices?.getUserMedia) {
    return Promise.reject(new DOMException("Camera API unavailable", "NotSupportedError"));
  }

  const cameraPromise = navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "user",
      width: { ideal: 1280 },
      height: { ideal: 1280 },
    },
    audio: false,
  });

  return new Promise((resolve, reject) => {
    let settled = false;
    const timeoutId = window.setTimeout(() => {
      settled = true;
      reject(new DOMException("Camera request timed out", "CameraTimeoutError"));
    }, 4500);

    cameraPromise.then((stream) => {
      if (settled) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      settled = true;
      window.clearTimeout(timeoutId);
      resolve(stream);
    }).catch((error) => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(timeoutId);
      reject(error);
    });
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function fitCover(sourceWidth, sourceHeight, target) {
  const scale = Math.max(target.width / sourceWidth, target.height / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;

  return {
    x: target.x + (target.width - width) / 2,
    y: target.y + (target.height - height) / 2,
    width,
    height,
  };
}

function getCurrentTemplate() {
  return templateStyles[state.frame] || templateStyles.plain;
}

function getActiveLayout2Design() {
  if (state.layout !== "four" || state.frame !== "layout2-custom") {
    return null;
  }
  return layout2Designs.find((design) => design.id === state.layout2Design) || null;
}

function pickRandomLayout2Design() {
  const next = layout2Designs[Math.floor(Math.random() * layout2Designs.length)];
  state.layout2Design = next.id;
  state.frame = "layout2-custom";
  invalidateFrameCache();
}

function scaleLayout2DesignGeometry(design) {
  const scale = 900 / design.width;
  return {
    label: "Layout2",
    width: 900,
    height: Math.round(design.height * scale),
    count: design.slots.length,
    slots: design.slots.map((slot) => ({
      x: Math.round(slot.x * scale),
      y: Math.round(slot.y * scale),
      width: Math.round(slot.width * scale),
      height: Math.round(slot.height * scale),
    })),
  };
}

function getLayoutGeometry() {
  const layout2Design = getActiveLayout2Design();
  if (layout2Design) {
    return scaleLayout2DesignGeometry(layout2Design);
  }

  const layout = layoutSpecs[state.layout || "four"];

  return {
    ...layout,
    slots: layout.slots.map((slot) => ({ ...slot })),
  };
}

function invalidateFrameCache() {
  state.frameCache = null;
}

function activeButtons(container, key, value) {
  if (!container) {
    return;
  }

  container.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset[key] === value));
  });
}

function renderDesignOptions() {
  if (!frameButtons) {
    return;
  }

  const mode = state.layout === "four" ? "layout2" : "default";
  if (state.frameOptionsMode === mode) {
    return;
  }

  frameButtons.textContent = "";
  const options = mode === "layout2" ? layout2Designs : defaultFrameOptions;
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    if (mode === "layout2") {
      button.dataset.layout2Design = option.id;
    } else {
      button.dataset.frame = option.id;
    }
    button.setAttribute("aria-pressed", "false");

    const image = document.createElement("img");
    image.src = option.src;
    image.alt = option.alt || "Photo booth design";
    button.appendChild(image);
    frameButtons.appendChild(button);
  });

  state.frameOptionsMode = mode;
}

function syncControls() {
  layoutGallery?.querySelectorAll("button[data-layout]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.layout === state.layout));
  });
  if (layoutContinueButton) {
    layoutContinueButton.disabled = !state.layout;
  }
  renderDesignOptions();
  if (state.layout === "four") {
    activeButtons(frameButtons, "layout2Design", state.layout2Design);
  } else {
    activeButtons(frameButtons, "frame", state.frame);
  }
  confirmDesignButton.disabled = state.confirmed;
}

function drawPlaceholder(ctx, slot, index) {
  const template = getCurrentTemplate();
  ctx.fillStyle = template.slotFill || "#f7f7f4";
  ctx.fillRect(slot.x, slot.y, slot.width, slot.height);

  if (state.frame === "plain") {
    ctx.save();
    ctx.fillStyle = "rgba(110, 104, 99, 0.13)";
    ctx.font = "800 34px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(index + 1), slot.x + slot.width / 2, slot.y + slot.height / 2);
    ctx.restore();
  }
}

function drawSourceIntoSlot(ctx, slot, source, index, mirror = false) {
  const sourceWidth = source?.videoWidth || source?.width || 0;
  const sourceHeight = source?.videoHeight || source?.height || 0;

  if (!source || !sourceWidth || !sourceHeight) {
    drawPlaceholder(ctx, slot, index);
    return;
  }

  ctx.save();
  ctx.beginPath();
  ctx.rect(slot.x, slot.y, slot.width, slot.height);
  ctx.clip();
  ctx.fillStyle = "#eee4dc";
  ctx.fillRect(slot.x, slot.y, slot.width, slot.height);
  const cover = fitCover(sourceWidth, sourceHeight, slot);
  if (mirror) {
    ctx.save();
    ctx.translate(cover.x + cover.width, cover.y);
    ctx.scale(-1, 1);
    ctx.drawImage(source, 0, 0, cover.width, cover.height);
    ctx.restore();
  } else {
    ctx.drawImage(source, cover.x, cover.y, cover.width, cover.height);
  }
  ctx.restore();
}

function drawReferencePaperTexture(ctx, outer, alpha = 1) {
  if (!paperTextureImage.complete || !paperTextureImage.naturalWidth) {
    return;
  }

  ctx.save();
  ctx.globalAlpha = 0.28 * alpha;
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(paperTextureImage, outer.x, outer.y, outer.width, outer.height);
  ctx.restore();
}

function drawLiveCameraIntoSlot(ctx, slot, index) {
  drawSourceIntoSlot(ctx, slot, cameraVideo, index, true);
}

function drawDotField(ctx, geometry, color, spacing = 74, radius = 7) {
  ctx.save();
  ctx.fillStyle = color;
  for (let y = 30; y < geometry.height; y += spacing) {
    const offset = Math.round((y / spacing) % 2) * (spacing / 2);
    for (let x = 28 + offset; x < geometry.width; x += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawGingham(ctx, geometry) {
  const size = 34;
  ctx.save();
  for (let y = 0; y < geometry.height; y += size) {
    for (let x = 0; x < geometry.width; x += size) {
      ctx.fillStyle = (x / size + y / size) % 2 === 0
        ? "rgba(255, 255, 255, 0.52)"
        : "rgba(102, 202, 145, 0.2)";
      ctx.fillRect(x, y, size, size);
    }
  }
  ctx.restore();
}

function drawInstagramChrome(ctx, geometry) {
  ctx.save();
  ctx.fillStyle = "rgba(245, 245, 245, 0.92)";
  ctx.beginPath();
  ctx.arc(128, 66, 38, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#f23b62";
  ctx.lineWidth = 7;
  ctx.stroke();

  ctx.fillStyle = "#232020";
  ctx.font = "italic 700 38px Georgia, serif";
  ctx.textAlign = "left";
  ctx.fillText("Photo Booth", 188, 62);
  ctx.globalAlpha = 0.72;
  ctx.font = "italic 700 24px Georgia, serif";
  ctx.fillText(new Intl.DateTimeFormat("en", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  }).format(new Date()), 190, 98);
  ctx.globalAlpha = 1;

  [0, 1, 2].forEach((index) => {
    ctx.fillStyle = "rgba(35, 32, 32, 0.18)";
    ctx.beginPath();
    ctx.arc(780, 48 + index * 27, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  const footerY = geometry.height - 116;
  drawHeart(ctx, 110, footerY, 62, "#f23b62");
  ctx.strokeStyle = "#232020";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(210, footerY - 8, 28, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(342, footerY - 44);
  ctx.lineTo(408, footerY - 12);
  ctx.lineTo(342, footerY + 20);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeRect(744, footerY - 44, 54, 72);

  ctx.fillStyle = "#232020";
  ctx.font = "800 30px ui-sans-serif, system-ui";
  ctx.fillText("532 Likes", 96, geometry.height - 58);
  ctx.restore();
}

function drawFrame(ctx, geometry) {
  const template = getCurrentTemplate();

  ctx.clearRect(0, 0, geometry.width, geometry.height);
  ctx.fillStyle = template.page || "#fbf7f1";
  ctx.fillRect(0, 0, geometry.width, geometry.height);

  if (state.frame === "plain") {
    drawSubtlePaperTexture(ctx, geometry);
  }

  if (state.frame === "polka") {
    drawDotField(ctx, geometry, template.dot, 68, 6);
  }

  if (state.frame === "midnight") {
    drawDotField(ctx, geometry, template.dot, 78, 7);
  }

  if (state.frame === "mint") {
    drawGingham(ctx, geometry);
    drawDotField(ctx, geometry, template.dot, 84, 7);
  }

  if (state.frame === "instagram") {
    drawInstagramChrome(ctx, geometry);
  }
}

function drawPaperTexture(ctx, outer, alpha = 1) {
  const gradient = ctx.createLinearGradient(outer.x, outer.y, outer.x, outer.y + outer.height);
  gradient.addColorStop(0, "#e4decf");
  gradient.addColorStop(0.5, "#e4decf");
  gradient.addColorStop(1, "#e4decf");
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = gradient;
  ctx.fillRect(outer.x, outer.y, outer.width, outer.height);
  drawReferencePaperTexture(ctx, outer, alpha);

  const glow = ctx.createRadialGradient(
    outer.x + outer.width * 0.34,
    outer.y + outer.height * 0.16,
    0,
    outer.x + outer.width * 0.34,
    outer.y + outer.height * 0.16,
    outer.width * 0.95
  );
  glow.addColorStop(0, "rgba(255, 252, 238, 0.16)");
  glow.addColorStop(0.58, "rgba(228, 222, 207, 0.08)");
  glow.addColorStop(1, "rgba(166, 153, 130, 0.1)");
  ctx.fillStyle = glow;
  ctx.fillRect(outer.x, outer.y, outer.width, outer.height);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.045 * alpha;
  for (let i = 0; i < 88; i += 1) {
    const y = outer.y + ((i * 37) % outer.height);
    const x = outer.x + ((i * 71) % outer.width);
    const width = outer.width * (0.04 + ((i % 4) * 0.015));
    ctx.strokeStyle = i % 2 ? "#fff9e8" : "#a69a86";
    ctx.lineWidth = 0.65 + (i % 2) * 0.25;
    ctx.beginPath();
    ctx.moveTo(x - width / 2, y);
    ctx.bezierCurveTo(x, y + (i % 2 ? 8 : -8), x + width * 0.4, y - 4, x + width, y + 2);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.045 * alpha;
  for (let i = 0; i < 150; i += 1) {
    const x = outer.x + 18 + ((i * 113) % Math.max(1, outer.width - 36));
    const y = outer.y + 18 + ((i * 181) % Math.max(1, outer.height - 36));
    const length = 4 + (i % 5) * 3;
    ctx.strokeStyle = i % 2 ? "#fff9e8" : "#837766";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y + ((i % 3) - 1));
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.055 * alpha;
  for (let i = 0; i < 230; i += 1) {
    const x = outer.x + ((i * 97) % Math.max(1, outer.width));
    const y = outer.y + ((i * 157) % Math.max(1, outer.height));
    const size = 0.7 + (i % 4) * 0.32;
    ctx.fillStyle = i % 3 ? "#716758" : "#fff9e8";
    ctx.beginPath();
    ctx.ellipse(x, y, size * 1.6, size, (i % 7) * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawSubtlePaperTexture(ctx, geometry) {
  ctx.save();
  ctx.shadowColor = "rgba(42, 39, 35, 0.24)";
  ctx.shadowBlur = Math.max(20, geometry.width * 0.04);
  ctx.shadowOffsetY = Math.max(14, geometry.height * 0.01);
  drawPaperTexture(ctx, {
    x: 8,
    y: 8,
    width: geometry.width - 16,
    height: geometry.height - 16,
  }, 0.94);
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(255, 255, 250, 0.5)";
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, geometry.width - 20, geometry.height - 20);
  ctx.strokeStyle = "rgba(58, 55, 50, 0.28)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(12, geometry.height - 12);
  ctx.lineTo(geometry.width - 12, geometry.height - 12);
  ctx.moveTo(geometry.width - 12, 12);
  ctx.lineTo(geometry.width - 12, geometry.height - 12);
  ctx.stroke();
  ctx.restore();
}

function drawStarDecorations(ctx, geometry) {
  if (state.frame !== "plain") {
    return;
  }

  const [firstSlot] = geometry.slots;
  const verticalStrip = firstSlot && firstSlot.width > geometry.width * 0.72 && geometry.slots.length > 1;
  let stars;

  if (geometry.slots.length === 1) {
    const slot = geometry.slots[0];
    stars = [
      { x: slot.x + slot.width * 0.78, y: slot.y - 10, r: 50, rotate: 0.2, opacity: 0.97 },
      { x: slot.x - 8, y: slot.y + slot.height * 0.3, r: 30, rotate: -0.22, opacity: 0.92 },
      { x: slot.x - 24, y: slot.y + slot.height * 0.54, r: 48, rotate: 0.14, opacity: 0.96 },
      { x: slot.x + slot.width + 4, y: slot.y + slot.height * 0.83, r: 44, rotate: -0.12, opacity: 0.95 },
      { x: geometry.width * 0.46, y: geometry.height - 132, r: 39, rotate: 0.28, opacity: 0.93 },
      { x: geometry.width * 0.22, y: geometry.height - 44, r: 30, rotate: -0.22, opacity: 0.9 },
      { x: geometry.width * 0.9, y: geometry.height * 0.06, r: 28, rotate: 0.18, opacity: 0.88 },
    ];
  } else if (verticalStrip) {
    const topSlot = geometry.slots[0];
    const secondSlot = geometry.slots[1];
    const middleSlot = geometry.slots[Math.min(1, geometry.slots.length - 1)];
    const lastSlot = geometry.slots[geometry.slots.length - 1];
    stars = [
      { x: topSlot.x + topSlot.width * 0.78, y: topSlot.y - 14, r: 46, rotate: 0.19, opacity: 0.97 },
      { x: topSlot.x - 18, y: topSlot.y + topSlot.height * 0.34, r: 31, rotate: -0.24, opacity: 0.93 },
      { x: secondSlot.x - 30, y: secondSlot.y - 24, r: 47, rotate: 0.14, opacity: 0.96 },
      { x: middleSlot.x + middleSlot.width + 4, y: middleSlot.y + middleSlot.height * 0.78, r: 42, rotate: -0.14, opacity: 0.95 },
      { x: lastSlot.x + lastSlot.width * 0.18, y: lastSlot.y + lastSlot.height * 0.9, r: 35, rotate: 0.35, opacity: 0.93 },
      { x: geometry.width * 0.47, y: geometry.height - Math.max(118, geometry.height * 0.09), r: 38, rotate: -0.17, opacity: 0.93 },
      { x: geometry.width * 0.14, y: geometry.height * 0.04, r: 25, rotate: 0.22, opacity: 0.88 },
      { x: geometry.width * 0.86, y: geometry.height * 0.2, r: 25, rotate: -0.18, opacity: 0.87 },
    ];

    if (geometry.slots.length >= 4) {
      const thirdSlot = geometry.slots[2];
      stars.splice(4, 0, {
        x: thirdSlot.x + thirdSlot.width + 18,
        y: thirdSlot.y + thirdSlot.height * 0.42,
        r: 30,
        rotate: 0.31,
        opacity: 0.9,
      });
    }
  } else {
    const topLeft = geometry.slots[0];
    const topRight = geometry.slots[1] || topLeft;
    const bottomLeft = geometry.slots[geometry.slots.length - 2] || topLeft;
    const bottomRight = geometry.slots[geometry.slots.length - 1] || topLeft;
    stars = [
      { x: topRight.x + topRight.width * 0.66, y: topRight.y - 16, r: 42, rotate: 0.17, opacity: 0.96 },
      { x: topLeft.x - 18, y: topLeft.y + topLeft.height * 0.35, r: 31, rotate: -0.21, opacity: 0.92 },
      { x: geometry.width * 0.5, y: geometry.height * 0.49, r: 32, rotate: 0.28, opacity: 0.91 },
      { x: bottomRight.x + bottomRight.width + 2, y: bottomRight.y + bottomRight.height * 0.72, r: 42, rotate: -0.12, opacity: 0.95 },
      { x: bottomLeft.x + bottomLeft.width * 0.2, y: bottomLeft.y + bottomLeft.height + 14, r: 35, rotate: 0.33, opacity: 0.92 },
      { x: geometry.width * 0.47, y: geometry.height - 58, r: 36, rotate: -0.14, opacity: 0.93 },
      { x: geometry.width * 0.05, y: geometry.height * 0.08, r: 25, rotate: 0.22, opacity: 0.88 },
      { x: geometry.width * 0.62, y: geometry.height * 0.85, r: 29, rotate: -0.1, opacity: 0.88 },
    ];

    if (geometry.slots.length >= 6) {
      const middleLeft = geometry.slots[2];
      stars.splice(3, 0, {
        x: middleLeft.x - 8,
        y: middleLeft.y + middleLeft.height * 0.88,
        r: 29,
        rotate: 0.07,
        opacity: 0.9,
      });
    }
  }

  stars.forEach((star, index) => {
    drawReferenceStar(ctx, star, index);
  });
}

function drawReferenceStar(ctx, star, index) {
  const image = starSpriteImages[index % starSpriteImages.length];
  ctx.save();
  ctx.globalAlpha = star.opacity;
  ctx.translate(star.x, star.y);
  ctx.rotate(star.rotate);

  if (image?.complete && image.naturalWidth) {
    const scale = (star.r * 2) / Math.max(image.naturalWidth, image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
  } else {
    const starGradient = ctx.createLinearGradient(-star.r, -star.r, star.r, star.r);
    starGradient.addColorStop(0, "#e6c86a");
    starGradient.addColorStop(0.52, "#b98b24");
    starGradient.addColorStop(1, "#d9b34a");
    ctx.shadowColor = "rgba(95, 70, 16, 0.16)";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 2;
    drawStar(ctx, 0, 0, star.r, star.r * 0.43, starGradient, 0, true);
  }

  ctx.restore();
}

function drawSlotDepth(ctx, geometry) {
  if (state.frame !== "plain") {
    return;
  }

  ctx.save();
  geometry.slots.forEach((slot) => {
    ctx.fillStyle = "#f7f7f2";
    ctx.fillRect(slot.x, slot.y, slot.width, slot.height);
  });
  ctx.restore();
}

function drawSlotBorders(ctx, geometry) {
  const template = getCurrentTemplate();
  ctx.save();
  ctx.lineWidth = state.frame === "plain" ? 2 : 2;
  ctx.strokeStyle = state.frame === "plain"
    ? "rgba(35, 32, 32, 0.16)"
    : template.slotStroke || "rgba(40, 34, 31, 0.12)";
  geometry.slots.forEach((slot) => {
    ctx.strokeRect(slot.x, slot.y, slot.width, slot.height);
  });
  ctx.restore();
}

function drawFooter(ctx, geometry) {
  return geometry;
}

function drawStar(ctx, x, y, outerRadius, innerRadius, color, rotation = 0, outline = false) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = -Math.PI / 2 + rotation + (i * Math.PI) / 5;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.closePath();
  ctx.fill();
  if (outline) {
    ctx.strokeStyle = "rgba(119, 86, 23, 0.34)";
    ctx.lineWidth = Math.max(1.5, outerRadius * 0.07);
    ctx.stroke();
  }
  ctx.restore();
}

function drawHeart(ctx, x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 100, size / 100);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 28);
  ctx.bezierCurveTo(-62, -18, -44, -66, 0, -38);
  ctx.bezierCurveTo(44, -66, 62, -18, 0, 28);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawRibbon(ctx, x, y, scale, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(-42, 0, 44, 28, -0.18, 0, Math.PI * 2);
  ctx.ellipse(42, 0, 44, 28, 0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 250, 243, 0.9)";
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSoftHeart(ctx, x, y, size) {
  ctx.save();
  ctx.shadowColor = "rgba(255, 255, 255, 0.82)";
  ctx.shadowBlur = size * 0.16;
  drawHeart(ctx, x, y, size, "rgba(245, 245, 245, 0.86)");
  ctx.shadowBlur = 0;
  drawHeart(ctx, x, y + size * 0.03, size * 0.58, "rgba(24, 24, 24, 0.34)");
  ctx.restore();
}

function drawTemplateOverlays(ctx, geometry) {
  if (state.frame === "midnight") {
    geometry.slots.forEach((slot, index) => {
      const x = index % 2 === 0 ? slot.x + 92 : slot.x + slot.width - 92;
      const y = slot.y + slot.height - 64;
      drawSoftHeart(ctx, x, y, 118);
    });
  }

  if (state.frame === "mint") {
    ctx.save();
    ctx.globalAlpha = 0.88;
    geometry.slots.forEach((slot, index) => {
      const anchorX = index % 2 === 0 ? slot.x + 24 : slot.x + slot.width - 34;
      drawStar(ctx, anchorX, slot.y + slot.height - 42, 34, 14, "#5a3c08");
    });
    ctx.restore();
  }

  if (state.frame === "polka") {
    ctx.save();
    drawRibbon(ctx, geometry.width / 2, geometry.height - 74, 0.72, "#725c53");
    ctx.restore();
  }
}

function getCachedFrameBase(geometry) {
  const textureState = paperTextureImage.complete && paperTextureImage.naturalWidth ? "paper-ready" : "paper-loading";
  const rasterState = sixLayoutFrameImage.complete && sixLayoutFrameImage.naturalWidth ? "six-ready" : "six-loading";
  const layout2Design = getActiveLayout2Design();
  const layout2Image = layout2Design ? layout2DesignImages.get(layout2Design.id) : null;
  const layout2State = layout2Image?.complete && layout2Image.naturalWidth ? `${layout2Design.id}-ready` : `${layout2Design?.id || "none"}-loading`;
  const key = `${state.layout || "four"}|${state.frame}|${state.layout2Design || "none"}|${geometry.width}x${geometry.height}|${textureState}`;
  const cacheKey = `${key}|${rasterState}|${layout2State}`;

  if (state.frameCache?.key === cacheKey) {
    return state.frameCache.canvas;
  }

  const canvas = document.createElement("canvas");
  canvas.width = geometry.width;
  canvas.height = geometry.height;
  const ctx = canvas.getContext("2d");
  if (layout2Image?.complete && layout2Image.naturalWidth) {
    ctx.drawImage(layout2Image, 0, 0, geometry.width, geometry.height);
  } else if (state.layout === "six" && state.frame === "plain" && sixLayoutFrameImage.complete && sixLayoutFrameImage.naturalWidth) {
    ctx.drawImage(sixLayoutFrameImage, 0, 0, geometry.width, geometry.height);
  } else {
    drawFrame(ctx, geometry);
    drawSlotDepth(ctx, geometry);
  }
  state.frameCache = { key: cacheKey, canvas };
  return canvas;
}

function renderBooth(scheduleNext = true) {
  if (scheduleNext && state.stream && state.live) {
    const now = performance.now();
    if (now - state.lastRenderAt < 33) {
      state.animationFrame = requestAnimationFrame(renderBooth);
      return;
    }
    state.lastRenderAt = now;

    if (state.confirmed) {
      drawShootLivePreview();
      state.animationFrame = requestAnimationFrame(renderBooth);
      return;
    }
  }

  const geometry = getLayoutGeometry();
  if (previewCanvas.width !== geometry.width || previewCanvas.height !== geometry.height) {
    previewCanvas.width = geometry.width;
    previewCanvas.height = geometry.height;
  }

  const baseFrame = getCachedFrameBase(geometry);
  const layout2Design = getActiveLayout2Design();
  const layout2Image = layout2Design ? layout2DesignImages.get(layout2Design.id) : null;
  const hasCustomLayout2Frame = Boolean(layout2Image?.complete && layout2Image.naturalWidth);
  previewCtx.clearRect(0, 0, geometry.width, geometry.height);
  previewCtx.drawImage(baseFrame, 0, 0);
  const showLiveInLayout = !state.confirmed;
  geometry.slots.forEach((slot, index) => {
    if (state.captures[index]) {
      drawSourceIntoSlot(previewCtx, slot, state.captures[index], index);
    } else if (
      state.stream &&
      state.live &&
      showLiveInLayout
    ) {
      drawLiveCameraIntoSlot(previewCtx, slot, index);
    } else if (state.frozenFrame) {
      drawSourceIntoSlot(previewCtx, slot, state.frozenFrame, index);
    } else {
      drawPlaceholder(previewCtx, slot, index);
    }
  });
  if (
    !hasCustomLayout2Frame &&
    !(state.layout === "six" && state.frame === "plain" && sixLayoutFrameImage.complete && sixLayoutFrameImage.naturalWidth)
  ) {
    drawSlotBorders(previewCtx, geometry);
    drawStarDecorations(previewCtx, geometry);
  }
  if (!hasCustomLayout2Frame) {
    drawTemplateOverlays(previewCtx, geometry);
    drawFooter(previewCtx, geometry);
  }

  if (!state.layout) {
    previewCtx.save();
    previewCtx.fillStyle = "rgba(255, 250, 243, 0.72)";
    roundRect(previewCtx, 170, geometry.height / 2 - 58, geometry.width - 340, 116, 58);
    previewCtx.fill();
    previewCtx.fillStyle = getCurrentTemplate().text;
    previewCtx.font = "900 30px ui-sans-serif, system-ui";
    previewCtx.textAlign = "center";
    previewCtx.textBaseline = "middle";
    previewCtx.fillText("Choose a booth style", geometry.width / 2, geometry.height / 2);
    previewCtx.restore();
  }

  if (scheduleNext && state.stream && state.live) {
    if (state.confirmed) {
      drawShootLivePreview();
    }
    state.animationFrame = requestAnimationFrame(renderBooth);
  }
}

function drawShootLivePreview() {
  const width = 1120;
  const height = 840;
  if (shootLiveCanvas.width !== width || shootLiveCanvas.height !== height) {
    shootLiveCanvas.width = width;
    shootLiveCanvas.height = height;
  }
  shootLiveCtx.clearRect(0, 0, width, height);

  const slot = { x: 28, y: 28, width: 1064, height: 784 };
  if (state.suppressShootLive) {
    return;
  }

  shootLiveCtx.save();
  roundRect(shootLiveCtx, slot.x, slot.y, slot.width, slot.height, 54);
  shootLiveCtx.clip();
  if (state.stream && state.live && cameraVideo.videoWidth) {
    drawLiveCameraIntoSlot(shootLiveCtx, slot, state.currentShot);
  } else {
    drawSourceIntoSlot(shootLiveCtx, slot, createFallbackCapture(state.currentShot), state.currentShot);
  }
  shootLiveCtx.restore();

  shootLiveCtx.save();
  shootLiveCtx.lineWidth = 8;
  shootLiveCtx.strokeStyle = "rgba(18, 18, 18, 0.84)";
  roundRect(shootLiveCtx, slot.x, slot.y, slot.width, slot.height, 54);
  shootLiveCtx.stroke();
  shootLiveCtx.restore();
}

function restartRenderLoop() {
  if (state.animationFrame) {
    cancelAnimationFrame(state.animationFrame);
  }
  renderBooth();
}

async function requestCameraAccess() {
  const requestId = state.cameraRequestId + 1;
  state.cameraRequestId = requestId;
  setCameraReady(false);
  setPermissionState("Waiting for camera permission", "Please allow camera access in your browser to place your face inside the selected booth layout.", true);
  retryCameraButton.disabled = true;
  retryCameraButton.textContent = "Waiting...";
  statusText.textContent = "Requesting camera...";
  setScreen("booth");
  setStudioVisible(true);
  state.live = false;
  state.frozenFrame = null;
  syncControls();
  renderBooth(false);

  try {
    stopCamera(false);
    const stream = await requestCameraStream();
    if (requestId !== state.cameraRequestId) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }

    state.stream = stream;
    state.permissionGranted = true;
    state.live = Boolean(state.layout);
    state.frozenFrame = null;
    cameraVideo.srcObject = stream;
    await cameraVideo.play();
    setCameraReady(true);
    statusText.textContent = state.layout
      ? `${getCurrentTemplate().label} live preview`
      : "Camera allowed. Pick a layout to start.";
    syncControls();
    if (state.layout) {
      restartRenderLoop();
    } else {
      renderBooth(false);
    }
  } catch (error) {
    if (requestId !== state.cameraRequestId) {
      return;
    }
    state.demoMode = true;
    state.permissionGranted = false;
    state.live = false;
    setCameraReady(false);
    setStudioVisible(true);
    setPermissionState(
      "Camera access is needed",
      cameraErrorMessage(error),
      true,
      "Try Again",
    );
    statusText.textContent = state.layout
      ? "Design mode ready"
      : "Design mode";
    renderBooth(false);
  }
}

async function startLiveCamera() {
  if (!state.permissionGranted || !state.layout) {
    return;
  }

  try {
    if (state.stream) {
      state.live = true;
      state.frozenFrame = null;
      await cameraVideo.play();
      setCameraReady(true);
      statusText.textContent = `${getCurrentTemplate().label} live preview`;
      syncControls();
      restartRenderLoop();
      return;
    }

    const stream = await requestCameraStream();

    state.stream = stream;
    state.live = true;
    state.frozenFrame = null;
    cameraVideo.srcObject = stream;
    await cameraVideo.play();
    setCameraReady(true);
    statusText.textContent = `${getCurrentTemplate().label} live preview`;
    syncControls();
    restartRenderLoop();
  } catch (error) {
    setCameraReady(false);
    setPermissionState(
      "Camera could not start",
      cameraErrorMessage(error),
      true,
      "Try Again",
    );
  }
}

function stopCamera(clearScreen = true) {
  if (state.animationFrame) {
    cancelAnimationFrame(state.animationFrame);
    state.animationFrame = null;
  }

  if (state.stream) {
    state.stream.getTracks().forEach((track) => track.stop());
  }

  state.stream = null;
  cameraVideo.srcObject = null;
  if (clearScreen) {
    setCameraReady(false);
    setStudioVisible(false);
  }
}

function freezeFrame() {
  if (!cameraVideo.videoWidth || !cameraVideo.videoHeight) {
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = cameraVideo.videoWidth;
  canvas.height = cameraVideo.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);
  state.frozenFrame = canvas;
  state.live = false;
  statusText.textContent = "Frame frozen";
  restartRenderLoop();
}

function liveAgain() {
  if (!state.stream) {
    startLiveCamera();
    return;
  }

  state.live = true;
  statusText.textContent = "Live preview";
  restartRenderLoop();
}

function clearCountdownTimer() {
  if (state.countdownTimer) {
    window.clearInterval(state.countdownTimer);
    state.countdownTimer = null;
  }
}

function setCountdownDisplay(value) {
  state.countdown = value;
  countdownNumber.textContent = value ? String(value) : "";
  countdownOverlay.classList.toggle("is-visible", Boolean(value));
}

function setShootingButtons(mode) {
  if (mode === "finished") {
    startShootButton.hidden = true;
    retakeButton.hidden = false;
    doneButton.hidden = false;
    startShootButton.disabled = false;
    retakeButton.disabled = false;
    doneButton.disabled = false;
    return;
  }

  startShootButton.hidden = false;
  retakeButton.hidden = true;
  doneButton.hidden = true;
  startShootButton.disabled = mode === "shooting";
  startShootButton.textContent = mode === "shooting" ? "Shooting..." : "Start Shooting";
  retakeButton.disabled = false;
  doneButton.disabled = false;
}

async function ensureShootingCamera() {
  if (state.demoMode) {
    state.live = false;
    return true;
  }

  if (state.stream) {
    state.demoMode = false;
    state.permissionGranted = true;
    state.live = true;
    await cameraVideo.play();
    setCameraReady(true);
    restartRenderLoop();
    return true;
  }

  setPermissionState(
    "Waiting for camera permission",
    "Please allow camera access to start the automatic photo booth countdown.",
    true,
    "Allow Camera",
  );
  shootStatus.textContent = "Waiting for camera";

  try {
    const stream = await requestCameraStream();
    state.stream = stream;
    state.demoMode = false;
    state.permissionGranted = true;
    state.live = true;
    cameraVideo.srcObject = stream;
    await cameraVideo.play();
    setCameraReady(true);
    restartRenderLoop();
    return true;
  } catch (error) {
    state.demoMode = true;
    state.permissionGranted = false;
    state.live = false;
    setCameraReady(false);
    setPermissionState(
      "Camera access is needed",
      cameraErrorMessage(error),
      true,
      "Try Again",
    );
    shootStatus.textContent = "Camera unavailable. Continuing with preview shots.";
    renderBooth(false);
    return true;
  }
}

function createFallbackCapture(index) {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 900;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  const palettes = [
    ["#fff7fb", "#efd8df", "#f7ece6"],
    ["#fffaf3", "#f0cbd4", "#f8e7ee"],
    ["#fdf5f7", "#ead6df", "#fff3e8"],
    ["#fff8f1", "#f3d4dd", "#f9edf4"],
  ];
  const colors = palettes[index % palettes.length];

  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.55, colors[1]);
  gradient.addColorStop(1, colors[2]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.globalAlpha = 0.24;
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 9; i += 1) {
    const x = ((i * 173) + (index * 91)) % canvas.width;
    const y = ((i * 119) + (index * 137)) % canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, 62 + (i % 3) * 22, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  return canvas;
}

function captureCurrentSlot() {
  if (!cameraVideo.videoWidth || !cameraVideo.videoHeight) {
    return createFallbackCapture(state.currentShot);
  }

  const canvas = document.createElement("canvas");
  canvas.width = cameraVideo.videoWidth;
  canvas.height = cameraVideo.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function finishShooting() {
  clearCountdownTimer();
  setCountdownDisplay(null);
  state.shooting = false;
  state.live = false;
  startShootButton.hidden = true;
  shootStatus.textContent = "Shooting finished";
  renderBooth(false);
  window.setTimeout(() => {
    setShootingButtons("finished");
  }, 1500);
}

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function slotViewportRect(slot) {
  const rect = previewCanvas.getBoundingClientRect();
  return {
    x: rect.left + (slot.x / previewCanvas.width) * rect.width,
    y: rect.top + (slot.y / previewCanvas.height) * rect.height,
    width: (slot.width / previewCanvas.width) * rect.width,
    height: (slot.height / previewCanvas.height) * rect.height,
  };
}

function animateCaptureToSlot(capture, slot) {
  return new Promise((resolve) => {
    const from = shootLiveSlotViewportRect();
    const target = slotViewportRect(slot);
    const flying = document.createElement("canvas");
    flying.width = capture.width;
    flying.height = capture.height;
    flying.getContext("2d").drawImage(capture, 0, 0);
    flying.className = "flying-capture";
    flying.style.left = `${from.x}px`;
    flying.style.top = `${from.y}px`;
    flying.style.width = `${from.width}px`;
    flying.style.height = `${from.height}px`;
    document.body.appendChild(flying);

    const duration = 900;
    const startedAt = performance.now();
    const lerp = (start, end, progress) => start + ((end - start) * progress);

    function step(now) {
      const progress = Math.min(1, (now - startedAt) / duration);
      flying.style.left = `${lerp(from.x, target.x, progress)}px`;
      flying.style.top = `${lerp(from.y, target.y, progress)}px`;
      flying.style.width = `${lerp(from.width, target.width, progress)}px`;
      flying.style.height = `${lerp(from.height, target.height, progress)}px`;

      if (progress < 1) {
        requestAnimationFrame(step);
        return;
      }

      flying.remove();
      resolve();
    }

    requestAnimationFrame(step);
  });
}

function createLiveTransitionLayer() {
  const geometry = getLayoutGeometry();
  const slot = geometry.slots[0];
  if (!slot) {
    return null;
  }

  const sourceRect = slotViewportRect(slot);
  const flying = document.createElement("canvas");
  flying.width = slot.width;
  flying.height = slot.height;
  flying.getContext("2d").drawImage(
    previewCanvas,
    slot.x,
    slot.y,
    slot.width,
    slot.height,
    0,
    0,
    slot.width,
    slot.height,
  );
  flying.className = "flying-live-transition";
  flying.style.left = `${sourceRect.x}px`;
  flying.style.top = `${sourceRect.y}px`;
  flying.style.width = `${sourceRect.width}px`;
  flying.style.height = `${sourceRect.height}px`;
  flying.style.borderRadius = "24px";
  document.body.appendChild(flying);
  return flying;
}

function shootLiveSlotViewportRect() {
  const rect = shootLiveCanvas.getBoundingClientRect();
  const slot = { x: 28, y: 28, width: 1064, height: 784 };
  const strokePad = 4;
  return {
    x: rect.left + ((slot.x - strokePad) / shootLiveCanvas.width) * rect.width,
    y: rect.top + ((slot.y - strokePad) / shootLiveCanvas.height) * rect.height,
    width: ((slot.width + strokePad * 2) / shootLiveCanvas.width) * rect.width,
    height: ((slot.height + strokePad * 2) / shootLiveCanvas.height) * rect.height,
  };
}

function animateLiveTransitionToShootFrame(flying, target) {
  return new Promise((resolve) => {
    if (!flying || !target) {
      resolve();
      return;
    }

    const start = flying.getBoundingClientRect();
    const animation = flying.animate([
      {
        left: `${start.left}px`,
        top: `${start.top}px`,
        width: `${start.width}px`,
        height: `${start.height}px`,
        borderRadius: "24px",
      },
      {
        left: `${target.x}px`,
        top: `${target.y}px`,
        width: `${target.width}px`,
        height: `${target.height}px`,
        borderRadius: "24px",
      },
    ], {
      duration: 680,
      easing: "cubic-bezier(0.16, 0.88, 0.24, 1)",
      fill: "forwards",
    });

    animation.finished.then(() => {
      flying.style.left = `${target.x}px`;
      flying.style.top = `${target.y}px`;
      flying.style.width = `${target.width}px`;
      flying.style.height = `${target.height}px`;
      flying.style.borderRadius = "24px";
      animation.cancel();
      resolve();
    }).catch(() => {
      flying.style.left = `${target.x}px`;
      flying.style.top = `${target.y}px`;
      flying.style.width = `${target.width}px`;
      flying.style.height = `${target.height}px`;
      resolve();
    });
  });
}

function settleLiveTransition(flying) {
  requestAnimationFrame(() => {
    state.suppressShootLive = false;
    state.transitioningToShoot = false;
    drawShootLivePreview();
    flying?.remove();
    restartRenderLoop();
  });
}

async function runShotCountdown() {
  const geometry = getLayoutGeometry();
  if (state.currentShot >= geometry.count) {
    finishShooting();
    return;
  }

  setCountdownDisplay(5);
  shootStatus.textContent = `Shot ${state.currentShot + 1} / ${geometry.count}`;
  restartRenderLoop();

  clearCountdownTimer();
  state.countdownTimer = window.setInterval(() => {
    const next = state.countdown - 1;
    if (next > 0) {
      setCountdownDisplay(next);
      return;
    }

    clearCountdownTimer();
    setCountdownDisplay(null);
    const slotIndex = state.currentShot;
    const capture = captureCurrentSlot();
    state.captures[slotIndex] = capture;
    renderBooth(false);
    animateCaptureToSlot(capture, geometry.slots[slotIndex]).then(async () => {
      state.currentShot += 1;
      renderBooth(false);
      await delay(420);
      runShotCountdown();
    });
  }, 1000);
}

async function startShootingSequence() {
  if (state.shooting || !state.layout) {
    return;
  }

  if (!state.confirmed) {
    confirmDesignSelection();
  }

  const ready = await ensureShootingCamera();
  if (!ready) {
    return;
  }

  state.captures = [];
  state.currentShot = 0;
  state.shooting = true;
  state.live = !state.demoMode;
  setShootingButtons("shooting");
  drawShootLivePreview();
  runShotCountdown();
}

function confirmDesignSelection() {
  if (!state.layout || state.transitioningToShoot) {
    return;
  }

  const flyingLive = createLiveTransitionLayer();
  setActiveNav("booth");
  state.transitioningToShoot = true;
  confirmDesignButton.disabled = true;

  state.suppressShootLive = true;
  state.confirmed = true;
  state.currentShot = 0;
  state.captures = [];
  state.live = Boolean(state.stream);
  state.demoMode = false;
  setShootMode(true);
  pulseBoothModeTransition();
  shootStatus.textContent = "Ready";
  setShootingButtons("ready");
  pinPageToTop();
  syncControls();
  renderBooth(false);
  drawShootLivePreview();

  const target = shootLiveSlotViewportRect();
  animateLiveTransitionToShootFrame(flyingLive, target).then(() => {
    settleLiveTransition(flyingLive);
  });
}

function renderFinishOverlay() {
  renderBooth(false);
  window.clearTimeout(state.finishButtonTimer);
  finishAgainButton.classList.remove("is-visible");
  const previewRect = previewCanvas.getBoundingClientRect();
  const previewCenterX = previewRect.left + previewRect.width / 2;
  const previewCenterY = previewRect.top + previewRect.height / 2;
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  finishCanvas.width = previewCanvas.width;
  finishCanvas.height = previewCanvas.height;
  finishCtx.clearRect(0, 0, finishCanvas.width, finishCanvas.height);
  finishCtx.drawImage(previewCanvas, 0, 0);
  finishCard.style.setProperty("--from-x", `${previewCenterX - viewportCenterX}px`);
  finishCard.style.setProperty("--from-y", `${previewCenterY - viewportCenterY}px`);
  finishCard.style.setProperty("--from-scale", "0.38");
  finishOverlay.classList.add("is-visible");
  finishOverlay.setAttribute("aria-hidden", "false");
  state.finishButtonTimer = window.setTimeout(() => {
    finishAgainButton.classList.add("is-visible");
  }, 2500);
}

function showFinishOverlay() {
  window.clearTimeout(state.finishOverlayTimer);
  doneButton.disabled = true;
  shootStatus.textContent = "Preparing finished photo";
  state.finishOverlayTimer = window.setTimeout(() => {
    doneButton.disabled = false;
    renderFinishOverlay();
  }, 1000);
}

function hideFinishOverlay() {
  window.clearTimeout(state.finishOverlayTimer);
  window.clearTimeout(state.finishButtonTimer);
  doneButton.disabled = false;
  finishAgainButton.classList.remove("is-visible");
  finishOverlay.classList.remove("is-visible");
  finishOverlay.setAttribute("aria-hidden", "true");
}

function takeAnotherOne() {
  hideFinishOverlay();
  clearCountdownTimer();
  setCountdownDisplay(null);
  state.confirmed = false;
  state.shooting = false;
  state.currentShot = 0;
  state.captures = [];
  state.suppressShootLive = false;
  state.transitioningToShoot = false;
  state.live = false;
  state.frozenFrame = null;
  state.demoMode = false;
  stopCamera();
  setShootMode(false);
  setStudioVisible(false);
  setScreen("layouts");
  syncControls();
}

function downloadImage() {
  renderBooth(false);
  const date = new Date().toISOString().slice(0, 10);
  previewCanvas.toBlob((blob) => {
    if (!blob) {
      statusText.textContent = "Download failed";
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `online-photo-booth-${state.layout || "layout"}-${date}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    statusText.textContent = "PNG downloaded";
  }, "image/png");
}

function saveFinalImage() {
  const date = new Date().toISOString().slice(0, 10);
  finishCanvas.toBlob((blob) => {
    if (!blob) {
      statusText.textContent = "Save failed";
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `online-photo-booth-finished-${state.layout || "layout"}-${date}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    statusText.textContent = "Finished PNG saved";
  }, "image/png");
}

function printFinalImage() {
  window.print();
}

function showSelectedLayoutPage() {
  if (!state.layout) {
    state.layout = "polaroid";
  }
  if (state.layout === "four") {
    pickRandomLayout2Design();
  } else if (!state.frame || state.frame === "layout2-custom") {
    state.frame = "plain";
    state.layout2Design = null;
    invalidateFrameCache();
  }
  setScreen("booth");
  setStudioVisible(true);
  setShootMode(false);
  setCameraReady(Boolean(state.stream && state.live));
  clearCountdownTimer();
  setCountdownDisplay(null);
  state.confirmed = false;
  state.shooting = false;
  state.currentShot = 0;
  state.captures = [];
  state.live = false;
  state.frozenFrame = null;
  state.demoMode = false;
  hideFinishOverlay();
  setShootingButtons("ready");
  setPermissionState(
    "Ready to turn on camera",
    "Allow camera access when you want to place yourself inside it.",
    true,
    state.permissionGranted ? "Start Camera" : "Allow Camera",
  );
  statusText.textContent = "Layout ready";
  syncControls();
  setActiveNav("designs");
  renderBooth(false);
}

function resetToStartPage() {
  clearCountdownTimer();
  setCountdownDisplay(null);
  hideFinishOverlay();
  stopCamera();
  setShootMode(false);
  setStudioVisible(false);
  state.confirmed = false;
  state.shooting = false;
  state.currentShot = 0;
  state.captures = [];
  setScreen("home");
  syncControls();
  setActiveNav("home");
}

function goToHowItWorks() {
  clearCountdownTimer();
  setCountdownDisplay(null);
  hideFinishOverlay();
  stopCamera();
  setShootMode(false);
  setStudioVisible(false);
  state.confirmed = false;
  state.shooting = false;
  setScreen("welcome");
  syncControls();
  setActiveNav("welcome");
}

function goToLayoutsPage() {
  clearCountdownTimer();
  setCountdownDisplay(null);
  hideFinishOverlay();
  stopCamera();
  setShootMode(false);
  setStudioVisible(false);
  state.confirmed = false;
  state.shooting = false;
  setScreen("layouts");
  syncControls();
  setActiveNav("layouts");
}

function ensureDefaultLayout() {
  if (!state.layout) {
    state.layout = "polaroid";
  }
  if (!state.frame) {
    state.frame = "plain";
  }
}

function goToDesignsPage() {
  clearCountdownTimer();
  setCountdownDisplay(null);
  hideFinishOverlay();
  ensureDefaultLayout();
  setShootMode(false);
  showSelectedLayoutPage();
  setActiveNav("designs");
  requestCameraAccess();
}

function goToMyBoothPage() {
  clearCountdownTimer();
  setCountdownDisplay(null);
  hideFinishOverlay();
  ensureDefaultLayout();
  showSelectedLayoutPage();
  setActiveNav("booth");
  window.setTimeout(() => {
    confirmDesignSelection();
  }, 80);
}

startButton.addEventListener("click", () => {
  setScreen("welcome");
  syncControls();
  setActiveNav("welcome");
});

welcomeContinueButton.addEventListener("click", () => {
  setScreen("layouts");
  syncControls();
  setActiveNav("layouts");
});
welcomeBackButton.addEventListener("click", resetToStartPage);
retryCameraButton.addEventListener("click", requestCameraAccess);
layoutHomeButton.addEventListener("click", () => {
  stopCamera();
  setScreen("welcome");
  setActiveNav("welcome");
});

siteNav.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-nav-target]");
  if (!button) {
    return;
  }

  const target = button.dataset.navTarget;
  if (target === "home") {
    resetToStartPage();
    return;
  }
  if (target === "welcome") {
    goToHowItWorks();
    return;
  }
  if (target === "layouts") {
    goToLayoutsPage();
    return;
  }
  if (target === "designs") {
    goToDesignsPage();
    return;
  }
  if (target === "booth") {
    goToMyBoothPage();
  }
});

backToLayoutsButton.addEventListener("click", () => {
  clearCountdownTimer();
  setCountdownDisplay(null);
  if (state.confirmed || document.getElementById("booth").classList.contains("shoot-mode")) {
    state.confirmed = false;
    state.shooting = false;
    state.currentShot = 0;
    state.captures = [];
    setShootMode(false);
    pulseBoothModeTransition();
    setShootingButtons("ready");
    shootStatus.textContent = "";
    setStudioVisible(true);
    setScreen("booth");
    syncControls();
    setActiveNav("designs");
    restartRenderLoop();
    return;
  }

  setShootMode(false);
  stopCamera();
  setStudioVisible(false);
  setScreen("layouts");
  syncControls();
  setActiveNav("layouts");
});

layoutGallery.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-layout]");
  if (!button) {
    return;
  }

  state.layout = button.dataset.layout;
  window.clearTimeout(state.layoutAutoTimer);
  button.classList.remove("layout-bounce");
  void button.offsetWidth;
  button.classList.add("layout-bounce");
  window.setTimeout(() => {
    button.classList.remove("layout-bounce");
  }, 380);
  state.frame = "plain";
  state.layout2Design = null;
  state.frameOptionsMode = "";
  invalidateFrameCache();
  state.live = false;
  state.frozenFrame = null;
  state.demoMode = false;
  syncControls();
  state.layoutAutoTimer = window.setTimeout(() => {
    showSelectedLayoutPage();
    requestCameraAccess();
  }, 110);
});

layoutContinueButton.addEventListener("click", () => {
  if (!state.layout) {
    return;
  }

  showSelectedLayoutPage();
  requestCameraAccess();
});

frameButtons.addEventListener("click", (event) => {
  const layout2Button = event.target.closest("button[data-layout2-design]");
  if (layout2Button) {
    state.layout2Design = layout2Button.dataset.layout2Design;
    state.frame = "layout2-custom";
    state.confirmed = false;
    state.transitioningToShoot = false;
    state.captures = [];
    statusText.textContent = "Layout ready";
    invalidateFrameCache();
    syncControls();
    layout2Button.blur();
    restartRenderLoop();
    return;
  }

  const button = event.target.closest("button[data-frame]");
  if (!button) {
    return;
  }

  state.frame = button.dataset.frame;
  state.layout2Design = null;
  state.confirmed = false;
  state.transitioningToShoot = false;
  state.captures = [];
  statusText.textContent = "Layout ready";
  syncControls();
  button.blur();
  restartRenderLoop();
});

captureButton.addEventListener("click", freezeFrame);
liveButton.addEventListener("click", liveAgain);
downloadButton.addEventListener("click", downloadImage);
confirmDesignButton.addEventListener("click", confirmDesignSelection);
startShootButton.addEventListener("click", startShootingSequence);
retakeButton.addEventListener("click", startShootingSequence);
doneButton.addEventListener("click", showFinishOverlay);
finishAgainButton.addEventListener("click", takeAnotherOne);
saveFinalButton.addEventListener("click", saveFinalImage);
printFinalButton.addEventListener("click", printFinalImage);

function spawnClickKitty(event) {
  if (event.pointerType === "touch") {
    return;
  }

  const kitty = document.createElement("span");
  kitty.className = "click-kitty";
  kitty.style.left = `${event.clientX}px`;
  kitty.style.top = `${event.clientY}px`;
  kitty.style.setProperty("--kitty-rotate", `${Math.random() > 0.5 ? 8 : -8}deg`);
  kitty.setAttribute("aria-hidden", "true");
  kitty.innerHTML = "<i></i><i></i><b style=\"--star-x:-10px;--star-y:-14px\">✦</b><b style=\"--star-x:12px;--star-y:10px\">✧</b><b style=\"--star-x:-13px;--star-y:12px\">✦</b><b style=\"--star-x:8px;--star-y:-18px\">⋆</b>";
  document.body.appendChild(kitty);
  window.setTimeout(() => {
    kitty.remove();
  }, 820);
}

document.addEventListener("pointerdown", (event) => {
  spawnClickKitty(event);

  const button = event.target.closest("button");
  if (!button || button.disabled) {
    return;
  }

  button.classList.remove("button-pop");
  void button.offsetWidth;
  button.classList.add("button-pop");
  window.setTimeout(() => {
    button.classList.remove("button-pop");
  }, 380);
});

syncControls();
setActiveNav("home");
renderBooth(false);
