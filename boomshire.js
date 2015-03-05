/*ToDo:
    Optimize moving for 100000 balls without collisions
    Optimize collisions for 5000 balls
*/
function Boomshire (numBalls) {
    //SVG Properties
    this.svg        = document.getElementById("svg");
    this.height     = 600;
    this.width      = 900;
    
    //Circle Properties
    this.radius     = 10;
    this.bounceR    = this.radius;
    this.colors     = ["#abcdef", "#abcdfe", "#abcedf", "#abcefd", "#abcfde", "#abcfed", "#abdcef", "#abdcfe", "#abdecf", "#abdefc", "#abdfce", "#abdfec", "#abecdf", "#abecfd", "#abedcf", "#abedfc", "#abefcd", "#abefdc", "#abfcde", "#abfced", "#abfdce", "#abfdec", "#abfecd", "#abfedc", "#acbdef", "#acbdfe", "#acbedf", "#acbefd", "#acbfde", "#acbfed", "#acdbef", "#acdbfe", "#acdebf", "#acdefb", "#acdfbe", "#acdfeb", "#acebdf", "#acebfd", "#acedbf", "#acedfb", "#acefbd", "#acefdb", "#acfbde", "#acfbed", "#acfdbe", "#acfdeb", "#acfebd", "#acfedb", "#adbcef", "#adbcfe", "#adbecf", "#adbefc", "#adbfce", "#adbfec", "#adcbef", "#adcbfe", "#adcebf", "#adcefb", "#adcfbe", "#adcfeb", "#adebcf", "#adebfc", "#adecbf", "#adecfb", "#adefbc", "#adefcb", "#adfbce", "#adfbec", "#adfcbe", "#adfceb", "#adfebc", "#adfecb", "#aebcdf", "#aebcfd", "#aebdcf", "#aebdfc", "#aebfcd", "#aebfdc", "#aecbdf", "#aecbfd", "#aecdbf", "#aecdfb", "#aecfbd", "#aecfdb", "#aedbcf", "#aedbfc", "#aedcbf", "#aedcfb", "#aedfbc", "#aedfcb", "#aefbcd", "#aefbdc", "#aefcbd", "#aefcdb", "#aefdbc", "#aefdcb", "#afbcde", "#afbced", "#afbdce", "#afbdec", "#afbecd", "#afbedc", "#afcbde", "#afcbed", "#afcdbe", "#afcdeb", "#afcebd", "#afcedb", "#afdbce", "#afdbec", "#afdcbe", "#afdceb", "#afdebc", "#afdecb", "#afebcd", "#afebdc", "#afecbd", "#afecdb", "#afedbc", "#afedcb", "#bacdef", "#bacdfe", "#bacedf", "#bacefd", "#bacfde", "#bacfed", "#badcef", "#badcfe", "#badecf", "#badefc", "#badfce", "#badfec", "#baecdf", "#baecfd", "#baedcf", "#baedfc", "#baefcd", "#baefdc", "#bafcde", "#bafced", "#bafdce", "#bafdec", "#bafecd", "#bafedc", "#bcadef", "#bcadfe", "#bcaedf", "#bcaefd", "#bcafde", "#bcafed", "#bcdaef", "#bcdafe", "#bcdeaf", "#bcdefa", "#bcdfae", "#bcdfea", "#bceadf", "#bceafd", "#bcedaf", "#bcedfa", "#bcefad", "#bcefda", "#bcfade", "#bcfaed", "#bcfdae", "#bcfdea", "#bcfead", "#bcfeda", "#bdacef", "#bdacfe", "#bdaecf", "#bdaefc", "#bdafce", "#bdafec", "#bdcaef", "#bdcafe", "#bdceaf", "#bdcefa", "#bdcfae", "#bdcfea", "#bdeacf", "#bdeafc", "#bdecaf", "#bdecfa", "#bdefac", "#bdefca", "#bdface", "#bdfaec", "#bdfcae", "#bdfcea", "#bdfeac", "#bdfeca", "#beacdf", "#beacfd", "#beadcf", "#beadfc", "#beafcd", "#beafdc", "#becadf", "#becafd", "#becdaf", "#becdfa", "#becfad", "#becfda", "#bedacf", "#bedafc", "#bedcaf", "#bedcfa", "#bedfac", "#bedfca", "#befacd", "#befadc", "#befcad", "#befcda", "#befdac", "#befdca", "#bfacde", "#bfaced", "#bfadce", "#bfadec", "#bfaecd", "#bfaedc", "#bfcade", "#bfcaed", "#bfcdae", "#bfcdea", "#bfcead", "#bfceda", "#bfdace", "#bfdaec", "#bfdcae", "#bfdcea", "#bfdeac", "#bfdeca", "#bfeacd", "#bfeadc", "#bfecad", "#bfecda", "#bfedac", "#bfedca", "#cabdef", "#cabdfe", "#cabedf", "#cabefd", "#cabfde", "#cabfed", "#cadbef", "#cadbfe", "#cadebf", "#cadefb", "#cadfbe", "#cadfeb", "#caebdf", "#caebfd", "#caedbf", "#caedfb", "#caefbd", "#caefdb", "#cafbde", "#cafbed", "#cafdbe", "#cafdeb", "#cafebd", "#cafedb", "#cbadef", "#cbadfe", "#cbaedf", "#cbaefd", "#cbafde", "#cbafed", "#cbdaef", "#cbdafe", "#cbdeaf", "#cbdefa", "#cbdfae", "#cbdfea", "#cbeadf", "#cbeafd", "#cbedaf", "#cbedfa", "#cbefad", "#cbefda", "#cbfade", "#cbfaed", "#cbfdae", "#cbfdea", "#cbfead", "#cbfeda", "#cdabef", "#cdabfe", "#cdaebf", "#cdaefb", "#cdafbe", "#cdafeb", "#cdbaef", "#cdbafe", "#cdbeaf", "#cdbefa", "#cdbfae", "#cdbfea", "#cdeabf", "#cdeafb", "#cdebaf", "#cdebfa", "#cdefab", "#cdefba", "#cdfabe", "#cdfaeb", "#cdfbae", "#cdfbea", "#cdfeab", "#cdfeba", "#ceabdf", "#ceabfd", "#ceadbf", "#ceadfb", "#ceafbd", "#ceafdb", "#cebadf", "#cebafd", "#cebdaf", "#cebdfa", "#cebfad", "#cebfda", "#cedabf", "#cedafb", "#cedbaf", "#cedbfa", "#cedfab", "#cedfba", "#cefabd", "#cefadb", "#cefbad", "#cefbda", "#cefdab", "#cefdba", "#cfabde", "#cfabed", "#cfadbe", "#cfadeb", "#cfaebd", "#cfaedb", "#cfbade", "#cfbaed", "#cfbdae", "#cfbdea", "#cfbead", "#cfbeda", "#cfdabe", "#cfdaeb", "#cfdbae", "#cfdbea", "#cfdeab", "#cfdeba", "#cfeabd", "#cfeadb", "#cfebad", "#cfebda", "#cfedab", "#cfedba", "#dabcef", "#dabcfe", "#dabecf", "#dabefc", "#dabfce", "#dabfec", "#dacbef", "#dacbfe", "#dacebf", "#dacefb", "#dacfbe", "#dacfeb", "#daebcf", "#daebfc", "#daecbf", "#daecfb", "#daefbc", "#daefcb", "#dafbce", "#dafbec", "#dafcbe", "#dafceb", "#dafebc", "#dafecb", "#dbacef", "#dbacfe", "#dbaecf", "#dbaefc", "#dbafce", "#dbafec", "#dbcaef", "#dbcafe", "#dbceaf", "#dbcefa", "#dbcfae", "#dbcfea", "#dbeacf", "#dbeafc", "#dbecaf", "#dbecfa", "#dbefac", "#dbefca", "#dbface", "#dbfaec", "#dbfcae", "#dbfcea", "#dbfeac", "#dbfeca", "#dcabef", "#dcabfe", "#dcaebf", "#dcaefb", "#dcafbe", "#dcafeb", "#dcbaef", "#dcbafe", "#dcbeaf", "#dcbefa", "#dcbfae", "#dcbfea", "#dceabf", "#dceafb", "#dcebaf", "#dcebfa", "#dcefab", "#dcefba", "#dcfabe", "#dcfaeb", "#dcfbae", "#dcfbea", "#dcfeab", "#dcfeba", "#deabcf", "#deabfc", "#deacbf", "#deacfb", "#deafbc", "#deafcb", "#debacf", "#debafc", "#debcaf", "#debcfa", "#debfac", "#debfca", "#decabf", "#decafb", "#decbaf", "#decbfa", "#decfab", "#decfba", "#defabc", "#defacb", "#defbac", "#defbca", "#defcab", "#defcba", "#dfabce", "#dfabec", "#dfacbe", "#dfaceb", "#dfaebc", "#dfaecb", "#dfbace", "#dfbaec", "#dfbcae", "#dfbcea", "#dfbeac", "#dfbeca", "#dfcabe", "#dfcaeb", "#dfcbae", "#dfcbea", "#dfceab", "#dfceba", "#dfeabc", "#dfeacb", "#dfebac", "#dfebca", "#dfecab", "#dfecba", "#eabcdf", "#eabcfd", "#eabdcf", "#eabdfc", "#eabfcd", "#eabfdc", "#eacbdf", "#eacbfd", "#eacdbf", "#eacdfb", "#eacfbd", "#eacfdb", "#eadbcf", "#eadbfc", "#eadcbf", "#eadcfb", "#eadfbc", "#eadfcb", "#eafbcd", "#eafbdc", "#eafcbd", "#eafcdb", "#eafdbc", "#eafdcb", "#ebacdf", "#ebacfd", "#ebadcf", "#ebadfc", "#ebafcd", "#ebafdc", "#ebcadf", "#ebcafd", "#ebcdaf", "#ebcdfa", "#ebcfad", "#ebcfda", "#ebdacf", "#ebdafc", "#ebdcaf", "#ebdcfa", "#ebdfac", "#ebdfca", "#ebfacd", "#ebfadc", "#ebfcad", "#ebfcda", "#ebfdac", "#ebfdca", "#ecabdf", "#ecabfd", "#ecadbf", "#ecadfb", "#ecafbd", "#ecafdb", "#ecbadf", "#ecbafd", "#ecbdaf", "#ecbdfa", "#ecbfad", "#ecbfda", "#ecdabf", "#ecdafb", "#ecdbaf", "#ecdbfa", "#ecdfab", "#ecdfba", "#ecfabd", "#ecfadb", "#ecfbad", "#ecfbda", "#ecfdab", "#ecfdba", "#edabcf", "#edabfc", "#edacbf", "#edacfb", "#edafbc", "#edafcb", "#edbacf", "#edbafc", "#edbcaf", "#edbcfa", "#edbfac", "#edbfca", "#edcabf", "#edcafb", "#edcbaf", "#edcbfa", "#edcfab", "#edcfba", "#edfabc", "#edfacb", "#edfbac", "#edfbca", "#edfcab", "#edfcba", "#efabcd", "#efabdc", "#efacbd", "#efacdb", "#efadbc", "#efadcb", "#efbacd", "#efbadc", "#efbcad", "#efbcda", "#efbdac", "#efbdca", "#efcabd", "#efcadb", "#efcbad", "#efcbda", "#efcdab", "#efcdba", "#efdabc", "#efdacb", "#efdbac", "#efdbca", "#efdcab", "#efdcba", "#fabcde", "#fabced", "#fabdce", "#fabdec", "#fabecd", "#fabedc", "#facbde", "#facbed", "#facdbe", "#facdeb", "#facebd", "#facedb", "#fadbce", "#fadbec", "#fadcbe", "#fadceb", "#fadebc", "#fadecb", "#faebcd", "#faebdc", "#faecbd", "#faecdb", "#faedbc", "#faedcb", "#fbacde", "#fbaced", "#fbadce", "#fbadec", "#fbaecd", "#fbaedc", "#fbcade", "#fbcaed", "#fbcdae", "#fbcdea", "#fbcead", "#fbceda", "#fbdace", "#fbdaec", "#fbdcae", "#fbdcea", "#fbdeac", "#fbdeca", "#fbeacd", "#fbeadc", "#fbecad", "#fbecda", "#fbedac", "#fbedca", "#fcabde", "#fcabed", "#fcadbe", "#fcadeb", "#fcaebd", "#fcaedb", "#fcbade", "#fcbaed", "#fcbdae", "#fcbdea", "#fcbead", "#fcbeda", "#fcdabe", "#fcdaeb", "#fcdbae", "#fcdbea", "#fcdeab", "#fcdeba", "#fceabd", "#fceadb", "#fcebad", "#fcebda", "#fcedab", "#fcedba", "#fdabce", "#fdabec", "#fdacbe", "#fdaceb", "#fdaebc", "#fdaecb", "#fdbace", "#fdbaec", "#fdbcae", "#fdbcea", "#fdbeac", "#fdbeca", "#fdcabe", "#fdcaeb", "#fdcbae", "#fdcbea", "#fdceab", "#fdceba", "#fdeabc", "#fdeacb", "#fdebac", "#fdebca", "#fdecab", "#fdecba", "#feabcd", "#feabdc", "#feacbd", "#feacdb", "#feadbc", "#feadcb", "#febacd", "#febadc", "#febcad", "#febcda", "#febdac", "#febdca", "#fecabd", "#fecadb", "#fecbad", "#fecbda", "#fecdab", "#fecdba", "#fedabc", "#fedacb", "#fedbac", "#fedbca", "#fedcab", "#fedcba"];
    this.steadyT    = 60;
    this.numBalls   = numBalls || 10;

    //Game Properties
    this.numClicks  = 10;
    
    this.setup();
}

Boomshire.prototype.setup = function () {
    var n, circles, context = this;
    
    //SVG Initialize
    this.svg.setAttribute("height", this.height + "px");
    this.svg.setAttribute("width",  this.width  + "px");
    this.svg.addEventListener("click", function (event) {
        context.svgClick(event);
    }, false);

    //Circles Initialize
    for (n = 0; n < this.numBalls; n++) this.createCircle();
    
    circles = this.svg.getElementsByTagName("circle");
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

Boomshire.prototype.svgClick = function (eevnt) {
    if (this.numClicks-- > 0) {
        this.createCircle(
            "expanding", 
            event.clientX - this.svg.offsetLeft, 
            event.clientY - this.svg.offsetTop
        );
    }
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
