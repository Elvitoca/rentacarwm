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
        // Configuración del servidor
        $mail->isSMTP();
        $mail->Host = 'mail.rentacarwm.com.py'; // Servidor SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'prueba_correo_web@rentacarwm.com.py'; // Usuario SMTP
        $mail->Password = 'tAFc@6ido%e?'; // Contraseña SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465; // Puerto SMTP

        // Remitente
        $mail->setFrom('prueba_correo_web@rentacarwm.com.py', 'Rent a Car WM');

        // Destinatario
        $mail->addAddress($email); // Dirección de correo destino

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
