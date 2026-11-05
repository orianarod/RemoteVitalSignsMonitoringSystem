<?php
include ('../../database.php');

if(isset($_POST['buscar'])){
  $buscar=$_POST['buscar'];
  $query="SELECT NOMBRE, APELLIDO, ID FROM `pacientes` WHERE NOMBRE LIKE '$buscar%' or APELLIDO LIKE '$buscar%' or ID='$buscar'";
}else {
  $query="SELECT * FROM `pacientes`";
}

$json=array();

$resultado=$conexion->query($query);

if(!$resultado){
  die(mysqli_connect_errno());
}

while($row=$resultado->fetch_array()){
  $json[]=array(
      'nombre'=>$row['NOMBRE'],
      'id'=>$row['ID'],
      'apellido'=>$row['APELLIDO'],
      'condicion'=>$row['CONDICIÓN']
  );
}

  echo $jsonstring = json_encode($json);




 ?>
