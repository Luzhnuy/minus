        function loadcities(){
            $.getJSON('/blurb/geo/' + $("#id_georegion option:selected").attr('value')+"/", function(data)
            {
                var options = ['<option value="">-----</option>'];
                $.each(data, function(id, obj){
                    options.push('<option value="' + obj[0] + '">' + obj[1] + '</option>');
                });
                $('#id_geocity').html(options.join(''));
                $('#id_geocity').attr('disabled', false);
                

            });
        };
        $(document).ready(function() {
            
            $('#id_georegion').change(function(){
                loadcities();
            });
            $('.blurb_up_button').click(function(){
                var btn = $(this);
                $.get(btn.attr('href'),function(data){
                    btn.children('span').html('Виконано');
                    btn.attr('href','#');
                });
                return false;
            });
        });
