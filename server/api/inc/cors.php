<?php

//set CORS
/**
 *  An example CORS-compliant method.  It will allow any GET, POST, or OPTIONS requests from any
 *  origin.
 *
 *  In a production environment, you probably want to be more restrictive, but this gives you
 *  the general idea of what is involved.  For the nitty-gritty low-down, read:
 *
 *  - https://developer.mozilla.org/en/HTTP_access_control
 *  - http://www.w3.org/TR/cors/
 *
 */
function cors() {
	header('content-type: application/json; charset=utf-8');
	header("access-control-allow-origin: *");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
}

?>
