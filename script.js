/* =========================================================
   PROPERTY DATA
   Single source of truth for the featured listings shown on
   listings.html and rendered in full on property.html.
   Swap in real photos/details here when they're ready —
   "images" repeats the one photo per property for now so the
   gallery has something to click through.
   ========================================================= */

const PROPERTIES_DATA = [
    {
        id: 1,
        title: "5-Bedroom Townhouse",
        price: "$900,000",
        location: "East Airport",
        category: "Sale",
        badgeText: "For Sale",
        badgeClass: "Sale",
        specs: ["5 Beds", "6 Baths", "1 Boy's Qrt"],
        images: ["/images/EAS7.jpg", "/images/EAS1.jpg", "/images/EAS2.jpg","/images/EAS3.jpg","/images/EAS4.jpg","/images/EAS5.jpg","/images/EAS6.jpg"],
        description: "A newly built 5-bedroom townhouse in a quiet, gated section of East Airport. Featuring an open-plan living and dining area, a fitted kitchen, and private parking. Ideal for a family looking for a secure, well-located."
    },
    {
        id: 2,
        title: "4-Bedroom Townhouse",
        price: "$450,000",
        location: "Tse Addo, Accra",
        category: "sale",
        badgeText: "For Sale",
        badgeClass: "sale",
        specs: ["4 Beds", "5 Baths", "Swimming Pool","Kitchenette","Living area","Balcony"],
        images: ["/images/VXY2.jpeg","/images/VXY7.jpeg","/images/VXY10.jpg","/images/VXY3.jpeg","/images/VXY1.jpeg","/images/VXY6.jpeg","/images/      VXY4.jpeg"],
        description: "A spacious 4-bedroom Townhouse with en-suite bathrooms throughout, a large compound, and a modern kitchen. Located on a titled plot in a fast-developing residential area of Tse Addo, minutes from the main road."
    },
    {
        id: 3,
        title: "Open-Plan Office Space",
        price: "GH\u20B5 17,000 / month",
        location: "Tse Addo, Accra",
        category: "commercial",
        badgeText: "For Rent",
        badgeClass: "rent",
        specs: ["160 sqm", "2 Baths", "Kitchenette"],
        images: ["/images/Shop.jpg", "/images/Office.jpg"],
        description: "A bright, open-plan office suite suitable for a growing team, with dedicated parking for up to 10 vehicles, backup power provision, and flexible partitioning options available on request."
    },
    {
        id: 4,
        title: "3 bedroom Apartment",
        price: "GH\u20B5 9,000",
        location: "Tse Addo, Accra",
        category: "rent",
        badgeText: "For Rent",
        badgeClass: "rent",
        specs: ["3 bedrooms", "fitted kitchen", "Living area","Balcony","1 visitor's washroom","Service charge inclusive"],
        images: ["/images/3bd1.jpg", "/images/3bd2.jpg", "/images/3bd3.jpg","/images/3bd4.jpg","/images/3bd5.jpg","/images/3bd6.jpg"],
        description:"A spacious 3-bedroom Apartment For Rent with en-suite bathrooms throughout, a large compound, and a modern kitchen. Located in Tse Addo, minutes from the main road."
    },
    {
        id: 5,
        title: "4-Bedroom Apartment",
        price: "$1,500 / month",
        location: "Tse Addo, Accra",
        category: "rent",
        badgeText: "For Rent",
        badgeClass: "rent",
        specs: ["4 Bedrooms", "5 washrooms", "Fitted Kitchen","Spacious Living area","Self-compound"],
        images: ["/images/4bd1.jpg", "/images/4bd2.jpg", "/images/4bd3.jpg","/images/4bd4.jpg","/images/4bd5.jpg"],
        description: "A comfortable 4-bedroom apartment with a fitted kitchen, and compound parking."
    },
    {
        id: 6,
        title: "Office Space",
        price: "GH\u20B5 13,000",
        location: "Tse Addo, Accra",
        category: "commercial",
        badgeText: "For Rent",
        badgeClass: "rent",
        specs: ["74 sqm", "2 Bath", "Corporate Space"],
        images: ["/images/Office.jpg", "/images/Shop.jpg"],
        description: "A first-floor unit on a busy road, suitable for an Office and showroom in Tse Addo."
    }
];


/* =========================================================
   PAGE TRANSITION CURTAIN
   Runs immediately (not tied to DOMContentLoaded) so the
   entrance fade starts as soon as possible on every page.
   ========================================================= */

(function pageTransitions() {

    const curtain = document.getElementById("pageTransition");
    if (!curtain) {
        return;
    }

    // Reveal the page shortly after it paints
    function revealPage() {
        requestAnimationFrame(function () {
            curtain.classList.add("hide");
        });
    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
        revealPage();
    } else {
        document.addEventListener("DOMContentLoaded", revealPage);
    }

    // Intercept clicks on internal page links so we can play the
    // exit transition before actually navigating away.
    document.addEventListener("click", function (event) {

        const link = event.target.closest("a");
        if (!link) {
            return;
        }

        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        // Skip: same-page anchors, external links, new-tab links,
        // and non-navigational schemes (tel/mailto/etc.)
        if (
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("tel:") ||
            href.startsWith("mailto:") ||
            link.target === "_blank" ||
            link.hasAttribute("download")
        ) {
            return;
        }

        // Only intercept links to local .html pages (with optional
        // query string and/or hash), e.g. "contact.html",
        // "property.html?id=2", "contact.html?property=X#viewing-form"
        if (!/\.html(\?.*)?(#.*)?$/.test(href)) {
            return;
        }

        event.preventDefault();
        curtain.classList.remove("hide");

        window.setTimeout(function () {
            window.location.href = href;
        }, 450);
    });

})();


document.addEventListener("DOMContentLoaded", function () {

    /* HEADER SCROLL STATE */

    const header = document.querySelector(".header");

    if (header) {

        function updateHeaderScroll() {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        updateHeaderScroll();
        window.addEventListener("scroll", updateHeaderScroll, { passive: true });
    }


    /* MOBILE MENU */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* SEARCH */

    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    if (searchForm && searchInput) {

        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const query = searchInput.value.trim();

            if (query === "") {
                searchInput.focus();
                return;
            }

            alert('Searching properties for: "' + query + '"');
            console.log("Property search:", query);
            searchInput.value = "";
        });
    }


    /* STATS COUNTER (animates once, when scrolled into view) */

    const statNumbers = document.querySelectorAll(".stat-number");

    function animateCounter(el) {
        const target = parseInt(el.getAttribute("data-target"), 10) || 0;
        const duration = 1500;
        const startTime = performance.now();

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }

    if (statNumbers.length) {

        if ("IntersectionObserver" in window) {

            const statsObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });

            statNumbers.forEach(function (el) {
                statsObserver.observe(el);
            });

        } else {
            statNumbers.forEach(function (el) {
                animateCounter(el);
            });
        }
    }


    /* SCROLL-REVEAL FOR CARDS */

    const revealSelectors = [
        ".service-card", ".portfolio-card", ".listing-card",
        ".testimonial-card", ".highlight-card", ".contact-card",
        ".quicklink-card", ".stat-item"
    ];

    const revealEls = document.querySelectorAll(revealSelectors.join(","));

    if (revealEls.length) {

        if ("IntersectionObserver" in window) {

            const revealObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            revealEls.forEach(function (el, index) {
                el.classList.add("reveal");
                el.style.transitionDelay = (index % 4) * 80 + "ms";
                revealObserver.observe(el);
            });

        } else {
            revealEls.forEach(function (el) {
                el.classList.add("reveal", "in-view");
            });
        }
    }


    /* BACK TO TOP BUTTON (injected so no HTML edits were needed) */

    const floatingContact = document.querySelector(".floating-contact");

    if (floatingContact) {

        const backToTop = document.createElement("button");
        backToTop.type = "button";
        backToTop.className = "back-to-top";
        backToTop.setAttribute("aria-label", "Back to top");
        backToTop.textContent = "\u2191";
        floatingContact.insertAdjacentElement("beforebegin", backToTop);

        function toggleBackToTop() {
            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        }

        toggleBackToTop();
        window.addEventListener("scroll", toggleBackToTop, { passive: true });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    /* FEATURED LISTINGS FILTER */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const listingCards = document.querySelectorAll(".listing-card");
    const listingsEmpty = document.getElementById("listingsEmpty");

    function applyListingsFilter(filter) {
        let visibleCount = 0;

        listingCards.forEach(function (card) {
            const category = card.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                card.classList.remove("hide");
                visibleCount++;
            } else {
                card.classList.add("hide");
            }
        });

        if (listingsEmpty) {
            listingsEmpty.style.display = visibleCount === 0 ? "block" : "none";
        }
    }

    if (filterButtons.length && listingCards.length) {

        filterButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                filterButtons.forEach(function (btn) {
                    btn.classList.remove("active");
                });
                button.classList.add("active");

                applyListingsFilter(button.getAttribute("data-filter"));
            });
        });

        // Support arriving from a link like listings.html?filter=commercial
        const urlFilter = new URLSearchParams(window.location.search).get("filter");

        if (urlFilter) {
            const matchingBtn = document.querySelector('.filter-btn[data-filter="' + urlFilter + '"]');

            if (matchingBtn) {
                filterButtons.forEach(function (btn) {
                    btn.classList.remove("active");
                });
                matchingBtn.classList.add("active");
                applyListingsFilter(urlFilter);
            }
        }
    }


    /* FAQ ACCORDION */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }

        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("active");

            faqItems.forEach(function (other) {
                if (other !== item) {
                    other.classList.remove("active");
                    other.querySelector(".faq-answer").style.maxHeight = null;
                }
            });

            if (isOpen) {
                item.classList.remove("active");
                answer.style.maxHeight = null;
            } else {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });


    /* VIEWING / ENQUIRY TABS */

    const tabButtons = document.querySelectorAll(".tab-btn");
    const requestType = document.getElementById("requestType");
    const viewingFields = document.querySelector(".viewing-fields");
    const clientForm = document.getElementById("clientForm");
    const formStatus = document.getElementById("formStatus");

    tabButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            tabButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            button.classList.add("active");

            const type = button.getAttribute("data-tab");
            requestType.value = type;

            if (type === "enquiry") {
                viewingFields.classList.add("hidden");
            } else {
                viewingFields.classList.remove("hidden");
            }

            formStatus.textContent = "";
            formStatus.className = "form-status";
        });
    });


    /* CLIENT FORM */

    if (clientForm) {

        // Pre-fill the "Property of Interest" field if we arrived
        // here from a listing's "Book a Viewing" link, e.g.
        // contact.html?property=3-Bedroom%20Townhouse#viewing-form
        const propertyField = document.getElementById("property");
        const prefillProperty = new URLSearchParams(window.location.search).get("property");

        if (propertyField && prefillProperty) {
            propertyField.value = prefillProperty;
        }

        clientForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();

            if (!fullName || !phone || !email) {
                formStatus.textContent = "Please fill in your name, phone number, and email.";
                formStatus.className = "form-status error";
                return;
            }

            const requestName = requestType.value === "viewing" ? "viewing request" : "enquiry";
            const submitBtn = clientForm.querySelector(".submit-btn");

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
            }

            formStatus.textContent = "";
            formStatus.className = "form-status";

            const payload = new FormData(clientForm);

            fetch(clientForm.action, {
                method: "POST",
                body: payload,
                headers: { "Accept": "application/json" }
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("Request failed");
                    }
                    return response.json().catch(function () { return {}; });
                })
                .then(function () {

                    formStatus.textContent = "Thank you! Your " + requestName + " has been received. We will contact you shortly.";
                    formStatus.className = "form-status success";

                    clientForm.reset();

                    requestType.value = "viewing";
                    viewingFields.classList.remove("hidden");

                    tabButtons.forEach(function (btn) {
                        btn.classList.remove("active");
                    });

                    if (tabButtons[0]) {
                        tabButtons[0].classList.add("active");
                    }
                })
                .catch(function (error) {
                    console.error("Client form submission error:", error);
                    formStatus.textContent = "Sorry, something went wrong sending your request. Please call us directly at +233 54 550 1104.";
                    formStatus.className = "form-status error";
                })
                .finally(function () {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = "Submit Request";
                    }
                });
        });
    }


    /* PROPERTY DETAIL PAGE RENDERING */

    const propertyDetailSection = document.getElementById("propertyDetail");

    if (propertyDetailSection) {

        const requestedId = parseInt(new URLSearchParams(window.location.search).get("id"), 10);
        const property = PROPERTIES_DATA.find(function (p) { return p.id === requestedId; });

        if (!property) {

            propertyDetailSection.innerHTML =
                '<div class="section-container">' +
                '<div class="property-not-found">' +
                '<h2>Property Not Found</h2>' +
                '<p>The property you are looking for is no longer available or the link is incorrect.</p>' +
                '<a href="listings.html">&larr; Back to Listings</a>' +
                '</div></div>';

        } else {

            document.title = property.title + " | Danith Properties & Management Services Ltd.";

            const bannerTitle = document.getElementById("bannerTitle");
            const mainImage = document.getElementById("mainImage");
            const detailBadge = document.getElementById("detailBadge");
            const detailPrice = document.getElementById("detailPrice");
            const detailTitle = document.getElementById("detailTitle");
            const detailLocation = document.getElementById("detailLocation");
            const detailSpecs = document.getElementById("detailSpecs");
            const detailDescription = document.getElementById("detailDescription");
            const galleryThumbs = document.getElementById("galleryThumbs");
            const bookViewingBtn = document.getElementById("bookViewingBtn");

            if (bannerTitle) bannerTitle.textContent = property.title;
            if (detailTitle) detailTitle.textContent = property.title;
            if (detailPrice) detailPrice.textContent = property.price;
            if (detailLocation) detailLocation.textContent = property.location;
            if (detailDescription) detailDescription.textContent = property.description;

            if (detailBadge) {
                detailBadge.textContent = property.badgeText;
                detailBadge.className = "listing-badge " + property.badgeClass;
            }

            if (detailSpecs) {
                detailSpecs.innerHTML = "";
                property.specs.forEach(function (spec) {
                    const span = document.createElement("span");
                    span.textContent = spec;
                    detailSpecs.appendChild(span);
                });
            }

            if (mainImage) {
                mainImage.src = property.images[0];
                mainImage.alt = property.title;
            }

            if (galleryThumbs) {
                galleryThumbs.innerHTML = "";
                property.images.forEach(function (src, index) {
                    const thumb = document.createElement("img");
                    thumb.src = src;
                    thumb.alt = property.title + " photo " + (index + 1);
                    if (index === 0) {
                        thumb.classList.add("active");
                    }
                    thumb.addEventListener("click", function () {
                        if (mainImage) {
                            mainImage.src = src;
                        }
                        galleryThumbs.querySelectorAll("img").forEach(function (t) {
                            t.classList.remove("active");
                        });
                        thumb.classList.add("active");
                    });
                    galleryThumbs.appendChild(thumb);
                });
            }

            if (bookViewingBtn) {
                bookViewingBtn.setAttribute(
                    "href",
                    "contact.html?property=" + encodeURIComponent(property.title) + "#viewing-form"
                );
            }
        }
    }


    /* SMOOTH SCROLL for in-page anchors */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

});