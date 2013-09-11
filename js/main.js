/*global $ */
(function() {
    var method;
    var noop = function() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error','exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log','markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd','timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        if (!console[method]) {
             console[method] = noop;
        }
    }
}());

var $body = $('body');
var menubutton = $('.menu-button');
var sidebarbutton = $('.sidebar-button');

var showRight = function() {
    $body.removeClass('active-nav').toggleClass('active-sidebar');
    
    menubutton.removeClass('active-button');
    sidebarbutton.toggleClass('active-button');
};

var showLeft = function() {
    $body.removeClass('active-sidebar').toggleClass('active-nav');
    sidebarbutton.removeClass('active-button');
    menubutton.toggleClass('active-button');
};


$(document).ready(function($) {
    if($(this).width() >= 700) $("#telornot").attr('href', '');
    menubutton.click(function(e) {
        e.preventDefault();
        showLeft();
    });
    sidebarbutton.click(function(e) {
        e.preventDefault();
        showRight();
    });
});

