let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
const scrollbarWidth = window.innerWidth - document.body.offsetWidth
let mouse = {
    x: window.innerWidth/2,
    y: window.innerHeight/2
}
const content = document.getElementById('content')
content.style.marginLeft = scrollbarWidth + 'px'
content.style.marginRight = scrollbarWidth + 'px'
let prevX
let prevY
let lines = new Array()
content.onmousemove = function(event){
    mouse.x = event.pageX - (content.getBoundingClientRect().left) + 19
    mouse.y = event.clientY - (content.getBoundingClientRect().top)
    lines.forEach(line => {
        line.x = mouse.x
        line.y = mouse.y
    });
}

let init = () => {
    canvas.width = window.innerWidth-scrollbarWidth;
    canvas.height = content.scrollHeight;
    prevX = mouse.x
    prevY = mouse.y
    lines.push(new Line(mouse.x, mouse.y, prevX, prevY, 256, 0, 0, 1))
}

let animation = () => {
    requestAnimationFrame(animation)
    update()
}

let direction = true

setInterval(() => {
    lines.forEach(line => {
        line.fade()
    });
}, 125)
setInterval(() => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}, 2000)

setInterval(() => {
    lines.forEach(line => {
        if(line.r > 0 && line.g < 255 && line.b == 0){
            line.r -= 15
            line.g += 15
            line.b = 0
        }
        else if(line.g > 0 && line.b < 255){
            line.g -= 15
            line.b += 15
            line.r = 0
        }
        else if(line.b > 0 && line.r < 255){
            line.b -= 15
            line.r += 15
            line.g = 0
        }
    });

}, 30)

let update = () => {
    draw()   
}

let draw = () => {
    lines.forEach(line => {
        line.draw()
    });
}

let start = () => {
    init()
    animation()
}

start()