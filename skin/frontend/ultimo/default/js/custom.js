(function ($){
    'use strict';
    $(document).ready(function () {
        var painfulpleasures = (function () {

            var init = function () {
                    disableBootstrapConflicts();
                    getImgAsBackground();
                    navigationMenu();
                    slidingMenu();
                    topNavMenu();
                    gridBoxClicable();
                },

                disableBootstrapConflicts = function () {
                    var isBootstrapEvent = false,
                        originalHide = Element.hide;

                    if (window.$) {
                        var all = $('*');
                        $.each(['hide.bs.dropdown',
                            'hide.bs.collapse',
                            'hide.bs.modal',
                            'hide.bs.tooltip',
                            'hide.bs.popover'], function (index, eventName) {
                            all.on(eventName, function (event) {
                                isBootstrapEvent = true;
                            });
                        });
                    }

                    Element.addMethods({
                        hide: function (element) {
                            if (isBootstrapEvent) {
                                isBootstrapEvent = false;

                                return element;
                            }

                            return originalHide(element);
                        }
                    });
                },

                getImgAsBackground = function() {
                    $(document).ready(function(){
                        $('#slider .slide, .blocks li').each(function(){
                            var img = $(this).find('img'),
                                surl = img.attr('src');

                            $(this).css('background-image', 'url(\'' + surl + '\')');
                        });
                    });
                },

                navigationMenu = function () {


                    $('#nav .nav-primary > li.parent > a').append('<span class="caret"></span>');
                    $('#nav .nav-primary > li.parent > a').attr('data-toggle','dropdown');
                    $('#nav .nav-primary > li.parent > a').attr('data-target','#');
                    $('#nav .nav-primary > li.parent').addClass('sub-menu-simple dropdown');

                    var magentoMenu = $('#nav .nav-primary');
                    if (magentoMenu.length == 0) return;

                    $(document).on('touchstart click', '.sub-menu-simple .dropdown-toggle', magentoMenu, function(){
                        var menuContainer = $(this).parents('#nav .nav-primary');
                        var parent = $(this).parent();
                        var dropdownMenu = $(this).siblings('.dropdown-menu');
                        var distance = dropdownMenu.width() + parent.offset().left - menuContainer.width() - menuContainer.offset().left;
                        if (distance > 0) {
                            dropdownMenu.css({left: 0 - distance});
                        }
                    });

                },

                slidingMenu = function() {
                    var $menu = $('#mobile-nav'),
                        $html = $('html, body');
                    $menu.mmenu({
                        dragOpen: true
                    });
                    var $anchor = false;
                    $menu.find( 'li > a' ).on(
                        'click',
                        function( e )
                        {
                            $anchor = $(this);
                        }
                    );
                    var api = $menu.data( 'mmenu' );
                    api.bind( 'closed',
                        function()
                        {
                            if ( $anchor )
                            {
                                var href = $anchor.attr( 'href' );
                                $anchor = false;

                                //	if the clicked link is linked to an anchor, scroll the page to that anchor
                                if ( href.slice( 0, 1 ) == '#' )
                                {
                                    $html.animate({
                                        scrollTop: $( href ).offset().top
                                    });
                                }
                            }
                        }
                    );
                },

                topNavMenu = function() {
                    var siteMenu = $('#block-menu-menu-sites-menu > ul');
                    if (siteMenu.length === 0) return;
                    $('li:nth-child(2n+1) a', siteMenu).on('click', function (e) {
                        if (window.matchMedia('(min-width: 1200px)').matches) {
                            e.preventDefault();
                            $(this).parent().siblings().removeClass('open');
                            $(this).parent().toggleClass('open');
                        }
                    });
                },

                gridBoxClicable = function() {
                    $('.products-grid li').click(function(){
                        window.location=$(this).find('a').attr('href');return false;
                    });
                };


            return {
                init: function () {
                    init();
                }
            };
        }());

        painfulpleasures.init();

    });
})(window.jQuery);
