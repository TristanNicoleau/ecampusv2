function signinCallback(authResult){
	if (authResult['access_token']) {
    	document.location.href = '/ecampusv2';
  	} else if (authResult['error']) {
		alert('La connexion à votre compte Google a échoué');
	}
}