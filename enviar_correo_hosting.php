<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Verificar si la solicitud es POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos JSON enviados desde JavaScript
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar si los datos existen
    if (!isset($data['subject']) || !isset($data['body']) || !isset($data['email'])) {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
        exit;
    }

    $subject = $data['subject'];
    $body = $data['body'];
    $email = $data['email'];

    // Crear una nueva instancia de PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP proporcionado por el hosting
        $mail->isSMTP();  // Habilitar SMTP
        $mail->Host = 'mail.rentacarwm.com.py';  // Servidor SMTP
        $mail->SMTPAuth = true;  // Autenticación SMTP
        $mail->Username = 'reservas_wm_autos@rentacarwm.com.py';  // Nombre de usuario
        $mail->Password = 'tu_contraseña';  // Contraseña de la cuenta de correo
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  // Usar SSL/TLS
        $mail->Port = 465;  // Puerto SMTP (465 es para SSL)

        // Remitente
        $mail->setFrom('reservas_wm_autos@rentacarwm.com.py', 'Rent a Car WM');

        // Destinatario
        $mail->addAddress($email);  // Dirección de correo destino

        // Asunto
        $mail->Subject = $subject;

        // Establecer el cuerpo del correo como HTML
        $mail->isHTML(true);
        $mail->Body = $body;

        // Enviar el correo
        if ($mail->send()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No se pudo enviar el correo']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "Error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
