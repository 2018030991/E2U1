
import "./jquery-3.5.1.min.js";

    function render_alumno(alumno){
        $("#table").append(
             `<tr> 
                <th scope="row">${alumno.matricula}</th>
                <th>${alumno.nombre}</th>
                <th>${alumno.sexo}</th>
                <th>${alumno.materia_1}</th>
                <th>${alumno.materia_2}</th>
                <th>${alumno.materia_3}</th>
             </tr>`
        )
    }

    function load_alumnos(matricula = null){
        let data = {matricula}
        $.ajax({
            type: "get",
            url: "/alumnos",
            data: data,
            success: function (response) {
                $("#table").empty()
                response.forEach(alumno => {
                    render_alumno(alumno)
                });
            },
            error: function(response){
                alert("Error de carga")
            }
        });
    }


    // eventos --------------------------------

    $("#form").on("submit", function(event){
        event.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: "post",
            url: "/alumnos",
            data: data,
            success: function () {
                load_alumnos();
                $("form").trigger("reset");
            },
            error: function(response){
                alert("Error");
            }
        });
    });

    $("#search-input").on("keyup", function (e){
        let searchValue = $(this).val();
        console.log(searchValue)
        load_alumnos(searchValue);
    })

//cuando la pantalla carga,... carga los alumnos
$(document).ready(function(){
    load_alumnos();
});

