const linewidth = document.getElementById("line-width");
const color = document.getElementById("changecolor");
const canvas = document.querySelector("canvas");
const beautycolor = Array.from(document.getElementsByClassName("color-option"));
const ctx = canvas.getContext("2d");
const easer = document.querySelector("#easer");
const reset = document.querySelector("#reset");
const fill = document.querySelector("#fill");
const text = document.querySelector("#text");
const file = document.querySelector("#file");
const save = document.getElementById("save");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = linewidth.value;
ctx.lineCap = "round";
let mouse = false;
let PAINT = false;
function onMove(event){
    if(mouse){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX,event.offsetY);
}
function startingPaint(){
    mouse = true;
}
function cancelPaint(){
    mouse = false;
    ctx.beginPath();
}
function widthchange(event){
    ctx.lineWidth = event.target.value;
}
function changecolor(event){
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
}
function onClickColor(event){
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    color.value = event.target.dataset.color;

}
function onClickEaser(){
    ctx.strokeStyle="white";
    fill.innerText = "🩸 fill";
    PAINT = false;
}
function onClickReset(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,800,800);
}
function onClickFill(){
    if(PAINT){
        PAINT = false;
        fill.innerText = "🩸 fill";
        canvas.addEventListener("click",onCanvasClick);
    }
    else{
        PAINT = true;
        fill.innerText = "draw";
    }
}
function onCanvasClick(){
    if(PAINT){
        ctx.fillRect(0,0,800,800);
    }
}
function onDoubleClick(event){
    if(text !== null){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.fillText(text.value ,event.offsetX,event.offsetY);
        ctx.restore();
    }
        
}
function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image,0,0,800,800);
        file.value=null;
    };
}
function onSave(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.jpeg";
    a.click();
}
canvas.addEventListener("dblclick",onDoubleClick);
canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startingPaint);
canvas.addEventListener("mouseup",cancelPaint);
canvas.addEventListener("mouseleave", cancelPaint);
canvas.addEventListener("click",onCanvasClick);
linewidth.addEventListener("change",widthchange);
color.addEventListener("change",changecolor);
beautycolor.forEach((color) => color.addEventListener("click",onClickColor));
easer.addEventListener("click",onClickEaser);
reset.addEventListener("click",onClickReset);
fill.addEventListener("click",onClickFill);
file.addEventListener("change",onFileChange);
save.addEventListener("click",onSave);  