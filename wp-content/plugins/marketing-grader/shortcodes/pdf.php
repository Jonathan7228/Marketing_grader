<?php 
	
	$path = $_SERVER['DOCUMENT_ROOT'];
	include_once $path . '/wp-content/plugins/marketing-grader/includes/html2pdf/html2pdf.class.php';
	

	if(isset($_POST['mai']) && !empty($_POST['mai']))
	{
		//$html=ob_get_clean();
		$html = "<html><head><title>Esta es mi primera pagina</title></head><body><h1>Esto es un encabezado</h1><p>Y esto es un parrafo, donde podemos escribir todo el rollo que se nos ocurra.</body></html>";
		$html2pdf = new HTML2PDF('P','A4','es',true,'UTF-8');
		$html2pdf->WriteHTML($html);
		$html2pdf->Output('pdfs/'.$_POST['mai'].'.pdf','F');
		echo $_POST['mai'];
	}


?>