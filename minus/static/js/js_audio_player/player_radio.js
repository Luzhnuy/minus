
var minusListener = new Object();

minusListener.onInit = function()
{
    this.position = 0;
};

    function getFlashObject()
    {
        return document.getElementById("playerFlash");
    }

    document.head = document.head || document.getElementsByTagName('head')[0];

    function changeFavicon(src) {
     var link = document.createElement('link'),
         oldLink = document.getElementById('favicon');
     link.id = 'favicon';
     link.rel = 'shortcut icon';
     link.href = src;
     if (oldLink) {
      document.head.removeChild(oldLink);
     }
     document.head.appendChild(link);
    }


$(document).ready(function() {

    $("#volslider" ).slider({value:50});

    minusListener.onUpdate = function()
    {

    };

    function stop()
    {
        getFlashObject().SetVariable("method:stop", "");
    }

    function play()
    {
        getFlashObject().SetVariable("method:setUrl", RadioUrl);
        getFlashObject().SetVariable("method:play", "");
        getFlashObject().SetVariable("enabled", "true");
              }
    function pause()
    {
        getFlashObject().SetVariable("method:pause", "");
    }

    $('#playbtn').click(function(){
        var playbtn = $(this)
        if (minusListener.isPlaying == "true"){
            playbtn.removeClass("playing").addClass("stopped");
            $("#volslider").fadeOut("fast");
            changeFavicon("/static/img/favicon0.png");
            stop();
        }
        else
        {
            playbtn.removeClass("stopped").addClass("playing");
            $("#volslider").fadeIn("fast");
            changeFavicon("/static/img/favicon1.png");
            play();
        }
            
        
        return false;   
    });
    
    $("#volslider").bind("slide", function(event, ui) {
      getFlashObject().SetVariable("method:setVolume",ui.value);
    });
    
    
}); 
