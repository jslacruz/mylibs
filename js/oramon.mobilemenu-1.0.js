(function($) {
    //mobile menu constructor
    $.fn.navMenu = function (options) {
        //getting the first appearance of an ul element, it will be the main menu list.
        var $mainList = $(this).find('ul').first(),
        //setting variables values to null by default
            settings = $.extend({
                overlay: null,
                header: null,
                wrapper: null,
                button: null,
                hide: false,
                onLoadMenu: function() {},
                onOpenSubmenu: function() {},
                onCloseSubmenu : function() {},
                onCloseMenu: function() {},
                onOpenMenu: function() {}
            }, options || {});

        $(this).addClass('nav-menu-wrapper');

        if( settings.hide == true) {
            $(this).addClass('hide-until-push');
        }
        //construction of mobile menu adding classes for javascript default events.
        $mainList.addClass('nav-menu-items');
        $mainList.find('ul').each(function () {
            var $liParent = $(this).parent(),
                $ddLink = $liParent.find('a').first(),
                $linkText = $ddLink.text().trim(),
                $subMenu = $liParent.find('ul').first();

            $liParent.addClass('dropdown');
            $ddLink.addClass('dd-link');
            $subMenu.addClass('sub-menu');
            $ddLink.text('');

            $('<span>' + $linkText + '</span><span class="arrow-down"></span>').appendTo($ddLink);
        });
        //event for show/hide submenus items when a li item has dropdown class
        $('.nav-menu-items').find('.dropdown a.dd-link').on('click', function(){
            if ($(this).parents('.dropdown').hasClass('open')) {
                $('.nav-menu-items').find('.sub-menu').height(0);
                $('.dropdown.open').removeClass('open');

                settings.onCloseSubmenu.call(this);
            } else {
                var submenuHeight = 0;

                $('.nav-menu-items').find('.sub-menu').height(0);
                $('.dropdown.open').removeClass('open');

                $(this).parents('.dropdown').find('.sub-menu li a').each( function() {
                    submenuHeight += parseInt($(this).height())+21;
                });

                $(this).parents('.dropdown').find('.sub-menu').height(submenuHeight);
                $(this).parents('.dropdown').addClass('open');

                settings.onOpenSubmenu.call(this);
            }
        });
        //added event for toggle menu when clicking on item related to settings.button parameter
        if( settings.button !=  null) {
            var $menuIcon = $(settings.button);

            $menuIcon.on('click', function () {
                if ($menuIcon.hasClass('active')) {
                    $menuIcon.removeClass('active');
                    $('body').removeClass('mobile-visible');
                    $('.nav-menu-items').parent().removeClass('active');

                    if (settings.overlay != null) {
                        $(settings.overlay).removeClass('active');
                    }

                    if (settings.wrapper != null) {
                        $(settings.wrapper).removeClass('mobile-visible');
                    }

                    if (settings.header != null) {
                        $(settings.header).removeClass('active');
                    }
                    settings.onCloseMenu.call(this);
                } else {
                    $menuIcon.addClass('active');
                    $('body').addClass('mobile-visible');
                    $('.nav-menu-items').parent().addClass('active');

                    if (settings.overlay != null) {
                        $(settings.overlay).addClass('active');
                    }

                    if (settings.wrapper != null) {
                        $(settings.wrapper).addClass('mobile-visible');
                    }

                    if (settings.header != null) {
                        $(settings.header).addClass('active');
                    }
                    settings.onOpenMenu.call(this);
                }
            });

            if (settings.overlay != null) {
                $(settings.overlay).on('click', function () {
                    $menuIcon.removeClass('active');
                    console.log();
                    $('body').removeClass('mobile-visible');
                    $('.nav-menu-items').parent().removeClass('active');

                    if (settings.overlay != null) {
                        $(settings.overlay).removeClass('active');
                    }

                    if (settings.wrapper != null) {
                        $(settings.wrapper).removeClass('mobile-visible');
                    }

                    if (settings.header != null) {
                        $(settings.header).removeClass('active');
                    }
                });
            }
        }
        settings.onLoadMenu.call(this);

        return $(this);
    };
}(jQuery || Zepto));
