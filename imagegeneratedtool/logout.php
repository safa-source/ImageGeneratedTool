<?php
include './config.php';

session_destroy();

echo "
        <script>
        alert ('Logout Successfully.');
        window.location.href = 'login.php';
        </script>";
exit();
?>