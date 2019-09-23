<?php
$to = 'etalonhaus@yandex.ru,leshka3333@mail.ru';
$subject = 'Заявка с ЭталонХаус';
$message = '
        <html>
            <head>
                <title>'.$subject.'</title>
            </head>
            <body>
                <p>Имя: '.$_POST['name'].'</p>
                <p>Телефон: '.$_POST['phone'].'</p>
                <p>Сообщение: '.$_POST['message'].'</p>
            </body>
        </html>';
$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Отправитель <from@etalonhaus.ru>\r\n";

echo $subject;
echo $_POST['name'];

mail($to, $subject, $message, $headers);
?>