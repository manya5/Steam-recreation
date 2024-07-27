
let portraitView = window.matchMedia("(max-width: 640px)");
if(portraitView.matches) {
  let mainVid = document.querySelector(".main-video");
  mainVid.src = "./videos/main-video-portrait.mp4";
}

function loco() {
  function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true,
      lerp: 0.08,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform
        ? "transform"
        : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }

  init();
}

loco();

function loader() {
  let tl = gsap.timeline();

  for (let i = 0; i < 9; i++) {
    tl.to(".upper-circle", {
      // transform: `translate(-50%, -50%) rotateZ(-81deg)`,
      rotation: "+=36",
      duration: 0.5,
      ease: "circ.out",
    });
  }

  gsap.to(".lower-circle", {
    rotation: "955",
    duration: 5,
    ease: "circ.out",
  });

  tl.to(".loader", {
    delay: 1,
    y: "-100%",
    ease: "circ.out",
  });
}
loader();

// CURSORS
function landingPageCursor() {
  let imgCursor = document.querySelector(".img-crsr");
  let swipSlides = document.querySelectorAll(".swiper-slide img");
  
  swipSlides.forEach((slid) => {
    slid.addEventListener("mousemove", function (dets) {
      imgCursor.style.opacity = ".7";
      gsap.to(imgCursor, {
        x: dets.x - 60,
        y: dets.y - 760,
      });
    });
    slid.addEventListener("mouseleave", function (dets) {
      imgCursor.style.opacity = "0";
    });
  });
}
landingPageCursor();

let exploreSlices = document.querySelectorAll(".slice");
let expPage = document.querySelector(".explore-page");
let sliceOverlay = document.querySelector(".slice-overlay");



function landingPageSlider() {
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    mousewheel: true,
    parallax: true,
    speed: "600",
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
      rotate: 70,
      stretch: 30,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
}
landingPageSlider();




// CATEGORY SECTION
let active = 4;
let catSection = document.querySelector(".category-page");
let catPanel = document.querySelector(".panel");
let categories = document.querySelectorAll(".panel h2");
let first = document.querySelectorAll(".first");
let catImages = document.querySelectorAll(".cat-img");
let desc = document.querySelector(".cat-desc");
let catBgm;
let catCircle = document.querySelector(".circle");
let catToggle = 0;
var catOverlay;
let catCursor = document.querySelector(".category-crsr");
let catTitle = document.querySelectorAll(".category-title");
// let clickedCategory = document.querySelector(".clicked-category");
let clickedCatSections = document.querySelectorAll(".clicked-category");
let closeCatBtn;

catSection.addEventListener("mousemove", function (dets) {
  gsap.to(catCursor, {
    left: dets.x - 30,
    top: dets.y - 40,
  });
});

catImages.forEach(function (catImg) {
  catImg.addEventListener("mousemove", function () {
    gsap.to(catCursor, {
      scale: 1,
    });
  });
  catImg.addEventListener("mouseout", function () {
    gsap.to(catCursor, {
      scale: 0,
    });
  });
});


catImages.forEach(function (catImg, idx) {
  
  catImg.addEventListener("click", function () {
    catOverlay = document.querySelectorAll(".category-side-overlay");
    catBgm = clickedCatSections[idx].querySelector("audio");
    closeCatBtn = document.querySelectorAll(".close-cat");

    catTitle.forEach((t) => {
      t.style.display = "none";
    });
    catPanel.style.display = "none";
    catBgm.play();  
    clickedCatSections[idx].style.display = "flex";
    clickedCatSections[idx].style.opacity = 1;
    catOverlay[idx].style.opacity = 0.6;
    catOverlay[idx].style.display = "block";
    gsap.to(catImg, {
      opacity: 0,
      duration: 0.4,
    });
    gsap.to(desc, {
      opacity: 1,
    });

    closeCatBtn[idx].addEventListener("click", function () {
      catTitle.forEach((t) => {
        t.style.display = "block";
      });
      catPanel.style.display = "block";
      catBgm.pause();
      catBgm.currentTime = 0;
      clickedCatSections[idx].style.opacity = 0;
      clickedCatSections[idx].style.display = "none";
      catOverlay[idx].style.opacity = 0;
      catOverlay[idx].style.display = "none";
      gsap.to(catImg, {
        opacity: 1,
        duration: 0.4,
      });

      gsap.to(desc, {
        opacity: 0,
      });
    });
  });
});

gsap.to(categories, {
  opacity: 0.4,
});
greyout();
gsap.to(categories[active - 1], {
  opacity: 1,
  fontWeight: "bold",
});

gsap.to(first[active - 1], {
  opacity: 1,
  scale: 1,
});

categories.forEach((val, idx) => {
  val.addEventListener("click", () => {
    gsap.to(".circle", {
      rotate: -(4 - (idx + 1)) * 50,
      ease: Expo.easeInOut,
      duration: 1,
    });
    greyout();

    gsap.to(val, {
      opacity: 1,
      fontWeight: "bold",
    });
    gsap.to(first[idx], {
      opacity: 1,
      scale: 1,
    });
  });
});

function greyout() {
  gsap.to(categories, {
    opacity: 0.6,
    fontWeight: "normal",
  });
  gsap.to(first, {
    opacity: 0.4,
    scale: 0.2,
  });
}

let tl = gsap.timeline();

tl.from(".category-title", {
  x: -800,
  duration: 2,
  scrollTrigger: {
    scroller: ".main",
    trigger: ".category-page",
    start: "top 90%",
    end: "top 80%",
    scrub: 1,
  },
});

tl.from(".panel h2", {
  x: -500,
  duration: 0.4,
  stagger: 0.05,
  scrollTrigger: {
    scroller: ".main",
    trigger: ".category-page",
    start: "top 75%",
    end: "top 65%",
    scrub: 1,
  },
});
gsap.from(".circle", {
  rotate: 180,
  ease: "poweri.out",
  duration: 0.8,
  scrollTrigger: {
    scroller: ".main",
    trigger: ".category-page",
    start: "top 90%",
  },
});


let catHoverSound = document.querySelector(".category-panel-hover");
categories.forEach(function (cat) {
  cat.addEventListener("click", function () {
    catHoverSound.currentTime = ".25";
    catHoverSound.speed = "12";
    catHoverSound.play();
  });
});

function stopSongs() {
  catHoverSound.pause();
  catHoverSound.currentTime = 0;
}


let swiper = document.querySelector(".swiper");
let videoBtn = document.querySelector(".vdo-btn");
let closeBtn = document.querySelector(".close-btn");
let overlay = document.querySelector(".overlay");
let mainVid = document.querySelector(".main-video");

let playToggle = 0;
videoBtn.addEventListener("click", function () {
  if (playToggle === 0) {
    videoBtn.classList.remove("ri-play-circle-fill");
    videoBtn.classList.add("ri-close-circle-fill");
    mainVid.currentTime = 0;
    mainVid.play();
    mainVid.muted = !mainVid.muted;

    overlay.style.display = "none";
    gsap.to(swiper, {
      top: "-100vh",
    });
    playToggle = 1;
  } else if (playToggle === 1) {
    videoBtn.classList.remove("ri-close-circle-fill");
    videoBtn.classList.add("ri-play-circle-fill");
    overlay.style.display = "block";
    mainVid.muted = !mainVid.muted;
    gsap.to(swiper, {
      top: "50%",
    });
    playToggle = 0;
  }
});

function slider() {
  let imagesContainer = [
    [
      "images/landing-page-images/sottr/img1.webp",
      "images/landing-page-images/sottr/img2.webp",
      "images/landing-page-images/sottr/img3.webp",
      "images/landing-page-images/sottr/img4.webp",
    ],
    [
      "images/landing-page-images/rdr2/img1.webp",
      "images/landing-page-images/rdr2/img2.webp",
      "images/landing-page-images/rdr2/img3.webp",
      "images/landing-page-images/rdr2/img4.webp",
    ],
    [
      "images/landing-page-images/ghost-of-tsushima/img1.webp",
      "images/landing-page-images/ghost-of-tsushima/img2.webp",
      "images/landing-page-images/ghost-of-tsushima/img3.webp",
      "images/landing-page-images/ghost-of-tsushima/img4.webp",
    ],
    [
      "images/landing-page-images/pubg/img1.webp",
      "images/landing-page-images/pubg/img2.webp",
      "images/landing-page-images/pubg/img3.webp",
      "images/landing-page-images/pubg/img4.webp",
    ],
    [
      "images/landing-page-images/valhalla/img1.webp",
      "images/landing-page-images/valhalla/img2.webp",
      "images/landing-page-images/valhalla/img3.webp",
      "images/landing-page-images/valhalla/img4.webp",
    ],
    [
      "images/landing-page-images/apex/img1.webp",
      "images/landing-page-images/apex/img2.webp",
      "images/landing-page-images/apex/img3.webp",
      "images/landing-page-images/apex/img4.webp",
    ],
  ];

  let swiperSlides = document.querySelectorAll(".swiper-slide");
  let idx;
  idx = 0;

  let frontSlide = document.querySelector(".swiper-slide-fully-visible");

  setInterval(function () {
    if (idx > 3) {
      idx = 0;
    }
    swiperSlides.forEach((slide, index) => {
      if (slide.classList.contains("swiper-slide-active")) {
        slide.querySelector("img").src = `${imagesContainer[index][idx]}`;
      }
    });
    idx++;
  }, 4000);
}

slider();

// MORE GAMES
let mgCards = document.querySelectorAll(".mg-cards");
gsap.from(mgCards, {
  scale: 0,
  opacity: 0,
  duration: 4,
  ease: "poweri.out",
  stagger: 2,
  scrollTrigger: {
    scroller: ".main",
    trigger: ".mg-container",
    scrub: 4,
    start: "top 90%",
    end: "top 10%",
  },
});

// STEAM GIFT CARDS SECTION

let giftContainer = document.querySelector(".container");

function giftCardsAnimation() {
  let leftContCards = document.querySelectorAll(".gift-cards");
  let leftCardsArr = [...leftContCards];

  function updateCards() {
    leftCardsArr.forEach((e) => {
      e.classList.remove("card1");
      e.classList.remove("card2");
      e.classList.remove("card3");
      e.classList.remove("card4");
      e.classList.remove("card5");
      e.classList.remove("card6");
    });
    leftCardsArr.forEach((card, idx) => {
      card.classList.add(`card${idx + 1}`);
    });
  }

  function animateLeftCards() {
    leftCardsArr.push(leftCardsArr.shift());
    // leftCardsArr.unshift(leftCardsArr.pop());
    updateCards();
  }

  let rightContCards = document.querySelectorAll(".gift-rcards");
  let rightCardsArr = [...rightContCards];

  function updateRCards() {
    rightCardsArr.forEach((e) => {
      e.classList.remove("rcard1");
      e.classList.remove("rcard2");
      e.classList.remove("rcard3");
      e.classList.remove("rcard4");
      e.classList.remove("rcard5");
      e.classList.remove("rcard6");
    });
    rightCardsArr.forEach((card, idx) => {
      card.classList.add(`rcard${idx + 1}`);
    });
  }

  function animateRightCards() {
    rightCardsArr.push(rightCardsArr.shift());
    // rightCardsArr.unshift(rightCardsArr.pop());
    updateRCards();
  }

  setInterval(() => {
    animateLeftCards();
    animateRightCards();
  }, 900);
}

giftCardsAnimation();

// NAVIGATION MENU
function navMenu() {
  let navBtn = document.querySelector(".nav-btn");
  let closeNav = document.querySelector(".close-nav");
  let navMenu = document.querySelector(".nav-menu");
  let openNavSound = document.querySelector(".open-nav-sound");
  let closeNavSound = document.querySelector(".close-nav-sound");
  let navOverlay = document.querySelector(".nav-overlay");

  openNavSound.volume = 1;
  closeNavSound.volume = 1;

  navBtn.addEventListener("click", function () {
    openNavSound.currentTime = ".20";
    navOverlay.style.display = "block";
    openNavSound.play();
    gsap.to(navMenu, {
      display: "flex",
      duration: 0.2,
      ease: "poweri.out",
      opacity: 1,
      right: "0%",
    });
  });

  closeNav.addEventListener("click", function () {
    navOverlay.style.display = "none";
    closeNavSound.play();
    gsap.to(navMenu, {
      display: "none",
      duration: 0.2,
      ease: "poweri.out",
      opacity: 0,
      right: "-50%",
    });
  });
}
navMenu();

let navItems = document.querySelectorAll(".nav-items h1");
let navHoverSound = document.querySelector(".nav-hover-sound");

navItems.forEach(function (item) {
  item.addEventListener("mouseover", function () {
    navHoverSound.play();
  });
  item.addEventListener("mouseout", function () {
    navHoverSound.pause();
    navHoverSound.currentTime = "0";
  });
});

gsap.from(".offer-title h1", {
  x: -800,
  opacity: 0,
  scrollTrigger: {
    scroller: ".main",
    trigger: ".offer-page",
    start: "top 60%",
    end: "top 50%",
    scrub: 1,
  },
});




let expTitles = document.querySelectorAll(".exp-titles");
let selectedCont = document.querySelector(".selected-section");
expTitles.forEach((etitle, eidx) => {
  etitle.addEventListener("click", function () {
    selectedCont.style.transform = `translateX(-${eidx * 100}%)`;
  });
});

let NewAndTrendingCont = document.querySelector(".new-and-trending-section");

// INSTALL STEAM MENU
function installSteam() {
  let installBtn = document.querySelector(".install-btn");
  let closeBtnSteam = document.querySelector(".close-steam-install");
  let installSteam = document.querySelector(".install-steam-section");
  let navOverlay = document.querySelector(".nav-overlay");

  installBtn.addEventListener("click", function () {
    navOverlay.style.display = "block";
    gsap.to(installSteam, {
      duration: 0.2,
      ease: "poweri.out",
      top: "50%",
    });
  });

  closeBtnSteam.addEventListener("click", function () {
    navOverlay.style.display = "none";
    gsap.to(installSteam, {
      duration: 0.2,
      ease: "poweri.out",
      top: "-50%",
    });
  });
}
installSteam();

let slices = document.querySelectorAll(".slice");
let sliceHover = document.querySelector(".slice-hover-sound");
slices.forEach((slice) => {
  slice.addEventListener("mousemove", () => {
    sliceHover.play();
  });
  slice.addEventListener("mouseout", () => {
    sliceHover.pause();
    sliceHover.currentTime = "0";
  });
});

// Shuffle letter Navigation Hover
jQuery("document").ready(function ($) {
  // Set effect velocity in ms
  var velocity = 50;

  var shuffleElement = $(".shuffle");

  $.each(shuffleElement, function (index, item) {
    $(item).attr("data-text", $(item).text());
  });

  var shuffle = function (o) {
    for (
      var j, x, i = o.length;
      i;
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  };

  var shuffleText = function (element, originalText) {
    var elementTextArray = [];
    var randomText = [];

    for (i = 0; i < originalText.length; i++) {
      elementTextArray.push(originalText.charAt([i]));
    }

    var repeatShuffle = function (times, index) {
      if (index == times) {
        element.text(originalText);
        return;
      }

      setTimeout(function () {
        randomText = shuffle(elementTextArray);
        for (var i = 0; i < index; i++) {
          randomText[i] = originalText[i];
        }
        randomText = randomText.join("");
        element.text(randomText);
        index++;
        repeatShuffle(times, index);
      }, velocity);
    };
    repeatShuffle(element.text().length, 0);
  };

  shuffleElement.mouseenter(function () {
    shuffleText($(this), $(this).data("text"));
  });
});

// New and Trending Section

let exploreTitles = document.querySelectorAll(".exp-titles");

exploreTitles.forEach(function (exTitle) {
  exTitle.addEventListener("click", function () {
    inactiveTitle();
    exTitle.classList.add("active-title");
  });
});

function inactiveTitle() {
  exploreTitles.forEach(function (exTitle) {
    exTitle.classList.remove("active-title");
  });
}


let winCheck = window.matchMedia("(min-width: 1280px)");

if(winCheck.matches) {
  let mgCont = document.querySelector(".mg-container");
  gsap.to(mgCont, {
    scale: 1.4,
    duration: 1,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".mg-container", 
      scrub: .2,
      start: "top -100%",
    }
  })

}




// ---------- FOOTER -------------

function footerAnimation() {
  var footerSteam = document.querySelector(".footer-title");
  let clutter = "";
  let footerTitle = footerSteam.textContent;
  for (let i = 0; i < footerTitle.length; i++) {
    clutter += `<span>${footerTitle[i]}</span>`;
  }
  footerSteam.innerHTML = clutter;

  gsap.from(".footer-title span", {
    top: "-350px",
    duration: 0.8,
    stagger: 0.1,
    ease: "poweri.out",
    scrollTrigger: {
      scroller: ".main",
      trigger: ".footer-bottom",
      start: "top 85%",
      end: "top 82%",
      scrub: 3,
    },
  });

  gsap.from(".btm-line, .top-line", {
    width: 0,
    duration: 1,
    delay: 0.5,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".f-mid",
      start: "top 60%",
      end: "top 50%",
      scrub: 1,
    },
  });

  gsap.from(".valve-section", {
    opacity: 0,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".f-mid",
      start: "top 50%",
      end: "top 40%",
      scrub: 1,
    },
  });

  gsap.from(".footer-top", {
    y: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      scroller: ".main",
      trigger: ".footer-top",
      start: "top 50%",
      end: "top 45%",
      scrub: 1,
    },
  });
}
footerAnimation();

function footerTitleHoverAnime() {
  let footerCircle = document.querySelector(".footer-circle");
  let footerBottom = document.querySelector(".footer-bottom");

  footerBottom.addEventListener("mousemove", (dets) => {
    gsap.to(footerCircle, {
      left: dets.x,
      y: dets.y - 500,
    });
    gsap.to(footerCircle, {
      // display: "block",
      scale: 20,
      duration: 2,
    });
  });

  footerBottom.addEventListener("mouseleave", () => {
    gsap.to(footerCircle, {
      // display: "none",
      scale: 0,
      duration: 2.4,
    });
  });
}

footerTitleHoverAnime();