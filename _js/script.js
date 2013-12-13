$(document).ready(function(){

/*   $("#characters").on("toggle", ".show_hide", function(){
       console.log("HELLO");
       $(".slidingDiv").on("slideDown",function(){
           $("#plus").text("-")
           console.log("HEY!");
         });
   },function(){
       $(".slidingDiv").on("slideUp",function(){
           $("#plus").text("+")
           console.log("HO!");
       });
   });*/

	//toggle the description on and off, and change the plus to a minus
	$("#characters").on("click", ".show_hide", function(){
		$(this).next("div").toggle("slow", function(){});
		console.log($(this).text());
		if($(this).text() == "+"){
			$(this).text("-");	
		} else {
			$(this).text("+");	
		}
	});
	
	//MQL API
	//This query gets every character and the tv show they appeared on
	var query = [{'id': null, 'name': null, 'type': '/tv/tv_character', '/tv/tv_character/appeared_in_tv_program': [{'series': null}], "key": [{'namespace' : '/wikipedia/en_id', 'value' : null}], 'limit': 20 }];

	var service_url = 'https://www.googleapis.com/freebase/v1/mqlread';

	//The Search API
	var service_url2 = 'https://www.googleapis.com/freebase/v1/search';
     	
    $.getJSON(service_url + '?callback=?', {query:JSON.stringify(query)}, function(response)
    {
    	console.log(response);
        $.each(response.result, function(i,data){
        	//console.log(data);

        	var params = {
			    //'query': 'cosmo kramer',
			    'filter': '(all id:"' + data.id + '")',
			    'output': '(description)',
			    'limit': 10,
			    'indent': true,
			};

			$.getJSON(service_url2 + '?callback=?', params, function(response) {
				console.log(response);
				$('#characters').append("Character: " + data.name + " | TV Show: " + data["/tv/tv_character/appeared_in_tv_program"][0].series + " | Description of Character: <a href='#' class='show_hide' id='plus'>+</a><div class='slidingDiv' style='display: block;'>" + response.result[0].output.description['/common/topic/description'][0] + "</div><br />");
				$(".slidingDiv").hide();
			});
        });
    });

    //get description
    
  /*$.getJSON(service_url2 + '?callback=?', params, function(response) {
  	//console.log(response);
    $.each(response.result, function(i, result) {
      $('<div>', {text:result['name']}).appendTo(document.body);
    });
  });*/

})