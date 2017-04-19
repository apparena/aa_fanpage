<?php
require_once(dirname(__FILE__) . '/../../init.php');

// Check if user is Admin
if (is_fb_user_admin()) {
    ?>

<div id="admin_panel">
    <div class="panel-content">
        <span id="show_inst_id">ID:&nbsp;<?=$aa['instance']['i_id'];?></span>
        <!--
        <span class="export-participants">
            <span class="btn "
                  onclick="return popup('modules/admin_panel/index.php?p=exportparticipants&i_id=<?php echo $aa['instance']['i_id']; ?>');"><i
                    class="icon-download-alt"></i> <?php __p("Export participants")?></span>
        </span>
        <span class="select-winner">
            <span class="btn "
                  onclick="return popup('modules/admin_panel/index.php?p=getwinner&i_id=<?php echo $aa['instance']['i_id']; ?>');"><i
                    class="icon-gift"></i> <?php __p("Select winner")?></span>
        </span>
        -->
        <span class="configure-app">
            <a class="app_config" href="http://manager.app-arena.com/instances/<?=$aa['instance']['i_id'];?>/wizard/locale/<?=$aa['instance']['aa_inst_locale']?>"
               target="_blank">
                <button class="btn "><i class="icon-cog"></i> <?php __p("Configure_App")?></button>
            </a>
        </span>
    </div>
</div>

<script type="text/javascript">
    function popup(url) {
        fenster = window.open(url, "", "width=900,height=650,resizable=no");
        fenster.focus();
        return false;
    }

</script>

<?php
}
?>
