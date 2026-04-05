var x = 5;
var y = 7;
var z = x + y;
console.log(z);

var A = 'Hello';
var B = 'world!';
var C = A + B;
console.log(C);

function sumPrint(x1, y1) {
    console.log(x1 + y1);
}

sumPrint(x, y);
sumPrint(A, B);

if (C.length > z) {
    console.log(C);
    if (C.length < z) {
        console.log(z);
    }
} else {
    console.log('good job!');
}

var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
var L2 = ["Apple", "Banana", "Kiwi", "Orange"];

function findTheBanana(list) {
    list.forEach(function (fruit) {
        if (fruit === 'Banana') {
            alert("Banana found!");
        }
    });
}

var now = new Date();
var hour = now.getHours();

function addYear() {
    const year = new Date().getFullYear();
    const copyYear = document.getElementById("copyYear");
    if (copyYear) {
        copyYear.textContent = "© " + year + " MonoMuse Museum";
    }
}

function active_nav() {
    let NavLinks = document.querySelectorAll('nav li a');
    NavLinks.forEach(function (element) {
        if (window.location.href === element.href) {
            element.classList.add("active");
        }
    });
}
active_nav();

document.addEventListener("DOMContentLoaded", function () {
    // ── Read More / Read Less ──
    const readMore = document.getElementById("readMore");
    const readLess = document.getElementById("readLess");
    const longIntro = document.getElementById("longIntro");

    if (readMore && readLess && longIntro) {
        readMore.addEventListener("click", function () {
            longIntro.style.display = "block";
            readLess.style.display = "inline-block";
            readMore.style.display = "none";
        });

        readLess.addEventListener("click", function () {
            longIntro.style.display = "none";
            readLess.style.display = "none";
            readMore.style.display = "inline-block";
        });
    }

    // ── Hamburger toggle ──
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav_bar ul");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("responsive");
        });
    }

    // ── Leaflet map (only on explore page) ──
    if (document.getElementById("map")) {
        var museumMap = L.map('map').setView([40.4426, -79.9427], 14);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(museumMap);

        L.marker([40.4426, -79.9427]).addTo(museumMap)
            .bindPopup('<b>MonoMuse Museum</b><br>Contemporary Art & Technology')
            .openPopup();
    }
});

function showPurchaseForm(date) {
    const formSection = document.getElementById("purchaseFormSection");
    const selectedDateInput = document.getElementById("selectedDate");

    if (formSection) {
        formSection.style.display = "block";
    }

    if (selectedDateInput) {
        selectedDateInput.value = date;
    }
}

function submitPurchase() {
    alert("Redirecting to payment system.");
}