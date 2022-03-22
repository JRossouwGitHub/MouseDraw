class Line{
    constructor(x,y,px,py,r,g,b,a){
        this.x = x
        this.y = y
        this.px = px
        this.py = py
        this.r = r
        this.g = g
        this.b = b
        this.a = a
        this.faded = false
        this.mem = new Array() //use this to track previous coords and make new lines to cover them like a "fade"
        this.clear = 0
    }

    update(){
        this.draw()
    }

    draw(){
        ctx.beginPath()
        ctx.moveTo(this.px, this.py)
        this.setPosition()
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = `rgba(${this.r},${this.g},${this.b}, ${this.a})`
        ctx.lineWidth = 20
        ctx.lineCap = 'round';
        ctx.stroke()
        ctx.closePath()
    }

    setPosition(){
        this.px = this.x
        this.py = this.y
        this.mem.push([this.x, this.y, this.px, this.py])
    }

    fade(){
        this.faded = true
        this.mem.forEach(line => {
            ctx.beginPath()
            ctx.moveTo(line[2], line[3])
            ctx.lineTo(line[0], line[1])
            ctx.strokeStyle = `rgba(1,56,61,${this.clear})`
            ctx.lineWidth = 25
            ctx.lineCap = 'round';
            ctx.stroke()
            ctx.closePath()
        });
        if(this.clear >= 0.25){
            this.clear = 0
            this.mem = []
        } else {
            this.clear += 0.01
        }
    }
}