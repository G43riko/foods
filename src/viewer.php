<?php
    header('Content-Type: text/html; charset=utf-8');
    $foods = array();
    $files = scandir("./files");
    foreach($files as $file) {
        if (strpos($file, 'menu_') === 0) {
            $content = file_get_contents("./files/" . $file);
            $json_content = json_decode($content, true);

            foreach($json_content as $restaurant) {
                foreach($restaurant["daily_menus"] as $dailyMenu) {
                    $menu = $dailyMenu["daily_menu"];
                    foreach($menu["dishes"] as $dishes) {
                        $dish = $dishes["dish"];
                        array_push($foods, $dish["name"]);
                    }
                }
            }
        }
    }
    echo "<ul>";
    foreach($foods as $food) {
        echo "<li>" . $food . "</li>";
    }
    echo "</ul>";
?>