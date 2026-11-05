<?php
include ('../../database.php'); // Inclusion de la conexion a la base de datos
session_start();//Indica que se va a utilizar la variable $_SESSION en este archivo

if(isset($_SESSION['login'])): //Comprueba si existe un login activo
  $json=array('entrar'=>true, 'tipo'=>$_SESSION['login']['TIPO']);//
  echo json_encode($json);
else:
  if(isset($_POST['usuario']) && isset($_POST['contrasena'])):
    $usuario=$_POST['usuario'];
    $contrasena=$_POST['contrasena'];

    $resultado=$conexion->query("SELECT USUARIO, TIPO FROM `usuarios` WHERE USUARIO='$usuario' AND CONTRASENA='$contrasena'");

    $dataUsuario=$resultado->fetch_assoc();

      if($dataUsuario!=null):
        $_SESSION['login']=$dataUsuario;
        $json=array('entrar'=>true, 'tipo'=>$_SESSION['login']['TIPO']);
        echo json_encode($json);
      else:
        $json=array('entrar'=>false, 'tipo'=>'ninguno');
        echo json_encode($json);
      endif;
    endif;
  endif;


 ?>
