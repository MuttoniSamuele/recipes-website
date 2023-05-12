<?php
declare(strict_types=1);

define("API_URL", "https://api.spoonacular.com");
define("RESPONSE_HEADERS", array(
  "content-type",
  "x-api-quota-request",
  "x-api-quota-used",
  "x-api-quota-left"
));


function readApiKeys(): array|false {
  // Open the ini file
  $ini_data = parse_ini_file(__DIR__ . "/../config/apikeys.ini", true);
  // Check if the file containes the correct data
  if ($ini_data === false || !array_key_exists("apikey", $ini_data) || !array_key_exists("keys", $ini_data["apikey"])) {
    return false;
  }
  // Return an array of API keys
  return explode(",", $ini_data["apikey"]["keys"]);
}

function proxyRequest($path, $api_key): bool {
  // Init curl in order to make a http request
  $curl = curl_init();
  // Setup the request options
  curl_setopt_array($curl, array(
    CURLOPT_URL => API_URL . $path,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_HTTPHEADER => array("x-api-key: $api_key"),
    CURLOPT_HEADERFUNCTION => function($curl, $header) use (&$headers) {
      $len = strlen($header);
      // Check if the header is in the constant and add it to the array
      foreach (RESPONSE_HEADERS as $h) {
        if (str_starts_with(strtolower($header), $h)) {
          $headers[] = $header;
          break;
        }
      }
      return $len;
    }
  ));
  // Send the request
  $response = curl_exec($curl);
  // Check for errors
  if (curl_errno($curl)) {
    curl_close($curl);
    http_response_code(500);
    die;
  }
  // Get the response status code
  $status_code = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
  // Close curl
  curl_close($curl);
  // If the code is 401 (Unathorized) return false for failure
  if ($status_code === 401) {
    return false;
  }
  // Clone and set the previously saved headers from the response
  foreach ($headers as $header) {
    header($header);
  }
  // Send the body and return true for success
  echo $response;
  return true;
}


// Check if the request method is allowed
if ($_SERVER["REQUEST_METHOD"] !== "GET") {
  http_response_code(405);
  die;
}
// Retrieve the array of API keys
$api_keys = readApiKeys();
// Check for errors
if ($api_keys === false) {
  http_response_code(500);
  die;
}
// Retrieve the path for the API from the requested URL
$path = substr($_SERVER["REQUEST_URI"], strlen("/api"));
// Try each saved API key. If one doesn't work, try the next one
foreach ($api_keys as $key) {
  // Send a request to the API and send its response back to the user
  if (proxyRequest($path, $key)) {
    break;
  }
}
