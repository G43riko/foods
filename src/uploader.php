<?php
header('Access-Control-Allow-Origin: *');
function getUserIP(){
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP)){
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP)){
        $ip = $forward;
    }
    else{
        $ip = $remote;
    }

    return $ip;
}
$body = json_decode(file_get_contents('php://input'), false);
if (!isset($body["content"]) || !isset($body["login"]) || !isset($body["password"]) || !isset($body["type"])) {
    exit("Wrong params");
}

$content = urldecode($body["content"]);
$login = $body["login"];
$type = $body["type"];
$password = $body["password"];


$extension = "txt";
$cookieName = "uuid";
if ($type == "menus") {
    $date = date("Ymd");
    if ($login != "gabriel" || $password != "gabriel") {
        exit("Wrong auth data");
    }

    $fileName = "files/menu_" . $date . "." . $extension;
    if (!file_exists($fileName)) {
        if (file_put_contents($fileName, $content)) {
            echo $content;
        }
        else {
            exit("cannot save file" . $fileName);
        }
    }
    else {
        exit("file " . $fileName . " already exists");
    }
}
else if ($type == "users") {
    $date = date("Ym");
    $fileName = "files/visit_" . $date . "." . $extension;
    $file = fopen($fileName, "a");
    $id = uniqid("USR");
    if(isset($_COOKIE[$cookieName])) {
        $id = $_COOKIE[$cookieName];
    }
    setcookie($cookieName, $id, time() + 60 * 60 * 24 * 30);
    if ($file) {
        $ip = getUserIP();
        fwrite($file, $ip . "," . date("Ymd-H:i:s") . "," . $id . "\r\n");
        fclose($file);
        echo "user with ip " . $ip . " successfuly saved";
    }
    else {
        exit("cannot open file " . $fileName);
    }
}
else {
    exit ("unknown type " . $type . ". Allowed types: users, menus");
}
?>
