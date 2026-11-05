$(function(){

  autoLogin();

  $('#login-form').submit(function(e){
    const loginData = {
      usuario: $('#usuario').val(),
      contrasena: $('#contrasena').val()
    }

    $.post('Login/login.php', loginData, function(response){
            debugger;
      console.log(response);

      let respuesta = JSON.parse(response);
      let entrar=respuesta.entrar;
      let tipo=respuesta.tipo;

      if (entrar==false) {
        let template =`
         <h6 class='text-light' style="background-color:red">
         Usuario o contraseña incorrectos.
         </h6>`;
         $('#loginError').html(template);

      }else{
        if(tipo.includes("Administrador")){
          window.location.assign("../MonitoreoSV/Administrador");
        }else{
          window.location.assign("../MonitoreoSV/Paciente");
        }
      }
    });
    e.preventDefault();
  });

  function autoLogin(){
    console.log('autoLogin execution');
    $.get('Login/login.php', function(response){
      console.log(response);
      let respuesta = JSON.parse(response);
      console.log(response);
      debugger;

      let entrar=respuesta.entrar;
      let tipo=respuesta.tipo;

      if(entrar==true){
        if(tipo.includes("Administrador")){
          window.location.assign("../MonitoreoSV/Administrador");
        }else{
          window.location.assign("../MonitoreoSV/Paciente");
        }
      }
    });
  }

});
