<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">

        <title>PRISM</title>
        <meta http-equiv="Content-Security-Policy: default-src 'self'; font-src 'self'; object-src 'none'; script-src 'self'; style-src 'self'">

        <meta name="robots" content="noindex">

        <link rel="icon" type="image/svg+xml" href="assets/favicon/favicon.svg">

        <link href="assets/css/start.css" rel="stylesheet" type="text/css">
        <script src="assets/js/start.js" type="text/javascript"></script>
</head>
<body>
    <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "bookmarks";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    ?>
    <div id="container">
        <div id="menu">
            <input class="menu__button selected" type="button" value="search" onclick="menuStyle()">
            <input class="menu__button" type="button" value="bookmarks" onclick="menuStyle()">
            <input class="menu__button" type="button" value="tracker" onclick="menuStyle()">
            <input class="menu__button" type="button" value="settings" onclick="menuStyle()">
        </div>
        <div class="search">
            <form id="form" action="https://www.bing.com/search?q=" method="get">
                <input class="form-field" type="search" id="search" name="q" autofocus autocomplete="off" placeholder="search bing" oninput="detectEngine()">
            </form>
        </div>
        <div id="bookmark">
            <div class="bookmark__folder">
                <div class="bookmark__folder-title">news</div>
                <a class="bookmark__folder-item" href="">Slashdot</a>
                <a class="bookmark__folder-item" href="">Hacker News</a>
                <a class="bookmark__folder-item" href="">The New York Times</a>
                <a class="bookmark__folder-item" href="">The Guardian</a>
                <a class="bookmark__folder-item" href="">POLITICO</a>
                <a class="bookmark__folder-item" href="">Der Spiegel</a>
            </div>
        </div>
        <div id="weather" class="weather day-one">
            <div class="wrapper-1">
                <span id="day"></span>
                <div id="weather-icon">
                </div>
            </div>
            <div class="wrapper-2">
                <div class="left">
                    <svg id="tempmin-icon" xmlns="http://www.w3.org/2000/svg" width="11.547" height="10" viewBox="0 0 11.547 10">
                        <defs>
                            <style>.cls-1{fill:var(--color-2);}</style>
                        </defs>
                        <polygon class="cls-1" points="5.7735 10 11.547 0 0 0 5.7735 10"/></svg>
                    <span id="tempmin"></span>
                </div>
                <span id="temp"></span>
                <div class="right">
                    <span id="tempmax"></span>
                    <svg id="tempmax-icon" xmlns="http://www.w3.org/2000/svg" width="11.547" height="10" viewBox="0 0 11.547 10">
                        <defs>
                            <style>.cls-1{fill:var(--color-2);}</style>
                        </defs>
                        <polygon class="cls-1" points="5.7735 0 0 10 11.547 10 5.7735 0"/></svg>
                </div>
            </div>
            <div class="wrapper-3">
                <div class="left">
                    <span id="wind"></span>
                </div>
                <svg id="windmax-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                    <defs>
                        <style>.cls-1{fill:var(--color-2);}</style>
                    </defs>
                    <polygon class="cls-1" points="10 0 5.72 10 3.27 7.56 4.7 6.13 3.87 5.3 2.44 6.73 0 4.29 10 0"/>
                </svg>
                <div class="right">
                    <span id="windmax"></span>
                </div>
            </div>
            <div class="wrapper-4">
                <span id="precipitation" class="left"></span>
                <svg id="precipitation-icon" xmlns="http://www.w3.org/2000/svg" width="6.666" height="10" viewBox="0 0 6.666 10">
                    <defs>
                        <style>.cls-1{fill:var(--color-2);}</style>
                    </defs>
                    <path class="cls-1" d="M3.333,0L.4464,5.0011c-.7988,1.384-.5029,3.1403,.7054,4.1861h0c1.2521,1.0837,3.11,1.0837,4.3622,0h0c1.2083-1.0458,1.5043-2.802,.7054-4.1861L3.333,0Z"/>
                </svg>
                <span id="precipitationhours" class="right"></span>
            </div>
            <div class="wrapper-5">
                <div class="left">
                    <span id="sunrise"></span>
                </div>
                <svg id="sunrise-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6">
                    <defs>
                        <style>.cls-1{fill:var(--color-2);}</style>
                    </defs>
                    <rect class="cls-1" y="5" width="10" height="1"/><path class="cls-1" d="M9,4H1C1,1.8,2.79,0,5,0s4,1.8,4,4Z"/>
                </svg>
                <div class="right">
                    <span id="sunset"></span>
                </div>
            </div>       
        </div>
    </div>
</body>
</html>