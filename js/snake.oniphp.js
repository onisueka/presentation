class Canvas {
    constructor(id) {
        this.canvas  = document.getElementById(id)
        this.canvasContext = this.canvas.getContext("2d")
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.createRect(0, 0, this.width, 30, "gray")
        this.createRect(0, 30, this.width, this.height - 30, "black")
    }

    // create box in various size.
    createRect (x, y, width, height, color) {
        this.canvasContext.fillStyle = color
        this.canvasContext.fillRect(x, y, width, height)
    }

    // reset screen
    resetScreen () {
        this.createRect(0, 30, this.width, this.height - 30, "black")
    }

    // show button play agian
    playAgainButton () {
        this.canvasContext.font = "20px Tahoma"
        this.canvasContext.fillStyle = "#FFFFFF"
        this.canvasContext.fillText("Refresh to continue :)", (this.width / 2) - 100, (this.height / 2) - 8)
    }
}

var canvas = new Canvas("canvas")

class Apple {
    constructor (size, color) {
        this.x = size * Math.floor(Math.random() * (canvas.width / size))
        this.y = (size * Math.floor(Math.random() * ((canvas.height - 30) / size))) + 30
        this.size = size
        this.color = color
        canvas.createRect(this.x + 2, this.y + 2, this.size - 4, this.size - 4, this.color)
    }

    rebase () { 
        this.x = this.size * Math.floor(Math.random() * (canvas.width / this.size))
        this.y = (this.size * Math.floor(Math.random() * ((canvas.height - 30) / this.size))) + 30            
        canvas.createRect(this.x + 2, this.y + 2, this.size - 4, this.size - 4, this.color)  
    }
}

var apple = new Apple(30, "red")

class Snake {
    constructor(size, color) {
        this.x = 0
        this.y = 30
        this.size = size
        this.color = color
        this.direction = "left"
        this.tails = [{x: this.x, y: this.y}]
        this.death = false
    }

    move () {
        switch(this.direction) {
            case 'left':
                this.x -= this.size 
                break
            case 'up':
                this.y -= this.size
                break
            case 'right':    
                this.x += this.size 
                break
            case 'down':
                this.y += this.size
                break
        }

        // check hit wall
        this.checkHitWall()

        this.tails.unshift({x: this.x, y: this.y})

        // create snake
        for(var i = 0; i < this.tails.length; i++) {
            var color = (i === 0 ? this.color: "white")
            canvas.createRect(this.tails[i].x + 2, this.tails[i].y + 2, this.size - 4, this.size - 4, color)
        }

        // check lose
        this.checkLose()

        // delete end of tail
        canvas.createRect(this.tails[this.tails.length - 1].x, this.tails[this.tails.length - 1].y, this.size, this.size, "black")
        this.tails.pop()

        // check touch apple
        this.checkTouchApple()
    }

    checkHitWall () {
        if(this.x >= canvas.width) {
            this.x = 0
        } else if(this.x < 0) {
            this.x = (canvas.width - this.size)
        } else if(this.y > (canvas.height - this.size)) {
            this.y = 30
        } else if(this.y < 30) {
            this.y = (canvas.height - this.size)
        }
    }

    checkLose () {
        var self = this
        var onlyTail = [...this.tails]
        onlyTail.shift()
        if(onlyTail.some(item => item.x === self.x && item.y === self.y)) {
            canvas.playAgainButton()
            this.death = true

            if(this.tails.length > 80) {
                var client = new XMLHttpRequest()
                var decodedString = atob('c25ha2Uub25pcGhwLmpz');
                client.open('GET', decodedString)
                client.onreadystatechange = function() {
                  var coding = document.getElementById("coding")
                  coding.innerHTML = '<pre><code>' + client.responseText + '</code></pre>'
                }
                client.send();
            }
        }
    }

    checkTouchApple () {
        if(this.x === apple.x && this.y === apple.y) {
            this.tails.push({x: this.tails[this.tails.length - 1].x, y: this.tails[this.tails.length - 1].y})
            do {
                apple.rebase()
            } while (this.tails.some(item => item.x === apple.x && item.y === apple.y))
        }
        canvas.createRect(0, 0, canvas.width, 30, "gray")
        canvas.canvasContext.font = "20px Tahoma"
        canvas.canvasContext.fillStyle = "#00FF42"
        canvas.canvasContext.fillText("Score: " + (this.tails.length - 1), canvas.width - 100, 22)
    }
}

var snake = new Snake(30, "lime")

// Start
window.onload = () => {
    var fps = 1000/20
    setInterval(() => {
        if(!snake.death) {
            snake.move()
        }
    }, fps)
}

// Detect Keyboard
window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        switch(event.keyCode) {
            case 37:
                if(snake.direction !== 'right') snake.direction = "left";
                break
            case 38:
                if(snake.direction !== 'down') snake.direction = "up";
                break
            case 39:
                if(snake.direction !== 'left') snake.direction = "right";
                break
            case 40:
                if(snake.direction !== 'up') snake.direction = "down";
                break
        }
    }, 1)
})