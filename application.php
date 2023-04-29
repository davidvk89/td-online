<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="includes/jquery.min.js"></script>
    <script src="includes/js-cookie.js"></script>
    <link rel="stylesheet" href="includes/bootstrap.min.css">

    <title>RPG_SERVER</title>
</head>

<style>
    body {
        background: #000000;
        color: #ffffff;
    }

    h1, h2{
        text-align: center;
    }

    .main-form{
        margin: auto, 0 !important;
        max-width: 400px;
    }
    .main-form input{
        text-align: center;
    }
    .btn-primary{
        margin-top:0.25em;
        width: 100%;
    }

</style>
<body>

    <div class="container">
        <div class="row">
            <div class="col-12" class="main-header" id="frontPageHeader">
                <h1>Project Phaser GameScreen</h1>
            </div>

            <div id="gameContainer"></div>
            <?php include "index.html";?>
        </div>
    </div>
<script>
const token = Cookies.get('auth');
    $.get("api/character/fetch.php?token="+token, 
    function(data){
        let characters =JSON.parse(data);
        document.getElementById('gameContainer').innerHTML = characters.slot_1.name;
    })
</script>
    
</body>
</html>