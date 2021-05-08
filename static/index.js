window.onload = () => {
	$('#sendbutton').click(() => {
		imagebox = $('#imagebox')
		input = $('#imageinput')[0]
		if(input.files && input.files[0])
		{
			var startTime = performance.now();
			let formData = new FormData();
			formData.append('image' , input.files[0]);
			$.ajax({
				url: "http://localhost:5000/detectObject", // fix this to your liking
				type:"POST",
				data: formData,
				cache: false,
				processData:false,
				contentType:false,
				error: function(data){
					console.log("upload error" , data);
					console.log(data.getAllResponseHeaders());
				},
				success: function(data){
					const endTime = performance.now();
					const timeElapsed = (endTime - startTime) / 1000;
					console.log(timeElapsed);
					const functionTime = parseFloat(data.time);
					const time_taken = (functionTime + timeElapsed).toFixed(2);
					console.log(time_taken);
					bytestring = data['status']
					image = bytestring.split('\'')[1]
					document.getElementById('timetaken').innerHTML = `Time taken: ${time_taken}s`; 
					imagebox.attr('src' , 'data:image/jpeg;base64,'+image)
				}
			});
		}
	});
};



function readUrl(input){
	imagebox = $('#imagebox')
	console.log("evoked readUrl")
	if(input.files && input.files[0]){
		let reader = new FileReader();
		reader.onload = function(e){
			imagebox.attr('src',e.target.result); 
			imagebox.height(500);
			imagebox.width(800);
		}
		reader.readAsDataURL(input.files[0]);
	}

	
}