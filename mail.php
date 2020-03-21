<?php
header("Content-Type: text/html; charset=utf-8");

if(isset($_POST['user_phone'])) {
	
$email = "tendersmar@gmail.com"; #Email, на него придут письма
$title = "Заявка c kgt.kg"; #Заголовок письма

$text = "
Информация о клиенте:
Имя: ".$_POST['user_name']."
Телефон: ".$_POST['user_phone']."
Заявка пришла с сайта:" . $_SERVER['HTTP_REFERER'] ."
Время заказа: ".date("Y-m-d H:i:s");

if(mail($email, $title, $text)) {
	header('Location: index.html');
	echo 	'<script type="text/javascript">setTimeout(function(){window.top.location="index.html"} , 3000);</script>';

} else {
	echo "Ошибка. Возможно функция mail отключена. Обратитесь к хостинг-провайдеру или возьмите консультацию на сайте, где купили шаблон";
}
} else {
	echo "Ошибка";
}


?>
