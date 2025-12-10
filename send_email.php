<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get and sanitize form data
$data = json_decode(file_get_contents('php://input'), true);
$name = filter_var($data['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$subject = filter_var($data['subject'] ?? '', FILTER_SANITIZE_STRING);
$message = filter_var($data['message'] ?? '', FILTER_SANITIZE_STRING);

// Validate required fields
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Set the recipient email address
$to = 'a.haleem@haleem-consult.com';

// Set email headers
$headers = [
    'From' => $email,
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
];

// Format the email body
$emailBody = "Name: $name\n";
$emailBody .= "Email: $email\n\n";
$emailBody .= $message;

// Send the email
$headersString = '';
foreach ($headers as $key => $value) {
    $headersString .= "$key: $value\r\n";
}

$mailSent = mail($to, $subject, $emailBody, $headersString);

if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
} else {
    $error = error_get_last();
    error_log('Mail sending failed: ' . print_r($error, true));
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again.']);
}
