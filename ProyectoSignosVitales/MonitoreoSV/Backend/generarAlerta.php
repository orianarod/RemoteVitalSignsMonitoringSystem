<?php
include ('../../database.php');

$resultado=$conexion->query("SELECT * FROM `alertas` JOIN `pacientes` ON `alertas`.ID=`pacientes`.ID;");
$alertas=array();

if($resultado){
  while ($row=$resultado->fetch_array()) {
    $alertas[]=array(
        'id'=>$row['ID'],
        'nombre'=>$row['NOMBRE'],
        'apellido'=>$row['APELLIDO'],
        'longitud'=>$row['LONGITUD'],
        'latitud'=>$row['LATITUD'],
        'numal'=>$row['NUM_AL'],
        'temperatura'=>$row['TEMPERATURA'],
        'presion'=>$row['PRESION'],
        'pulso'=>$row['PULSO'],
        'timestamp'=>$row['FECHAHORA'],
        'condicion'=>$row['CONDICIÓN']
      );
  }
}

echo $jsonstring=json_encode($alertas);
?>
