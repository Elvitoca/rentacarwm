A partir de este script:

    <script>
        function formatDate(date) {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            return date.toLocaleString('es-ES', options);
        }
    
        function generatePDF() {
            if (!document.getElementById('accept-terms').checked) {
                alert('Por favor, acepta los Términos y condiciones.');
                return;
            }
    
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
    
            // Cargar y agregar logotipo 
            const logo = new Image();
            logo.src = 'assets/img/WMLogo.png'; // Verifica que la ruta sea correcta
            logo.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = logo.width;
                canvas.height = logo.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(logo, 0, 0);
    
                const dataURL = canvas.toDataURL('image/png');
    
                const originalWidth = logo.width;
                const originalHeight = logo.height;
                const maxWidth = 50;
                const maxHeight = 20;
    
                let width = maxWidth;
                let height = (originalHeight / originalWidth) * maxWidth;
    
                if (height > maxHeight) {
                    height = maxHeight;
                    width = (originalWidth / originalHeight) * maxHeight;
                }
    
                doc.addImage(dataURL, 'PNG', 10, 10, width, height);
    
                // Título del documento
                doc.setFontSize(16);
                doc.setFont("helvetica", "bold");
                doc.text("Pedido de Alquiler RENT A CAR WM", 105, 20, {
                    align: "center"
                });
    
                // Detalles del cliente
                doc.setFontSize(12);
                doc.setTextColor(0);
                doc.text("Detalles del Cliente", 10, 60);
                doc.line(10, 62, 200, 62);
                doc.text(`Nombre y Apellido: ${document.getElementById("reservationName").textContent}`, 10, 70);
                doc.text(`Celular: ${document.getElementById("reservationPhone").textContent}`, 10, 80);
    
                // Encabezado de la tabla
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text("", 10, 90);
                doc.text("Detalles del Servicio", 30, 90);
                doc.text("Precio día", 140, 90);
                doc.text("Valor", 180, 90);
                doc.line(10, 92, 200, 92);
    
                // Contenido de la tabla
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);
                let startY = 100;
    
                // Agregar Vehículo
                doc.text("*", 10, startY);
                doc.text(`Vehículo: ${document.getElementById("reservationCarName").textContent}`, 30, startY);
                doc.text(`${document.getElementById("reservationPricePerDay").textContent}`, 140, startY);
                doc.text(`${document.getElementById("reservationTotalPrice").textContent}`, 180, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                startY += 10;
    
                // Agregar Pasajeros
                doc.text("*", 10, startY);
                doc.text(`Pasajeros: ${document.getElementById("reservationPassengers").textContent}`, 30, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                startY += 10;
    
                // Agregar Colores
                doc.text("*", 10, startY);
                doc.text(`Colores: ${document.getElementById("reservationColors").textContent}`, 30, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                startY += 10;
    
                // Agregar Transmisión
                doc.text("*", 10, startY);
                doc.text(`Transmisión: ${document.getElementById("reservationTransmission").textContent}`, 30, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                startY += 10;
    
                // Agregar Motor
                doc.text("*", 10, startY);
                doc.text(`Motor: ${document.getElementById("reservationMotor").textContent}`, 30, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                startY += 10;
    
                // Agregar Combustible
                doc.text("*", 10, startY);
                doc.text(`Combustible: ${document.getElementById("reservationFuel").textContent}`, 30, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                startY += 10;
    
                // Agregar Aire Acondicionado
                doc.text("*", 10, startY);
                doc.text(`Aire Acondicionado: ${document.getElementById("reservationAC").textContent}`, 30, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                startY += 10;
    
                // Agregar Radio Bluetooth
                doc.text("*", 10, startY);
                doc.text(`Radio Bluetooth: ${document.getElementById("reservationRadio").textContent}`, 30, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                startY += 10;
    
                // Agregar Días de Alquiler
                doc.text("*", 10, startY);
                doc.text(`Días de Alquiler: ${document.getElementById("reservationRentalDays").textContent}`, 30, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                startY += 10;
    
                // Agregar Fechas de Retiro y Entrega
                doc.text("*", 10, startY);
                doc.text(`Fecha de Retiro: ${document.getElementById("reservationPickupDate").textContent}`, 30, startY);
                startY += 10;
                doc.text("*", 10, startY);
                doc.text(`Fecha de Entrega: ${document.getElementById("reservationReturnDate").textContent}`, 30, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                startY += 10;
    
                // Agregar Tipo de Tarifa
                doc.text("*", 10, startY);
                doc.text(`Tipo de Tarifa: ${document.getElementById("reservationPricingType").textContent}`, 30, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                startY += 10;
    
                // Agregar Garantía
                doc.text("*", 10, startY);
                doc.text(`Garantía: ${document.getElementById("reservationWarranty").textContent}`, 30, startY);
                doc.line(10, startY + 2, 200, startY + 2);
    
                // Otros detalles (Fecha, forma de pago, total)
                const currentDateTime = formatDate(new Date());
                startY += 20;
                doc.setFontSize(12);
                doc.text(`Fecha: ${currentDateTime}`, 10, startY);
                doc.text(`Forma de Pago: ${document.getElementById("reservationPayment").textContent}`, 10, startY + 10);
    
                doc.setFont("helvetica", "bold");
                doc.text(`TOTAL GS: ${document.getElementById("reservationTotalPrice").textContent}`, 140, startY + 30);
    
                // Footer
                const footerYStart = 280;
                doc.setFontSize(8);
                doc.setFont("helvetica", "normal");
                doc.text("Rent a Car WM (c) 2024", 10, footerYStart);
                doc.text("0983-496-378", 10, footerYStart + 5);
                doc.text("gerencia@rentacarwm.com.py", 10, footerYStart + 10);
                doc.text("San Miguel Esq. Feliciando Duarte - San Lorenzo", 10, footerYStart + 15);
    
                // Generar el nombre del archivo PDF
                const reservationName = document.getElementById("reservationName").textContent;
                const nombreArchivoPDF = `Reserva_Rent_a_Car_WM_${reservationName}.pdf`;
    
                doc.save(nombreArchivoPDF);
            };
        }
    </script>


Necesito que:
1-Elimines estas partes del script:
Todos los detalles del cliente en :
// Detalles del cliente
                doc.setFontSize(12);
                doc.setTextColor(0);
                doc.text("Detalles del Cliente", 10, 60);
                doc.line(10, 62, 200, 62);
                doc.text(`Nombre y Apellido: ${document.getElementById("reservationName").textContent}`, 10, 70);
                doc.text(`Celular: ${document.getElementById("reservationPhone").textContent}`, 10, 80);

, tambien los detalles de Fechas de Retio y Entrega en : 
// Agregar Fechas de Retiro y Entrega
doc.text("*", 10, startY);
doc.text(`Fecha de Retiro: ${document.getElementById("reservationPickupDate").textContent}`, 30, startY);
startY += 10;
doc.text("*", 10, startY);
doc.text(`Fecha de Entrega: ${document.getElementById("reservationReturnDate").textContent}`, 30, startY);
doc.line(10, startY + 2, 200, startY + 2);

, y tambien en Otros detalles : 

// Otros detalles (Fecha, forma de pago, total)
const currentDateTime = formatDate(new Date());
startY += 20;
doc.setFontSize(12);
doc.text(`Fecha: ${currentDateTime}`, 10, startY);
doc.text(`Forma de Pago: ${document.getElementById("reservationPayment").textContent}`, 10, startY + 10);

doc.setFont("helvetica", "bold");
doc.text(`TOTAL GS: ${document.getElementById("reservationTotalPrice").textContent}`, 140, startY + 30);

,pero solamente elimina esta linea:
doc.text(`Forma de Pago: ${document.getElementById("reservationPayment").textContent}`, 10, startY + 10);
, para que no se vea la forma de pago.
2-Elimina en sintesis : Detalles del cliente, Fechas de retiro y entrega, y la forma de pago.
3-Corrige los resultados y ordena el resto despues de eliminar lo requerido anteriormente.
4-Corrige el PDF para que muestre todo como esta, ahora con los siguientes detalles:
Ejemplo:

-------------------------------------
Aqui la Cabecera  -  Aqui el Logotipo
-------------------------------------

Fecha (imprime la fecha y hr actual)

-------------------------------------
-Detalles del Vehículo

Vehículo:

Pasajeros:

Colores:

Transmisión:

Motor:

Combustible:

Aire Acondicionado:

Radio Bluetooth:
-------------------------------------
-Detalles del Alquiler

Garantía:

Precio por Día:

Días Alquilados:

Tarifa:

Total:
--------------------------------------


--------------------------------------
Footer
--------------------------------------

5-Adapta el script para corregir el PDF y genera el script completo corregido con los pedidos hechos.







Script Generado por chatgpt (copiado de reserva_confirm.html para generar pdf con logo) :

<script>
    function formatDate(date) {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        return date.toLocaleString('es-ES', options);
    }

    function generatePDF() {
        if (!document.getElementById('accept-terms').checked) {
            alert('Por favor, acepta los Términos y condiciones.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Cargar y agregar logotipo 
        const logo = new Image();
        logo.src = 'assets/img/WMLogo.png'; // Verifica que la ruta sea correcta
        logo.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = logo.width;
            canvas.height = logo.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(logo, 0, 0);

            const dataURL = canvas.toDataURL('image/png');
            const originalWidth = logo.width;
            const originalHeight = logo.height;
            const maxWidth = 50;
            const maxHeight = 20;

            let width = maxWidth;
            let height = (originalHeight / originalWidth) * maxWidth;

            if (height > maxHeight) {
                height = maxHeight;
                width = (originalWidth / originalHeight) * maxHeight;
            }

            // Encabezado y logotipo
            doc.addImage(dataURL, 'PNG', 10, 10, width, height);
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            doc.text("Pedido de Alquiler RENT A CAR WM", 105, 20, { align: "center" });

            // Fecha actual
            const currentDateTime = formatDate(new Date());
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            doc.text(`Fecha: ${currentDateTime}`, 10, 40);

            // Detalles del Vehículo
            doc.setFontSize(14);
            doc.text("Detalles del Vehículo", 10, 50);
            doc.line(10, 52, 200, 52);

            // Vehículo
            doc.setFontSize(12);
            let startY = 60;
            doc.text(`Vehículo: ${document.getElementById("reservationCarName").textContent}`, 10, startY);
            startY += 10;

            // Pasajeros
            doc.text(`Pasajeros: ${document.getElementById("reservationPassengers").textContent}`, 10, startY);
            startY += 10;

            // Colores
            doc.text(`Colores: ${document.getElementById("reservationColors").textContent}`, 10, startY);
            startY += 10;

            // Transmisión
            doc.text(`Transmisión: ${document.getElementById("reservationTransmission").textContent}`, 10, startY);
            startY += 10;

            // Motor
            doc.text(`Motor: ${document.getElementById("reservationMotor").textContent}`, 10, startY);
            startY += 10;

            // Combustible
            doc.text(`Combustible: ${document.getElementById("reservationFuel").textContent}`, 10, startY);
            startY += 10;

            // Aire Acondicionado
            doc.text(`Aire Acondicionado: ${document.getElementById("reservationAC").textContent}`, 10, startY);
            startY += 10;

            // Radio Bluetooth
            doc.text(`Radio Bluetooth: ${document.getElementById("reservationRadio").textContent}`, 10, startY);

            // Separador
            startY += 20;
            doc.line(10, startY, 200, startY);
            startY += 10;

            // Detalles del Alquiler
            doc.setFontSize(14);
            doc.text("Detalles del Alquiler", 10, startY);
            doc.line(10, startY + 2, 200, startY + 2);
            startY += 10;

            // Garantía
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
            startY += 10;
            doc.text(`Garantía: ${document.getElementById("reservationWarranty").textContent}`, 10, startY);
            startY += 10;

            // Precio por Día
            doc.text(`Precio por Día: ${document.getElementById("reservationPricePerDay").textContent}`, 10, startY);
            startY += 10;

            // Días Alquilados
            doc.text(`Días Alquilados: ${document.getElementById("reservationRentalDays").textContent}`, 10, startY);
            startY += 10;

            // Tarifa
            doc.text(`Tarifa: ${document.getElementById("reservationPricingType").textContent}`, 10, startY);
            startY += 10;

            // Total
            doc.setFont("helvetica", "bold");
            doc.text(`Total: ${document.getElementById("reservationTotalPrice").textContent}`, 10, startY);

            // Footer
            const footerYStart = 280;
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.text("Rent a Car WM (c) 2024", 10, footerYStart);
            doc.text("0983-496-378", 10, footerYStart + 5);
            doc.text("gerencia@rentacarwm.com.py", 10, footerYStart + 10);
            doc.text("San Miguel Esq. Feliciando Duarte - San Lorenzo", 10, footerYStart + 15);

            // Guardar PDF
            const reservationName = document.getElementById("reservationName").textContent;
            const nombreArchivoPDF = `Reserva_Rent_a_Car_WM_${reservationName}.pdf`;
            doc.save(nombreArchivoPDF);
        };
    }
</script>



