/*ToDo:
    Optimize moving for 100000 balls without collisions
*/
function Boomshire () {
    //Game Properties
    this.levels = [
        {level: 1,  total: 5,  toWin: 1,  clicks: 1},
        {level: 2,  total: 10, toWin: 2,  clicks: 1},
        {level: 3,  total: 15, toWin: 3,  clicks: 1},
        {level: 4,  total: 20, toWin: 5,  clicks: 1},
        {level: 5,  total: 25, toWin: 7,  clicks: 1},
        {level: 6,  total: 30, toWin: 10, clicks: 1},
        {level: 7,  total: 35, toWin: 15, clicks: 1},
        {level: 8,  total: 40, toWin: 21, clicks: 1},
        {level: 9,  total: 45, toWin: 27, clicks: 1},
        {level: 10, total: 50, toWin: 33, clicks: 1},
        {level: 11, total: 55, toWin: 44, clicks: 1},
        {level: 12, total: 60, toWin: 55, clicks: 1}
    ];
    this.pointsTotal = 0;
    this.ballsTotal;
    this.ballsToWin;
    this.ballsExpanded;
    this.clicksAllowed;
    this.circles;

    //On Screen Elements
    this.svg            = document.getElementById("svg");
    this.expanded       = document.getElementById("expanded");
    this.toWin          = document.getElementById("toWin");
    this.total          = document.getElementById("total");
    this.gameStatus     = document.getElementById("gameStatus");
    this.score          = document.getElementById("score");

    //SVG Properties
    this.height         = 400;
    this.width          = 550;

    //Circle Properties
    this.ballRadius     = 7;
    this.ballRadiusBig  = 50;
    this.ballGrowSpeed  = 1.5;
    this.bounceRadius   = this.ballRadius;
    this.ballColors     = ["#FC4349", "#D7DADB", "#6DBCDB", "#FFFFFF"];
    this.expandedTime   = 60;

    this.initialize();
}

Boomshire.prototype.initialize = function () {
    context = this;

    //SVG Initialize
    this.svg.setAttribute("height", this.height + "px");
    this.svg.setAttribute("width",  this.width  + "px");
    this.svg.addEventListener("click", function (event) {
        context.svgClick(event);
    }, false);

    window.setInterval(function () {
        var n;
        for (n = 0; n < context.circles.moving.length; n++)     context.move(context.circles.moving[n]);
        for (n = 0; n < context.circles.expanding.length; n++)  context.expand(context.circles.expanding[n]);
        for (n = 0; n < context.circles.steady.length; n++)     context.steady(context.circles.steady[n]);
        for (n = 0; n < context.circles.shrinking.length; n++)  context.shrink(context.circles.shrinking[n]);
    }, 20);

    this.play();
}

Boomshire.prototype.play = function () {
    var level = this.levels[0];
    this.newGame(level.total, level.toWin, level.clicks);
}

Boomshire.prototype.newGame = function (ballsTotal, ballsToWin, clicksAllowed) {
    //Remove Previous Game Elements
    this.svg.classList.remove("win");
    while (this.svg.firstChild) {
        this.svg.removeChild(this.svg.firstChild);
    }

    //Game Properties
    this.ballsTotal     = ballsTotal    || 5;
    this.ballsToWin     = ballsToWin    || 1;
    this.ballsExpanded  = 0;
    this.clicksAllowed  = clicksAllowed || 1;
    this.circles        = {
        "moving":       [],
        "expanding":    [],
        "steady":       [],
        "shrinking":    []
    };

    //Labels Initialize
    this.expanded.innerHTML = this.ballsExpanded;
    this.toWin.innerHTML    = this.ballsToWin;
    this.total.innerHTML    = this.ballsTotal;
    this.score.innerHTML    = this.pointsTotal;

    //Circles Initialize
    for (n = 0; n < this.ballsTotal; n++) this.createCircle();
}

Boomshire.prototype.svgClick = function (event) {
    if (this.clicksAllowed-- > 0) {
        this.createCircle(
            "expanding", 
            event.clientX - this.svg.getBoundingClientRect().left,
            event.clientY - this.svg.getBoundingClientRect().top
        );
    }
}

Boomshire.prototype.createCircle = function (action, x, y) {
    action  = action    || "moving";
    x       = x         || Math.random()*(this.width  - 2*this.ballRadius) + this.ballRadius;
    y       = y         || Math.random()*(this.height - 2*this.ballRadius) + this.ballRadius;

    var circleSVG, 
        xmlns = "http://www.w3.org/2000/svg",
        circle = {
            element:    null,
            xPos:       x,
            yPos:       y,
            radius:     this.ballRadius,
            bounceX:    "",
            bounceY:    "",
            velocity:   this.getVelocity(),
            direction:  this.getDirection(),
            color:      this.getColor(),
            opacity:    (action === "moving") ? 1 : 0.5,
            steadyTime: this.expandedTime
        };

    this.circles[action].push(circle);

    circleSVG = document.createElementNS(xmlns, "circle");
    circleSVG.setAttribute("cx", circle.xPos.toString());
    circleSVG.setAttribute("cy", circle.yPos.toString());
    circleSVG.setAttribute("r", circle.radius);
    circleSVG.setAttribute("fill", circle.color);
    circleSVG.setAttribute("opacity", circle.opacity);
    this.svg.appendChild(circleSVG);
    circle.element = circleSVG;
}

Boomshire.prototype.getVelocity = function () {
    return Math.random()*0.6 + 0.6;
}

Boomshire.prototype.getDirection = function () {
    return Math.random() * 2*Math.PI;
}

Boomshire.prototype.getColor = function () {
    return this.ballColors[Math.floor(Math.random() * this.ballColors.length)];
}

Boomshire.prototype.move = function (circle) {
    //Check for Collisions
    var i, m, n,
        states = ["expanding", "steady", "shrinking"];

    for (i = 0; i < states.length; i++) {
        for (m = 0; m < this.circles[states[i]].length; m++) {
            if (this.checkOverlap(this.circles[states[i]][m], circle)) {
                circle.element.attributes.opacity.value = 0.5;
                
                n = this.circles.moving.indexOf(circle);
                if (n > -1) this.circles.moving.splice(n, 1);
                this.circles.expanding.push(circle);

                this.ballsExpanded = this.ballsExpanded + 1;
                this.expanded.innerHTML = this.ballsExpanded;

                if (this.ballsExpanded === this.ballsToWin) {
                    this.svg.classList.add("win");
                }
                return;
            }
        }
    }

    //Move
    if (circle.xPos <= this.bounceRadius               && circle.bounceX !== "left") {
        circle.bounceX      = "left";
        circle.direction    = Math.PI - circle.direction;
    }
    if (circle.xPos >= this.width - this.bounceRadius  && circle.bounceX !== "right") {
        circle.bounceX      = "right";
        circle.direction    = Math.PI - circle.direction;
    }
    if (circle.yPos <= this.bounceRadius               && circle.bounceY !== "top") {
        circle.bounceY      = "top";
        circle.direction    = -circle.direction;
    }
    if (circle.yPos >= this.height - this.bounceRadius && circle.bounceY !== "bottom") {
        circle.bounceY      = "bottom";
        circle.direction    = -circle.direction;
    }

    circle.xPos = circle.xPos + circle.velocity*Math.cos(circle.direction);
    circle.yPos = circle.yPos + circle.velocity*Math.sin(circle.direction);

    circle.element.attributes.cx.value = circle.xPos;
    circle.element.attributes.cy.value = circle.yPos;
}

Boomshire.prototype.expand = function (circle) {
    var n;

    if (circle.radius < this.ballRadiusBig) {
        circle.radius = circle.radius + this.ballGrowSpeed;
        circle.element.attributes.r.value = circle.radius;
    }
    else {
        n = this.circles.expanding.indexOf(circle);
        if (n > -1) this.circles.expanding.splice(n, 1);
        this.circles.steady.push(circle);
    }
}

Boomshire.prototype.steady = function (circle) {
    var n;

    if (circle.steadyTime > 0) {
        circle.steadyTime  = circle.steadyTime - 1;
    }
    else {
        n = this.circles.steady.indexOf(circle);
        if (n > -1) this.circles.steady.splice(n, 1);
        this.circles.shrinking.push(circle);
    }
}

Boomshire.prototype.shrink = function (circle) {
    var n; 

    if (circle.radius - this.ballGrowSpeed > 0) {
        circle.radius = circle.radius - this.ballGrowSpeed;
        circle.element.attributes.r.value = circle.radius;
    }
    else {
        n = this.circles.shrinking.indexOf(circle);
        if (n > -1) this.circles.shrinking.splice(n, 1);
        this.svg.removeChild(circle.element);

        if (this.circles.expanding.length === 0 && this.circles.steady.length === 0 && this.circles.shrinking.length === 0) {
            if (this.ballsExpanded >= this.ballsToWin) {
                this.pointsTotal = this.pointsTotal + this.ballsExpanded;
                this.score.innerHTML = this.pointsTotal;
                this.levels.shift()

                if (this.levels.length > 0) {
                    this.play();
                }
                else {
                    this.gameStatus.innerHTML = "Game Over. You Win!";
                }
            }
            else if (this.clicksAllowed === 0 && this.ballsExpanded < this.ballsToWin) {
                this.play();
            }
        }
    }
}

Boomshire.prototype.checkOverlap = function (circle1, circle2) {
    var r1  = circle1.radius,
        r2  = circle2.radius,
        cx1 = circle1.xPos,
        cx2 = circle2.xPos,
        cy1 = circle1.yPos,
        cy2 = circle2.yPos;
    
    if (Math.abs(r1 + r2) <= Math.sqrt( (cx1 - cx2)*(cx1 - cx2) + (cy1 - cy2)*(cy1 - cy2) )) return false;
    return true;
}
