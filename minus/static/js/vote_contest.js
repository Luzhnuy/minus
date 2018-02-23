function vote(id, direction) {
    $.post('/contest/vote/'+id+'/'+direction, {HTTP_X_REQUESTED:'XMLHttpRequest'},
           function(data) {
               if (data.success == true) {
                   $('#score_'+id).text(data.score.score);
               } else {
                   alert('ERROR: ' + data.error_message);
               }
           }, 'json'
          );
    $('#voteup_'+id).html('+');
}
