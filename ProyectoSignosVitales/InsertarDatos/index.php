<?php
include ('../database.php');//inclusión de la conexión a la bd

if(isset($_POST['id'])){ //Evaluar si la solicitud de inserción es válida

//Se asignan los datos contenidos en el post a variables.
  $id=$_POST['id'];
  $pulso=$_POST['pulso'];
  $temperatura=$_POST['temperatura'];
  $presion=$_POST['presion'];
  $alerta=$_POST['alerta'];

  //Se evalúa si contiene datos de geolocalización,
  // en caso de que no se asignan valores vacíos
  if(isset($_POST['long'])&&isset($_POST['lat'])){
    $long=$_POST['long'];
    $lat=$_POST['lat'];
  } else {
    $long=$lat="";
  }

  //Se hace la transacción con la base de datos utilizando el método query (consulta)
  $resultado=$conexion->query("INSERT INTO `mediciones` (`TEMPERATURA`,`PRESION`,`PULSO`,`ID`,`ALERTA`,`LONGITUD`,`LATITUD`)
   VALUES ('$temperatura','$pulso','$presion','$id','$alerta','$long','$lat');");
}

?>
