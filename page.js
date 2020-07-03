$(function() {
	function setupGlobalErrorHandler() {
		// Setup console in div
		if (typeof console  != "undefined") 
		    if (typeof console.log != 'undefined')
		        console.olog = console.log;
		    else
		        console.olog = function() {};

		console.log = function(message) {
		    console.olog(message);
		    document.getElementById('debugDiv').innerHTML += ('<p>' + message + '</p>');
		};
		console.error = console.debug = console.info =  console.log;

		// Setup global handler
		/*
		window.onerror = function(message, source, lineno, colno, error) {
			console.log(error);
		};*/
		console.log('error handler setup');
	}

	function getMedia() {
		console.log('getting media');
		constraints = {
			audio: true, video: true
		};
		try {
			console.log(navigator);
			console.log(navigator.mediaDevices);
			navigator.mediaDevices.getUserMedia(constraints)
			.then(stream => {
				console.log('it worked!');
			})
			.catch(e => {
				console.error(e);
			});
		} catch (e) {
			console.error(e);
		}
	}

	function detectBrowser() {
		console.log('detecting browser');
		var nVer = navigator.appVersion;
		var nAgt = navigator.userAgent;
		var browserName  = navigator.appName;
		var fullVersion  = ''+parseFloat(navigator.appVersion); 
		var majorVersion = parseInt(navigator.appVersion,10);
		var nameOffset,verOffset,ix;

		// In Opera, the true version is after "Opera" or after "Version"
		if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
		 browserName = "Opera";
		 fullVersion = nAgt.substring(verOffset+6);
		 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
		   fullVersion = nAgt.substring(verOffset+8);
		}
		// In MSIE, the true version is after "MSIE" in userAgent
		else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
		 browserName = "Microsoft Internet Explorer";
		 fullVersion = nAgt.substring(verOffset+5);
		}
		// In Chrome, the true version is after "Chrome" 
		else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		 browserName = "Chrome";
		 fullVersion = nAgt.substring(verOffset+7);
		}
		// In Safari, the true version is after "Safari" or after "Version" 
		else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		 browserName = "Safari";
		 fullVersion = nAgt.substring(verOffset+7);
		 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
		   fullVersion = nAgt.substring(verOffset+8);
		}
		// In Firefox, the true version is after "Firefox" 
		else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		 browserName = "Firefox";
		 fullVersion = nAgt.substring(verOffset+8);
		}
		// In most other browsers, "name/version" is at the end of userAgent 
		else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
		          (verOffset=nAgt.lastIndexOf('/')) ) 
		{
		 browserName = nAgt.substring(nameOffset,verOffset);
		 fullVersion = nAgt.substring(verOffset+1);
		 if (browserName.toLowerCase()==browserName.toUpperCase()) {
		  browserName = navigator.appName;
		 }
		}
		// trim the fullVersion string at semicolon/space if present
		if ((ix=fullVersion.indexOf(";"))!=-1)
		   fullVersion=fullVersion.substring(0,ix);
		if ((ix=fullVersion.indexOf(" "))!=-1)
		   fullVersion=fullVersion.substring(0,ix);

		majorVersion = parseInt(''+fullVersion,10);
		if (isNaN(majorVersion)) {
		 fullVersion  = ''+parseFloat(navigator.appVersion); 
		 majorVersion = parseInt(navigator.appVersion,10);
		}

		console.log(''
			 +'Browser name  = '+browserName+'<br>'
			 +'Full version  = '+fullVersion+'<br>'
			 +'Major version = '+majorVersion+'<br>'
			 +'navigator.appName = '+navigator.appName+'<br>'
			 +'navigator.userAgent = '+navigator.userAgent+'<br>'
		 );

		/*
		document.write(''
		 +'Browser name  = '+browserName+'<br>'
		 +'Full version  = '+fullVersion+'<br>'
		 +'Major version = '+majorVersion+'<br>'
		 +'navigator.appName = '+navigator.appName+'<br>'
		 +'navigator.userAgent = '+navigator.userAgent+'<br>'
		)
		*/
	}

	///////////////////////////////////////

	console.log('----------------------------------------------------------------');
	setupGlobalErrorHandler();
	console.log('----------------------------------------------------------------');
	detectBrowser();
	console.log('----------------------------------------------------------------');
	getMedia();
	console.log('----------------------------------------------------------------');

});







