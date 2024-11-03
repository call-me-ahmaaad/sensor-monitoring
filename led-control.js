const led_red = document.getElementById("led-red");
const led_green = document.getElementById("led-green");
const led_blue = document.getElementById("led-blue");

const lamp_red = document.getElementById("lamp-red");
const lamp_green = document.getElementById("lamp-green");
const lamp_blue = document.getElementById("lamp-blue");

led_red.addEventListener("click", function(){
    led_red.classList.toggle("active");
    lamp_red.classList.toggle("active");
});

led_green.addEventListener("click", function(){
    led_green.classList.toggle("active");
    lamp_green.classList.toggle("active");
});

led_blue.addEventListener("click", function(){
    led_blue.classList.toggle("active");
    lamp_blue.classList.toggle("active");
});