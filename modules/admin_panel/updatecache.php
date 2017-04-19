<?php
require_once(dirname(__FILE__) . '/../init.php');


$i_id = intval($_GET['i_id']);

if ($i_id <= 0) {
    echo "missing parameter i_id";
    exit();
}

//update app cached time
$cache = new Cache();
$cache->updateCachedTime($i_id);
?>

<p>
    <?php __p('Cache will update for all user when they visit any page next time'); ?>
</p>



