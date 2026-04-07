/* monomuse shared js

   external stuff used here:
   - jquery 4.0.0 for toggles / accordion / slideshow
   - leaflet 1.9.4 for the map on explore.html
*/

function addYear() {
    const copyYear = document.getElementById("copyYear");

    if (copyYear) {
        copyYear.textContent = "© " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
    }
}

$(document).ready(function () {

    // mobile nav toggle
    $("#hamburger").on("click", function () {
        const navList = $("#nav-list");
        const isOpen = navList.hasClass("responsive");

        navList.toggleClass("responsive");
        $(this).attr("aria-expanded", String(!isOpen));
    });

    // close it after a tap on small screens so it feels cleaner
    $("#nav-list a").on("click", function () {
        if ($(window).width() <= 650) {
            $("#nav-list").removeClass("responsive");
            $("#hamburger").attr("aria-expanded", "false");
        }
    });

    // home page read more / read less
    $("#readMore").on("click", function () {
        $("#longIntro").slideDown(280, function () {
            $(this).attr("aria-hidden", "false");
        });

        $("#readMore").hide().attr("aria-expanded", "true");
        $("#readLess").show();
    });

    $("#readLess").on("click", function () {
        $("#longIntro").slideUp(220, function () {
            $(this).attr("aria-hidden", "true");
        });

        $("#readLess").hide();
        $("#readMore").show().attr("aria-expanded", "false");
    });

    // shared accordion for exhibits + explore page
    $(".accordion-trigger").on("click", function () {
        const trigger = $(this);
        const panelId = trigger.attr("aria-controls");
        const panel = $("#" + panelId);
        const isOpen = trigger.attr("aria-expanded") === "true";
        const accordion = trigger.closest(".accordion");

        accordion.find(".accordion-trigger").not(trigger).each(function () {
            const otherPanelId = $(this).attr("aria-controls");

            $(this)
                .attr("aria-expanded", "false")
                .find(".accordion-icon")
                .text("+");

            $("#" + otherPanelId).slideUp(200, function () {
                $(this).attr("hidden", "");
            });
        });

        if (isOpen) {
            trigger.attr("aria-expanded", "false");
            trigger.find(".accordion-icon").text("+");

            panel.slideUp(200, function () {
                $(this).attr("hidden", "");
            });
        } else {
            trigger.attr("aria-expanded", "true");
            trigger.find(".accordion-icon").text("x");

            panel.removeAttr("hidden").hide().slideDown(250);
        }
    });

    // rotating hero line on the home page
    const heroLines = [
        "Discover The<br>Wonders of Plants",
        "Immerse Yourself<br>in Living Art",
        "Where Botany<br>Meets Innovation"
    ];

    let heroIndex = 0;
    const heroHeadline = $("#heroHeadline");

    if (heroHeadline.length) {
        setInterval(function () {
            heroIndex = (heroIndex + 1) % heroLines.length;

            heroHeadline.fadeOut(350, function () {
                $(this).html(heroLines[heroIndex]).fadeIn(350);
            });
        }, 4000);
    }

    // exhibitions slideshow
    const slideshow = $("#exhSlideshow");

    if (slideshow.length) {
        const cards = slideshow.find(".exh-card");
        const totalCards = cards.length;
        const dotsWrap = $("#slideDots");
        let currentPage = 0;

        function cardsPerPage() {
            const width = $(window).width();

            if (width <= 650) {
                return 1;
            }

            if (width <= 1000) {
                return 2;
            }

            return 3;
        }

        function makeDots() {
            const pageCount = Math.ceil(totalCards / cardsPerPage());
            dotsWrap.empty();

            for (let i = 0; i < pageCount; i++) {
                $("<button>")
                    .addClass("slide-dot" + (i === 0 ? " active" : ""))
                    .attr("aria-label", "Go to page " + (i + 1))
                    .data("page", i)
                    .appendTo(dotsWrap);
            }
        }

        function showPage(pageNumber) {
            const perPage = cardsPerPage();
            const pageCount = Math.ceil(totalCards / perPage);

            pageNumber = ((pageNumber % pageCount) + pageCount) % pageCount;
            currentPage = pageNumber;

            cards.hide();
            cards.slice(pageNumber * perPage, pageNumber * perPage + perPage).fadeIn(250);

            dotsWrap.find(".slide-dot").removeClass("active");
            dotsWrap.find(".slide-dot").eq(pageNumber).addClass("active");
        }

        makeDots();
        showPage(0);

        $("#slideNext").on("click", function () {
            showPage(currentPage + 1);
        });

        $("#slidePrev").on("click", function () {
            showPage(currentPage - 1);
        });

        dotsWrap.on("click", ".slide-dot", function () {
            showPage($(this).data("page"));
        });

        $(window).on("resize", function () {
            makeDots();
            showPage(0);
        });
    }

    // donation amount buttons on membership page
    $(".mem-amount-btn").on("click", function () {
        $(".mem-amount-btn").removeClass("active").attr("aria-pressed", "false");
        $(this).addClass("active").attr("aria-pressed", "true");

        const amount = $(this).data("amount");

        if (amount === "custom") {
            $("#customAmountWrap").slideDown(200);
            $("#donateTotal").text("custom");
        } else {
            $("#customAmountWrap").slideUp(200);
            $("#donateTotal").text("$" + amount);
        }
    });

    $("#customAmount").on("input", function () {
        const value = parseInt($(this).val());

        if (value && value > 0) {
            $("#donateTotal").text("$" + value);
        } else {
            $("#donateTotal").text("custom");
        }
    });
});

// ticket prices stay flat at 18 each
const TICKET_PRICES = {
    general: 18,
    student: 18,
    member: 18
};

function updatePrice() {
    const ticketType = document.getElementById("ticketType");
    const ticketQty = document.getElementById("ticketQty");

    if (!ticketType || !ticketQty) {
        return;
    }

    const price = TICKET_PRICES[ticketType.value] || 18;
    const qty = parseInt(ticketQty.value) || 1;
    const total = price * qty;

    const pricePerTicket = document.getElementById("pricePerTicket");
    const totalPrice = document.getElementById("totalPrice");

    if (pricePerTicket) {
        pricePerTicket.textContent = "$" + price;
    }

    if (totalPrice) {
        totalPrice.textContent = "$" + total;
    }
}

function setError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorText = document.getElementById(fieldId + "-error");

    if (!field) {
        return;
    }

    if (message) {
        field.classList.add("invalid");

        if (errorText) {
            errorText.textContent = message;
        }
    } else {
        field.classList.remove("invalid");

        if (errorText) {
            errorText.textContent = "";
        }
    }
}

function placeOrder() {
    let valid = true;

    const visitDate = document.getElementById("visitDate");
    if (!visitDate || !visitDate.value) {
        setError("visitDate", "Please select a visit date.");
        valid = false;
    } else {
        setError("visitDate", "");
    }

    setError("ticketType", "");

    const ticketQty = document.getElementById("ticketQty");
    if (!ticketQty || ticketQty.value === "" || isNaN(ticketQty.value)) {
        setError("ticketQty", "Please enter a quantity.");
        valid = false;
    } else if (parseInt(ticketQty.value) < 1 || parseInt(ticketQty.value) > 10) {
        setError("ticketQty", "Quantity must be between 1 and 10.");
        valid = false;
    } else {
        setError("ticketQty", "");
    }

    const visitorEmail = document.getElementById("visitorEmail");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!visitorEmail || !visitorEmail.value.trim()) {
        setError("visitorEmail", "Email address is required.");
        valid = false;
    } else if (!emailRegex.test(visitorEmail.value.trim())) {
        setError("visitorEmail", "Please enter a valid email address.");
        valid = false;
    } else {
        setError("visitorEmail", "");
    }

    const zipCode = document.getElementById("zipCode");
    if (zipCode && zipCode.value.trim() !== "") {
        if (!/^\d{5}$/.test(zipCode.value.trim())) {
            setError("zipCode", "Zip code must be exactly 5 digits.");
            valid = false;
        } else {
            setError("zipCode", "");
        }
    } else if (zipCode) {
        setError("zipCode", "");
    }

    if (!valid) {
        const formError = document.getElementById("form-error");
        if (formError) {
            formError.textContent = "Please fix the errors above before continuing.";
        }
        return;
    }

    const ticketType = document.getElementById("ticketType").value;
    const price = TICKET_PRICES[ticketType] || 18;
    const total = price * parseInt(ticketQty.value);
    const mailingList = document.getElementById("mailingList");
    const joinedMailing = mailingList && mailingList.checked ? "yes" : "no";

    const params = new URLSearchParams({
        date: visitDate.value,
        type: ticketType,
        qty: ticketQty.value,
        total: total,
        email: visitorEmail.value.trim(),
        mailing: joinedMailing
    });

    window.location.href = "./confirmation.html?" + params.toString();
}

document.addEventListener("DOMContentLoaded", function () {
    // set ticket totals right away and keep them updated
    const ticketType = document.getElementById("ticketType");
    const ticketQty = document.getElementById("ticketQty");

    if (ticketType && ticketQty) {
        updatePrice();

        ["input", "change"].forEach(function (eventName) {
            ticketQty.addEventListener(eventName, updatePrice);
            ticketType.addEventListener(eventName, updatePrice);
        });
    }

    // fill in the confirmation page from url params
    if (document.getElementById("conf-date")) {
        const params = new URLSearchParams(window.location.search);

        function cap(word) {
            return word ? word.charAt(0).toUpperCase() + word.slice(1) : "—";
        }

        function formatDate(rawDate) {
            if (!rawDate) {
                return "—";
            }

            const dateObj = new Date(rawDate + "T00:00:00");
            return dateObj.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        }

        const date = params.get("date");
        const type = params.get("type");
        const qty = params.get("qty");
        const total = params.get("total");
        const email = params.get("email");
        const mailing = params.get("mailing");

        if (!date && !email) {
            const confirmCard = document.querySelector(".confirm-card");

            if (confirmCard) {
                confirmCard.innerHTML = "<h2>Order Summary</h2><p style='color:var(--text-muted);margin-top:16px;'>No order data found. Please return to the <a href='./tickets.html'>Buy Tickets</a> page.</p>";
            }
        } else {
            document.getElementById("conf-date").textContent = formatDate(date);
            document.getElementById("conf-type").textContent = cap(type);
            document.getElementById("conf-qty").textContent = qty || "-";
            document.getElementById("conf-email").textContent = email || "- ";
            document.getElementById("conf-mailing").textContent = mailing === "yes" ? "Subscribed ✓" : "Not subscribed";
            document.getElementById("conf-total").textContent = total ? "$" + total : "-";
        }
    }

    // map on the explore page
    const mapBox = document.getElementById("map");
    if (mapBox && typeof L !== "undefined") {
        const lat = 40.4426;
        const lng = -79.9427;

        const museumMap = L.map("map").setView([lat, lng], 15);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(museumMap);

        L.marker([lat, lng])
            .addTo(museumMap)
            .bindPopup("<strong>MonoMuse Museum</strong><br>123 Botanical Way, Pittsburgh PA")
            .openPopup();
    }
});

function submitDonation() {
    const activeAmountBtn = document.querySelector(".mem-amount-btn.active");
    const customAmount = document.getElementById("customAmount");
    let amount = 0;

    if (activeAmountBtn && activeAmountBtn.dataset.amount === "custom") {
        amount = parseInt(customAmount ? customAmount.value : 0) || 0;

        if (amount <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }
    } else if (activeAmountBtn) {
        amount = parseInt(activeAmountBtn.dataset.amount) || 0;
    }

    alert("Thank you for your donation of $" + amount + " to MonoMuse!\n\nThis is a simulated donation. No payment has been processed.");
}
