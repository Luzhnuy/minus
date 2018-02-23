//display tooltip for given user
function tooltip(element)
{
    $("#tooltip").fadeOut("fast");
    $("#tooltip").remove();
    var username = titl;
    var tooltip_html = '<div style="display:none" id="tooltip">\
    <img class="avatar" src="/users/'+username+'/avatar/"/>\
    <h6 class="additional_info">'+$(element).html()+'</h6>\
    <ul >\
    <li>\
        <a class="dynamic" href="/users/'+ username +'">\
        <img src="/static/img/icons/user_orange.png"/>Профіль\
        </a>\
    </li>\
    <li>\
        <a class="dynamic" href="/messages/compose/'+ username +'">\
        <img src="/static/img/icons/email.png"/>Повідомлення\
        </a>\
    </li>\
    <li>\
        <a class="dynamic" href="/minus/user/'+ username +'">\
        <img src="/static/img/icons/cd.png"/>Файли\
        </a>\
    </li>\
    <li>\
        <a class="dynamic" href="/photo/'+ username +'">\
        <img src="/static/img/icons/camera.png"/>Фото\
        </a>\
    </li>\
    </ul>\
    </div>'
    var pos = $(element).offset();  //position of parrent
    var cx= $(window).width()-30;      //overall window width
    var wdt = 170; //width of tooltip
    var offst = 13;                 //offset for tooltip to move
    if (cx < pos.left + wdt + offst){   //if we move out of the window
        pos.left = cx - wdt - offst;    //we should'nt do this
        };
    $("#wrapper").after($(tooltip_html));
    $("#tooltip").css( { "left": (pos.left+offst) + "px", "top":(pos.top+offst) + "px" , "width":wdt+"px"} );
    $("#tooltip").fadeIn("slow");


    $('#tooltip').mouseleave(function(){

         var delay = 300;
         $(this).fadeOut(delay);
         setTimeout(function(){
         $(this).remove();
         }, delay);
    });
};
