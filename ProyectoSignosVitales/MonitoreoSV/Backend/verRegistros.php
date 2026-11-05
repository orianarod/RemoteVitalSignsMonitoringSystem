<?php
include ('../../database.php');
session_start();

if(isset($_POST['id'])){
  $id=$_POST['id'];
}else{
  $id=$_SESSION['paciente']['ID'];
}

  $registros=array();
  $alerta='NO';

$resultado=$conexion->query("SELECT * FROM `mediciones` WHERE ID='$id';");

if(!$resultado){
  die(mysqli_connect_errno());
}

  while($row=$resultado->fetch_array()){
    if($row['ALERTA']==1){
      $alerta='SI';
    }
    $registros[]=array(
      'numreg'=>$row['NUM_REG'],
      'timestamp'=>$row['FECHAHORA'],
      'temperatura'=>$row['TEMPERATURA'],
      'presion'=>$row['PRESION'],
      'pulso'=>$row['PULSO'],
      'alerta'=>$alerta
    );
  }

    echo $jsonstring = json_encode($registros);
 ?>
