<?php
include ('../../database.php');

$nombre=$_POST['nombre'];
$apellido=$_POST['apellido'];
$condicion=$_POST['condicion'];
$usuario=$_POST['usuario'];
$contrasena=$_POST['contrasena'];
$tipo='Paciente';

$consulta=$conexion->query("SELECT USUARIO FROM `usuarios` WHERE USUARIO='$usuario'");
$existe=$consulta->fetch_array();

  if(empty($existe)){
    $resultado=$conexion->multi_query("INSERT INTO `usuarios` (`USUARIO`, `CONTRASENA`, `TIPO`) VALUES ('$usuario', '$contrasena', '$tipo');
    INSERT INTO `pacientes` (`ID`, `NOMBRE`, `APELLIDO`, `CONDICIÓN`, `USUARIO`) VALUES ('','$nombre','$apellido','$condicion','$usuario')");

    if(!$resultado){

      $json=array('status'=>false, 'mensaje'=>'No se pudo agregar el paciente \n'.mysqli_connect_error());
      echo json_encode($json);
    }else{
      $json=array('status'=>true, 'mensaje'=>'Paciente insertado con exito');
      echo json_encode($json);
    }

  }else{
    $json=array('status'=>false, 'mensaje'=>'Este nombre de usuario ya existe en el sistema, seleccione otro');
    echo json_encode($json);
  }

 ?>
