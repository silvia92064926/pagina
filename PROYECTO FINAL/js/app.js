$(document).ready(() => {
    $.ajax({
        type: "GET",
        url: "data/docentes_data.xml",
        dataType: "xml"
    }).done((data) => {
        $(data).find('docente').each(function () {
            let fila = $('<tr>')
            fila.append(`<td>${$(this).find('dni').text()}</td>`)
            fila.append(`<td>${$(this).find('nombre').text()}</td>`)
            fila.append(`<td>${$(this).find('curso').text()}</td>`)
            fila.append(`<td>${$(this).find('apellido').text()}</td>`)
            
            $('#docentes tbody').append(fila);
        })
    })
})
$(document).ready(() => {
    $.ajax({
        type: "GET",
        url: "data/Alumnos.xml",
        dataType: "xml"
    }).done((data) => {
        $(data).find('alumno').each(function () {
            let fila = $('<tr>')
            fila.append(`<td>${$(this).find('dni').text()}</td>`)
            fila.append(`<td>${$(this).find('nombre').text()}</td>`)
            fila.append(`<td>${$(this).find('apellido').text()}</td>`)
            fila.append(`<td>${$(this).find('edad').text()}</td>`)
            
            $('#alumnos tbody').append(fila);
        })
    })
})
$(document).ready(() => {
    $.ajax({
        type: "GET",
        url: "data/Curso.xml",
        dataType: "xml"
    }).done((data) => {
        $(data).find('curso').each(function () {
            let fila = $('<tr>')
            fila.append(`<td>${$(this).find('id_curso').text()}</td>`)
            fila.append(`<td>${$(this).find('nombre_curso').text()}</td>`)
            fila.append(`<td>${$(this).find('n_horas').text()}</td>`)
            
            $('#cursos tbody').append(fila);
        })
    })
})