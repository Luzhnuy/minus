        //small previews for player
        var myListener = new Object();
        myListener.onInit = function()
        {
            this.position = 0;
        };
        
        myListener.onUpdate = function()
        {

        };
        function getFlashObject()
        {
            return document.getElementById("smallFlash");
        }

        function stop()
        {
            getFlashObject().SetVariable("method:stop", "");

            $('.playing-btn').each(function(){
                var thisid = parseInt($(this).attr('id'));
                $(this).attr('href', "javascript:play("+thisid+")");
                $(this).html('<img src="/static/img/icons/control_play.png"/>');
                $(this).removeClass('playing-btn');
                });
        }

        function play(id)
        {
            if (myListener.isPlaying){
                stop();
            }
            getFlashObject().SetVariable("method:setUrl", "/minus/artist/any/rec/download/"+id+"/");
            getFlashObject().SetVariable("method:play", "");
            getFlashObject().SetVariable("enabled", "true");
            var pressedbtn = $("#"+id+"-btn");
            pressedbtn.attr('href', "javascript:stop("+id+")");
            pressedbtn.html('<img src="/static/img/icons/control_stop_blue.png"/>');
            pressedbtn.addClass('playing-btn');
        }
        function pause()
        {
            getFlashObject().SetVariable("method:pause", "");
        }
