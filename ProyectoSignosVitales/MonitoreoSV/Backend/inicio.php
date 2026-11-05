<?php
include ('../../database.php');
session_start();

$tipo=$_SESSION['login']['TIPO'];
$usuario=$_SESSION['login']['USUARIO'];

if($tipo=="Paciente"){
  $resultado=$conexion->query("SELECT USUARIO,ID,NOMBRE,APELLIDO,CONDICION FROM `pacientes` WHERE `USUARIO`='$usuario'");
  $paciente=$resultado->fetch_assoc();
  echo json_encode($paciente);
}else{
  echo $usuario;
}
?>
