<?php
include ('../../database.php');

if(isset($_POST['id'])){
  $id=$_POST['id'];

  $resultado=$conexion->query("DELETE pacientes,usuarios FROM pacientes JOIN usuarios ON usuarios.USUARIO = pacientes.USUARIO WHERE pacientes.ID='$id';");


  if(!$resultado) {
    die('Query failed'.mysqli_connect_errno());
  }else{
    echo "Se ha eliminado un paciente exitosamente";
  }
}
 ?>
