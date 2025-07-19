$(document).ready(function(){
    $.ajax({
        url: "datas/datos.json",
        method: "GET",
        datatype: "json",
        success: function(data){
            $("#institucion").text(data.instituto);
            $("#practica").text("PRACTICA CALIFICADA :"+data.practica);
            $("#alumno").text("Alumno" +data.alumno);
            $("#unidad").text("Ud :"+data.unidad);
        }
    })
})
//alumnos
$(document).ready(function(){
            $.ajax({
                url: "datas/alumnos.json",
                method: "GET",
                dataType: "json",
                success: function(data){
                    let estudiantes = data.estudiantes;
                    estudiantes.forEach(function(est){
                        const fila = `
                            <tr>
                                <td>${est.dni}</td>
                                <td>${est.nombre}</td>
                                <td>${est.apellido}</td>
                                <td>${est.edad}</td>
                            </tr>
                        `;
                        $("#tabla-estudiantes").append(fila);
                    });
                }
            });
        });
// los cursos
        $(document).ready(function(){
    $.ajax({
        url: "datas/cursos.json",
        method: "GET",
        dataType: "json",
        success: function(data){
            const cursos = data.cursos;
            cursos.forEach(function(curso){
                const fila = `
                    <tr>
                        <td>${curso.id_curso}</td>
                        <td>${curso.nombre_curso}</td>
                        <td>${curso.n_horas}</td>
                    </tr>
                `;
                $("#tabla-cursos").append(fila);
            });
        }
    });
});
/* lsod ocentes */
$(document).ready(function(){
    $.ajax({
        url: "datas/docentes.json",
        method: "GET",
        dataType: "json",
        success: function(data){
            const docentes = data.docentes;
            docentes.forEach(function(doc){
                const fila = `
                    <tr>
                        <td>${doc.dni}</td>
                        <td>${doc.nombre}</td>
                        <td>${doc.apellido}</td>
                        <td>${doc.curso}</td>
                    </tr>
                `;
                $("#tabla-docentes").append(fila);
            });
        }
    });
});
