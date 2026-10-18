$(function () {
  const $header = $('.header');
  const $hamburger = $('#js-hamburger');
  const $menu = $('.header-menu');
  const $overlay = $('#js-overlay');

  // ------------------------------------------
  // 1. スクロール位置でヘッダー切り替え
  // ------------------------------------------
  function checkScroll() {
    const scrollY = $(window).scrollTop();
    const aboutTop = $('#about').length ? $('#about').offset().top : Infinity;

    $header.toggleClass('is-scrolled', scrollY >= aboutTop);
  }

  $(window).on('scroll', checkScroll);
  checkScroll(); // 初期表示でも実行

  // ------------------------------------------
  // 2. スムーススクロール
  // ------------------------------------------
  $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      closeMenu();

      const targetId = $(this).attr('href');
      if (targetId === '#') return;

      if (targetId === '#top') {
        $('html, body').animate({ scrollTop: 0 }, 500, 'swing');
        return;
    }

    const $target = $(targetId);
    if (!$target.length) return;

    const headerHeight = $header.outerHeight();
    const targetTop = $target.offset().top - headerHeight;

    $('html, body').animate({ scrollTop: targetTop }, 500, 'swing');

  });

  // ------------------------------------------
  // 3. ハンバーガーメニュー
  // ------------------------------------------
  $hamburger.on('click', function () {
    $hamburger.toggleClass('is-active');
    $menu.toggleClass('is-open');
    $overlay.toggleClass('is-open');
    $('body').toggleClass('is-nav-open');
  });

  $overlay.on('click', function () {
    closeMenu();
  });

  function closeMenu() {
    $hamburger.removeClass('is-active');
    $menu.removeClass('is-open');
    $overlay.removeClass('is-open');
    $('body').removeClass('is-nav-open');
  }
});

// swiper
const swiper = new Swiper('.swiper', {
  loop: true,          // ループ再生
  autoplay: {
    delay: 3000,       // 3秒ごとに切り替え
    disableOnInteraction: false, // スワイプ後も自動再生を続ける
  },
});

$(function () {

  // サムネイルクリック
  $(".thumb").on("click", function () {

    const imgSrc = $(this).data("src");
    const text = $(this).data("text");

    // 「】」の位置で【種別】と名前に分ける
    const splitIndex = text.indexOf("】") + 1;
    const type = text.slice(0, splitIndex);
    const name = text.slice(splitIndex);

    $("#modal-img").attr("src", imgSrc);
    // $("#modalText").text(text);
    $("#modalText")
    .empty()
    .append(
      $('<span class="modal-text__type">').text(type),
      $('<span class="modal-text__name">').text(name)
    );

    $("#modal-overlay").addClass("active");

    // TOPボタンを非表示
    $("#js-pagetop").removeClass("is-show");

    // 背景スクロール停止
    $("body").css("overflow", "hidden");
  });

  // 閉じるボタン
  $("#modal-close").on("click", function () {
    closeModal();
  });

  // 背景クリックで閉じる
  $("#modal-overlay").on("click", function (e) {

    // 白いボックス以外をクリックした時
    if (!$(e.target).closest("#modal-box").length) {
      closeModal();
    }

  });

  function closeModal() {
    $("#modal-overlay").removeClass("active");

    // 背景スクロール再開
    $("body").css("overflow", "");
  }

});

$(function () {

  function fadeInAnimation() {

    $('.fade-in').each(function () {

      const target = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();

      if (scroll > target - windowHeight + 100) {
        $(this).addClass('is-show');
      }

    });

  }

  fadeInAnimation();

  $(window).on('scroll', function () {
    fadeInAnimation();
  });

});

// ------------------------------------------
// 1. スクロール位置でヘッダー・TOPボタン切り替え
// ------------------------------------------
$(function () {
  const $pageTop = $('#js-pagetop');

  $(window).on('scroll', function () {
    const fvBottom = $('#fv').outerHeight();                 // FVの下端の位置
    const btnTop = $pageTop[0].getBoundingClientRect().top;  // 画面内でのボタンの上端の位置

    // ボタンの位置までFVが抜けたら表示
    if ($(window).scrollTop() + btnTop > fvBottom) {
      $pageTop.addClass('is-show');
    } else {
      $pageTop.removeClass('is-show');
    }
  });
});



