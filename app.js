const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const reloadBtn = document.getElementById("jsReload");
const backgroundImgBtn = document.getElementById("jsBackgroundImg");

const INITIAL_COLOR = "#000000";

canvas.width = 700;
canvas.height = 600;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPaintng() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function mouseMove(event) {
  const x = event.offsetX;

  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "바탕색 채우기";
  } else {
    filling = true;
    mode.innerText = "그림 그리기";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL("");
  const link = document.createElement("a");
  link.href = image;
  link.download = "seram";
  link.click();
}

function handleReload() {
  location.reload();
}

function handleImage() {
  const image = new Image();
  const number = Math.floor(Math.random() * 10 + 1);
  image.src = `${number}.jpg`;
  console.log(image.src);

  ctx.drawImage(image, 0, 0, 700, 600);
}

if (canvas) {
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPaintng);
  canvas.addEventListener("mouseleave", stopPaintng);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (reloadBtn) {
  reloadBtn.addEventListener("click", handleReload);
}
if (backgroundImgBtn) {
  backgroundImgBtn.addEventListener("click", handleImage);
}
