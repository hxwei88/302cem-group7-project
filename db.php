<?php

$dbHost="localhost";
$dbUsername="id16760623_group7projectuser";
$dbPassword="8mjk{!=Mg2?/a#Bf";
$dbName="id16760623_group7project";

$conn = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);

/** Comment it after testing is done **/

	if(mysqli_connect_errno()){
		echo "Connection to db could not be established. Error: ".mysqli_connect_error();
	}else{
		echo "Connection to db is successful.";
	}

?>