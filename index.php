<?php
$title='Template for testprogram'; 
$style = 'style/style.less'; 
$javascript = 'index.js';
include(__DIR__ . '/incl/header.php');
?>

<div id='flash'>
		<input id='url' value='ws://dbwebb.se:1337' />
		<button id='connect'>Connect</button> 
		<button id='close'>Close</button>


		<div id="log"></div>

		<form id="send_message">
			<input id='message' />
			<input type="submit" value="Sänd" />
		</form>

</div>

<?php $path=__DIR__; include(__DIR__ . '/incl/footer.php'); ?>
