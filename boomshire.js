function svgClick() {
    if (c.numClicks-- > 0) {
        c.createCircle("expanding", this.event.clientX - c.svg.offsetLeft, this.event.clientY - c.svg.offsetTop);
    }
}

function Boomshire (numBalls) {
    //SVG Properties
    this.svg        = document.getElementById("svg");
    this.height     = 600;
    this.width      = 900;
    
    //Circle Properties
    this.radius     = 10;
    this.bounceR    = this.radius;
    this.colors     = ["#abcdef", "#bcdefa", "#cdefab", "#defabc", "#efabcd", "#fabcde"];
    this.steadyT    = 60;
    this.numBalls   = numBalls || 10;

    //Game Properties
    this.numClicks  = 1;
    
    this.setup();
}

Boomshire.prototype.setup = function () {
    var n, circles, context;
    
    //SVG Initialize
    this.svg.setAttribute("onclick",'svgClick()');
    this.svg.setAttribute("height", this.height + "px");
    this.svg.setAttribute("width",  this.width  + "px");
    
    //Circles Initialize
    for (n = 0; n < this.numBalls; n++) this.createCircle();
    
    circles = this.svg.getElementsByTagName("circle");
    context = this;
    window.setInterval(function () {
        var circle, action;
        for (n = 0; n < circles.length; n++) {
            circle = circles[n];
            action = circle.getAttribute("action");
            if (action === "moving")    context.checkMove(circles, circle);
            if (action === "expanding") context.expand(circle);
            if (action === "steady")    context.steady(circle);
            if (action === "shrinking") context.shrink(circle);
        }
    }, 20);
}

Boomshire.prototype.createCircle = function (action, x, y) {
    action  = action    || "moving";
    x       = x         || Math.random()*(this.width  - 2*this.radius) + this.radius;
    y       = y         || Math.random()*(this.height - 2*this.radius) + this.radius; 
    
    var circle, 
        xmlns = "http://www.w3.org/2000/svg";

    circle = document.createElementNS(xmlns, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("bounceX", "");
    circle.setAttribute("bounceY", "");
    circle.setAttribute("r", this.radius);
    circle.setAttribute("velocity", this.getVelocity());
    circle.setAttribute("direction", this.getDirection());
    circle.setAttribute("fill", this.getColor());
    circle.setAttribute("steadyLength", this.steadyT);
    circle.setAttribute("action", action);
    this.svg.appendChild(circle);
}

Boomshire.prototype.getVelocity = function () {
    return Math.random()*1 + 1;
}

Boomshire.prototype.getDirection = function () {
    return Math.random() * 2*Math.PI;
}

Boomshire.prototype.getColor = function () {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
}

Boomshire.prototype.checkMove = function (circles, circle) {
    var n;
    for (n = 0; n < circles.length; n++) {
        if (circles[n].attributes["action"].value !== "moving" && this.checkOverlap(circles[n], circle)) {
            circle.attributes["action"].value = "expanding";
            return;
        }
    }
    this.move(circle);
}

Boomshire.prototype.checkOverlap = function (circle1, circle2) {
    //Quick and Drity Test with Bounding Boxes
    var b1 = circle1.getBoundingClientRect(),
        b2 = circle2.getBoundingClientRect();
    if (b2.left > b1.right || b2.right < b1.left || b2.top > b1.bottom || b2.bottom < b1.top) return false;

    //More accurate test with distance formula
    var r1  = circle1.r.baseVal.value,
        r2  = circle2.r.baseVal.value,
        cx1 = circle1.cx.baseVal.value,
        cx2 = circle2.cx.baseVal.value,
        cy1 = circle1.cy.baseVal.value,
        cy2 = circle2.cy.baseVal.value;
    
    if (Math.abs(r1 + r2) <= Math.sqrt( (cx1 - cx2)*(cx1 - cx2) + (cy1 - cy2)*(cy1 - cy2) )) return false;
    return true;
}

Boomshire.prototype.expand = function (circle) {
    var r = circle.r.baseVal.value;
    (r > 35) ?
        circle.attributes["action"].value = "steady" :
        circle.r.baseVal.value = r + 1;
}

Boomshire.prototype.shrink = function (circle) {
    var r = circle.r.baseVal.value;
    (r < 1) ? 
        circle.remove() :
        circle.r.baseVal.value = r - 1;
}

Boomshire.prototype.steady = function (circle) {
    var t = circle.attributes["steadyLength"].value;
    (t < 1) ?
        circle.attributes["action"].value = "shrinking" :
        circle.attributes["steadyLength"].value = t - 1;
}

Boomshire.prototype.move = function (circle) {
    var cx = circle.cx.baseVal.value,
        cy = circle.cy.baseVal.value,
        bounceX = circle.attributes["bounceX"].value,
        bounceY = circle.attributes["bounceY"].value,
        velocity = circle.attributes["velocity"].value,
        direction = circle.attributes["direction"].value;
    
    if (cx <= this.bounceR && bounceX != "left") {
        circle.attributes["bounceX"].value = "left";
        circle.attributes["direction"].value = Math.PI - direction;
    }
    if (cx >= this.width - this.bounceR && bounceX != "right") {
        circle.attributes["bounceX"].value = "right";
        circle.attributes["direction"].value = Math.PI - direction;
    }
    if (cy <= this.bounceR && bounceY != "top") {
        circle.attributes["bounceY"].value = "top";
        circle.attributes["direction"].value = -direction;
    }
    if (cy >= this.height - this.bounceR && bounceY != "bottom") {
        circle.attributes["bounceY"].value = "bottom";
        circle.attributes["direction"].value = -direction;
    }

    circle.attributes["cx"].value = cx + velocity*Math.cos(direction);
    circle.attributes["cy"].value = cy + velocity*Math.sin(direction);
}

var c = new Boomshire();
