<?php
include ('../../database.php');

$numal=$_POST['numal'];

$resultado=$conexion->query("DELETE FROM `alertas` WHERE NUM_AL='$numal';");


if(!$resultado){
  die(mysqli_connect_errno());
}else{
  echo "Alerta resuelta";
}

?>
