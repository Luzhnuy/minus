function vote(slug, direction) {
    $.post('/photo/'+slug+'/'+direction, {HTTP_X_REQUESTED:'XMLHttpRequest'},
           function(data) {
               if (data.success == true) {
                   $('#score_'+slug).text(data.score.score);
                   $('#num_votes_'+slug).text(data.score.num_votes);
               } else {
                   alert('ERROR: ' + data.error_message);
               }
           }, 'json'
          )
}
