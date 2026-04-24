$(function () {
  const $header = $('.header');
  const $hamburger = $('#js-hamburger');
  const $menu = $('.header-menu');
  const $overlay = $('#js-overlay');
  const $pcNavLinks = $('.header__nav.pc a');

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

    const targetId = $(this).attr('href');
    const $target = $(targetId);

    if (!$target.length) return;

    const headerHeight = $header.outerHeight();
    const targetTop = $target.offset().top - headerHeight;

    $('html, body').animate({ scrollTop: targetTop }, 500, 'swing');
    if ($(this).closest('.header__nav.pc').length) {
    $pcNavLinks.removeClass('is-active');
    $(this).addClass('is-active');
    }
    closeMenu();
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
