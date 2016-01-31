// ============================
// D3 GRAPH
// ============================
var height = 500,
    width = 800,
    padding = 50;

var wrapper = d3.select("#wrapper");

var viz = wrapper.append('svg').attr({
        'id'    : 'viz',
        'height': height,
        'width' : width,
        'margin': 'auto'
    });

var nameSizeScale = d3.scale.linear().range([0 + padding, width - padding])

d3.json('people.json', function(e, d) {
    dots = viz.selectAll('circle')
    dots = dots.data(d);
    dots = dots.enter();
    dots = dots.append('circle');
    dots = dots.attr('class', 'person');

    var nameLengthExtent = d3.extent(d, function(element){
        return parseInt(element.firstname.length);
    });

    nameSizeScale.domain(nameLengthExtent);

    dots.attr({
        'r': 8,
        'cx': function(d, i) {
            return nameSizeScale(d.firstname.length);
        },
        'cy': function(d, i) {
            return i;
        },
        'fill': function(d, i) {
            if(d.sex === 'm ') {
                return '#059cdd';
            } else {
                return '#A40802';
            }
        },
        'stroke': function(d, i) {
            if(d.sex === 'm ') {
                return '#086F9C';
            } else {
                return '#630B08';
            }
        },
        'personName': function(d) {
            return d.firstname;
        },
        'personCity': function(d) {
            return d.city;
        }
    });
});

// ============================
// TOOLTIP FUNCTIONALITY
// ============================

// Making tooltip follow the mouse
var tooltip = document.getElementById('tooltip');

document.body.addEventListener('mousemove', function(e) {
    
    var posY = e.pageY - tooltip.clientHeight;
    var posX = e.pageX - tooltip.clientWidth;

    tooltip.style.left = posX + "px";
    tooltip.style.top = posY + "px";
})

// Adds mouseover event to each circle
var circles = document.getElementById("viz");

circles.addEventListener("mouseover", function(e) {
    clickedCircle = e.target;

    var personName = clickedCircle.getAttribute('personName') || "";
    var personCity = clickedCircle.getAttribute('personCity') || "";

    tooltip.style.display = "inline-block";
    tooltip.innerText = personName + "\n" + personCity;
})