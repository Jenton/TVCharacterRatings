$(document).ready(function(){

	var query = [{'id': null, 'name': null, 'type': '/tv/tv_character', '/tv/tv_character/appeared_in_tv_program': [{'series': null}], 'limit': 500 }];
	var service_url = 'https://www.googleapis.com/freebase/v1/mqlread';
    $.getJSON(service_url + '?callback=?', {query:JSON.stringify(query)}, function(response)
    {
    	console.log(response);
        $.each(response.result, function(i,data){
        	console.log(data);
        	$('<div>',{text:"Character: " + data.name + " | TV Show: " + data["/tv/tv_character/appeared_in_tv_program"][0].series}).appendTo(document.body);
        });
    });

})