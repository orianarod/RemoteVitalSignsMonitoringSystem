$(function (){

  $.get('../Backend/inicio.php', function(response) {
    let respuesta=JSON.parse(response);
    $('#nombreUsuario').html(respuesta.USUARIO);
    $('#info-nombre').html(respuesta.NOMBRE+' '+respuesta.APELLIDO);
    $('#info-condicion').html(respuesta.CONDICIÓN);
    let id=respuesta.ID;

    $.post('../Backend/verRegistros.php',{id},  function(response) {
      let registros = JSON.parse(response);
      let template = ``;

      if (registros.length === 0) {
        $('#noRegistros').show();
      } else {
        $('#noRegistros').hide();
        registros.forEach(registro => {
          template += `
            <tr>
              <td>${registro.timestamp}</td>
              <td>${registro.presion}</td>
              <td>${registro.pulso}</td>
              <td>${registro.temperatura}</td>
              `;

          if (registro.alerta == "SI") {
            template +=
              `<td class='bg-danger text-light'>${registro.alerta}</td>
            </tr>
            `;
          } else {
            template +=
              `<td>${registro.alerta}</td>
          </tr>
          `;
          }
        });
      }

      $('#registrosPaciente').html(template);

    });
    });




  $('#logout-btn').on('click', function logout() {
    if (confirm('¿Desea cerrar su sesion en el sistema?')) {
      $.post('../Backend/logout.php', function(response) {
        debugger;
        console.log(response);
        window.location.assign("../");
      });
    }
  });

})
