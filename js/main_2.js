$(function(){
	$('#search_form').submit(function(e){
		e.preventDefault();		
	});	
})

function search(){
	$('#results').html('');		
	//
	q = $('#query').val();	
	// получить результаты апи	
	$.get(
	"https://www.googleapis.com/youtube/v3/search",{
		part: 'snippet, id',
		q: q,
		maxResults: 2,
		order: 'viewCount',
		type:'video',
	key: 'AIzaSyB3cTEZ3iATzGW519SGw09TeWMTEfXmWfc'},
	function(data){		
		console.log(data);		
		$.each(data.items, function(i,item){			
			var output = getOutput(item);			
			$('#results').append(output);			
		});		
	}
	);
}


function getOutput(item){
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	//var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;		
	var output = '<li>'+ 	
	'<a id="showHideContent" class="spoiler-title" href="javascript:void(0);">'+'<h2>'+title+'</h2>'+'</a>'+
	'<dd id="content" style="display:block;">' + 
	'<iframe width="400" height="200" src="http://www.youtube.com/embed/'+videoId+'" frameborder="0"></iframe>'+
	'</dd>' +	
	'<small>Автор <strong>'+channelTitle+'</strong> от '+videoDate+'</small>' +	
	'</div>' + 
	'</li>' + 
	'';	
	return output;
	
}
