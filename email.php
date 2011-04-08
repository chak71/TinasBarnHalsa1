<?php
require_once('PHPMailer/class.phpmailer.php');

$resp['status'] = 'error';
$resp['errmessage'] = '';

if (!empty($_POST)) {
	if (!empty($_POST['email']) && !empty($_POST['message']) && !empty($_POST['name']) && !empty($_POST['recaptcha_response_field'])) {
		$answer = trim(stripslashes($_POST['recaptcha_response_field']));
		$postData['challenge'] = $_POST['recaptcha_challenge_field'];	
		$postData['response'] = urlencode($answer);
		$postData['remoteip'] = $_SERVER['REMOTE_ADDR'];
		$postData['privatekey'] = 'your private key';
		$ch = curl_init("http://api-verify.recaptcha.net/verify");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$data = curl_exec($ch);
		curl_close($ch);
		$response = explode(PHP_EOL, $data);
		if ($response[0] == 'true') {
			$mail = new PHPMailer();
			$mail->IsSMTP(); // enable SMTP
			$mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
			$mail->SMTPAuth = true;  // authentication enabled
			$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
			$mail->Host = 'smtp.gmail.com';
			$mail->Port = 465; 
			$mail->Username = 'you at gmail dot com';
			$mail->Password = 'your gmail password';      
			$mail->SetFrom('you@website.com'); 
			$mail->Body = 'Name: '.$_POST['name'] . PHP_EOL . 
				'E-mail: ' . $_POST['email'] . PHP_EOL . PHP_EOL . 
				'Message:' . PHP_EOL . $_POST['message'];
			$mail->Subject = 'Some message from your site';
			$mail->AddAddress('Igetthe@mail.com');
			if (!$mail->Send()) {
				$resp['errmessage'] = 'Mail error: '.$mail->ErrorInfo;
				$resp['status'] = 'success';
			} else {
				$resp['errmessage'] = 'Message submitted succesfully!';
			}

		} else {
			if ($response[1] == 'incorrect-captcha-sol') {
				$resp['errmessage'] = 'The entered text from the Captcha image is wrong.';
			} else {
				$resp['errmessage'] = 'Can\'t validate the Captcha image.';
			}
		}
	} else {
		$resp['errmessage'] = 'Missing required fields!';
	}
} 
echo json_encode($resp);
?>
