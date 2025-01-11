document.getElementById('rentaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const categoria = document.getElementById('categoria').value;
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const kilometraje = document.getElementById('kilometraje').value;

    const preciosPorHora = [15, 20, 25, 30, 18, 35, 12];
    const precioPorHora = preciosPorHora[categoria - 1];

    // Calcular la diferencia en milisegundos
    const diferencia = endDate - startDate;

    // Verificar si la fecha de finalización es posterior a la de inicio
    if (diferencia <= 0) {
        alert("La fecha y hora de finalización deben ser posteriores a la de inicio.");
        return;
    }

    // Convertir la diferencia a días
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

    // Verificar si el número de días es al menos dos
    if (dias < 2) {
        alert("Para aprovechar al máximo nuestros precios y condiciones, el alquiler mínimo es de dos días. Por favor, selecciona una fecha de devolución posterior.");
        return;
    }

    const precioPorDia = precioPorHora * 24;
    let total = precioPorDia * dias;

    if (dias > 6) {
        total *= 0.7; // Aplicar 30% de descuento
    }

    const opciones = {
        limitado: 'Con límite de kilometraje (120km)',
        ilimitado: 'Sin límite de kilometraje'
    };

    // Redirigir a la página de resultado
    localStorage.setItem('total', Math.round(total));
    localStorage.setItem('opcion', opciones[kilometraje]);
    window.location.href = 'resultado.html';
});
