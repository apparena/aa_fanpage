<?php 
/*
 * Prepares a page with Facebook Meta Data
 * This page receives the instance id as GET-Parameter and creates a page perfectly fitted for a like or send button to like
 * So if a friend of the user which liked this page, clicks the link to that, page he will be redirected.
 */
require_once '../../init.php';
$fb_share_url = "https://apps.facebook.com/" . $aa['instance']['fb_app_url']."/fb_share.php?i_id=".$aa['instance']['i_id'];

$fb_share_url = $aa['instance']["fb_canvas_url"]. "fb_share.php?i_id=".$aa['instance']['i_id'];

$redirect_url = $aa['instance']['fb_page_url'] . "?sk=app_" . $aa['instance']['fb_app_id'];

// Check if app_data exists and concatinate it to the sharing url 
if (isset($_GET['app_data'])){
	$fb_share_url .= "&app_data=" . urlencode($_GET['app_data']);
	$redirect_url .= "&app_data=" . urlencode($_GET['app_data']);
}

?>
<!DOCTYPE div PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- Facebook Meta Data -->
    <meta property="fb:app_id" content="<?=$aa['instance']['fb_app_id']?>" />
    <meta property="og:title" content="<?=$aa['config']['fb_share_name']['value']?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?=$fb_share_url;?>" />
    <meta property="og:image" content="<?=$aa['config']['fb_share_image']['value']?>" />
    <meta property="og:site_name" content="Mein Seitenname statisch" />
    <meta property="og:description" content="<?=$aa['config']['fb_share_desc']['value']?>"/>
</head>

<body>

<script type="text/javascript">
top.location="<?=$redirect_url?>";
</script>

</body>
</html>
