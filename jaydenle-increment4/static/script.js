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
}
else {
    console.log('good job!');
}

L1 = ["Watermelon","Pineapple","Pear","Banana"];
L2 = ["Apple","Banana","Kiwi","Orange"];

// function findTheBanana(list) {
//     for (let fruit of list) {
//         if (fruit === 'Banana'){
//             alert('Banana found');
//         }
//     }
// }

function findTheBanana(list) {
    list.forEach(function(fruit) {
        if (fruit === 'Banana') {
            alert("Banana found!");
        }
    });
}

// findTheBanana(L1);
// findTheBanana(L2);

var now = new Date()
var hour = now.getHours()

// function greeting(x){
//     let message;

//     if(x < 5 || x >= 20) {
//         message = "Good night";
//     } else if (x < 12) {
//         message = "Good morning";
//     } else if (x < 18) {
//         message = "Good afternoon";
//     } else {
//         message = "Good evening";
//     }

//     document.getElementById("greeting").innerHTML = message;
// }

// greeting(hour);

function addYear() {
    const year = new Date().getFullYear();

    const copyYear = document.getElementById("copyYear");

    copyYear.textContent = year;

}


function active_nav() {
    let NavLinks = document.querySelectorAll('nav li a');
    console.log(NavLinks);
    NavLinks.forEach(element => {
        if (window.location.href == element.href) {
            element.classList.add("active");
        }
    });
}
active_nav();

document.addEventListener("DOMContentLoaded", function () {
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

