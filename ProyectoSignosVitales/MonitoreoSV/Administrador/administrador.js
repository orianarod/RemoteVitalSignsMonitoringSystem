$(function() {
  var notificacion = document.getElementById("notificacion");
  var alertas;


  //CARGAS AUTOMATICAS
  if (!alertas) {
    $('#containerAlertas').hide();
  }

  $('#tablaRegistros').hide();
  $('#agregarPacienteForm').hide();
  $('#noRegistros').hide();
  $('#ocultar').hide();
  $('#infoPaciente').hide();
  $('#detalleAlerta').hide();

  $.get('../Backend/inicio.php', function(response) {
    $('#nombreUsuario').html(response);
  });

  generaAlerta();

  var alertar = window.setInterval(generaAlerta, 30000);
  var sonido = window.setInterval(sonidoNotificacion, 5000);

  //ACCIONES DE USUARIO....

  //CERRAR SESION
  $('#logout-btn').on('click', function logout() {
    if (confirm('¿Desea cerrar su sesion en el sistema?')) {
      $.get('../Backend/logout.php', function(response) {
        console.log(response);
        window.location.assign("../");
      });
    }
  });

  //FILTRAR PACIENTES
  $('#buscar').keyup(function buscarPaciente() {
    if ($('#buscar').val()) {
      let buscar = $('#buscar').val();

      $.post('../Backend/buscarPaciente.php', {
        buscar
      }, function(response) {
        mostrarPacientes(response);
      });

      $('#ocultar').show();
    }
  });

  //MOSTRAR TODOS LOS PACIENTES
  $('#ver-todos').on('click', function(evento) {
    evento.preventDefault();
    $.get('../Backend/buscarPaciente.php', function(response) {
      mostrarPacientes(response);
      $('#ver-todos').hide();
      $('#ocultar').show();
    })
  });

  //OCULTAR PACIENTES
  $('#ocultar').on("click", function(evento) {
    evento.preventDefault();
    $('#pacientes').html(``);
    $('#ver-todos').show();
    $('#ocultar').hide();

  })

  //AGREGAR PACIENTES AL SISTEMA
  $('#agregarPaciente').on('click', function(evento) { //Abrir form de agregar pacientes
    evento.preventDefault();
    $('#agregarPacienteForm').show();
    $('#agregarPaciente').hide();
  });

  $('#agregar').on('click', function agregarPaciente(evento) { //Agregar paciente
    evento.preventDefault();
    let nombre = $('#nombrePaciente').val();
    let apellido = $('#apellidoPaciente').val();
    let condicion = $('#condicionPaciente').val();
    let usuario = $('#usuario').val();
    let contrasena1 = $('#contrasena1').val();
    let contrasena2 = $('#contrasena2').val();

    if (nombre) {
      if (apellido) {
        if (condicion) {
          if (usuario) {
            if (contrasena1) {
              if (contrasena1 == contrasena2) {
                $.ajax({
                  url: '../Backend/agregarPaciente.php',
                  type: 'Post',
                  data: {
                    nombre: nombre,
                    apellido: apellido,
                    condicion: condicion,
                    usuario: usuario,
                    contrasena: contrasena1
                  },
                  success: function(response) {
                    console.log(response);
                    let respuesta = JSON.parse(response);
                    let status = respuesta.status;
                    let msj = respuesta.mensaje;

                    if (status) {

                      document.getElementById('agregarPacienteForm').reset();
                      $('#agregarPacienteForm').hide();
                    }
                    window.alert(msj);
                  }
                });
              } else {
                window.alert('La confirmacion de contrasena no es correcta');
              }
            } else {
              window.alert("Debe ingresar una contraseña");
            }
          } else {
            window.alert("Debe ingresar un usuario");
          }

        } else {
          window.alert("Debe ingresar una condicion");
        }
      } else {
        window.alert("Debe ingresar un apellido");
      }
    } else {
      window.alert("Debe ingresar un nombre");
    }

    $('#agregarPaciente').show();
    $('#agregarPacienteForm').hide();
    $('#agregarPaciente').show();
    $('#nombrePaciente').val('');
    $('#apellidoPaciente').val('');
    $('#condicionPaciente').val('');
    $('#usuario').val('');
    $('#contrasena1').val('');
    $('#contrasena2').val('');
  });

  $('#cancelar').on('click', function(evento) { //Cerrar form de agregar y cancelar la operación
    evento.preventDefault();
    $('#agregarPacienteForm').hide();
    $('#agregarPaciente').show();
    $('#nombrePaciente').val('');
    $('#apellidoPaciente').val('');
    $('#condicionPaciente').val('');
    $('#usuario').val('');
    $('#contrasena1').val('');
    $('#contrasena2').val('');

  });

  //VER REGISTROS PACIENTE
  $(document).on('click', '.ver-paciente', function(evento) {
    evento.preventDefault();
    let elemento = $(this)[0].parentElement.parentElement;
    let id = $(elemento).attr('id');
    let nombre = $(elemento).attr('nombre') + " " + $(elemento).attr('apellido');
    let condicion = $(elemento).attr('condicion');

    verRegistros(id, nombre, condicion);

  });

  //CERRAR PACIENTE
  $('#cerrarPaciente').on('click', function(evento) {
    evento.preventDefault();
    $('#registrosPaciente').html('');
    $('#info-condicion').html('');
    $('#info-nombre').html('<i>No se ha seleccionado un paciente</i>');
    $('#infoPaciente').hide();
  });

  //ELIMINAR PACIENTES
  $(document).on('click', '.eliminar-paciente', function(evento) {
    evento.preventDefault();
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("id");
    console.log(id);

    $.post('../Backend/eliminarPaciente.php', {
      id
    }, function(response) {
      if (confirm('¿Está seguro de que desea ELIMINAR este paciente?')) {
        window.alert(response);
      }

    });
  }); //elimina un paciente seleccionado

  //VER DETALLE ALERTA
  $(document).on('click', '.ver-alerta', function(evento) {
    evento.preventDefault();
    let alerta = $(this)[0].parentElement.parentElement;

    let nombrePacienteAlerta = 'Paciente: ' + $(alerta).attr('nombre');
    let condicionPacienteAlerta = 'Condición: ' + $(alerta).attr('condicion');
    let idPacienteAlerta = $(alerta).attr('id');
    let fechahora = $(alerta).attr('timestamp');
    let pulso = $(alerta).attr('pulso');
    let presion = $(alerta).attr('presion');
    let temperatura = $(alerta).attr('temperatura');

    let lon = $(alerta).attr('longitud');
    let lat = $(alerta).attr('latitud');
    let ubicacion = lat + "%2C" + lon;

    let urlgooglemaps = `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lon}`;

    let href = `<a href="${urlgooglemaps}" target="_blank"> Ver ubicación en Google Maps </a> `;

    let template = `<tr>
      <th scope='row'> ${fechahora} </th>
      <td> ${pulso} </td>
      <td> ${presion} </td>
      <td> ${temperatura} </td>
    `;


    $('#nombrePacienteAlerta').html(nombrePacienteAlerta);
    $('#condicionPacienteAlerta').html(condicionPacienteAlerta);
    $('#infoAlerta').html(template)
    $('#urlgooglemaps').html(href);

    $('#detalleAlerta').show();

    $("#verRegistrosPaciente").on('click', function(evento) {
      evento.preventDefault();
      verRegistros(idPacienteAlerta, $(alerta).attr('nombre'), $(alerta).attr('condicion'));
    });

    //RESOLVER ALERTA
    $('#resolverAlerta').on('click', function(evento) {
      evento.preventDefault();
      let numal = $(alerta).attr('numal');

      if (confirm('¿Está seguro de que esta emergencia fue resuelta? </br> Si confirma no aparecerá más en la tabla de ALERTAS')) {
        $.post('../Backend/resolverAlerta.php', {
          numal
        }, function(response) {
          window.alert(response);
          $('#detalleAlerta').hide();
          generaAlerta();
        });
      }
    })
  });

  //OCULTAR DETALLE ALERTA
  $('#ocultarDetalleAlerta').on('click', function(evento) {
    evento.preventDefault();
    $('#detalleAlerta').hide();
  });

  //FUNCIONES CON LLAMADO

  //GENERAR ALERTA EN EL SERVIDOR
  function generaAlerta() { //Se llama con set interval para generar el alerta
    let template = '';
    $.get('../Backend/generarAlerta.php', function(response) {
      alertas = JSON.parse(response);
      let maxFecha = 0;

      console.log("Alertas length: " + alertas.length);

      if (alertas.length != 0) {

        alertas.forEach(alerta => {
          template += `<tr clase=text-light
          longitud="${alerta.longitud}" latitud="${alerta.latitud}" nombre="${alerta.nombre} ${alerta.apellido}"
          timestamp='${alerta.timestamp}' pulso='${alerta.pulso}' presion='${alerta.presion}'
          temperatura='${alerta.temperatura}' condicion='${alerta.condicion}' id='${alerta.id}'
          numal=${alerta.numal}>
          <th scope='row' class='text-danger'> + </th>
          <th scope='row'> ${alerta.nombre} ${alerta.apellido} </th>
          <td> ID: ${alerta.id} </td>
          <td> ${alerta.timestamp} </td>
          <td> Ubicación: ${alerta.latitud}, ${alerta.longitud} </td>
          <td> <a href="index.html#detalleAlerta" class='ver-alerta text-warning'> Ver detalle </a> </td>`;
        });

        $('#alertasTable').html(template);
        $('#containerAlertas').show();
      } else {
        $('#alertasTable').html('');
        $('#containerAlertas').hide();
      }
    })
  }

  function sonidoNotificacion() {
    if (alertas.length != 0 && $('#sonido').prop('checked')) {
      notificacion.play();
    }
  }

  function mostrarPacientes(pacientesJSON) { //Se llama para llenar la tabla de pacientes
    let pacientes = JSON.parse(pacientesJSON);
    let template = ``;

    pacientes.forEach(paciente => {
      template += `
          <tr id="${paciente.id}" nombre="${paciente.nombre}" apellido="${paciente.apellido}" condicion="${paciente.condicion}">
              <th scope='row' class='text-secondary'> ${paciente.id} </td>
              <td> ${paciente.nombre} ${paciente.apellido} </td>
              <td>
                <button class="ver-paciente btn btn-outline-info">
                  Ver
                </button>
              </td>
              <td>
                <button class="eliminar-paciente btn btn-outline-danger">
                  Eliminar
                </button>
              </td>

          </tr>`
    });

    $('#pacientes').html(template);
  }

  function verRegistros(id, nombre, condicion) {
    $.post('../Backend/verRegistros.php', {
      id
    }, function(response) {
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
        $('#tablaRegistros').show();
      }

      let nombrePaciente = `Paciente: ${nombre}`;
      let condicionPaciente = `Condición: ${condicion}`;

      $('#registrosPaciente').html(template);
      $('#info-nombre').html(nombrePaciente);
      $('#info-condicion').html(condicionPaciente);
      $('#infoPaciente').show();

    });
  }

})
