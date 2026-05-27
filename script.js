const appShell = document.querySelector(".app-shell");
const siteNav = document.querySelector(".site-nav");
const startButton = document.getElementById("startButton");
const welcomeContinueButton = document.getElementById("welcomeContinueButton");
const welcomeBackButton = document.getElementById("welcomeBackButton");
const layoutHomeButton = document.getElementById("layoutHomeButton");
const layoutPicker = document.getElementById("layoutPicker");
const layoutGallery = document.getElementById("layoutGallery");
const layoutEmojiField = document.getElementById("layoutEmojiField");
const layoutContinueButton = document.getElementById("layoutContinueButton");
const backToLayoutsButton = document.getElementById("backToLayoutsButton");
const retryCameraButton = document.getElementById("retryCameraButton");
const permissionCard = document.getElementById("permissionCard");
const permissionTitle = document.getElementById("permissionTitle");
const permissionText = document.getElementById("permissionText");
const previewCanvas = document.getElementById("previewCanvas");
const previewCanvasWrap = previewCanvas.closest(".canvas-wrap");
const previewScaleWrap = previewCanvas.closest(".preview-scale-wrap");
const previewCtx = previewCanvas.getContext("2d");
const shootLiveCanvas = document.getElementById("shootLiveCanvas");
const shootLiveCtx = shootLiveCanvas.getContext("2d");
const cameraVideo = document.getElementById("cameraVideo");
const statusText = document.getElementById("statusText");
const previewPushpin = document.getElementById("previewPushpin");
const frameButtons = document.getElementById("frameButtons");
const filterButtons = document.getElementById("filterButtons");
const confirmDesignButton = document.getElementById("confirmDesignButton");
const captureButton = document.getElementById("captureButton");
const liveButton = document.getElementById("liveButton");
const downloadButton = document.getElementById("downloadButton");
const startShootButton = document.getElementById("startShootButton");
const cameraShootLabel = startShootButton.querySelector(".camera-shoot-label");
const retakeButton = document.getElementById("retakeButton");
const doneButton = document.getElementById("doneButton");
const shootStatus = document.getElementById("shootStatus");
const countdownOverlay = document.getElementById("countdownOverlay");
const countdownNumber = document.getElementById("countdownNumber");
const finishOverlay = document.getElementById("finishOverlay");
const processingOverlay = document.getElementById("processingOverlay");
const finishConfetti = document.getElementById("finishConfetti");
const finishCard = finishOverlay.querySelector(".finish-card");
const finishShadowCanvas = document.getElementById("finishShadowCanvas");
const finishShadowCtx = finishShadowCanvas.getContext("2d");
const finishCanvas = document.getElementById("finishCanvas");
const finishCtx = finishCanvas.getContext("2d");
const saveFinalButton = document.getElementById("saveFinalButton");
const downloadGifButton = document.getElementById("downloadGifButton");
const printFinalButton = document.getElementById("printFinalButton");
const postInstagramButton = document.getElementById("postInstagramButton");
const newPhotosButton = document.getElementById("newPhotosButton");
const privacyHomeButton = document.getElementById("privacyHomeButton");
const contactHomeButton = document.getElementById("contactHomeButton");
const contactForm = document.getElementById("contactForm");
const contactFormStatus = document.getElementById("contactFormStatus");

const layoutCherryCount = 7;
const shootPreviewFrameInterval = 125;
const designPreviewFrameInterval = 300;
const pageButtonPressFeedbackMs = 120;
const designThumbnailVersion = "design-thumbs-20260528";
const designOptionInitialBatchSize = 8;
const designOptionBatchSize = 6;
let layoutEmojiPlacementTimer = null;

const clickSoundPlayers = Array.from({ length: 4 }, () => {
  const audio = new Audio("assets/mouse-click.mp3?v=click-sound-20260521");
  audio.preload = "none";
  audio.volume = 0.48;
  return audio;
});
let clickSoundIndex = 0;

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

const cakeMintDesign = {
  id: "cake-mint",
  src: "assets/layout2-designs/design-1.png?v=layout2-designs",
  frameSrc: "assets/layout2-designs/design-1-cutout-depth.png?v=all-layout-depth-designs-20260524",
  width: 709,
  height: 1772,
  slots: [
    { x: 78, y: 124, width: 552, height: 374 },
    { x: 78, y: 558, width: 552, height: 374 },
    { x: 78, y: 994, width: 552, height: 374 },
  ],
};

const layout1Designs = [
  {
    id: "layout1-baby-cute",
    src: "assets/layout1-designs/design-27-baby-cute-cutout.png?v=layout1-extra-designs-20260526",
    frameSrc: "assets/layout1-designs/design-27-baby-cute-cutout.png?v=layout1-extra-designs-20260526",
    width: 809,
    height: 1080,
    slots: [{ x: 97, y: 54, width: 620, height: 812 }],
  },
  {
    id: "layout1-love-diary-heart",
    src: "assets/layout1-designs/design-28-love-diary-heart-cutout.png?v=layout1-extra-designs-20260526",
    frameSrc: "assets/layout1-designs/design-28-love-diary-heart-cutout.png?v=layout1-extra-designs-20260526",
    width: 1170,
    height: 1630,
    slots: [{ x: 150, y: 421, width: 852, height: 905 }],
  },
  {
    id: "layout1-birthday-cake",
    src: "assets/layout1-designs/design-29-birthday-cake-cutout.png?v=layout1-extra-designs-20260526",
    frameSrc: "assets/layout1-designs/design-29-birthday-cake-cutout.png?v=layout1-extra-designs-20260526",
    width: 1009,
    height: 1559,
    slots: [{ x: 80, y: 69, width: 851, height: 1339 }],
  },
  {
    id: "layout1-hello-kitty-hot-pink",
    src: "assets/layout1-designs/design-17-hello-kitty-hot-pink.png?v=layout1-extra-designs-20260521",
    frameSrc: "assets/layout1-designs/design-17-hello-kitty-hot-pink-cutout-depth.png?v=layout1-ui040506-recut-20260528",
    width: 1139,
    height: 1723,
    slots: [{ x: 80, y: 70, width: 969, height: 1290 }],
  },
  {
    id: "layout1-hello-kitty-white-zero",
    src: "assets/layout1-designs/design-15-hello-kitty-white-zero.png?v=layout1-extra-designs-20260521",
    frameSrc: "assets/layout1-designs/design-15-hello-kitty-white-zero-cutout-depth.png?v=layout1-ui040506-recut-20260528",
    width: 784,
    height: 1172,
    slots: [{ x: 61, y: 94, width: 667, height: 815 }],
  },
  {
    id: "layout1-hello-kitty-soft-zero",
    src: "assets/layout1-designs/design-16-hello-kitty-soft-zero.png?v=layout1-extra-designs-20260521",
    frameSrc: "assets/layout1-designs/design-16-hello-kitty-soft-zero-cutout-depth.png?v=layout1-ui040506-recut-20260528",
    width: 1201,
    height: 1795,
    slots: [{ x: 87, y: 114, width: 1003, height: 1278 }],
  },
  {
    id: "layout1-red-bow-polaroid",
    src: "assets/layout1-designs/design-14-red-bow-polaroid.png?v=layout1-extra-designs-20260521",
    frameSrc: "assets/layout1-designs/design-14-red-bow-polaroid-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 954,
    height: 1158,
    slots: [{ x: 54, y: 55, width: 839, height: 865 }],
  },
  {
    id: "layout1-cake-mint-single",
    src: "assets/layout1-designs/design-02-cake-mint-single.png?v=layout1-designs-v2",
    frameSrc: "assets/layout1-designs/design-02-cake-mint-single-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 1276,
    height: 2008,
    slots: [{ x: 125, y: 193, width: 1027, height: 1329 }],
  },
  {
    id: "layout1-sumikko-tapioca",
    src: "assets/layout1-designs/design-03-sumikko-tapioca.png?v=layout1-designs-v2",
    frameSrc: "assets/layout1-designs/design-03-sumikko-tapioca-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 1290,
    height: 1799,
    slots: [{ x: 168, y: 305, width: 955, height: 1159 }],
  },
  {
    id: "layout1-yellow-doodle-paper",
    src: "assets/layout1-designs/design-04-yellow-doodle-paper.png?v=layout1-designs-v2",
    frameSrc: "assets/layout1-designs/design-04-yellow-doodle-paper-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 954,
    height: 1417,
    slots: [{ x: 107, y: 78, width: 749, height: 1066 }],
  },
  {
    id: "layout1-leopard-heart-frame",
    src: "assets/layout1-designs/design-05-leopard-heart-frame.png?v=layout1-designs-v2",
    frameSrc: "assets/layout1-designs/design-05-leopard-heart-frame-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 636,
    height: 1004,
    slots: [{ x: 50, y: 58, width: 533, height: 654 }],
  },
  {
    id: "layout1-rilakkuma-cream",
    src: "assets/layout1-designs/design-06-rilakkuma-cream.png?v=layout1-designs-v2",
    frameSrc: "assets/layout1-designs/design-06-rilakkuma-cream-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 1018,
    height: 1601,
    slots: [{ x: 147, y: 167, width: 731, height: 1047 }],
  },
  {
    id: "layout1-hello-kitty-face",
    src: "assets/layout1-designs/design-07-hello-kitty-face.png?v=layout1-designs-v2",
    frameSrc: "assets/layout1-designs/design-07-hello-kitty-face-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 836,
    height: 1276,
    slots: [{ x: 87, y: 91, width: 656, height: 874 }],
  },
  {
    id: "layout1-hello-kitty-forever",
    src: "assets/layout1-designs/design-08-hello-kitty-forever.png?v=layout1-designs-v2",
    frameSrc: "assets/layout1-designs/design-08-hello-kitty-forever-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 989,
    height: 1565,
    slots: [{ x: 70, y: 190, width: 860, height: 1148 }],
  },
  {
    id: "layout1-star-paper",
    src: "assets/layout1-designs/design-09-star-paper.png?v=layout1-designs-v2",
    frameSrc: "assets/layout1-designs/design-09-star-paper-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 980,
    height: 1185,
    slots: [{ x: 64, y: 65, width: 852, height: 870 }],
  },
  {
    id: "layout1-hello-kitty-pink",
    src: "assets/layout1-designs/design-10-hello-kitty-pink.png?v=layout1-designs-v2",
    frameSrc: "assets/layout1-designs/design-10-hello-kitty-pink-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 781,
    height: 1168,
    slots: [{ x: 55, y: 77, width: 675, height: 833 }],
  },
  {
    id: "layout1-instagram-post",
    src: "assets/layout1-designs/design-11-instagram-post.png?v=layout1-designs-v2",
    frameSrc: "assets/layout1-designs/design-11-instagram-post-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 1084,
    height: 1627,
    slots: [{ x: 63, y: 325, width: 932, height: 793 }],
  },
  {
    id: "layout1-instagram-flower",
    src: "assets/layout1-designs/design-26-instagram-flower-cutout.png?v=layout1-instagram-flower-20260525",
    frameSrc: "assets/layout1-designs/design-26-instagram-flower-cutout.png?v=layout1-instagram-flower-20260525",
    width: 1133,
    height: 1027,
    slots: [{ x: 294, y: 206, width: 596, height: 569 }],
  },
  {
    id: "layout1-color-dot-polaroid",
    src: "assets/layout1-designs/design-23-color-dot-polaroid-cutout-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout1-designs/design-23-color-dot-polaroid-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 1422,
    height: 2260,
    slots: [{ x: 104, y: 208, width: 1208, height: 1628 }],
  },
  {
    id: "layout1-black-heart-polaroid",
    src: "assets/layout1-designs/design-24-black-heart-polaroid-cutout-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout1-designs/design-24-black-heart-polaroid-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 1729,
    height: 2157,
    slots: [{ x: 68, y: 68, width: 1596, height: 1624 }],
  },
  {
    id: "layout1-star-polaroid",
    src: "assets/layout1-designs/design-25-star-polaroid-cutout-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout1-designs/design-25-star-polaroid-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 2038,
    height: 2440,
    slots: [{ x: 240, y: 232, width: 1664, height: 1708 }],
  },
  {
    id: "layout1-ice-cream-polaroid",
    src: "assets/layout1-designs/design-01-ice-cream-polaroid.png?v=layout1-designs-v2",
    frameSrc: "assets/layout1-designs/design-01-ice-cream-polaroid-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 989,
    height: 1194,
    slots: [{ x: 64, y: 61, width: 860, height: 883 }],
  },
  {
    id: "layout1-lip-polaroid",
    src: "assets/layout1-designs/design-12-lip-polaroid.png?v=layout1-extra-designs-20260521",
    frameSrc: "assets/layout1-designs/design-12-lip-polaroid-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 769,
    height: 1095,
    slots: [{ x: 44, y: 54, width: 682, height: 816 }],
  },
  {
    id: "layout1-xoxo-polaroid",
    src: "assets/layout1-designs/design-13-xoxo-polaroid.png?v=layout1-extra-designs-20260521",
    frameSrc: "assets/layout1-designs/design-13-xoxo-polaroid-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 1111,
    height: 1683,
    slots: [{ x: 59, y: 90, width: 978, height: 1249 }],
  },
];

const layout2DesignOptions = [
  {
    id: "hello-kitty-blue",
    src: "assets/layout2-designs/design-2.jpg?v=layout2-designs",
    frameSrc: "assets/layout2-designs/design-2-cutout-depth.png?v=all-layout-depth-designs-20260524",
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
    frameSrc: "assets/layout2-designs/design-3-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 882,
    height: 2458,
    slots: [
      { x: 84, y: 66, width: 718, height: 485 },
      { x: 84, y: 616, width: 718, height: 485 },
      { x: 84, y: 1166, width: 718, height: 485 },
      { x: 84, y: 1716, width: 718, height: 485 },
    ],
  },
  {
    id: "chiikawa-pink",
    src: "assets/layout2-designs/design-4.jpg?v=layout2-designs",
    frameSrc: "assets/layout2-designs/design-4-cutout-depth.png?v=ui-layout3-design02-outline-recut-20260528",
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
    frameSrc: "assets/layout2-designs/design-5-cutout-depth.png?v=all-layout-depth-designs-20260524",
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
    frameSrc: "assets/layout2-designs/design-6-cutout-depth.png?v=all-layout-depth-designs-20260524",
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
    frameSrc: "assets/layout2-designs/design-7-cutout-depth.png?v=all-layout-depth-designs-20260524",
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
    frameSrc: "assets/layout2-designs/design-8-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 607,
    height: 1677,
    slots: [
      { x: 60, y: 38, width: 484, height: 348 },
      { x: 60, y: 416, width: 484, height: 396 },
      { x: 60, y: 762, width: 484, height: 386 },
      { x: 60, y: 1178, width: 482, height: 348 },
    ],
  },
  {
    id: "pearl-heart-pink",
    src: "assets/layout2-designs/design-9-pearl-heart-pink.png?v=layout2-added-v1",
    frameSrc: "assets/layout2-designs/design-9-pearl-heart-pink-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 724,
    height: 2172,
    slots: [
      { x: 90, y: 246, width: 550, height: 425 },
      { x: 82, y: 678, width: 545, height: 427 },
      { x: 83, y: 1112, width: 556, height: 428 },
      { x: 83, y: 1544, width: 552, height: 428 },
    ],
  },
  {
    id: "pink-polka-bow",
    src: "assets/layout2-designs/design-10-pink-polka-bow.jpg?v=layout2-added-v1",
    frameSrc: "assets/layout2-designs/design-10-pink-polka-bow-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 459,
    height: 1385,
    slots: [
      { x: 33, y: 36, width: 391, height: 285 },
      { x: 34, y: 347, width: 390, height: 279 },
      { x: 33, y: 661, width: 391, height: 284 },
      { x: 33, y: 972, width: 391, height: 285 },
    ],
  },
  {
    id: "black-polka-heart",
    src: "assets/layout2-designs/design-11-black-polka-heart-cutout-depth.png?v=layout3-design08-recut-20260526",
    frameSrc: "assets/layout2-designs/design-11-black-polka-heart-cutout-depth.png?v=layout3-design08-recut-20260526",
    width: 524,
    height: 1518,
    slots: [
      { x: 52, y: 48, width: 424, height: 307 },
      { x: 52, y: 394, width: 424, height: 306 },
      { x: 52, y: 744, width: 424, height: 304 },
      { x: 52, y: 1088, width: 424, height: 306 },
    ],
  },
  {
    id: "black-bear-polka",
    src: "assets/layout2-designs/design-12-black-bear-polka.jpg?v=layout2-added-v1",
    frameSrc: "assets/layout2-designs/design-12-black-bear-polka-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 984,
    height: 2954,
    slots: [
      { x: 42, y: 92, width: 888, height: 560 },
      { x: 12, y: 688, width: 896, height: 584 },
      { x: 73, y: 1338, width: 859, height: 591 },
      { x: 48, y: 2048, width: 860, height: 583 },
    ],
  },
  {
    id: "denim-attention",
    src: "assets/layout2-designs/design-13-denim-attention.jpg?v=layout2-added-v1",
    frameSrc: "assets/layout2-designs/design-13-denim-attention-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 582,
    height: 1705,
    slots: [
      { x: 91, y: 206, width: 400, height: 257 },
      { x: 91, y: 590, width: 400, height: 257 },
      { x: 27, y: 974, width: 464, height: 327 },
      { x: 91, y: 1357, width: 470, height: 317 },
    ],
  },
  {
    id: "quote-polka-bow",
    src: "assets/layout2-designs/design-14-quote-polka-bow.jpg?v=layout2-added-v1",
    frameSrc: "assets/layout2-designs/design-14-quote-polka-bow-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 790,
    height: 2201,
    slots: [
      { x: 105, y: 223, width: 573, height: 371 },
      { x: 105, y: 653, width: 572, height: 371 },
      { x: 106, y: 1092, width: 571, height: 368 },
      { x: 109, y: 1532, width: 565, height: 361 },
    ],
  },
];

const rilakkumaHelloDesign = {
  id: "rilakkuma-hello",
  src: "assets/layout2-designs/design-rilakkuma-hello-cutout-depth.png?v=all-layout-depth-designs-20260524",
  frameSrc: "assets/layout2-designs/design-rilakkuma-hello-cutout-depth.png?v=all-layout-depth-designs-20260524",
  width: 882,
  height: 2457,
  slots: [
    { x: 89, y: 64, width: 704, height: 508 },
    { x: 89, y: 617, width: 704, height: 508 },
    { x: 89, y: 1173, width: 704, height: 508 },
    { x: 89, y: 1726, width: 704, height: 508 },
  ],
};

const layout3PinkHeartGridDesign = {
  id: "layout3-pink-heart-grid",
  src: "assets/layout3-designs/design-13-pink-heart-grid-cutout.png?v=layout3-extra-designs-20260526",
  frameSrc: "assets/layout3-designs/design-13-pink-heart-grid-cutout.png?v=layout3-extra-designs-20260526",
  width: 849,
  height: 2538,
  slots: [
    { x: 117, y: 118, width: 586, height: 449 },
    { x: 117, y: 660, width: 586, height: 449 },
    { x: 117, y: 1204, width: 586, height: 449 },
    { x: 117, y: 1747, width: 586, height: 449 },
  ],
};

const layout3BlackSwirlDesign = {
  id: "layout3-black-swirl",
  src: "assets/layout3-designs/design-14-black-swirl-cutout.png?v=layout3-extra-designs-20260526",
  frameSrc: "assets/layout3-designs/design-14-black-swirl-cutout.png?v=layout3-extra-designs-20260526",
  width: 360,
  height: 1082,
  slots: [
    { x: 33, y: 51, width: 293, height: 178 },
    { x: 33, y: 265, width: 293, height: 179 },
    { x: 33, y: 483, width: 292, height: 177 },
    { x: 32, y: 699, width: 294, height: 179 },
  ],
};

const layout2Designs = [
  layout2DesignOptions[0],
  layout2DesignOptions[2],
  layout2DesignOptions[3],
  layout2DesignOptions[6],
  rilakkumaHelloDesign,
  ...layout2DesignOptions.slice(8),
  layout3PinkHeartGridDesign,
  layout3BlackSwirlDesign,
];

const layout3ExtraDesigns = [
  {
    id: "layout3-pink-plaid-bow",
    src: "assets/layout3-designs/design-02-pink-plaid-bow-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout3-designs/design-02-pink-plaid-bow-depth.png?v=all-layout-depth-designs-20260524",
    width: 717,
    height: 1772,
    slots: [
      { x: 82, y: 123, width: 555, height: 377 },
      { x: 82, y: 558, width: 555, height: 376 },
      { x: 82, y: 992, width: 555, height: 377 },
    ],
  },
  {
    id: "layout3-brown-polka-sweetie",
    src: "assets/layout3-designs/design-03-brown-polka-sweetie-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout3-designs/design-03-brown-polka-sweetie-depth.png?v=all-layout-depth-designs-20260524",
    width: 1000,
    height: 2394,
    slots: [
      { x: 118, y: 108, width: 765, height: 574 },
      { x: 118, y: 742, width: 765, height: 574 },
      { x: 118, y: 1376, width: 765, height: 574 },
    ],
  },
  {
    id: "layout3-red-dot-cherry",
    src: "assets/layout3-designs/design-04-red-dot-cherry-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout3-designs/design-04-red-dot-cherry-depth.png?v=all-layout-depth-designs-20260524",
    width: 1000,
    height: 2394,
    slots: [
      { x: 122, y: 119, width: 757, height: 552 },
      { x: 122, y: 753, width: 757, height: 552 },
      { x: 122, y: 1387, width: 757, height: 552 },
    ],
  },
  {
    id: "layout3-pink-stripe-cherish",
    src: "assets/layout3-designs/design-05-pink-stripe-cherish-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout3-designs/design-05-pink-stripe-cherish-depth.png?v=all-layout-depth-designs-20260524",
    width: 1000,
    height: 2394,
    slots: [
      { x: 118, y: 108, width: 765, height: 574 },
      { x: 118, y: 742, width: 765, height: 574 },
      { x: 118, y: 1376, width: 765, height: 574 },
    ],
  },
  {
    id: "layout3-white-oval-text",
    src: "assets/layout3-designs/design-06-white-oval-text-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout3-designs/design-06-white-oval-text-depth.png?v=all-layout-depth-designs-20260524",
    width: 1000,
    height: 2394,
    slots: [
      { x: 144, y: 113, width: 713, height: 547 },
      { x: 144, y: 747, width: 713, height: 547 },
      { x: 144, y: 1381, width: 713, height: 547 },
    ],
  },
  {
    id: "layout3-pink-leopard-kitty",
    src: "assets/layout3-designs/design-07-pink-leopard-kitty-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout3-designs/design-07-pink-leopard-kitty-depth.png?v=all-layout-depth-designs-20260524",
    width: 1000,
    height: 2394,
    slots: [
      { x: 113, y: 123, width: 774, height: 542 },
      { x: 113, y: 759, width: 774, height: 542 },
      { x: 113, y: 1392, width: 774, height: 542 },
    ],
  },
  {
    id: "layout3-black-cherry-polka",
    src: "assets/layout3-designs/design-08-black-cherry-polka-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout3-designs/design-08-black-cherry-polka-depth.png?v=all-layout-depth-designs-20260524",
    width: 709,
    height: 1772,
    slots: [
      { x: 77, y: 123, width: 555, height: 377 },
      { x: 77, y: 558, width: 555, height: 376 },
      { x: 77, y: 992, width: 555, height: 377 },
    ],
  },
  {
    id: "layout3-brown-dot-lace-bow",
    src: "assets/layout3-designs/design-09-brown-dot-lace-bow-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout3-designs/design-09-brown-dot-lace-bow-depth.png?v=all-layout-depth-designs-20260524",
    width: 1000,
    height: 2394,
    slots: [
      { x: 118, y: 108, width: 765, height: 574 },
      { x: 118, y: 742, width: 765, height: 574 },
      { x: 118, y: 1376, width: 765, height: 574 },
    ],
  },
];

const layout3NewDesigns = [
  {
    id: "layout3-black-dot-three",
    src: "assets/layout3-designs/design-10-black-dot-three-cutout-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout3-designs/design-10-black-dot-three-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 946,
    height: 2362,
    slots: [
      { x: 98, y: 149, width: 756, height: 524 },
      { x: 98, y: 782, width: 756, height: 524 },
      { x: 98, y: 1422, width: 756, height: 524 },
    ],
  },
  {
    id: "layout3-blue-star-wings",
    src: "assets/layout3-designs/design-11-blue-star-wings-cutout-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout3-designs/design-11-blue-star-wings-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 806,
    height: 2258,
    slots: [
      { x: 121, y: 151, width: 567, height: 463 },
      { x: 121, y: 720, width: 567, height: 458 },
      { x: 121, y: 1281, width: 567, height: 459 },
    ],
  },
  {
    id: "layout3-gray-dot-oreo",
    src: "assets/layout3-designs/design-12-gray-dot-oreo-cutout-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout3-designs/design-12-gray-dot-oreo-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 709,
    height: 1772,
    slots: [
      { x: 78, y: 115, width: 555, height: 384 },
      { x: 78, y: 558, width: 555, height: 384 },
      { x: 78, y: 1001, width: 555, height: 360 },
    ],
  },
  {
    id: "layout2-black-polka-angel",
    src: "assets/layout3-designs/design-15-black-polka-angel-cutout.png?v=layout2-extra-designs-20260526",
    frameSrc: "assets/layout3-designs/design-15-black-polka-angel-cutout.png?v=layout2-extra-designs-20260526",
    width: 715,
    height: 1661,
    slots: [
      { x: 107, y: 140, width: 502, height: 341 },
      { x: 107, y: 591, width: 502, height: 345 },
      { x: 107, y: 1049, width: 502, height: 339 },
    ],
  },
  {
    id: "layout2-brown-stars",
    src: "assets/layout3-designs/design-16-brown-stars-cutout.png?v=layout2-extra-designs-20260526",
    frameSrc: "assets/layout3-designs/design-16-brown-stars-cutout.png?v=layout2-extra-designs-20260526",
    width: 1276,
    height: 3638,
    slots: [
      { x: 184, y: 582, width: 905, height: 570 },
      { x: 184, y: 1436, width: 905, height: 569 },
      { x: 184, y: 2292, width: 905, height: 569 },
    ],
  },
  {
    id: "layout2-pink-leopard-pearl",
    src: "assets/layout3-designs/design-17-pink-leopard-pearl-cutout.png?v=layout2-extra-designs-20260526",
    frameSrc: "assets/layout3-designs/design-17-pink-leopard-pearl-cutout.png?v=layout2-extra-designs-20260526",
    width: 1000,
    height: 2394,
    slots: [
      { x: 123, y: 129, width: 754, height: 530 },
      { x: 123, y: 765, width: 754, height: 530 },
      { x: 123, y: 1398, width: 754, height: 526 },
    ],
  },
  {
    id: "layout2-gold-animal",
    src: "assets/layout3-designs/design-18-gold-animal-cutout.png?v=layout2-extra-designs-20260526",
    frameSrc: "assets/layout3-designs/design-18-gold-animal-cutout.png?v=layout2-extra-designs-20260526",
    width: 795,
    height: 1979,
    slots: [
      { x: 80, y: 123, width: 639, height: 446 },
      { x: 79, y: 656, width: 641, height: 445 },
      { x: 80, y: 1194, width: 640, height: 446 },
    ],
  },
];

const layout3Designs = [
  layout3ExtraDesigns[4],
  cakeMintDesign,
  layout3ExtraDesigns[1],
  layout3ExtraDesigns[2],
  layout3ExtraDesigns[3],
  layout3ExtraDesigns[0],
  layout3ExtraDesigns[5],
  layout3ExtraDesigns[6],
  layout3ExtraDesigns[7],
  ...layout3NewDesigns,
];

const layout4Designs = [
  {
    id: "layout4-black-love",
    src: "assets/layout4-designs/layout4-black-love-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout4-designs/layout4-black-love-depth.png?v=all-layout-depth-designs-20260524",
    width: 1023,
    height: 1537,
    slots: [
      { x: 105, y: 82, width: 813, height: 580 },
      { x: 105, y: 756, width: 813, height: 576 },
    ],
  },
  {
    id: "layout4-pink-kitty-soda",
    src: "assets/layout4-designs/layout4-pink-kitty-soda-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout4-designs/layout4-pink-kitty-soda-depth.png?v=all-layout-depth-designs-20260524",
    width: 1022,
    height: 1567,
    slots: [
      { x: 71, y: 78, width: 879, height: 493 },
      { x: 116, y: 635, width: 834, height: 508 },
    ],
  },
  {
    id: "layout4-mint-gray-doodles",
    src: "assets/layout4-designs/layout4-mint-gray-doodles-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout4-designs/layout4-mint-gray-doodles-depth.png?v=all-layout-depth-designs-20260524",
    width: 689,
    height: 1063,
    slots: [
      { x: 64, y: 78, width: 561, height: 390 },
      { x: 63, y: 517, width: 563, height: 402 },
    ],
  },
  {
    id: "layout4-pink-gray-bunny",
    src: "assets/layout4-designs/layout4-pink-gray-bunny-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout4-designs/layout4-pink-gray-bunny-depth.png?v=all-layout-depth-designs-20260524",
    width: 1017,
    height: 1581,
    slots: [
      { x: 102, y: 95, width: 813, height: 565 },
      { x: 98, y: 737, width: 821, height: 560 },
    ],
  },
  {
    id: "layout4-hello-kitty-plaid",
    src: "assets/layout4-designs/layout4-hello-kitty-plaid-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout4-designs/layout4-hello-kitty-plaid-depth.png?v=all-layout-depth-designs-20260524",
    width: 1290,
    height: 1920,
    slots: [
      { x: 19, y: 4, width: 1253, height: 925 },
      { x: 19, y: 970, width: 1257, height: 925 },
    ],
  },
  {
    id: "layout4-rilakkuma-snack",
    src: "assets/layout4-designs/layout4-rilakkuma-snack-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout4-designs/layout4-rilakkuma-snack-depth.png?v=all-layout-depth-designs-20260524",
    width: 1078,
    height: 1613,
    slots: [
      { x: 33, y: 62, width: 1005, height: 709 },
      { x: 19, y: 840, width: 1023, height: 723 },
    ],
  },
  {
    id: "layout4-soft-stars",
    src: "assets/layout4-designs/layout4-soft-stars-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout4-designs/layout4-soft-stars-depth.png?v=all-layout-depth-designs-20260524",
    width: 1262,
    height: 1762,
    slots: [
      { x: 42, y: 147, width: 989, height: 661 },
      { x: 229, y: 940, width: 997, height: 673 },
    ],
  },
  {
    id: "layout4-pastel-plaid",
    src: "assets/layout4-designs/layout4-pastel-plaid-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout4-designs/layout4-pastel-plaid-depth.png?v=all-layout-depth-designs-20260524",
    width: 941,
    height: 1672,
    slots: [
      { x: 57, y: 228, width: 680, height: 513 },
      { x: 51, y: 937, width: 856, height: 526 },
    ],
  },
  {
    id: "layout4-blue-bunny",
    src: "assets/layout4-designs/layout4-blue-bunny-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout4-designs/layout4-blue-bunny-depth.png?v=all-layout-depth-designs-20260524",
    width: 1024,
    height: 1536,
    slots: [
      { x: 49, y: 99, width: 919, height: 567 },
      { x: 56, y: 855, width: 910, height: 593 },
    ],
  },
  {
    id: "layout4-dessert-oval",
    src: "assets/layout4-designs/layout4-dessert-oval-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout4-designs/layout4-dessert-oval-depth.png?v=all-layout-depth-designs-20260524",
    width: 1086,
    height: 1448,
    slots: [
      { x: 526, y: 30, width: 560, height: 802 },
      { x: 49, y: 611, width: 518, height: 837 },
    ],
  },
  {
    id: "layout4-green-apple",
    src: "assets/layout4-designs/layout4-green-apple-cutout.png?v=layout4-extra-designs-20260526",
    frameSrc: "assets/layout4-designs/layout4-green-apple-cutout.png?v=layout4-extra-designs-20260526",
    width: 1058,
    height: 1639,
    slots: [
      { x: 138, y: 170, width: 844, height: 604 },
      { x: 142, y: 814, width: 817, height: 597 },
    ],
  },
  {
    id: "layout4-pochacco-blue",
    src: "assets/layout4-designs/layout4-pochacco-blue-cutout.png?v=layout4-extra-designs-20260526",
    frameSrc: "assets/layout4-designs/layout4-pochacco-blue-cutout.png?v=layout4-extra-designs-20260526",
    width: 1149,
    height: 1726,
    slots: [
      { x: 25, y: 26, width: 1102, height: 803 },
      { x: 25, y: 914, width: 1103, height: 762 },
    ],
  },
  {
    id: "layout4-pompompurin-yellow",
    src: "assets/layout4-designs/layout4-pompompurin-yellow-cutout.png?v=layout4-extra-designs-20260526",
    frameSrc: "assets/layout4-designs/layout4-pompompurin-yellow-cutout.png?v=layout4-extra-designs-20260526",
    width: 1920,
    height: 2860,
    slots: [
      { x: 49, y: 26, width: 1824, height: 1285 },
      { x: 50, y: 1463, width: 1824, height: 1323 },
    ],
  },
  {
    id: "layout4-rilakkuma-plaid",
    src: "assets/layout4-designs/layout4-rilakkuma-plaid-cutout.png?v=layout4-extra-designs-20260526",
    frameSrc: "assets/layout4-designs/layout4-rilakkuma-plaid-cutout.png?v=layout4-extra-designs-20260526",
    width: 1149,
    height: 1720,
    slots: [
      { x: 24, y: 19, width: 1098, height: 797 },
      { x: 24, y: 920, width: 1099, height: 748 },
    ],
  },
  {
    id: "layout4-chiikawa",
    src: "assets/layout4-designs/layout4-chiikawa-cutout.png?v=layout4-extra-designs-20260526",
    frameSrc: "assets/layout4-designs/layout4-chiikawa-cutout.png?v=layout4-extra-designs-20260526",
    width: 1153,
    height: 1714,
    slots: [
      { x: 23, y: 10, width: 1105, height: 812 },
      { x: 24, y: 926, width: 1099, height: 761 },
    ],
  },
];

const layout5Designs = [
  {
    id: "layout5-hello-kitty-polka",
    src: "assets/layout5-designs/layout5-hello-kitty-polka-cutout.png?v=layout5-extra-designs-20260526",
    frameSrc: "assets/layout5-designs/layout5-hello-kitty-polka-cutout.png?v=layout5-extra-designs-20260526",
    width: 1075,
    height: 1612,
    slots: [
      { x: 56, y: 171, width: 419, height: 279 },
      { x: 576, y: 340, width: 458, height: 310 },
      { x: 56, y: 502, width: 419, height: 280 },
      { x: 576, y: 671, width: 458, height: 311 },
      { x: 56, y: 834, width: 419, height: 278 },
      { x: 576, y: 1004, width: 458, height: 310 },
    ],
  },
];

const layout6DesignPool = [
  {
    id: "layout6-gray-star",
    src: "assets/layout6-designs/design-10-gray-star-cutout.png?v=layout6-new-cutouts-20260528",
    frameSrc: "assets/layout6-designs/design-10-gray-star-cutout.png?v=layout6-new-cutouts-20260528",
    width: 1290,
    height: 1872,
    slots: [
      { x: 112, y: 113, width: 504, height: 650 },
      { x: 684, y: 113, width: 505, height: 650 },
      { x: 113, y: 823, width: 505, height: 651 },
      { x: 688, y: 823, width: 504, height: 651 },
    ],
  },
  {
    id: "layout6-cherry-confetti",
    src: "assets/layout6-designs/design-11-cherry-confetti-cutout.png?v=layout6-new-cutouts-20260528",
    frameSrc: "assets/layout6-designs/design-11-cherry-confetti-cutout.png?v=layout6-new-cutouts-20260528",
    width: 1139,
    height: 1768,
    slots: [
      { x: 79, y: 137, width: 465, height: 618 },
      { x: 602, y: 137, width: 464, height: 618 },
      { x: 81, y: 846, width: 465, height: 625 },
      { x: 610, y: 846, width: 465, height: 625 },
    ],
  },
  {
    id: "layout6-sketch-star-bow",
    src: "assets/layout6-designs/design-12-sketch-star-bow-cutout.png?v=layout6-new-cutouts-20260528",
    frameSrc: "assets/layout6-designs/design-12-sketch-star-bow-cutout.png?v=layout6-new-cutouts-20260528",
    width: 1212,
    height: 1894,
    slots: [
      { x: 78, y: 122, width: 512, height: 704 },
      { x: 632, y: 121, width: 512, height: 704 },
      { x: 78, y: 898, width: 512, height: 704 },
      { x: 635, y: 897, width: 512, height: 704 },
    ],
  },
  {
    id: "layout6-polka-bow-quote",
    src: "assets/layout6-designs/design-03-polka-bow-quote-cutout-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout6-designs/design-03-polka-bow-quote-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 1180,
    height: 1724,
    slots: [
      { x: 126, y: 239, width: 428, height: 551 },
      { x: 620, y: 239, width: 428, height: 551 },
      { x: 126, y: 883, width: 428, height: 521 },
      { x: 620, y: 883, width: 428, height: 521 },
    ],
  },
  {
    id: "layout6-photomagic-stars",
    src: "assets/layout6-designs/design-02-photomagic-stars-cutout-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout6-designs/design-02-photomagic-stars-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 1164,
    height: 1708,
    slots: [
      { x: 124, y: 251, width: 427, height: 569 },
      { x: 613, y: 251, width: 426, height: 569 },
      { x: 124, y: 909, width: 427, height: 555 },
      { x: 613, y: 909, width: 426, height: 555 },
    ],
  },
  {
    id: "layout6-kacha-comic",
    src: "assets/layout6-designs/design-01-kacha-comic-cutout-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout6-designs/design-01-kacha-comic-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 1182,
    height: 1772,
    slots: [
      { x: 86, y: 124, width: 465, height: 638 },
      { x: 614, y: 124, width: 473, height: 638 },
      { x: 99, y: 842, width: 442, height: 618 },
      { x: 621, y: 842, width: 464, height: 618 },
    ],
  },
  {
    id: "layout6-crayon-shin",
    src: "assets/layout6-designs/design-04-crayon-shin-cutout-depth.png?v=all-layout-depth-designs-20260524",
    frameSrc: "assets/layout6-designs/design-04-crayon-shin-cutout-depth.png?v=all-layout-depth-designs-20260524",
    width: 1240,
    height: 1844,
    slots: [
      { x: 88, y: 72, width: 466, height: 703 },
      { x: 684, y: 72, width: 469, height: 703 },
      { x: 87, y: 822, width: 467, height: 730 },
      { x: 684, y: 822, width: 469, height: 730 },
    ],
  },
  {
    id: "layout6-womens-day",
    src: "assets/layout6-designs/design-05-womens-day-cutout.png?v=layout6-design05-recut-20260526",
    frameSrc: "assets/layout6-designs/design-05-womens-day-cutout.png?v=layout6-design05-recut-20260526",
    width: 1027,
    height: 1531,
    slots: [
      { x: 81, y: 170, width: 418, height: 586 },
      { x: 526, y: 170, width: 418, height: 586 },
      { x: 81, y: 837, width: 418, height: 587 },
      { x: 526, y: 837, width: 418, height: 587 },
    ],
  },
  {
    id: "layout6-instax",
    src: "assets/layout6-designs/design-06-instax-cutout.png?v=layout6-extra-designs-20260526",
    frameSrc: "assets/layout6-designs/design-06-instax-cutout.png?v=layout6-extra-designs-20260526",
    width: 809,
    height: 1219,
    slots: [
      { x: 52, y: 180, width: 323, height: 428 },
      { x: 432, y: 180, width: 323, height: 428 },
      { x: 52, y: 644, width: 323, height: 428 },
      { x: 432, y: 644, width: 323, height: 428 },
    ],
  },
  {
    id: "layout6-sanrio-sakura",
    src: "assets/layout6-designs/design-07-sanrio-sakura-cutout.png?v=layout6-extra-designs-20260526",
    frameSrc: "assets/layout6-designs/design-07-sanrio-sakura-cutout.png?v=layout6-extra-designs-20260526",
    width: 1035,
    height: 1555,
    slots: [
      { x: 87, y: 227, width: 429, height: 537 },
      { x: 521, y: 225, width: 428, height: 535 },
      { x: 91, y: 768, width: 428, height: 535 },
      { x: 525, y: 766, width: 428, height: 534 },
    ],
  },
  {
    id: "layout6-bear-dotted",
    src: "assets/layout6-designs/design-08-bear-dotted-cutout.png?v=layout6-extra-designs-20260526",
    frameSrc: "assets/layout6-designs/design-08-bear-dotted-cutout.png?v=layout6-extra-designs-20260526",
    width: 1059,
    height: 1485,
    slots: [
      { x: 60, y: 232, width: 451, height: 545 },
      { x: 550, y: 65, width: 450, height: 545 },
      { x: 60, y: 796, width: 451, height: 545 },
      { x: 550, y: 630, width: 450, height: 545 },
    ],
  },
  {
    id: "layout6-valentine-chocolate",
    src: "assets/layout6-designs/design-09-valentine-chocolate-cutout.png?v=layout6-extra-designs-20260526",
    frameSrc: "assets/layout6-designs/design-09-valentine-chocolate-cutout.png?v=layout6-extra-designs-20260526",
    width: 1023,
    height: 1537,
    slots: [
      { x: 45, y: 103, width: 451, height: 599 },
      { x: 532, y: 102, width: 455, height: 600 },
      { x: 45, y: 737, width: 451, height: 600 },
      { x: 532, y: 737, width: 450, height: 600 },
    ],
  },
];

const layout6Designs = [
  layout6DesignPool[10],
  layout6DesignPool[7],
  layout6DesignPool[2],
  layout6DesignPool[0],
  layout6DesignPool[4],
  layout6DesignPool[9],
  layout6DesignPool[5],
  layout6DesignPool[11],
  layout6DesignPool[3],
  layout6DesignPool[8],
  layout6DesignPool[1],
  layout6DesignPool[6],
];

const customDesignsByLayout = {
  polaroid: layout1Designs,
  four: layout2Designs,
  three: layout3Designs,
  two: layout4Designs,
  six: layout5Designs,
  fourgrid: layout6Designs,
};
const layout2DesignImages = new Map();
const customDesignPreviewImages = new Map();
const customDesignEdgeDepthCanvases = new Map();
const transparentSlotBoundsByDesign = new Map();
let designOptionRenderToken = 0;

function stripAssetQuery(src = "") {
  return src.split("?")[0];
}

function getDesignThumbnailSrc(src) {
  const assetPath = stripAssetQuery(src);
  if (!/^assets\/layout\d-designs\/.+\.(?:png|jpe?g)$/i.test(assetPath)) {
    return src;
  }

  const thumbnailPath = assetPath
    .replace(/^assets\//, "assets/design-thumbs/")
    .replace(/\.(?:png|jpe?g)$/i, ".png");

  return `${thumbnailPath}?v=${designThumbnailVersion}`;
}

function scheduleIdleTask(callback) {
  return window.setTimeout(callback, 180);
}

function getCustomDesignImage(design, shouldLoad = true) {
  if (!design) {
    return null;
  }

  let image = layout2DesignImages.get(design.id);
  if (!image) {
    image = new Image();
    image.decoding = "async";
    image.addEventListener("load", () => {
      if (state.layout2Design !== design.id) {
        return;
      }

      invalidateFrameCache();
      customDesignEdgeDepthCanvases.clear();
      renderBooth(false);
    });
    layout2DesignImages.set(design.id, image);
  }

  if (shouldLoad && !image.__photoBoothSrcSet) {
    image.__photoBoothSrcSet = true;
    image.src = design.frameSrc || design.src;
  }

  return image;
}

function getCustomDesignPreviewImage(design, shouldLoad = true) {
  if (!design) {
    return null;
  }

  let image = customDesignPreviewImages.get(design.id);
  if (!image) {
    image = new Image();
    image.decoding = "async";
    image.addEventListener("load", () => {
      if (state.layout2Design !== design.id || state.confirmed) {
        return;
      }

      invalidateFrameCache();
      customDesignEdgeDepthCanvases.clear();
      renderBooth(false);
    });
    customDesignPreviewImages.set(design.id, image);
  }

  if (shouldLoad && !image.__photoBoothSrcSet) {
    image.__photoBoothSrcSet = true;
    image.src = getDesignThumbnailSrc(design.frameSrc || design.src);
  }

  return image;
}

function getRenderDesignImage(design) {
  return state.confirmed || state.shooting
    ? getCustomDesignImage(design)
    : getCustomDesignPreviewImage(design);
}

function isCustomDesignImageReady(image) {
  return Boolean(image?.complete && image.naturalWidth);
}

async function waitForCustomDesignImage(image) {
  if (!image) {
    return null;
  }

  if (!image.complete) {
    await new Promise((resolve) => {
      const finish = () => {
        image.removeEventListener("load", finish);
        image.removeEventListener("error", finish);
        resolve();
      };

      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });
    });
  }

  if (image.naturalWidth && image.decode) {
    try {
      await image.decode();
    } catch (error) {
      return image;
    }
  }

  return image;
}

async function ensureActiveCustomDesignReady() {
  const design = getActiveLayout2Design();
  if (!design) {
    return;
  }

  const image = getCustomDesignImage(design);
  await waitForCustomDesignImage(image);
  if (state.frame !== "layout2-custom" || state.layout2Design !== design.id || !isCustomDesignImageReady(image)) {
    return;
  }

  invalidateFrameCache();
  renderBooth(false);
}

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

const filterOptions = [
  { id: "original", label: "Original", canvasFilter: "none", cssFilter: "none", tint: null },
  { id: "black-white", label: "Black & White", canvasFilter: "grayscale(1) contrast(1.08) brightness(1.02)", cssFilter: "grayscale(1) contrast(1.08) brightness(1.02)", tint: ["#f7f3ee", 0.04, "screen"], grain: 0.08 },
  { id: "soft-cream", label: "Soft Cream", canvasFilter: "brightness(1.08) contrast(0.92) saturate(0.9) sepia(0.08)", cssFilter: "brightness(1.08) contrast(0.92) saturate(0.9) sepia(0.08)", tint: ["#fff1de", 0.13, "screen"] },
  { id: "vintage-film", label: "Vintage Film", canvasFilter: "sepia(0.34) contrast(0.86) brightness(0.96) saturate(0.78)", cssFilter: "sepia(0.34) contrast(0.86) brightness(0.96) saturate(0.78)", tint: ["#7b4c26", 0.1, "multiply"], grain: 0.18 },
  { id: "ccd-camera", label: "CCD Camera", canvasFilter: "contrast(1.26) brightness(1.05) saturate(1.34) blur(0.18px)", cssFilter: "contrast(1.26) brightness(1.05) saturate(1.34) blur(0.18px)", tint: ["#b7d3ff", 0.1, "screen"], grain: 0.14 },
  { id: "flash", label: "Flash", canvasFilter: "brightness(1.28) contrast(1.14) saturate(0.96)", cssFilter: "brightness(1.28) contrast(1.14) saturate(0.96)", tint: ["#eaf7ff", 0.16, "screen"] },
  { id: "pink-glow", label: "Pink Glow", canvasFilter: "brightness(1.1) contrast(0.92) saturate(1.1) sepia(0.05)", cssFilter: "brightness(1.1) contrast(0.92) saturate(1.1) sepia(0.05)", tint: ["#ffc4df", 0.24, "soft-light"] },
  { id: "cool-tone", label: "Cool Tone", canvasFilter: "brightness(1.03) contrast(1.03) saturate(0.86)", cssFilter: "brightness(1.03) contrast(1.03) saturate(0.86)", tint: ["#bddfff", 0.2, "soft-light"] },
  { id: "warm-film", label: "Warm Film", canvasFilter: "brightness(1.04) contrast(0.94) saturate(1.02) sepia(0.24)", cssFilter: "brightness(1.04) contrast(0.94) saturate(1.02) sepia(0.24)", tint: ["#efc17a", 0.16, "soft-light"], grain: 0.1 },
];

const state = {
  layout: null,
  frame: "plain",
  confirmed: false,
  shooting: false,
  currentShot: 0,
  countdown: null,
  countdownTimer: null,
  captures: [],
  captureSlots: [],
  stream: null,
  live: true,
  frozenFrame: null,
  demoMode: false,
  animationFrame: null,
  permissionGranted: false,
  cameraRequestId: 0,
  finishOverlayTimer: null,
  processingTimer: null,
  confettiTimer: null,
  confettiAnimationFrame: null,
  finishPrepareFrame: null,
  finishPrepared: false,
  layoutAutoTimer: null,
  suppressShootLive: false,
  transitioningToShoot: false,
  frameCache: null,
  lastRenderAt: 0,
  previewPinFrame: null,
  countdownPlacementFrame: null,
  design18PreviewHoverRect: null,
  frameOptionsMode: "",
  layout2Design: null,
  filter: "original",
};

let selectedFilter = state.filter;

const confettiColors = [
  "#df6f9d",
  "#dcae2f",
  "#55aee8",
  "#78c46f",
  "#9578dc",
  "#e98758",
  "#e3cc45",
  "#43b8ad",
];

let finishConfettiCanvas = null;
let finishConfettiCtx = null;
let finishConfettiPieces = [];
let finishConfettiStartedAt = 0;
let finishConfettiResizeHandler = null;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createConfettiPiece(delay = 0) {
  const shape = ["rect", "circle", "star", "ribbon"][Math.floor(Math.random() * 4)];
  const width = randomBetween(6, 13);
  const height = shape === "circle" ? width : randomBetween(9, 20);
  const duration = randomBetween(1500, 2600);
  const piece = {
    shape,
    width,
    height: shape === "circle" ? width : height,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    opacity: randomBetween(0.82, 0.98),
    xRatio: randomBetween(-0.04, 1.04),
    driftRatio: randomBetween(-0.18, 0.18),
    startRotate: randomBetween(-140, 140) * Math.PI / 180,
    endRotate: randomBetween(520, 1080) * Math.PI / 180,
    delay: delay + randomBetween(0, 18),
    duration,
    radius: randomBetween(1, 5),
  };
  piece.sprite = createConfettiSprite(piece);
  return piece;
}

function createConfettiBatch(count = 5, delay = 0) {
  for (let index = 0; index < count; index += 1) {
    finishConfettiPieces.push(createConfettiPiece(delay));
  }
}

function resizeFinishConfettiCanvas() {
  if (!finishConfettiCanvas || !finishConfettiCtx) {
    return;
  }

  const dpr = 1;
  const width = window.innerWidth;
  const height = window.innerHeight * 1.12;
  finishConfettiCanvas.width = Math.max(1, Math.round(width * dpr));
  finishConfettiCanvas.height = Math.max(1, Math.round(height * dpr));
  finishConfettiCanvas.style.width = `${width}px`;
  finishConfettiCanvas.style.height = `${height}px`;
  finishConfettiCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

function drawStarPath(ctx, radius) {
  const inner = radius * 0.42;
  for (let point = 0; point < 10; point += 1) {
    const pointRadius = point % 2 === 0 ? radius : inner;
    const angle = -Math.PI / 2 + point * Math.PI / 5;
    const px = Math.cos(angle) * pointRadius;
    const py = Math.sin(angle) * pointRadius;
    if (point === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.closePath();
}

function createConfettiSprite(piece) {
  const padding = 3;
  const sprite = document.createElement("canvas");
  const spriteWidth = Math.ceil(piece.width + padding * 2);
  const spriteHeight = Math.ceil(piece.height + padding * 2);
  sprite.width = spriteWidth;
  sprite.height = spriteHeight;
  sprite.cssWidth = spriteWidth;
  sprite.cssHeight = spriteHeight;

  const ctx = sprite.getContext("2d");
  ctx.translate(spriteWidth / 2, spriteHeight / 2);
  ctx.fillStyle = piece.color;
  ctx.beginPath();

  if (piece.shape === "circle") {
    ctx.arc(0, 0, piece.width / 2, 0, Math.PI * 2);
  } else if (piece.shape === "star") {
    drawStarPath(ctx, Math.max(piece.width, piece.height) / 2);
  } else {
    const radius = piece.shape === "ribbon" ? Math.min(piece.width / 2, piece.height / 3) : piece.radius;
    drawRoundedRect(ctx, -piece.width / 2, -piece.height / 2, piece.width, piece.height, radius);
  }

  ctx.fill();
  return sprite;
}

function drawConfettiPiece(ctx, piece, progress, width, height) {
  const x = piece.xRatio * width + piece.driftRatio * width * progress;
  const y = -0.04 * height + 1.26 * height * progress;
  const rotation = piece.startRotate + (piece.endRotate - piece.startRotate) * progress;
  const opacity = progress < 0.03
    ? 0.2 + ((piece.opacity - 0.2) * progress / 0.03)
    : Math.min(piece.opacity, 0.92);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;
  ctx.drawImage(piece.sprite, -piece.sprite.cssWidth / 2, -piece.sprite.cssHeight / 2);
  ctx.restore();
}

function animateFinishConfetti(now) {
  if (!finishConfettiCanvas || !finishConfettiCtx) {
    return;
  }

  const width = window.innerWidth;
  const height = window.innerHeight * 1.12;
  finishConfettiCtx.clearRect(0, 0, width, height);
  let activeCount = 0;

  for (const piece of finishConfettiPieces) {
    const elapsed = now - finishConfettiStartedAt - piece.delay;
    if (elapsed < 0 || elapsed > piece.duration) {
      continue;
    }

    const progress = elapsed / piece.duration;
    const y = -0.04 * height + 1.26 * height * progress;
    if (y <= height + Math.max(piece.width, piece.height)) {
      activeCount += 1;
      drawConfettiPiece(finishConfettiCtx, piece, progress, width, height);
    }
  }

  if (activeCount > 0 || finishConfettiPieces.some((piece) => now - finishConfettiStartedAt < piece.delay)) {
    state.confettiAnimationFrame = window.requestAnimationFrame(animateFinishConfetti);
    return;
  }

  state.confettiAnimationFrame = null;
  finishConfettiPieces = [];
  if (finishConfettiResizeHandler) {
    window.removeEventListener("resize", finishConfettiResizeHandler);
    finishConfettiResizeHandler = null;
  }
  finishConfettiCanvas.remove();
  finishConfettiCanvas = null;
  finishConfettiCtx = null;
}

function startFinishConfetti() {
  stopFinishConfetti();
  if (!finishConfetti || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  finishConfetti.textContent = "";
  finishConfettiCanvas = document.createElement("canvas");
  finishConfettiCanvas.className = "finish-confetti-canvas";
  finishConfettiCtx = finishConfettiCanvas.getContext("2d");
  finishConfetti.appendChild(finishConfettiCanvas);
  finishConfettiPieces = [];
  createConfettiBatch(30, 120);
  createConfettiBatch(22, 300);
  resizeFinishConfettiCanvas();
  finishConfettiResizeHandler = resizeFinishConfettiCanvas;
  window.addEventListener("resize", finishConfettiResizeHandler, { passive: true });
  finishConfettiStartedAt = performance.now();
  state.confettiAnimationFrame = window.requestAnimationFrame(animateFinishConfetti);
}

function stopFinishConfetti() {
  window.clearTimeout(state.confettiTimer);
  state.confettiTimer = null;
  window.cancelAnimationFrame(state.confettiAnimationFrame);
  state.confettiAnimationFrame = null;
  if (finishConfettiResizeHandler) {
    window.removeEventListener("resize", finishConfettiResizeHandler);
    finishConfettiResizeHandler = null;
  }
  finishConfettiPieces = [];
  finishConfettiCanvas = null;
  finishConfettiCtx = null;
  if (finishConfetti) {
    finishConfetti.textContent = "";
  }
}

function getActiveFilter(filterId = selectedFilter) {
  return filterOptions.find((option) => option.id === filterId) || filterOptions[0];
}

function updateLiveFilterStyle(filter = getActiveFilter()) {
  const booth = document.getElementById("booth");
  const cssFilter = !filter.cssFilter || filter.cssFilter === "none" ? "brightness(1)" : filter.cssFilter;
  booth.dataset.activeFilter = filter.id;
  booth.style.setProperty("--active-camera-filter", cssFilter);
  booth.style.setProperty("--active-filter-overlay", filter.tint?.[0] || "transparent");
  booth.style.setProperty("--active-filter-overlay-opacity", String(filter.tint?.[1] || 0));
  booth.style.setProperty("--active-filter-overlay-blend", filter.tint?.[2] || "normal");
  booth.style.setProperty("--active-filter-grain-opacity", String(filter.grain || 0));
}

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

function pinLayoutShootingTransitionToTop() {
  if (state.layout !== "two" && state.layout !== "fourgrid") {
    return;
  }

  const root = document.documentElement;
  const body = document.body;
  const previousRootScrollBehavior = root.style.scrollBehavior;
  const previousBodyScrollBehavior = body.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  pinPageToTop();
  window.setTimeout(() => {
    root.style.scrollBehavior = previousRootScrollBehavior;
    body.style.scrollBehavior = previousBodyScrollBehavior;
  }, 560);
}

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

function rectanglesOverlap(first, second) {
  return first.left < second.right
    && first.right > second.left
    && first.top < second.bottom
    && first.bottom > second.top;
}

function localProtectedRect(element, rootRect, padding) {
  const rect = element.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return null;
  }

  return {
    left: rect.left - rootRect.left - padding,
    top: rect.top - rootRect.top - padding,
    right: rect.right - rootRect.left + padding,
    bottom: rect.bottom - rootRect.top + padding,
  };
}

function scoreLayoutEmojiCandidate(candidate, placed, width, height) {
  const nearestEmojiDistance = placed.length
    ? Math.min(...placed.map((point) => Math.hypot(point.x - candidate.x, point.y - candidate.y)))
    : Math.min(width, height) * 0.72;
  const edgeDistance = Math.min(candidate.x, width - candidate.x, candidate.y, height - candidate.y);

  return nearestEmojiDistance
    + Math.min(edgeDistance, 120) * 0.08
    + randomInRange(0, 42);
}

function getLayoutEmojiSymbols() {
  return Array.from({ length: layoutCherryCount }, () => "🍒");
}

function placeLayoutEmojis() {
  if (!layoutPicker || !layoutEmojiField || appShell.dataset.screen !== "layouts") {
    return;
  }

  const rootRect = layoutPicker.getBoundingClientRect();
  const width = layoutPicker.clientWidth;
  const height = Math.max(layoutPicker.scrollHeight, window.innerHeight);
  if (width < 240 || height < 240) {
    return;
  }

  const symbols = getLayoutEmojiSymbols();
  const protectedGroups = [
    { selector: ".site-nav", padding: window.innerWidth < 640 ? 10 : 16 },
    { selector: ".picker-header", padding: window.innerWidth < 640 ? 10 : 18 },
    { selector: ".layout-card img", padding: 6 },
    { selector: ".layout-card strong", padding: 8 },
    { selector: ".layout-continue", padding: 14 },
    { selector: ".corner-girl-decoration", padding: 18 },
  ];
  const protectedRects = protectedGroups.flatMap(({ selector, padding }) => (
    Array.from(document.querySelectorAll(selector))
      .map((element) => localProtectedRect(element, rootRect, padding))
      .filter(Boolean)
  ));
  const placed = [];

  layoutEmojiField.textContent = "";
  symbols.forEach((symbol, index) => {
    const size = randomInRange(28, window.innerWidth < 640 ? 34 : 42);
    const halfSize = size / 2;
    const edgePadding = halfSize + 12;
    const topSafePadding = Math.max(edgePadding, window.innerWidth < 640 ? 150 : 180);
    let chosen = null;
    const candidates = [];
    const candidateCount = window.innerWidth < 640 ? 260 : 520;
    const minNeighborDistance = window.innerWidth < 640 ? 54 : 82;

    for (let attempt = 0; attempt < candidateCount; attempt += 1) {
      const x = randomInRange(edgePadding, width - edgePadding);
      const y = randomInRange(topSafePadding, height - edgePadding);
      const candidate = {
        x,
        y,
        left: x - halfSize,
        top: y - halfSize,
        right: x + halfSize,
        bottom: y + halfSize,
      };

      if (protectedRects.some((rect) => rectanglesOverlap(candidate, rect))) {
        continue;
      }

      if (placed.some((point) => Math.hypot(point.x - x, point.y - y) < minNeighborDistance)) {
        continue;
      }

      const score = scoreLayoutEmojiCandidate(candidate, placed, width, height);
      candidates.push({ candidate, score });
    }

    if (candidates.length) {
      candidates.sort((first, second) => second.score - first.score);
      const topCandidateCount = Math.max(1, Math.ceil(candidates.length * 0.28));
      chosen = candidates[Math.floor(randomInRange(0, topCandidateCount))].candidate;
    }

    if (!chosen) {
      const fallbackStep = Math.max(halfSize + 8, 26);
      const offsetX = randomInRange(0, fallbackStep);
      const offsetY = randomInRange(0, fallbackStep);
      let bestFallbackScore = -Infinity;

      for (let y = topSafePadding + offsetY; y < height - edgePadding; y += fallbackStep) {
        for (let x = edgePadding + offsetX; x < width - edgePadding; x += fallbackStep) {
          const candidate = {
            x,
            y,
            left: x - halfSize,
            top: y - halfSize,
            right: x + halfSize,
            bottom: y + halfSize,
          };

          if (!protectedRects.some((rect) => rectanglesOverlap(candidate, rect))) {
            const score = scoreLayoutEmojiCandidate(candidate, placed, width, height);
            if (score > bestFallbackScore) {
              bestFallbackScore = score;
              chosen = candidate;
            }
          }
        }
      }
    }

    if (!chosen) {
      return;
    }

    placed.push(chosen);
    const emoji = document.createElement("span");
    emoji.className = "layout-emoji";
    emoji.textContent = symbol;
    emoji.style.left = `${chosen.x}px`;
    emoji.style.top = `${chosen.y}px`;
    emoji.style.setProperty("--emoji-size", `${size}px`);
    emoji.style.setProperty("--emoji-font-size", `${size * randomInRange(0.72, 0.86)}px`);
    emoji.style.setProperty("--emoji-rotate", `${randomInRange(-18, 18) + index * 1.5}deg`);
    layoutEmojiField.appendChild(emoji);
  });
}

function scheduleLayoutEmojis() {
  window.clearTimeout(layoutEmojiPlacementTimer);
  if (!layoutEmojiField || appShell.dataset.screen !== "layouts") {
    return;
  }

  layoutEmojiPlacementTimer = window.setTimeout(() => {
    window.requestAnimationFrame(placeLayoutEmojis);
  }, 90);
}

function resetLayoutPickerSelection() {
  window.clearTimeout(state.layoutAutoTimer);
  state.layout = null;
  state.frame = "plain";
  state.layout2Design = null;
  state.frameOptionsMode = "";
  invalidateFrameCache();
  layoutGallery?.querySelectorAll("button[data-layout]").forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.classList.remove("layout-bounce");
  });
  if (layoutContinueButton) {
    layoutContinueButton.disabled = true;
  }
}

function setScreen(screen) {
  appShell.classList.remove("screen-transition");
  if (screen === "layouts") {
    resetLayoutPickerSelection();
  }
  appShell.dataset.screen = screen;
  if (screen !== "booth") {
    resetActiveFilter();
    scheduleDesignScrollReset();
  }
  window.requestAnimationFrame(() => {
    appShell.classList.add("screen-transition");
  });
  if (screen === "layouts") {
    scheduleLayoutEmojis();
  } else if (layoutEmojiField) {
    layoutEmojiField.textContent = "";
  }
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

function replayClassAnimation(element, className, duration = 0) {
  if (!element) {
    return;
  }

  element.classList.remove(className);
  window.requestAnimationFrame(() => {
    element.classList.add(className);
    if (duration > 0) {
      window.setTimeout(() => {
        element.classList.remove(className);
      }, duration);
    }
  });
}

function replayPreviewDesignAnimation() {
  if (!previewCanvas || state.confirmed) {
    return;
  }

  replayClassAnimation(previewCanvas, "preview-design-pop", 340);
}

function pulseBoothModeTransition() {
  const booth = document.getElementById("booth");
  replayClassAnimation(booth, "mode-transition", 460);
}

function armLayoutShootingEnter() {
  if (state.layout !== "two" && state.layout !== "fourgrid") {
    return;
  }

  const booth = document.getElementById("booth");
  booth.classList.remove("shooting-enter");
  void booth.offsetWidth;
  booth.classList.add("shooting-enter");
  window.setTimeout(() => {
    booth.classList.remove("shooting-enter");
  }, 520);
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
      frameRate: { ideal: 60 },
    },
    audio: false,
  });

  return new Promise((resolve, reject) => {
    let settled = false;
    const timeoutId = window.setTimeout(() => {
      settled = true;
      reject(new DOMException("Camera request timed out", "CameraTimeoutError"));
    }, 30000);

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

function getCustomDesignsForLayout(layout = state.layout) {
  return customDesignsByLayout[layout] || [];
}

function getActiveLayout2Design() {
  if (state.frame !== "layout2-custom") {
    return null;
  }
  return getCustomDesignsForLayout().find((design) => design.id === state.layout2Design) || null;
}

function pickFirstLayout2Design() {
  const designs = getCustomDesignsForLayout();
  if (!designs.length) {
    return;
  }
  const next = designs[0];
  state.layout2Design = next.id;
  state.frame = "layout2-custom";
  getCustomDesignPreviewImage(next);
  invalidateFrameCache();
}

function formatDesignLabel(index) {
  return `Design ${String(index + 1).padStart(2, "0")}`;
}

function getSelectedDesignLabel() {
  const customDesigns = getCustomDesignsForLayout();
  if (customDesigns.length) {
    const index = customDesigns.findIndex((design) => design.id === state.layout2Design);
    return formatDesignLabel(Math.max(index, 0));
  }

  const index = defaultFrameOptions.findIndex((option) => option.id === state.frame);
  return formatDesignLabel(Math.max(index, 0));
}

function syncSelectedDesignLabel() {
  if (!previewCanvasWrap) {
    return;
  }

  previewCanvasWrap.dataset.selectedDesignLabel = getSelectedDesignLabel();
  previewCanvasWrap.dataset.layout = state.layout || "";
  previewCanvasWrap.dataset.layout2Design = state.layout2Design || "";
  if (previewScaleWrap) {
    previewScaleWrap.dataset.layout = state.layout || "";
    previewScaleWrap.dataset.layout2Design = state.layout2Design || "";
  }
}

function shouldUseTransparentDetectedSlots(design, layout = state.layout) {
  return Boolean(design?.detectTransparentSlots) && (layout === "polaroid" || layout === "two" || layout === "fourgrid");
}

function rectIntersectionArea(first, second) {
  const left = Math.max(first.x, second.x);
  const top = Math.max(first.y, second.y);
  const right = Math.min(first.x + first.width, second.x + second.width);
  const bottom = Math.min(first.y + first.height, second.y + second.height);
  return Math.max(0, right - left) * Math.max(0, bottom - top);
}

function detectTransparentSlotBounds(design, image) {
  if (!shouldUseTransparentDetectedSlots(design) || !design || !image?.complete || !image.naturalWidth) {
    return null;
  }

  const key = [
    design.id,
    image.currentSrc || image.src,
    image.naturalWidth,
    image.naturalHeight,
    "alpha-components-v1",
  ].join("|");

  if (transparentSlotBoundsByDesign.has(key)) {
    return transparentSlotBoundsByDesign.get(key);
  }

  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0);

  let data;
  try {
    data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  } catch (error) {
    transparentSlotBoundsByDesign.set(key, null);
    return null;
  }

  const { width, height } = canvas;
  const visited = new Uint8Array(width * height);
  const components = [];
  const stack = [];
  const minPixels = Math.max(900, width * height * 0.002);
  const alphaThreshold = 16;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const startIndex = y * width + x;
      if (visited[startIndex] || data[(startIndex * 4) + 3] >= alphaThreshold) {
        continue;
      }

      visited[startIndex] = 1;
      stack.length = 0;
      stack.push(startIndex);
      let count = 0;
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;

      while (stack.length) {
        const index = stack.pop();
        const currentX = index % width;
        const currentY = Math.floor(index / width);
        count += 1;
        minX = Math.min(minX, currentX);
        maxX = Math.max(maxX, currentX);
        minY = Math.min(minY, currentY);
        maxY = Math.max(maxY, currentY);

        const neighbors = [
          index - 1,
          index + 1,
          index - width,
          index + width,
        ];

        for (let neighborIndex = 0; neighborIndex < neighbors.length; neighborIndex += 1) {
          const next = neighbors[neighborIndex];
          if (next < 0 || next >= visited.length || visited[next]) {
            continue;
          }
          if ((neighborIndex === 0 && currentX === 0) || (neighborIndex === 1 && currentX === width - 1)) {
            continue;
          }
          if (data[(next * 4) + 3] >= alphaThreshold) {
            continue;
          }
          visited[next] = 1;
          stack.push(next);
        }
      }

      const box = {
        x: minX,
        y: minY,
        width: maxX - minX + 1,
        height: maxY - minY + 1,
      };
      const boxArea = box.width * box.height;
      const fillRatio = count / Math.max(1, boxArea);
      if (count >= minPixels && fillRatio >= 0.32) {
        components.push({ ...box, count, fillRatio });
      }
    }
  }

  const matched = [];
  const usedComponents = new Set();
  design.slots.forEach((slot) => {
    let best = null;
    let bestScore = -Infinity;
    components.forEach((component, index) => {
      if (usedComponents.has(index)) {
        return;
      }
      const overlap = rectIntersectionArea(slot, component);
      if (!overlap) {
        return;
      }

      const slotArea = slot.width * slot.height;
      const componentArea = component.width * component.height;
      const slotCenterX = slot.x + (slot.width / 2);
      const slotCenterY = slot.y + (slot.height / 2);
      const componentCenterX = component.x + (component.width / 2);
      const componentCenterY = component.y + (component.height / 2);
      const distance = Math.hypot(slotCenterX - componentCenterX, slotCenterY - componentCenterY);
      const normalizedDistance = distance / Math.max(design.width, design.height);
      const score = (overlap / slotArea) + (overlap / componentArea) - (normalizedDistance * 0.18);
      if (score > bestScore) {
        bestScore = score;
        best = { index, component };
      }
    });

    if (best) {
      usedComponents.add(best.index);
      matched.push({
        x: best.component.x,
        y: best.component.y,
        width: best.component.width,
        height: best.component.height,
      });
    } else {
      matched.push({ ...slot });
    }
  });

  transparentSlotBoundsByDesign.set(key, matched);
  return matched;
}

function scaleLayout2DesignGeometry(design) {
  const width = 900;
  const height = Math.round(design.height * (width / design.width));
  const scaleX = width / design.width;
  const scaleY = height / design.height;
  const image = getCustomDesignImage(design, false);
  const transparentSlots = detectTransparentSlotBounds(design, image);
  const sourceSlots = transparentSlots || design.slots;
  return {
    label: layoutSpecs[state.layout || "four"]?.label || "Custom layout",
    width,
    height,
    count: sourceSlots.length,
    slots: sourceSlots.map((slot) => ({
      x: slot.x * scaleX,
      y: slot.y * scaleY,
      width: slot.width * scaleX,
      height: slot.height * scaleY,
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

function refreshSelectedCustomDesign(designId, animatePreview = false) {
  const design = getCustomDesignsForLayout().find((option) => option.id === designId);
  const selectedImage = state.confirmed || state.shooting
    ? getCustomDesignImage(design)
    : getCustomDesignPreviewImage(design);
  let didAnimateWhenReady = false;
  invalidateFrameCache();
  customDesignEdgeDepthCanvases.clear();
  renderBooth(false);

  if (!selectedImage || (selectedImage.complete && selectedImage.naturalWidth)) {
    if (animatePreview) {
      replayPreviewDesignAnimation();
    }
    return;
  }

  const redrawWhenReady = () => {
    if (state.layout2Design !== designId) {
      return;
    }

    invalidateFrameCache();
    customDesignEdgeDepthCanvases.clear();
    renderBooth(false);
    if (animatePreview && !didAnimateWhenReady) {
      didAnimateWhenReady = true;
      replayPreviewDesignAnimation();
    }
  };

  selectedImage.addEventListener("load", redrawWhenReady, { once: true });
  selectedImage.decode?.().then(redrawWhenReady).catch(() => {});
}

function renderDesignOptions() {
  if (!frameButtons) {
    return;
  }

  const customOptions = getCustomDesignsForLayout();
  const mode = customOptions.length ? `custom-${state.layout}` : "default";
  frameButtons.dataset.mode = mode;
  if (state.frameOptionsMode === mode) {
    return;
  }

  designOptionRenderToken += 1;
  const renderToken = designOptionRenderToken;
  if (frameButtons.__loadMoreDesignOptions) {
    frameButtons.removeEventListener("scroll", frameButtons.__loadMoreDesignOptions);
    frameButtons.__loadMoreDesignOptions = null;
  }
  frameButtons.textContent = "";
  const options = customOptions.length ? customOptions : defaultFrameOptions;
  let nextOptionIndex = 0;
  const renderNextBatch = (startIndex) => {
    if (renderToken !== designOptionRenderToken) {
      return;
    }

    const endIndex = Math.min(options.length, startIndex + (startIndex ? designOptionBatchSize : designOptionInitialBatchSize));
    const fragment = document.createDocumentFragment();
    for (let index = startIndex; index < endIndex; index += 1) {
      const option = options[index];
      const button = document.createElement("button");
      button.type = "button";
      if (customOptions.length) {
        button.dataset.layout2Design = option.id;
        button.dataset.designPosition = String(index + 1);
      } else {
        button.dataset.frame = option.id;
      }
      button.setAttribute("aria-pressed", "false");

      const image = document.createElement("img");
      image.src = customOptions.length ? getDesignThumbnailSrc(option.frameSrc || option.src) : option.src;
      image.alt = option.alt || "Photo booth design";
      image.decoding = "async";
      image.loading = index < 2 ? "eager" : "lazy";
      image.fetchPriority = index === 0 ? "auto" : "low";
      button.appendChild(image);
      fragment.appendChild(button);
    }

    frameButtons.appendChild(fragment);
    nextOptionIndex = endIndex;
    activeButtons(frameButtons, customOptions.length ? "layout2Design" : "frame", customOptions.length ? state.layout2Design : state.frame);
  };

  renderNextBatch(0);
  if (nextOptionIndex < options.length) {
    frameButtons.__loadMoreDesignOptions = () => {
      if (renderToken !== designOptionRenderToken || nextOptionIndex >= options.length) {
        return;
      }

      const distanceFromBottom = frameButtons.scrollHeight - frameButtons.scrollTop - frameButtons.clientHeight;
      if (distanceFromBottom > 520) {
        return;
      }

      scheduleIdleTask(() => renderNextBatch(nextOptionIndex));
    };
    frameButtons.addEventListener("scroll", frameButtons.__loadMoreDesignOptions, { passive: true });
  }

  state.frameOptionsMode = mode;
}

function resetDesignScrollPosition() {
  if (!frameButtons) {
    return;
  }
  frameButtons.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  frameButtons.scrollTop = 0;
  frameButtons.scrollLeft = 0;
}

function scheduleDesignScrollReset() {
  resetDesignScrollPosition();
  window.requestAnimationFrame(() => {
    resetDesignScrollPosition();
    window.requestAnimationFrame(resetDesignScrollPosition);
  });
  window.setTimeout(resetDesignScrollPosition, 0);
  window.setTimeout(resetDesignScrollPosition, 120);
}

function syncControls() {
  const booth = document.getElementById("booth");
  booth.dataset.layout = state.layout || "";
  booth.dataset.frame = state.frame || "";
  booth.dataset.layout2Design = state.layout2Design || "";
  booth.classList.toggle("has-captured-photos", state.captures.some(Boolean));
  layoutGallery?.querySelectorAll("button[data-layout]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.layout === state.layout));
  });
  if (layoutContinueButton) {
    layoutContinueButton.disabled = !state.layout;
  }
  renderDesignOptions();
  if (getCustomDesignsForLayout().length) {
    activeButtons(frameButtons, "layout2Design", state.layout2Design);
  } else {
    activeButtons(frameButtons, "frame", state.frame);
  }
  syncSelectedDesignLabel();
  confirmDesignButton.disabled = state.confirmed;
  schedulePreviewPushpinPlacement();
  if (!isDesign18CapturedPreviewHoverEnabled()) {
    clearDesign18PreviewHover();
  }
}

function isDesign18CapturedPreviewHoverEnabled() {
  return (
    state.confirmed
    && state.layout === "polaroid"
    && state.layout2Design === "layout1-instagram-flower"
    && state.captures.some(Boolean)
  );
}

function clearDesign18PreviewHover() {
  state.design18PreviewHoverRect = null;
  document.getElementById("booth")?.classList.remove("design18-card-hovered");
}

function syncDesign18PreviewHover(event) {
  const booth = document.getElementById("booth");
  if (!booth || !previewScaleWrap || !isDesign18CapturedPreviewHoverEnabled()) {
    clearDesign18PreviewHover();
    return;
  }

  const activeRect = state.design18PreviewHoverRect;
  const pointerInsideActiveRect = activeRect
    && event.clientX >= activeRect.left
    && event.clientX <= activeRect.right
    && event.clientY >= activeRect.top
    && event.clientY <= activeRect.bottom;

  if (pointerInsideActiveRect) {
    booth.classList.add("design18-card-hovered");
    return;
  }

  if (activeRect) {
    clearDesign18PreviewHover();
    return;
  }

  const rect = previewScaleWrap.getBoundingClientRect();
  const pointerInsidePreview = (
    event.clientX >= rect.left
    && event.clientX <= rect.right
    && event.clientY >= rect.top
    && event.clientY <= rect.bottom
  );

  if (!pointerInsidePreview) {
    clearDesign18PreviewHover();
    return;
  }

  state.design18PreviewHoverRect = {
    left: rect.left,
    right: rect.right,
    top: rect.top,
    bottom: rect.bottom,
  };
  booth.classList.add("design18-card-hovered");
}

function schedulePreviewPushpinPlacement() {
  if (state.previewPinFrame) {
    return;
  }

  state.previewPinFrame = window.requestAnimationFrame(() => {
    state.previewPinFrame = null;
    syncPreviewPushpinPlacement();
  });
}

function syncPreviewPushpinPlacement() {
  if (!previewPushpin || !previewCanvas) {
    return;
  }

  const wrap = previewPushpin.parentElement;
  if (!wrap) {
    return;
  }

  const scaledPreview = previewCanvas.closest(".preview-scale-wrap") || previewCanvas;
  const canvasRect = previewCanvas.getBoundingClientRect();
  const previewRect = scaledPreview.getBoundingClientRect();
  const wrapRect = wrap.getBoundingClientRect();
  const usesScaledPreviewPin = state.layout === "polaroid" && state.layout2Design === "layout1-instagram-flower" && !state.confirmed;
  const anchorRect = usesScaledPreviewPin ? previewRect : canvasRect;
  if (!anchorRect.width || !anchorRect.height) {
    return;
  }

  const pinBaseWidth = usesScaledPreviewPin ? previewCanvas.offsetWidth || canvasRect.width : canvasRect.width;
  const pinSize = Math.min(Math.max(pinBaseWidth * 0.22, 48), 96);
  const pinShiftX = usesScaledPreviewPin ? " + 2.6cm" : "";
  const pinShiftY = usesScaledPreviewPin ? " + 5.2cm" : "";
  previewPushpin.style.setProperty("--preview-pin-size", `${pinSize}px`);
  previewPushpin.style.setProperty("--preview-pin-left", `calc(${anchorRect.left - wrapRect.left - pinSize * 0.16}px${pinShiftX})`);
  previewPushpin.style.setProperty("--preview-pin-top", `calc(${anchorRect.top - wrapRect.top - pinSize * 0.18}px${pinShiftY})`);
}

function drawPlaceholder(ctx, slot, index) {
  const template = getCurrentTemplate();
  ctx.fillStyle = template.slotFill || "#f7f7f4";
  ctx.fillRect(slot.x, slot.y, slot.width, slot.height);

  if (state.frame === "plain") {
    ctx.save();
    ctx.fillStyle = "rgba(110, 104, 99, 0.13)";
    ctx.font = "800 34px \"Bell MT\", \"Times New Roman\", serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(index + 1), slot.x + slot.width / 2, slot.y + slot.height / 2);
    ctx.restore();
  }
}

function getCurrentFilter() {
  return getActiveFilter(state.filter);
}

function applyFilterOverlay(ctx, slot, filter) {
  if (!filter || filter.id === "original") {
    return;
  }

  ctx.save();
  ctx.beginPath();
  ctx.rect(slot.x, slot.y, slot.width, slot.height);
  ctx.clip();

  if (filter.tint) {
    const [color, alpha, mode] = filter.tint;
    ctx.globalCompositeOperation = mode;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(slot.x, slot.y, slot.width, slot.height);
  }

  if (filter.grain) {
    ctx.globalCompositeOperation = "overlay";
    ctx.globalAlpha = filter.grain;
    ctx.fillStyle = "#5f463b";
    const step = Math.max(18, Math.round(Math.min(slot.width, slot.height) / 18));
    for (let y = slot.y + 6; y < slot.y + slot.height; y += step) {
      for (let x = slot.x + 5; x < slot.x + slot.width; x += step) {
        if (((Math.round(x + y) / step) | 0) % 3 === 0) {
          ctx.fillRect(x, y, 1.2, 1.2);
        }
      }
    }
  }

  ctx.restore();
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
  const filter = getCurrentFilter();
  const shouldApplyFilter = !source.__photoBoothFiltered && filter.id !== "original";
  if (shouldApplyFilter) {
    ctx.filter = filter.canvasFilter;
  }
  if (mirror) {
    ctx.save();
    ctx.translate(cover.x + cover.width, cover.y);
    ctx.scale(-1, 1);
    ctx.drawImage(source, 0, 0, cover.width, cover.height);
    ctx.restore();
  } else {
    ctx.drawImage(source, cover.x, cover.y, cover.width, cover.height);
  }
  ctx.filter = "none";
  if (shouldApplyFilter) {
    applyFilterOverlay(ctx, slot, filter);
  }
  ctx.restore();
}

function drawSourceIntoRoundedSlot(ctx, slot, source, index, radius = 0, mirror = false) {
  const sourceWidth = source?.videoWidth || source?.width || 0;
  const sourceHeight = source?.videoHeight || source?.height || 0;

  if (!source || !sourceWidth || !sourceHeight) {
    drawPlaceholder(ctx, slot, index);
    return;
  }

  ctx.save();
  if (radius > 0) {
    roundRect(ctx, slot.x, slot.y, slot.width, slot.height, radius);
  } else {
    ctx.beginPath();
    ctx.rect(slot.x, slot.y, slot.width, slot.height);
  }
  ctx.clip();
  ctx.fillStyle = "#eee4dc";
  ctx.fillRect(slot.x, slot.y, slot.width, slot.height);
  const cover = fitCover(sourceWidth, sourceHeight, slot);
  const filter = getCurrentFilter();
  const shouldApplyFilter = !source.__photoBoothFiltered && filter.id !== "original";
  if (shouldApplyFilter) {
    ctx.filter = filter.canvasFilter;
  }
  if (mirror) {
    ctx.save();
    ctx.translate(cover.x + cover.width, cover.y);
    ctx.scale(-1, 1);
    ctx.drawImage(source, 0, 0, cover.width, cover.height);
    ctx.restore();
  } else {
    ctx.drawImage(source, cover.x, cover.y, cover.width, cover.height);
  }
  ctx.filter = "none";
  if (shouldApplyFilter) {
    applyFilterOverlay(ctx, slot, filter);
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
  ctx.font = "italic 700 38px \"Bell MT\", \"Times New Roman\", serif";
  ctx.textAlign = "left";
  ctx.fillText("Photo Booth", 188, 62);
  ctx.globalAlpha = 0.72;
  ctx.font = "italic 700 24px \"Bell MT\", \"Times New Roman\", serif";
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
  ctx.font = "800 30px \"Bell MT\", \"Times New Roman\", serif";
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

function drawSelectedDesignLipDepth(ctx, geometry) {
  if (!state.layout || state.frame === "layout2-custom") {
    return;
  }

  const lip = Math.max(8, geometry.width * 0.0105);
  const strongLine = Math.max(3, geometry.width * 0.0042);
  const fineLine = Math.max(1.25, geometry.width * 0.002);

  ctx.save();
  ctx.lineJoin = "miter";
  ctx.lineCap = "square";

  geometry.slots.forEach((slot) => {
    const x = slot.x;
    const y = slot.y;
    const width = slot.width;
    const height = slot.height;

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();

    const topShadow = ctx.createLinearGradient(x, y, x, y + lip * 5.8);
    topShadow.addColorStop(0, "rgba(35, 24, 21, 0.38)");
    topShadow.addColorStop(0.36, "rgba(77, 54, 47, 0.2)");
    topShadow.addColorStop(1, "rgba(77, 54, 47, 0)");
    ctx.fillStyle = topShadow;
    ctx.fillRect(x, y, width, lip * 5.8);

    const leftShadow = ctx.createLinearGradient(x, y, x + lip * 5.1, y);
    leftShadow.addColorStop(0, "rgba(35, 24, 21, 0.28)");
    leftShadow.addColorStop(0.42, "rgba(77, 54, 47, 0.13)");
    leftShadow.addColorStop(1, "rgba(77, 54, 47, 0)");
    ctx.fillStyle = leftShadow;
    ctx.fillRect(x, y, lip * 5.1, height);

    const bottomLift = ctx.createLinearGradient(x, y + height - lip * 3.8, x, y + height);
    bottomLift.addColorStop(0, "rgba(255, 255, 255, 0)");
    bottomLift.addColorStop(1, "rgba(255, 255, 255, 0.48)");
    ctx.fillStyle = bottomLift;
    ctx.fillRect(x, y + height - lip * 3.8, width, lip * 3.8);

    const rightLift = ctx.createLinearGradient(x + width - lip * 3.8, y, x + width, y);
    rightLift.addColorStop(0, "rgba(255, 255, 255, 0)");
    rightLift.addColorStop(1, "rgba(255, 255, 255, 0.38)");
    ctx.fillStyle = rightLift;
    ctx.fillRect(x + width - lip * 3.8, y, lip * 3.8, height);
    ctx.restore();

    ctx.strokeStyle = "rgba(32, 22, 20, 0.44)";
    ctx.lineWidth = strongLine;
    ctx.strokeRect(x + strongLine / 2, y + strongLine / 2, width - strongLine, height - strongLine);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.66)";
    ctx.lineWidth = fineLine;
    ctx.beginPath();
    ctx.moveTo(x + fineLine, y + fineLine);
    ctx.lineTo(x + width - fineLine, y + fineLine);
    ctx.moveTo(x + fineLine, y + fineLine);
    ctx.lineTo(x + fineLine, y + height - fineLine);
    ctx.stroke();

    ctx.strokeStyle = "rgba(39, 27, 24, 0.42)";
    ctx.lineWidth = fineLine * 1.6;
    ctx.beginPath();
    ctx.moveTo(x + width - fineLine, y + fineLine);
    ctx.lineTo(x + width - fineLine, y + height - fineLine);
    ctx.moveTo(x + fineLine, y + height - fineLine);
    ctx.lineTo(x + width - fineLine, y + height - fineLine);
    ctx.stroke();
  });

  ctx.restore();
}

function getCustomDesignEdgeDepthCanvas(design, image, geometry) {
  const key = [
    design.id,
    image.currentSrc || image.src,
    image.naturalWidth,
    image.naturalHeight,
    geometry.width,
    geometry.height,
    "alpha-edge-v1",
  ].join("|");

  if (customDesignEdgeDepthCanvases.has(key)) {
    return customDesignEdgeDepthCanvases.get(key);
  }

  const canvas = document.createElement("canvas");
  canvas.width = geometry.width;
  canvas.height = geometry.height;
  const ctx = canvas.getContext("2d");
  const scale = geometry.width / 900;
  const layers = [
    {
      color: "rgba(34, 23, 20, 0.26)",
      blur: 17 * scale,
      x: 4.6 * scale,
      y: 7.2 * scale,
    },
    {
      color: "rgba(34, 23, 20, 0.18)",
      blur: 7 * scale,
      x: -3 * scale,
      y: -3.2 * scale,
    },
    {
      color: "rgba(34, 23, 20, 0.2)",
      blur: 2.2 * scale,
      x: 1.8 * scale,
      y: 2.2 * scale,
    },
    {
      color: "rgba(255, 255, 255, 0.34)",
      blur: 1.4 * scale,
      x: -1.2 * scale,
      y: -1.2 * scale,
    },
  ];

  layers.forEach((layer) => {
    ctx.save();
    ctx.shadowColor = layer.color;
    ctx.shadowBlur = Math.max(0.8, layer.blur);
    ctx.shadowOffsetX = layer.x;
    ctx.shadowOffsetY = layer.y;
    ctx.drawImage(image, 0, 0, geometry.width, geometry.height);
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.drawImage(image, 0, 0, geometry.width, geometry.height);
    ctx.restore();
  });

  customDesignEdgeDepthCanvases.set(key, canvas);
  return canvas;
}

function drawCustomDesignEdgeDepth(ctx, design, image, geometry) {
  if (!design || !image?.complete || !image.naturalWidth) {
    return;
  }

  ctx.drawImage(getCustomDesignEdgeDepthCanvas(design, image, geometry), 0, 0);
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
  const layout2Image = layout2Design ? getRenderDesignImage(layout2Design) : null;
  const designRenderQuality = state.confirmed || state.shooting ? "full" : "preview";
  const layout2State = layout2Image?.complete && layout2Image.naturalWidth ? `${layout2Design.id}-${designRenderQuality}-ready` : `${layout2Design?.id || "none"}-${designRenderQuality}-loading`;
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
  document.getElementById("booth").classList.toggle("has-captured-photos", state.captures.some(Boolean));

  if (scheduleNext && state.stream && state.live) {
    const now = performance.now();
    const frameInterval = state.confirmed ? shootPreviewFrameInterval : designPreviewFrameInterval;
    if (now - state.lastRenderAt < frameInterval) {
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
  let previewSizeChanged = false;
  if (previewCanvas.width !== geometry.width || previewCanvas.height !== geometry.height) {
    previewCanvas.width = geometry.width;
    previewCanvas.height = geometry.height;
    previewSizeChanged = true;
  }

  const baseFrame = getCachedFrameBase(geometry);
  const layout2Design = getActiveLayout2Design();
  const layout2Image = layout2Design ? getRenderDesignImage(layout2Design) : null;
  const hasCustomLayout2Frame = Boolean(layout2Image?.complete && layout2Image.naturalWidth);
  previewCtx.clearRect(0, 0, geometry.width, geometry.height);
  if (!hasCustomLayout2Frame) {
    previewCtx.drawImage(baseFrame, 0, 0);
  }
  const showLiveInLayout = !state.confirmed;
  geometry.slots.forEach((slot, index) => {
    if (state.captures[index]) {
      drawSourceIntoSlot(previewCtx, state.captureSlots[index] || slot, state.captures[index], index);
    } else if (
      state.stream &&
      state.live &&
      showLiveInLayout
    ) {
      drawLiveCameraIntoSlot(previewCtx, slot, index);
    } else if (state.frozenFrame) {
      drawSourceIntoSlot(previewCtx, slot, state.frozenFrame, index);
    } else if (!hasCustomLayout2Frame) {
      drawPlaceholder(previewCtx, slot, index);
    }
  });
  if (hasCustomLayout2Frame) {
    drawCustomDesignEdgeDepth(previewCtx, layout2Design, layout2Image, geometry);
    previewCtx.drawImage(layout2Image, 0, 0, geometry.width, geometry.height);
  }
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
  drawSelectedDesignLipDepth(previewCtx, geometry);

  if (!state.layout) {
    previewCtx.save();
    previewCtx.fillStyle = "rgba(255, 250, 243, 0.72)";
    roundRect(previewCtx, 170, geometry.height / 2 - 58, geometry.width - 340, 116, 58);
    previewCtx.fill();
    previewCtx.fillStyle = getCurrentTemplate().text;
    previewCtx.font = "900 30px \"Bell MT\", \"Times New Roman\", serif";
    previewCtx.textAlign = "center";
    previewCtx.textBaseline = "middle";
    previewCtx.fillText("Choose a booth style", geometry.width / 2, geometry.height / 2);
    previewCtx.restore();
  }

  if (previewSizeChanged) {
    schedulePreviewPushpinPlacement();
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
    scheduleCountdownPlacement();
  }
  if (state.countdown) {
    scheduleCountdownPlacement();
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
  shootLiveCtx.lineWidth = 4;
  shootLiveCtx.strokeStyle = "rgba(18, 18, 18, 0.84)";
  roundRect(shootLiveCtx, slot.x, slot.y, slot.width, slot.height, 54);
  shootLiveCtx.stroke();
  shootLiveCtx.restore();
}

function restartRenderLoop() {
  if (state.animationFrame) {
    cancelAnimationFrame(state.animationFrame);
  }
  state.lastRenderAt = 0;
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
  if (appShell.dataset.screen !== "booth") {
    setScreen("booth");
  } else {
    pinPageToTop();
  }
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
    state.demoMode = false;
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

function resumeShootLivePreview() {
  state.frozenFrame = null;
  state.suppressShootLive = false;
  if (state.stream && !state.demoMode) {
    state.live = true;
    cameraVideo.play().catch(() => {});
  }
  drawShootLivePreview();
}

function clearCountdownTimer() {
  if (state.countdownTimer) {
    window.clearInterval(state.countdownTimer);
    state.countdownTimer = null;
  }
}

function setCountdownDisplay(value) {
  state.countdown = value;
  scheduleCountdownPlacement();
  countdownNumber.textContent = value ? String(value) : "";
  countdownOverlay.classList.toggle("is-visible", Boolean(value));
}

function scheduleCountdownPlacement() {
  if (state.countdownPlacementFrame) {
    return;
  }

  state.countdownPlacementFrame = window.requestAnimationFrame(() => {
    state.countdownPlacementFrame = null;
    syncCountdownPlacement();
  });
}

function syncCountdownPlacement() {
  const wrap = countdownOverlay?.parentElement;
  if (!wrap || !shootLiveCanvas) {
    return;
  }

  const slotRect = shootLiveSlotViewportRect();
  const wrapRect = wrap.getBoundingClientRect();
  if (!slotRect.width || !slotRect.height || !wrapRect.width || !wrapRect.height) {
    return;
  }

  countdownOverlay.style.left = `${slotRect.x - wrapRect.left}px`;
  countdownOverlay.style.top = `${slotRect.y - wrapRect.top}px`;
  countdownOverlay.style.width = `${slotRect.width}px`;
  countdownOverlay.style.height = `${slotRect.height}px`;
  countdownOverlay.style.right = "auto";
  countdownOverlay.style.bottom = "auto";
  countdownOverlay.style.transform = "none";
}

function setShootingButtons(mode) {
  if (mode === "finished") {
    startShootButton.hidden = true;
    retakeButton.hidden = false;
    doneButton.hidden = false;
    startShootButton.disabled = false;
    startShootButton.classList.remove("is-shooting");
    startShootButton.setAttribute("aria-label", "Start Shooting");
    cameraShootLabel.textContent = "Click Me";
    retakeButton.disabled = false;
    doneButton.disabled = false;
    return;
  }

  startShootButton.hidden = false;
  retakeButton.hidden = true;
  doneButton.hidden = true;
  startShootButton.disabled = mode === "shooting";
  startShootButton.classList.toggle("is-shooting", mode === "shooting");
  startShootButton.setAttribute("aria-label", mode === "shooting" ? "Shooting" : "Start Shooting");
  cameraShootLabel.textContent = mode === "shooting" ? "Shooting..." : "Click Me";
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
    state.demoMode = false;
    state.permissionGranted = false;
    state.live = false;
    state.shooting = false;
    setCameraReady(false);
    setShootingButtons("ready");
    setPermissionState(
      "Camera access is needed",
      cameraErrorMessage(error),
      true,
      "Try Again",
    );
    shootStatus.textContent = "Camera did not start. Please allow camera access and try again.";
    renderBooth(false);
    return false;
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
  const filter = getCurrentFilter();
  if (filter.id !== "original") {
    ctx.filter = filter.canvasFilter;
  }
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.filter = "none";
  if (filter.id !== "original") {
    applyFilterOverlay(ctx, { x: 0, y: 0, width: canvas.width, height: canvas.height }, filter);
  }
  canvas.__photoBoothFiltered = true;
  return canvas;
}

function finishShooting() {
  clearCountdownTimer();
  setCountdownDisplay(null);
  state.shooting = false;
  resumeShootLivePreview();
  startShootButton.hidden = true;
  shootStatus.textContent = "Shooting finished";
  setShootingButtons("finished");
}

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function playCaptureFlash() {
  return new Promise((resolve) => {
    const rect = shootLiveInnerViewportRect();
    if (!rect.width || !rect.height) {
      resolve();
      return;
    }

    const flash = document.createElement("div");
    flash.className = "capture-flash-overlay";
    flash.style.left = `${rect.x}px`;
    flash.style.top = `${rect.y}px`;
    flash.style.width = `${rect.width}px`;
    flash.style.height = `${rect.height}px`;
    flash.style.borderRadius = `${rect.radius}px`;
    document.body.appendChild(flash);

    let finished = false;
    const cleanup = () => {
      if (finished) {
        return;
      }
      finished = true;
      flash.remove();
      resolve();
    };

    flash.addEventListener("animationend", cleanup, { once: true });
    window.setTimeout(cleanup, 430);
  });
}

function resolveObjectPositionOffset(positionValue, containerSize, objectSize) {
  const value = String(positionValue || "50%").trim().toLowerCase();
  const freeSpace = containerSize - objectSize;
  if (value === "left" || value === "top") {
    return 0;
  }
  if (value === "right" || value === "bottom") {
    return freeSpace;
  }
  if (value === "center") {
    return freeSpace / 2;
  }
  if (value.endsWith("%")) {
    const percentage = Number.parseFloat(value);
    return Number.isFinite(percentage) ? freeSpace * (percentage / 100) : freeSpace / 2;
  }
  if (value.endsWith("px")) {
    const pixels = Number.parseFloat(value);
    return Number.isFinite(pixels) ? pixels : freeSpace / 2;
  }
  return freeSpace / 2;
}

function canvasBitmapViewportRect(canvas) {
  const rect = canvas.getBoundingClientRect();
  const bitmapWidth = canvas.width || canvas.videoWidth || 0;
  const bitmapHeight = canvas.height || canvas.videoHeight || 0;
  if (!rect.width || !rect.height || !bitmapWidth || !bitmapHeight) {
    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };
  }

  const style = getComputedStyle(canvas);
  const objectFit = style.objectFit || "fill";
  let visibleWidth = rect.width;
  let visibleHeight = rect.height;

  if (objectFit === "contain" || objectFit === "scale-down") {
    const scale = Math.min(rect.width / bitmapWidth, rect.height / bitmapHeight);
    visibleWidth = bitmapWidth * scale;
    visibleHeight = bitmapHeight * scale;
  } else if (objectFit === "cover") {
    const scale = Math.max(rect.width / bitmapWidth, rect.height / bitmapHeight);
    visibleWidth = bitmapWidth * scale;
    visibleHeight = bitmapHeight * scale;
  }

  const [positionX = "50%", positionY = "50%"] = (style.objectPosition || "50% 50%").split(/\s+/);
  return {
    x: rect.left + resolveObjectPositionOffset(positionX, rect.width, visibleWidth),
    y: rect.top + resolveObjectPositionOffset(positionY, rect.height, visibleHeight),
    width: visibleWidth,
    height: visibleHeight,
  };
}

function canvasSlotViewportRect(canvas, slot) {
  const rect = canvasBitmapViewportRect(canvas);
  return {
    x: rect.x + (slot.x / canvas.width) * rect.width,
    y: rect.y + (slot.y / canvas.height) * rect.height,
    width: (slot.width / canvas.width) * rect.width,
    height: (slot.height / canvas.height) * rect.height,
  };
}

function slotViewportRect(slot) {
  return canvasSlotViewportRect(previewCanvas, slot);
}

function setFlyingCaptureWrapperFrame(frame, rect, radius = 0) {
  const px = (value) => `${Number(value).toFixed(4)}px`;
  frame.style.setProperty("left", px(rect.x));
  frame.style.setProperty("top", px(rect.y));
  frame.style.setProperty("width", px(rect.width));
  frame.style.setProperty("height", px(rect.height));
  frame.style.setProperty("border-radius", px(Math.max(0, radius)));
}

function removeSettledFlyingCapture(frame, rect) {
  return new Promise((resolve) => {
    setFlyingCaptureWrapperFrame(frame, rect, 0);
    requestAnimationFrame(() => {
      setFlyingCaptureWrapperFrame(frame, rect, 0);
      requestAnimationFrame(() => {
        setFlyingCaptureWrapperFrame(frame, rect, 0);
        frame.remove();
        resolve();
      });
    });
  });
}

function createFlyingCaptureElement(capture, from) {
  const flying = document.createElement("div");
  const flyingImage = document.createElement("img");
  flyingImage.src = capture.toDataURL("image/png");
  flyingImage.alt = "";
  flyingImage.decoding = "sync";
  flying.className = "flying-capture";
  flyingImage.className = "flying-capture-image";
  flying.appendChild(flyingImage);
  setFlyingCaptureWrapperFrame(flying, from, from.radius);
  flying.style.visibility = "hidden";
  document.body.appendChild(flying);
  return { flying, flyingImage };
}

function createFlyingDesignOverlay() {
  const design = getActiveLayout2Design();
  const image = design ? getCustomDesignImage(design, false) : null;
  if (!image?.complete || !image.naturalWidth) {
    return null;
  }

  const rect = canvasBitmapViewportRect(previewCanvas);
  if (!rect.width || !rect.height) {
    return null;
  }

  const overlay = document.createElement("img");
  overlay.className = "flying-design-overlay";
  overlay.src = image.currentSrc || image.src;
  overlay.alt = "";
  overlay.decoding = "sync";
  overlay.style.left = `${rect.x.toFixed(4)}px`;
  overlay.style.top = `${rect.y.toFixed(4)}px`;
  overlay.style.width = `${rect.width.toFixed(4)}px`;
  overlay.style.height = `${rect.height.toFixed(4)}px`;
  document.body.appendChild(overlay);
  return overlay;
}

function getCaptureFlightRects(slot) {
  return {
    startRect: shootLiveInnerViewportRect(),
    targetRect: slotViewportRect(slot),
  };
}

function animateCaptureToSlot(capture, slot, onSettle) {
  return new Promise(async (resolve) => {
    const { startRect: from, targetRect: target } = getCaptureFlightRects(slot);
    const { flying, flyingImage } = createFlyingCaptureElement(capture, from);
    await flyingImage.decode?.().catch(() => {});

    const duration = 540;
    const startedAt = performance.now();
    const startRadius = from.radius || 0;
    const delta = {
      x: target.x - from.x,
      y: target.y - from.y,
      width: target.width - from.width,
      height: target.height - from.height,
      radius: -startRadius,
    };
    let settled = false;
    let landingOverlay = null;

    const showLandingOverlay = () => {
      if (landingOverlay) {
        return;
      }
      landingOverlay = createFlyingDesignOverlay();
    };

    const settle = () => {
      if (settled) {
        return;
      }
      settled = true;
      onSettle?.();
    };

    const step = (now) => {
      const elapsed = Math.min(duration, now - startedAt);
      const progress = elapsed / duration;
      const rect = {
        x: from.x + (delta.x * progress),
        y: from.y + (delta.y * progress),
        width: from.width + (delta.width * progress),
        height: from.height + (delta.height * progress),
      };

      setFlyingCaptureWrapperFrame(flying, rect, startRadius + (delta.radius * progress));
      if (elapsed >= duration - 34) {
        showLandingOverlay();
      }

      if (elapsed < duration) {
        requestAnimationFrame(step);
        return;
      }

      setFlyingCaptureWrapperFrame(flying, target, 0);
      showLandingOverlay();
      settle();
      removeSettledFlyingCapture(flying, target).then(() => {
        landingOverlay?.remove();
        resolve();
      });
    };

    setFlyingCaptureWrapperFrame(flying, from, startRadius);
    flying.style.visibility = "visible";
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
  flying.className = "flying-live-transition";
  flying.__transitionSource = state.frozenFrame || null;
  flying.__fallbackCapture = createFallbackCapture(0);
  flying.__transitionFrom = {
    x: sourceRect.x,
    y: sourceRect.y,
    width: sourceRect.width,
    height: sourceRect.height,
    radius: 0,
    innerRadius: 0,
    pad: 0,
    lineWidth: 0,
  };
  drawLiveTransitionFrame(flying, flying.__transitionFrom, 0);
  document.body.appendChild(flying);
  return flying;
}

function shootLiveSlotViewportRect() {
  const rect = canvasBitmapViewportRect(shootLiveCanvas);
  const slot = { x: 28, y: 28, width: 1064, height: 784 };
  const strokePad = 4;
  const scaleX = rect.width / shootLiveCanvas.width;
  const scaleY = rect.height / shootLiveCanvas.height;
  const scale = Math.min(scaleX, scaleY);
  return {
    x: rect.x + ((slot.x - strokePad) / shootLiveCanvas.width) * rect.width,
    y: rect.y + ((slot.y - strokePad) / shootLiveCanvas.height) * rect.height,
    width: ((slot.width + strokePad * 2) / shootLiveCanvas.width) * rect.width,
    height: ((slot.height + strokePad * 2) / shootLiveCanvas.height) * rect.height,
    radius: (54 + strokePad) * scale,
    innerRadius: 54 * scale,
    pad: strokePad * scale,
    lineWidth: 4 * scale,
  };
}

function shootLiveInnerViewportRect() {
  const rect = canvasBitmapViewportRect(shootLiveCanvas);
  const slot = { x: 28, y: 28, width: 1064, height: 784 };
  const inset = 0;
  const scaleX = rect.width / shootLiveCanvas.width;
  const scaleY = rect.height / shootLiveCanvas.height;
  return {
    x: rect.x + ((slot.x + inset) / shootLiveCanvas.width) * rect.width,
    y: rect.y + ((slot.y + inset) / shootLiveCanvas.height) * rect.height,
    width: ((slot.width - inset * 2) / shootLiveCanvas.width) * rect.width,
    height: ((slot.height - inset * 2) / shootLiveCanvas.height) * rect.height,
    radius: Math.max(0, (54 - inset) * Math.min(scaleX, scaleY)),
  };
}

function lerp(start, end, progress) {
  return start + ((end - start) * progress);
}

function interpolateLiveTransitionRect(from, target, progress) {
  return {
    x: lerp(from.x, target.x, progress),
    y: lerp(from.y, target.y, progress),
    width: lerp(from.width, target.width, progress),
    height: lerp(from.height, target.height, progress),
    radius: lerp(from.radius || 0, target.radius || 0, progress),
    innerRadius: lerp(from.innerRadius || 0, target.innerRadius || 0, progress),
    pad: lerp(from.pad || 0, target.pad || 0, progress),
    lineWidth: lerp(from.lineWidth || 0, target.lineWidth || 0, progress),
  };
}

function liveTransitionSource(flying) {
  if (cameraVideo.videoWidth && cameraVideo.videoHeight) {
    return {
      source: cameraVideo,
      mirror: true,
    };
  }

  if (flying?.__transitionSource) {
    return {
      source: flying.__transitionSource,
      mirror: false,
    };
  }

  return {
    source: flying?.__fallbackCapture || createFallbackCapture(0),
    mirror: false,
  };
}

function drawLiveTransitionFrame(flying, rect, progress = 1) {
  const pixelRatio = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2);
  const cssWidth = Math.max(1, rect.width);
  const cssHeight = Math.max(1, rect.height);
  const bitmapWidth = Math.max(1, Math.round(cssWidth * pixelRatio));
  const bitmapHeight = Math.max(1, Math.round(cssHeight * pixelRatio));

  flying.style.left = `${rect.x.toFixed(4)}px`;
  flying.style.top = `${rect.y.toFixed(4)}px`;
  flying.style.width = `${cssWidth.toFixed(4)}px`;
  flying.style.height = `${cssHeight.toFixed(4)}px`;
  flying.style.borderRadius = `${Math.max(0, rect.radius || 0).toFixed(4)}px`;

  if (flying.width !== bitmapWidth || flying.height !== bitmapHeight) {
    flying.width = bitmapWidth;
    flying.height = bitmapHeight;
  }

  const ctx = flying.getContext("2d");
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const pad = Math.max(0, rect.pad || 0);
  const slot = {
    x: pad,
    y: pad,
    width: Math.max(1, cssWidth - pad * 2),
    height: Math.max(1, cssHeight - pad * 2),
  };
  const { source, mirror } = liveTransitionSource(flying);
  drawSourceIntoRoundedSlot(ctx, slot, source, 0, Math.max(0, rect.innerRadius || 0), mirror);

  if ((rect.lineWidth || 0) > 0.01) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, Math.max(0, progress * 1.35));
    ctx.lineWidth = rect.lineWidth;
    ctx.strokeStyle = "rgba(18, 18, 18, 0.84)";
    roundRect(ctx, slot.x, slot.y, slot.width, slot.height, Math.max(0, rect.innerRadius || 0));
    ctx.stroke();
    ctx.restore();
  }
}

function animateLiveTransitionToShootFrame(flying, target) {
  return new Promise((resolve) => {
    if (!flying || !target) {
      resolve();
      return;
    }

    const fallbackRect = flying.getBoundingClientRect();
    const from = flying.__transitionFrom || {
      x: fallbackRect.left,
      y: fallbackRect.top,
      width: fallbackRect.width,
      height: fallbackRect.height,
      radius: 0,
      innerRadius: 0,
      pad: 0,
      lineWidth: 0,
    };
    const duration = 320;
    const startedAt = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      drawLiveTransitionFrame(flying, interpolateLiveTransitionRect(from, target, progress), progress);

      if (progress < 1) {
        requestAnimationFrame(step);
        return;
      }

      drawLiveTransitionFrame(flying, target, 1);
      resolve();
    };

    requestAnimationFrame(step);
  });
}

function settleLiveTransition(flying, target) {
  requestAnimationFrame(() => {
    if (flying && target) {
      drawLiveTransitionFrame(flying, target, 1);
    }
    state.suppressShootLive = false;
    state.transitioningToShoot = false;
    drawShootLivePreview();
    scheduleCountdownPlacement();
    document.getElementById("booth").classList.remove("mode-transition");
    document.getElementById("booth").classList.remove("live-transitioning");
    flying?.remove();
    if (state.animationFrame) {
      cancelAnimationFrame(state.animationFrame);
    }
    state.lastRenderAt = 0;
    state.animationFrame = requestAnimationFrame(renderBooth);
  });
}

async function runShotCountdown() {
  const geometry = getLayoutGeometry();
  if (state.currentShot >= geometry.count) {
    finishShooting();
    return;
  }

  setCountdownDisplay(3);
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
    resumeShootLivePreview();
    renderBooth(false);
    const captureGeometry = getLayoutGeometry();
    const targetSlot = captureGeometry.slots[slotIndex];
    if (!targetSlot) {
      return;
    }
    const lockedSlot = { ...targetSlot };
    state.captureSlots[slotIndex] = lockedSlot;
    playCaptureFlash().then(() => animateCaptureToSlot(capture, lockedSlot, () => {
      state.captures[slotIndex] = capture;
      renderBooth(false);
    })).then(async () => {
      state.currentShot += 1;
      resumeShootLivePreview();
      renderBooth(false);
      if (state.currentShot >= geometry.count) {
        finishShooting();
        return;
      }
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

  state.captures = [];
  state.captureSlots = [];
  state.currentShot = 0;
  renderBooth(false);

  const designReady = ensureActiveCustomDesignReady();
  const ready = await ensureShootingCamera();
  if (!ready) {
    return;
  }
  await designReady;

  state.shooting = true;
  state.live = !state.demoMode;
  setShootingButtons("shooting");
  drawShootLivePreview();
  await delay(1000);
  if (!state.shooting) {
    return;
  }
  runShotCountdown();
}

function confirmDesignSelection() {
  if (!state.layout || state.transitioningToShoot) {
    return;
  }

  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
  const booth = document.getElementById("booth");
  const flyingLive = createLiveTransitionLayer();
  setActiveNav("booth");
  state.transitioningToShoot = true;
  confirmDesignButton.disabled = true;
  booth.classList.add("live-transitioning");

  state.suppressShootLive = true;
  state.confirmed = true;
  state.currentShot = 0;
  state.captures = [];
  state.captureSlots = [];
  state.live = Boolean(state.stream);
  state.demoMode = false;
  pinLayoutShootingTransitionToTop();
  armLayoutShootingEnter();
  setShootMode(true);
  shootStatus.textContent = "Ready";
  setShootingButtons("ready");
  pinPageToTop();
  syncControls();
  renderBooth(false);
  drawShootLivePreview();
  void ensureActiveCustomDesignReady();

  if (flyingLive) {
    flyingLive.style.filter = getComputedStyle(shootLiveCanvas).filter;
  }
  const target = shootLiveSlotViewportRect();
  animateLiveTransitionToShootFrame(flyingLive, target).then(() => {
    settleLiveTransition(flyingLive, target);
  });
}

async function handleConfirmDesignClick() {
  if (
    !state.layout ||
    state.transitioningToShoot ||
    confirmDesignButton.disabled ||
    confirmDesignButton.classList.contains("is-pressing")
  ) {
    return;
  }

  confirmDesignButton.classList.add("is-pressing");
  await delay(pageButtonPressFeedbackMs);
  confirmDesignButton.classList.remove("is-pressing");
  confirmDesignSelection();
}


function renderFinishFrameShadow() {
  const sourceWidth = finishCanvas.width;
  const sourceHeight = finishCanvas.height;
  if (!sourceWidth || !sourceHeight) {
    return;
  }

  const padding = Math.round(Math.max(sourceWidth, sourceHeight) * 0.07);
  const nearBlur = Math.max(10, Math.round(Math.min(sourceWidth, sourceHeight) * 0.018));
  const farBlur = Math.max(22, Math.round(Math.min(sourceWidth, sourceHeight) * 0.038));
  const nearOffsetX = Math.round(sourceWidth * 0.012);
  const nearOffsetY = Math.round(sourceHeight * 0.012);
  const farOffsetX = Math.round(sourceWidth * 0.026);
  const farOffsetY = Math.round(sourceHeight * 0.03);

  finishShadowCanvas.width = sourceWidth + padding * 2;
  finishShadowCanvas.height = sourceHeight + padding * 2;
  finishShadowCtx.clearRect(0, 0, finishShadowCanvas.width, finishShadowCanvas.height);

  const silhouette = document.createElement("canvas");
  silhouette.width = sourceWidth;
  silhouette.height = sourceHeight;
  const silhouetteCtx = silhouette.getContext("2d");
  silhouetteCtx.drawImage(finishCanvas, 0, 0);
  silhouetteCtx.globalCompositeOperation = "source-in";
  silhouetteCtx.fillStyle = "rgba(48, 34, 29, 0.82)";
  silhouetteCtx.fillRect(0, 0, sourceWidth, sourceHeight);

  finishShadowCtx.save();
  finishShadowCtx.globalAlpha = 0.38;
  finishShadowCtx.filter = `blur(${farBlur}px)`;
  finishShadowCtx.drawImage(silhouette, padding + farOffsetX, padding + farOffsetY);
  finishShadowCtx.globalAlpha = 0.34;
  finishShadowCtx.filter = `blur(${nearBlur}px)`;
  finishShadowCtx.drawImage(silhouette, padding + nearOffsetX, padding + nearOffsetY);
  finishShadowCtx.restore();
}

function prepareFinishOverlayContent() {
  renderBooth(false);
  const previewRect = previewCanvas.getBoundingClientRect();
  const previewCenterX = previewRect.left + previewRect.width / 2;
  const previewCenterY = previewRect.top + previewRect.height / 2;
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;

  finishCanvas.width = previewCanvas.width;
  finishCanvas.height = previewCanvas.height;
  finishCtx.clearRect(0, 0, finishCanvas.width, finishCanvas.height);
  finishCtx.drawImage(previewCanvas, 0, 0);
  renderFinishFrameShadow();
  finishCard.style.setProperty("--from-x", `${previewCenterX - viewportCenterX}px`);
  finishCard.style.setProperty("--from-y", `${previewCenterY - viewportCenterY}px`);
  finishCard.style.setProperty("--from-scale", "0.38");
  state.finishPrepared = true;
}

function scheduleFinishOverlayPreparation() {
  window.cancelAnimationFrame(state.finishPrepareFrame);
  state.finishPrepared = false;
  state.finishPrepareFrame = window.requestAnimationFrame(() => {
    state.finishPrepareFrame = null;
    prepareFinishOverlayContent();
  });
}

function revealFinishOverlay() {
  if (!state.finishPrepared) {
    prepareFinishOverlayContent();
  }
  finishOverlay.classList.add("is-visible");
  finishOverlay.setAttribute("aria-hidden", "false");
  window.clearTimeout(state.confettiTimer);
  state.confettiTimer = window.setTimeout(() => {
    state.confettiTimer = null;
    window.requestAnimationFrame(startFinishConfetti);
  }, 320);
}

function renderFinishOverlay() {
  prepareFinishOverlayContent();
  revealFinishOverlay();
}

function showFinishOverlay() {
  window.clearTimeout(state.finishOverlayTimer);
  window.clearTimeout(state.processingTimer);
  window.cancelAnimationFrame(state.finishPrepareFrame);
  doneButton.disabled = true;
  state.finishOverlayTimer = window.setTimeout(() => {
    shootStatus.textContent = "Processing finished photo";
    processingOverlay.classList.remove("is-visible");
    window.requestAnimationFrame(() => {
      processingOverlay.classList.add("is-visible");
      processingOverlay.setAttribute("aria-hidden", "false");
    });
    scheduleFinishOverlayPreparation();
    state.processingTimer = window.setTimeout(() => {
      revealFinishOverlay();
      state.processingTimer = window.setTimeout(() => {
        processingOverlay.classList.remove("is-visible");
        processingOverlay.setAttribute("aria-hidden", "true");
        doneButton.disabled = false;
      }, 280);
    }, 4000);
  }, 600);
}

function hideFinishOverlay() {
  window.clearTimeout(state.finishOverlayTimer);
  window.clearTimeout(state.processingTimer);
  window.cancelAnimationFrame(state.finishPrepareFrame);
  state.finishPrepareFrame = null;
  state.finishPrepared = false;
  stopFinishConfetti();
  doneButton.disabled = false;
  processingOverlay.classList.remove("is-visible");
  processingOverlay.setAttribute("aria-hidden", "true");
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
  state.captureSlots = [];
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

function dateStamp() {
  return new Date().toISOString().slice(0, 10);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function canvasToBlob(canvas, type = "image/png", quality) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

async function saveFinalImage() {
  const date = dateStamp();
  const blob = await canvasToBlob(finishCanvas, "image/png");
  if (!blob) {
    statusText.textContent = "Save failed";
    return;
  }

  downloadBlob(blob, `flashberry-photo-strip-${state.layout || "layout"}-${date}.png`);
  statusText.textContent = "Photo strip saved";
}

function gifColorIndex(red, green, blue, alpha = 255) {
  if (alpha < 128) {
    return 255;
  }

  return ((red >> 5) << 5) | ((green >> 5) << 2) | (blue >> 6);
}

function gifPalette332() {
  const palette = [];
  for (let index = 0; index < 256; index += 1) {
    const redLevel = (index >> 5) & 7;
    const greenLevel = (index >> 2) & 7;
    const blueLevel = index & 3;
    palette.push(
      Math.round((redLevel / 7) * 255),
      Math.round((greenLevel / 7) * 255),
      Math.round((blueLevel / 3) * 255),
    );
  }

  return palette;
}

function pushAscii(bytes, text) {
  for (let index = 0; index < text.length; index += 1) {
    bytes.push(text.charCodeAt(index));
  }
}

function pushShort(bytes, value) {
  bytes.push(value & 255, (value >> 8) & 255);
}

function pushSubBlocks(bytes, data) {
  for (let index = 0; index < data.length; index += 255) {
    const chunk = data.slice(index, index + 255);
    bytes.push(chunk.length, ...chunk);
  }
  bytes.push(0);
}

function lzwEncodeGifIndexes(indexes, minCodeSize = 8) {
  const clearCode = 1 << minCodeSize;
  const endCode = clearCode + 1;
  let nextCode = endCode + 1;
  let codeSize = minCodeSize + 1;
  let dictionary = new Map();
  const output = [];
  let bitBuffer = 0;
  let bitLength = 0;

  const writeCode = (code) => {
    bitBuffer |= code << bitLength;
    bitLength += codeSize;
    while (bitLength >= 8) {
      output.push(bitBuffer & 255);
      bitBuffer >>= 8;
      bitLength -= 8;
    }
  };

  const resetDictionary = () => {
    dictionary = new Map();
    nextCode = endCode + 1;
    codeSize = minCodeSize + 1;
  };

  writeCode(clearCode);

  let prefix = String(indexes[0] ?? 0);
  let prefixCode = indexes[0] ?? 0;
  for (let index = 1; index < indexes.length; index += 1) {
    const value = indexes[index];
    const key = `${prefix},${value}`;
    if (dictionary.has(key)) {
      prefix = key;
      prefixCode = dictionary.get(key);
      continue;
    }

    writeCode(prefixCode);
    if (nextCode < 4096) {
      dictionary.set(key, nextCode);
      nextCode += 1;
      if (nextCode === (1 << codeSize) && codeSize < 12) {
        codeSize += 1;
      }
    } else {
      writeCode(clearCode);
      resetDictionary();
    }

    prefix = String(value);
    prefixCode = value;
  }

  writeCode(prefixCode);
  writeCode(endCode);
  if (bitLength > 0) {
    output.push(bitBuffer & 255);
  }

  return output;
}

function canvasToGifIndexes(canvas) {
  const { width, height } = canvas;
  const data = canvas.getContext("2d").getImageData(0, 0, width, height).data;
  const indexes = new Uint8Array(width * height);
  for (let source = 0, target = 0; source < data.length; source += 4, target += 1) {
    indexes[target] = gifColorIndex(data[source], data[source + 1], data[source + 2], data[source + 3]);
  }

  return indexes;
}

function encodeAnimatedGif(frames, delays) {
  const width = frames[0].width;
  const height = frames[0].height;
  const bytes = [];
  pushAscii(bytes, "GIF89a");
  pushShort(bytes, width);
  pushShort(bytes, height);
  bytes.push(0xf7, 255, 0);
  bytes.push(...gifPalette332());
  bytes.push(0x21, 0xff, 0x0b);
  pushAscii(bytes, "NETSCAPE2.0");
  bytes.push(0x03, 0x01);
  pushShort(bytes, 0);
  bytes.push(0);

  frames.forEach((frame, index) => {
    const delayCs = Math.max(3, Math.round((delays[index] || 900) / 10));
    bytes.push(0x21, 0xf9, 0x04, 0x08);
    pushShort(bytes, delayCs);
    bytes.push(0, 0);
    bytes.push(0x2c);
    pushShort(bytes, 0);
    pushShort(bytes, 0);
    pushShort(bytes, width);
    pushShort(bytes, height);
    bytes.push(0);
    bytes.push(8);
    pushSubBlocks(bytes, lzwEncodeGifIndexes(canvasToGifIndexes(frame), 8));
  });

  bytes.push(0x3b);
  return new Blob([new Uint8Array(bytes)], { type: "image/gif" });
}

function drawImageCover(ctx, source, x, y, width, height) {
  const ratio = Math.max(width / source.width, height / source.height);
  const drawWidth = source.width * ratio;
  const drawHeight = source.height * ratio;
  ctx.drawImage(source, x + ((width - drawWidth) / 2), y + ((height - drawHeight) / 2), drawWidth, drawHeight);
}

function drawImageContain(ctx, source, x, y, width, height) {
  const ratio = Math.min(width / source.width, height / source.height);
  const drawWidth = source.width * ratio;
  const drawHeight = source.height * ratio;
  ctx.drawImage(source, x + ((width - drawWidth) / 2), y + ((height - drawHeight) / 2), drawWidth, drawHeight);
}

function createGifFrameCanvas(source, index, total, mode = "capture") {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 420;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#fffaf3");
  gradient.addColorStop(0.58, "#f0cbd4");
  gradient.addColorStop(1, "#fff7fa");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.62)";
  roundRect(ctx, 28, 28, 264, 314, 18);
  ctx.fill();
  ctx.save();
  roundRect(ctx, 42, 42, 236, 270, 14);
  ctx.clip();
  if (mode === "strip") {
    drawImageContain(ctx, source, 42, 42, 236, 270);
  } else {
    drawImageCover(ctx, source, 42, 42, 236, 270);
  }
  ctx.restore();
  ctx.fillStyle = "#7e604f";
  ctx.font = "700 24px \"Bell MT\", \"Times New Roman\", serif";
  ctx.textAlign = "center";
  ctx.fillText(mode === "strip" ? "flashberry booth" : `shot ${index + 1}/${total}`, 160, 366);
  ctx.font = "700 18px \"Bell MT\", \"Times New Roman\", serif";
  ctx.fillText("♡", 160, 392);
  return canvas;
}

function createGifFrames() {
  const captures = state.captures.filter(Boolean);
  const frames = captures.map((capture, index) => createGifFrameCanvas(capture, index, captures.length));
  frames.push(createGifFrameCanvas(finishCanvas, frames.length, frames.length + 1, "strip"));
  return frames;
}

async function downloadFinalGif() {
  if (!downloadGifButton) {
    return;
  }

  const originalText = downloadGifButton.textContent;
  downloadGifButton.disabled = true;
  downloadGifButton.textContent = "Building GIF...";
  try {
    await delay(40);
    const frames = createGifFrames();
    const delays = frames.map((_, index) => (index === frames.length - 1 ? 1400 : 850));
    const blob = encodeAnimatedGif(frames, delays);
    downloadBlob(blob, `flashberry-booth-${state.layout || "layout"}-${dateStamp()}.gif`);
    statusText.textContent = "GIF downloaded";
  } catch (error) {
    statusText.textContent = "GIF download failed";
  } finally {
    downloadGifButton.disabled = false;
    downloadGifButton.textContent = originalText;
  }
}

function canNativeShareFiles() {
  if (typeof File !== "function" || typeof navigator.share !== "function" || typeof navigator.canShare !== "function") {
    return false;
  }

  try {
    const testFile = new File([""], "flashberry-photo-strip.png", { type: "image/png" });
    return navigator.canShare({ files: [testFile] });
  } catch (error) {
    return false;
  }
}

async function postToInstagram(instagramWindow = null) {
  const blob = await canvasToBlob(finishCanvas, "image/png");
  if (!blob) {
    statusText.textContent = "Instagram post failed";
    return;
  }

  const filename = `flashberry-photo-strip-${dateStamp()}.png`;
  const file = typeof File === "function" ? new File([blob], filename, { type: "image/png" }) : null;
  if (!instagramWindow && file && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: "Flashberry Booth",
        text: "Post your Flashberry photo strip to Instagram.",
      });
      statusText.textContent = "Shared to Instagram";
      return;
    } catch (error) {
      statusText.textContent = "Share cancelled";
      return;
    }
  }

  downloadBlob(blob, filename);
  if (!instagramWindow || instagramWindow.closed) {
    window.open("https://www.instagram.com/create/select/", "_blank", "noopener,noreferrer");
  }
  statusText.textContent = "Instagram editor opened";
}

function takeNewPhotosFromFinish() {
  hideFinishOverlay();
  clearCountdownTimer();
  setCountdownDisplay(null);
  stopCamera();
  setShootMode(false);
  setStudioVisible(false);
  state.shooting = false;
  state.currentShot = 0;
  state.captures = [];
  state.captureSlots = [];
  state.suppressShootLive = false;
  state.transitioningToShoot = false;
  state.confirmed = false;
  state.live = false;
  state.frozenFrame = null;
  state.demoMode = false;
  setShootingButtons("ready");
  shootStatus.textContent = "";
  setScreen("layouts");
  setActiveNav("layouts");
  syncControls();
  pinPageToTop();
}

function printFinalImage() {
  window.print();
}

function syncFilterButtons() {
  filterButtons?.querySelectorAll("button[data-filter]").forEach((button) => {
    const selected = button.dataset.filter === state.filter;
    button.setAttribute("aria-pressed", String(selected));
    button.setAttribute("aria-selected", String(selected));
  });
}

function setActiveFilter(filterId, { animate = true } = {}) {
  const requestedFilter = String(filterId || "original").trim();
  const filter = filterOptions.find((option) => option.id === requestedFilter || option.label === requestedFilter) || filterOptions[0];

  selectedFilter = filter.id;
  state.filter = filter.id;
  updateLiveFilterStyle(filter);
  syncFilterButtons();
  if (animate) {
    [shootLiveCanvas, previewCanvas].forEach((canvas) => {
      replayClassAnimation(canvas, "filter-changing", 240);
    });
  }
  restartRenderLoop();
}

function resetActiveFilter() {
  if (state.filter === "original" && selectedFilter === "original") {
    updateLiveFilterStyle(getActiveFilter("original"));
    syncFilterButtons();
    return;
  }

  setActiveFilter("original", { animate: false });
}

function applyFilter(filterName) {
  setActiveFilter(filterName);
}

function renderFilterOptions() {
  if (!filterButtons || filterButtons.childElementCount) {
    syncFilterButtons();
    return;
  }

  filterOptions.forEach((filter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-option";
    button.dataset.filter = filter.id;
    button.setAttribute("role", "option");
    button.setAttribute("aria-label", filter.label);
    button.setAttribute("aria-pressed", String(filter.id === state.filter));
    button.addEventListener("pointerdown", () => {
      applyFilter(filter.id);
    });
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        applyFilter(filter.id);
      }
    });

    const label = document.createElement("span");
    label.className = "filter-label";
    label.textContent = filter.label;

    button.appendChild(label);
    filterButtons.appendChild(button);
  });

  syncFilterButtons();
}

function enableFilterDragScroll() {
  if (!filterButtons) {
    return;
  }

  let startX = 0;
  let startScrollLeft = 0;
  let dragging = false;
  let moved = false;

  filterButtons.addEventListener("pointerdown", (event) => {
    if (event.button && event.button !== 0) {
      return;
    }
    dragging = true;
    moved = false;
    startX = event.clientX;
    startScrollLeft = filterButtons.scrollLeft;
    filterButtons.classList.add("is-dragging");
    filterButtons.setPointerCapture?.(event.pointerId);
  });

  filterButtons.addEventListener("pointermove", (event) => {
    if (!dragging) {
      return;
    }
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 4) {
      moved = true;
    }
    filterButtons.scrollLeft = startScrollLeft - delta;
  });

  const endDrag = (event) => {
    if (!dragging) {
      return;
    }
    dragging = false;
    filterButtons.classList.remove("is-dragging");
    filterButtons.releasePointerCapture?.(event.pointerId);
  };

  filterButtons.addEventListener("pointerup", endDrag);
  filterButtons.addEventListener("pointercancel", endDrag);
  filterButtons.addEventListener("click", (event) => {
    if (moved) {
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    }
  }, true);
}

function showSelectedLayoutPage() {
  if (!state.layout) {
    state.layout = "polaroid";
  }
  if (getCustomDesignsForLayout().length) {
    pickFirstLayout2Design();
  } else if (!state.frame || state.frame === "layout2-custom") {
    state.frame = "plain";
    state.layout2Design = null;
    invalidateFrameCache();
  }
  setShootMode(false);
  clearCountdownTimer();
  setCountdownDisplay(null);
  state.confirmed = false;
  state.shooting = false;
  state.currentShot = 0;
  state.captures = [];
  state.captureSlots = [];
  state.live = false;
  state.frozenFrame = null;
  state.demoMode = false;
  hideFinishOverlay();
  setStudioVisible(true);
  setCameraReady(Boolean(state.stream && state.live));
  setShootingButtons("ready");
  setPermissionState(
    "Ready to turn on camera",
    "Allow camera access when you want to place yourself inside it.",
    true,
    state.permissionGranted ? "Start Camera" : "Allow Camera",
  );
  statusText.textContent = "Layout ready";
  syncControls();
  scheduleDesignScrollReset();
  renderBooth(false);
  setScreen("booth");
  scheduleDesignScrollReset();
  setActiveNav("designs");
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
  state.captureSlots = [];
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

function openInfoPage(screen) {
  clearCountdownTimer();
  setCountdownDisplay(null);
  hideFinishOverlay();
  stopCamera();
  setShootMode(false);
  setStudioVisible(false);
  state.confirmed = false;
  state.shooting = false;
  setScreen(screen);
  syncControls();
  setActiveNav(screen);
}

function goToPrivacyPolicy() {
  openInfoPage("privacy");
}

function goToContact() {
  if (contactFormStatus) {
    contactFormStatus.textContent = "";
  }
  openInfoPage("contact");
}

function enterSelectedLayoutPage() {
  showSelectedLayoutPage();
  requestCameraAccess();
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

async function runPageButtonPress(button, action) {
  if (button.disabled || button.classList.contains("is-pressing")) {
    return;
  }

  button.classList.add("is-pressing");
  await delay(pageButtonPressFeedbackMs);
  button.classList.remove("is-pressing");
  action();
}

startButton.addEventListener("click", () => {
  void runPageButtonPress(startButton, () => {
    setScreen("welcome");
    syncControls();
    setActiveNav("welcome");
  });
});

welcomeContinueButton.addEventListener("click", () => {
  void runPageButtonPress(welcomeContinueButton, () => {
    setScreen("layouts");
    syncControls();
    setActiveNav("layouts");
  });
});

welcomeBackButton?.addEventListener("click", resetToStartPage);
retryCameraButton.addEventListener("click", requestCameraAccess);
layoutHomeButton?.addEventListener("click", () => {
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
  if (target === "privacy") {
    goToPrivacyPolicy();
    return;
  }
  if (target === "contact") {
    goToContact();
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

backToLayoutsButton?.addEventListener("click", () => {
  clearCountdownTimer();
  setCountdownDisplay(null);
  if (state.confirmed || document.getElementById("booth").classList.contains("shoot-mode")) {
    state.confirmed = false;
    state.shooting = false;
    state.currentShot = 0;
    state.captures = [];
    state.captureSlots = [];
    setShootMode(false);
    pulseBoothModeTransition();
    setShootingButtons("ready");
    shootStatus.textContent = "";
    setStudioVisible(true);
    setScreen("booth");
    syncControls();
    scheduleDesignScrollReset();
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

privacyHomeButton?.addEventListener("click", resetToStartPage);
contactHomeButton?.addEventListener("click", resetToStartPage);
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  contactFormStatus.textContent = "Thank you. Your message has been received.";
  contactForm.reset();
});

layoutGallery.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-layout]");
  if (!button) {
    return;
  }

  state.layout = button.dataset.layout;
  window.clearTimeout(state.layoutAutoTimer);
  replayClassAnimation(button, "layout-bounce", 380);
  state.frame = "plain";
  state.layout2Design = null;
  state.frameOptionsMode = "";
  state.captures = [];
  state.captureSlots = [];
  invalidateFrameCache();
  state.live = false;
  state.frozenFrame = null;
  state.demoMode = false;
  syncControls();
  state.layoutAutoTimer = window.setTimeout(() => {
    enterSelectedLayoutPage();
  }, 200);
});

layoutContinueButton.addEventListener("click", () => {
  if (!state.layout) {
    return;
  }

  enterSelectedLayoutPage();
});

frameButtons.addEventListener("click", (event) => {
  const layout2Button = event.target.closest("button[data-layout2-design]");
  if (layout2Button) {
    const isNewPreviewDesign = state.frame !== "layout2-custom" || state.layout2Design !== layout2Button.dataset.layout2Design;
    state.layout2Design = layout2Button.dataset.layout2Design;
    state.frame = "layout2-custom";
    state.confirmed = false;
    state.transitioningToShoot = false;
    state.captures = [];
    state.captureSlots = [];
    statusText.textContent = "Layout ready";
    syncControls();
    refreshSelectedCustomDesign(state.layout2Design, isNewPreviewDesign);
    replayClassAnimation(layout2Button, "button-pop", 320);
    layout2Button.blur();
    restartRenderLoop();
    return;
  }

  const button = event.target.closest("button[data-frame]");
  if (!button) {
    return;
  }

  const isNewPreviewDesign = state.frame !== button.dataset.frame || state.layout2Design !== null;
  state.frame = button.dataset.frame;
  state.layout2Design = null;
  state.confirmed = false;
  state.transitioningToShoot = false;
  state.captures = [];
  state.captureSlots = [];
  statusText.textContent = "Layout ready";
  syncControls();
  renderBooth(false);
  if (isNewPreviewDesign) {
    replayPreviewDesignAnimation();
  }
  replayClassAnimation(button, "button-pop", 320);
  button.blur();
  restartRenderLoop();
});

filterButtons?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) {
    return;
  }

  applyFilter(button.dataset.filter);
  button.blur();
});

captureButton.addEventListener("click", freezeFrame);
liveButton.addEventListener("click", liveAgain);
downloadButton.addEventListener("click", downloadImage);
confirmDesignButton.addEventListener("click", () => {
  void handleConfirmDesignClick();
});
startShootButton.addEventListener("click", startShootingSequence);
retakeButton.addEventListener("click", startShootingSequence);
doneButton.addEventListener("click", showFinishOverlay);
saveFinalButton?.addEventListener("click", () => {
  void saveFinalImage();
});
downloadGifButton?.addEventListener("click", () => {
  void downloadFinalGif();
});
printFinalButton?.addEventListener("click", printFinalImage);
postInstagramButton?.addEventListener("click", () => {
  const instagramWindow = canNativeShareFiles()
    ? null
    : window.open("https://www.instagram.com/create/select/", "_blank", "noopener,noreferrer");
  void postToInstagram(instagramWindow);
});
newPhotosButton?.addEventListener("click", takeNewPhotosFromFinish);

function spawnClickSparkle(event) {
  if (event.pointerType === "touch") {
    return;
  }

  const sparkle = document.createElement("span");
  sparkle.className = "click-sparkle";
  sparkle.style.left = `${event.clientX}px`;
  sparkle.style.top = `${event.clientY}px`;
  sparkle.setAttribute("aria-hidden", "true");
  sparkle.innerHTML = "<b style=\"--star-x:0px;--star-y:-24px\">✦</b><b style=\"--star-x:24px;--star-y:-2px\">✧</b><b style=\"--star-x:18px;--star-y:20px\">✦</b><b style=\"--star-x:-4px;--star-y:26px\">⋆</b><b style=\"--star-x:-26px;--star-y:6px\">✧</b><b style=\"--star-x:-18px;--star-y:-18px\">✦</b>";
  document.body.appendChild(sparkle);
  window.setTimeout(() => {
    sparkle.remove();
  }, 820);
}

function playClickSound() {
  const audio = clickSoundPlayers[clickSoundIndex];
  clickSoundIndex = (clickSoundIndex + 1) % clickSoundPlayers.length;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

document.addEventListener("pointerdown", (event) => {
  playClickSound();
  spawnClickSparkle(event);

  const button = event.target.closest("button");
  if (!button || button.disabled) {
    return;
  }

  if (button.classList.contains("layout-card") || button.closest(".border-scroll")) {
    return;
  }

  replayClassAnimation(button, "button-pop", 380);
});

document.addEventListener("pointermove", syncDesign18PreviewHover);
document.addEventListener("pointerleave", clearDesign18PreviewHover);

window.addEventListener("resize", () => {
  clearDesign18PreviewHover();
  scheduleLayoutEmojis();
  schedulePreviewPushpinPlacement();
  scheduleCountdownPlacement();
});

window.addEventListener("scroll", clearDesign18PreviewHover, { passive: true });

renderFilterOptions();
enableFilterDragScroll();
updateLiveFilterStyle();
syncControls();
setActiveNav("home");
renderBooth(false);
