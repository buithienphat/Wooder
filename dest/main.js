// menu moblie

function handleMenuM() {
  const btnmenuElement = document.querySelector(".btnmenu");
  const menuMoblieElement = document.querySelector(".nav-m");
  const headerLogoElement = document.querySelector(".header__logo");
  const langElement = document.querySelector(".header__right-lang");
  btnmenuElement.addEventListener("click", function () {
    btnmenuElement.classList.toggle("--active");
    menuMoblieElement.classList.toggle("--active");

    document.body.classList.toggle("--disable-scroll");
    headerLogoElement.classList.toggle("--hide");
    langElement.classList.toggle("--hide");
  });

  // windows not resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1199) {
      menuMoblieElement.classList.remove("--active");
      document.body.classList.remove("--disable-scroll");
      btnmenuElement.classList.remove("--active");
      headerLogoElement.classList.remove("--hide");
      langElement.classList.remove("--hide");
    }
  });
  const menuListDes = document.querySelectorAll(".nav-m li a");
  let heightHeader = document.querySelector(".header").offsetHeight;

  menuListDes.forEach((menuItem) => {
    const getNameSc = menuItem.getAttribute("href");
    const getSc = document.querySelector(`.sc${getNameSc.slice(1)}`);
    menuItem.addEventListener("click", function (e) {
      e.preventDefault();
      menuListDes.forEach((curr) => {
        curr.classList.remove("--active");
      });
      this.classList.add("--active");
      window.scroll({
        top: getSc.offsetTop - heightHeader + 1,
        behavior: "smooth",
      });
      menuMoblieElement.classList.remove("--active");
      document.body.classList.remove("--disable-scroll");
      btnmenuElement.classList.remove("--active");
      headerLogoElement.classList.remove("--hide");
      langElement.classList.remove("--hide");
    });
  });
}
handleMenuM();

// hide header
function hideHeader() {
  const headerLogo = document.querySelector(".header__logo");
  headerLogo.classList.add("--hide");
  const headerMenu = document.querySelector(".header__nav");
  headerMenu.classList.add("--hide");
}

// popup video
function handlePopup() {
  const imgElement = document.querySelectorAll(".scvideos__list-item .img");
  const popupElement = document.querySelector(".popup");
  const linkELement = document.querySelector(".popup__video iframe");
  imgElement.forEach((videoItem) => {
    const urlVideo = videoItem.parentElement.getAttribute("data-src");
    videoItem.addEventListener("click", function () {
      popupElement.classList.add("--active");
      linkELement.setAttribute("src", urlVideo + "?autoplay=1");
    });
    closeVideo();
  });

  const btnPlay = document.querySelector(".btn.--btnvideo");
  const urlbtnVideo = btnPlay.getAttribute("data-src");
  btnPlay.addEventListener("click", function () {
    popupElement.classList.add("--active");
    linkELement.setAttribute("src", urlbtnVideo + "?autoplay=1");
  });

  function closeVideo() {
    const closeElement = document.querySelector(".popup__video-close");
    closeElement.addEventListener("click", function () {
      popupElement.classList.remove("--active");
      linkELement.setAttribute("src", "");
    });
    // press ESC hide popup
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 27) {
        popupElement.classList.remove("--active");
        linkELement.setAttribute("src", "");
      }
    });
  }
}
handlePopup();

// // parse JSON từ user
// const convert = (str) => {
//   const url = new URL(str).search.substring(1);
//   return JSON.parse(
//     '{"' +
//       decodeURI(url)
//         .replace(/"/g, '\\"')
//         .replace(/&/g, '","')
//         .replace(/=/g, '":"') +
//       '"}'
//   );
// };
// const t = convert("https://www.youtube.com/watch?v=nZtwwR-0YX8");
// console.log(t);

// tab content
// const tabContent = document.querySelectorAll(".scnews__warplist .listcards");
// const tabList = document.querySelectorAll(".scnews__tabs-item");
// tabList.forEach((tabItem) => {
//   tabItem.addEventListener("click", function () {
//     tabList.forEach((item) => {
//       item.classList.remove("--active");
//     });
//     tabContent.forEach((item) => {
//       item.classList.remove("--active");
//     });
//     tabItem.classList.add("--active");
//     const dataTab = tabItem.getAttribute("data-tab");
//     console.log(dataTab);
//     const tabCurrent = document.querySelector(`.list-${dataTab}`);
//     console.log(tabCurrent);
//     tabCurrent.classList.add("--active");
//   });
// });

// scroll to top
function btnBackToTop(elementDOM) {
  const scrollBtn = document.querySelector(`.${elementDOM}`);
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
btnBackToTop("footer__srolltop");

// change background Header
function changeBgHeader() {
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (this.scrollY > 500) {
      header.classList.add("--active");
    } else {
      header.classList.remove("--active");
    }
  });
}
changeBgHeader();

// select box
function selectBox(boxDOM) {
  const boxSelect = document.querySelector(`.${boxDOM}`);
  const a = boxSelect.firstElementChild;
  boxSelect.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("--active");
  });

  // click out hide select
  document.addEventListener("click", function () {
    boxSelect.classList.remove("--active");
  });

  //Change language
  const selectList = document.querySelectorAll(`.${boxDOM} ul li`);
  const selectCurrent = boxSelect.firstElementChild;
  selectList.forEach((item) => {
    item.addEventListener("click", function (e) {
      const itemValue = item.innerText;
      const itemPreValue = selectCurrent.innerText;
      selectCurrent.firstElementChild.innerText = itemValue;
      item.innerText = itemPreValue;
    });
  });
}

selectBox("header__right-lang");

// Active funtion
function toggleActive(listDOM) {
  listDOM.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      listDOM.forEach((item) => {
        item.classList.remove("--active");
      });
      this.classList.add("--active");
    });
  });
}
toggleActive(document.querySelectorAll(".header__nav li a"));

// slider
function handleSlider() {
  const elem = document.querySelector(".schero__slider");
  const flkty = new Flickity(elem, {
    // options
    cellAlign: "left",
    contain: false,
    draggable: ">1",
    wrapAround: true,
    autoPlay: true,
    autoPlay: 3000,
    prevNextButtons: false,
    pauseAutoPlayOnHover: false,
    setGallerySize: false,
    on: {
      ready: function () {
        handleDotsSlider();
      },
      change: function (i) {
        pagingNumber(i);
      },
    },
  });

  // controls btn slider
  const btnPrev = document.querySelector(".btnslider.--prev");
  btnNext = document.querySelector(".btnslider.--next");

  btnPrev.addEventListener("click", function () {
    flkty.previous(true);
  });
  btnNext.addEventListener("click", function () {
    flkty.next(true);
  });

  // page dots silder
  function handleDotsSlider() {
    const dots = document.querySelector(".flickity-page-dots");
    const dotsBottom = document.querySelector(".schero__bottom-paging");
    dotsBottom.appendChild(dots);
  }

  //paging munber
  function pagingNumber(index) {
    const number = document.querySelector(".number__current");
    number.textContent = (index + 1).toString().padStart(2, "0");
  }
}
handleSlider();

// carousel
function handleCarousel() {
  const elem = document.querySelector(".sccarousel__img-wrap");
  const progressBar = document.querySelector(".sccarousel__progress-bar");
  const flkty = new Flickity(elem, {
    cellAlign: "left",
    contain: true,
    draggable: ">1",
    prevNextButtons: false,
    pageDots: false,
    freeScroll: true,
  });
  flkty.on("scroll", function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + "%";
  });
}

// tabs Post
function hanldeTab(listDOM) {
  const tabs = document.querySelectorAll(`.${listDOM}`);
  const posts = document.querySelectorAll(".listcards");
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", function () {
      tabs.forEach((item) => {
        item.classList.remove("--active");
      });
      tab.classList.add("--active");
      posts.forEach((item) => {
        item.classList.remove("--active");
      });
      posts[i].classList.toggle("--active");
    });
  });
}

hanldeTab("scnews__tabs-item");

// Menu

function handleMenu() {
  const menu = document.querySelectorAll(".header__nav li a");
  let heightHeader = document.querySelector(".header").offsetHeight;
  const newSc = [];

  menu.forEach((item) => {
    const getNameSc = item.getAttribute("href");
    const getSc = document.querySelector(`.sc${getNameSc.slice(1)}`);
    newSc.push(getSc);
    item.addEventListener("click", function (e) {
      window.scroll({
        top: getSc.offsetTop - heightHeader + 1,
        behavior: "smooth",
      });
    });
  });
  window.addEventListener("scroll", function () {
    const positionScroll = this.window.scrollY;
    newSc.forEach((item, i) => {
      if (
        positionScroll > item.offsetTop - heightHeader &&
        positionScroll < item.offsetTop + item.offsetHeight
      ) {
        menu.forEach((itemMenu) => {
          itemMenu.classList.remove("--active");
        });
        menu[i].classList.add("--active");
      } else {
        menu[i].classList.remove("--active");
      }
    });
  });
}
handleMenu();

function handleLoading(percent) {
  const progress = document.querySelector(".loading__inner-progress");
  const textPercent = document.querySelector(".loading__percent");
  progress.style.width = `${percent}%`;
  textPercent.innerText = `${percent}%`;
}

function hideLoading() {
  const loading = document.querySelector(".loading");
  const body = document.querySelector("body");
  loading.classList.add("--is-loaded");
  body.classList.remove("--disable-scroll");
}

function initLoading() {
  let loadedCount = 0;
  imgs = document.querySelectorAll("img").length;
  container = document.querySelector("body");
  const imgLoad = new imagesLoaded(container);

  imgLoad.on("progress", function (instance) {
    loadedCount++;
    let percent = Math.floor((loadedCount / imgs) * 100);
    handleLoading(percent);
  });

  imgLoad.on("always", function (instance) {});

  imgLoad.on("done", function (instance) {
    hideLoading();
    handleCarousel();
  });
  imgLoad.on("fail", function (instance) {
    console.log("fall");
  });
}

initLoading();

Fancybox.bind('[data-fancybox="images"]', {});
