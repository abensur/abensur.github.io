!function(){for(var a,b=function(){},c=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],d=c.length,e=window.console=window.console||{};d--;)a=c[d],e[a]||(e[a]=b)}();var $body=$("body"),$menubutton=$(".menu-button"),$sidebarbutton=$(".sidebar-button"),$phone=$(".s-contato ul>li a"),$email=$('.s-contato ul li[itemprop="email"] a'),showRight=function(){$body.removeClass("active-nav").toggleClass("active-sidebar"),$menubutton.removeClass("active-button"),$sidebarbutton.toggleClass("active-button")},showLeft=function(){$body.removeClass("active-sidebar").toggleClass("active-nav"),$sidebarbutton.removeClass("active-button"),$menubutton.toggleClass("active-button")};$(document).ready(function(a){a(this).width()>=600&&(a("#telornot").attr("href",""),console.log($phone.html()+"\n\n"+$email.html())),$menubutton.click(function(a){a.preventDefault(),showLeft()}),$sidebarbutton.click(function(a){a.preventDefault(),showRight()})});