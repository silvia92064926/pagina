async function consultarRUC() {
  const ruc = document.getElementById("ruc").value.trim();
  const resultado = document.getElementById("resultadoRUC");
  const token = "43dd4389c33a562cb944e8b615bb0565553d0cea710097eb04b53eb631fa7752"; // ← Reemplaza con tu token real de ConsultasPeru

  if (ruc.length !== 11 || isNaN(ruc)) {
    resultado.innerHTML = "⚠️ El número de RUC debe tener 11 dígitos numéricos.";
    return;
  }

  resultado.innerHTML = "🔄 Consultando...";

  const body = {
    token: token,
    type_document: "ruc",
    document_number: ruc
  };

  try {
    const response = await fetch("https://api.consultasperu.com/api/v1/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (response.status === 401) {
      resultado.innerHTML = "❌ Token inválido o no autorizado.";
      return;
    }

    if (response.status === 404) {
      resultado.innerHTML = "❌ RUC no encontrado.";
      return;
    }

    const data = await response.json();

    if (data.success) {
      const d = data.data;
      resultado.innerHTML = `
        <strong>Razón Social:</strong> ${d.name}<br>
        <strong>RUC:</strong> ${d.number}<br>
        <strong>Estado:</strong> ${d.status}<br>
        <strong>Condición de Domicilio:</strong> ${d.domicile_conditions}<br>
        <strong>Dirección:</strong> ${d.address}<br>
        <strong>Departamento:</strong> ${d.department}<br>
        <strong>Provincia:</strong> ${d.province}<br>
        <strong>Distrito:</strong> ${d.district}<br>
        <strong>Fecha de Creación:</strong> ${d.date_creation}<br>
        <strong>Tipo de Persona:</strong> ${d.person_type}<br>
        <strong>Es buen contribuyente:</strong> ${d.es_buen_contribuyente ? "Sí" : "No"}<br>
        <strong>Agente de retención:</strong> ${d.es_agente_de_retencion ? "Sí" : "No"}
      `;
    } else {
      resultado.innerHTML = "❌ No se pudo obtener la información del RUC.";
    }
  } catch (error) {
    resultado.innerHTML = "❌ Error al realizar la consulta.";
    console.error("Error:", error);
  }
}
