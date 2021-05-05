<?php
// Hook para usuarios no logueados
add_action('wp_ajax_nopriv_visitors_register', 'visitors_register_a');
// Hook para usuarios logueados
add_action('wp_ajax_visitors_register', 'visitors_register_a');
// Función que procesa la llamada AJAX

function visitors_register_a(){   
	global $wpdb;

	if(isset($_POST['mail']) && !empty($_POST['mail']))
	{
		$email = $_POST['mail'];
		$tableResults= 'wp_visitors_results';
		$visitor = $wpdb->get_results("SELECT * FROM wp_visitors_register WHERE email = '".$email."'");
		$wpdb->delete( $tableResults, array( 'idVisitor' => $visitor[0]->intId ) );

		$table = 'wp_visitors_register';
		$wpdb->delete( $table, array( 'intId' => $visitor[0]->intId ) );

		$wpdb->insert('wp_visitors_register',
			array(
				'email'=>$_POST['mail']
			)
		);
		$lastid = $wpdb->insert_id;
		$_POST['question'] = explode("||", $_POST['question']);
		$_POST['subquestion'] = explode("||", $_POST['subquestion']);
		$_POST['label'] = explode("||", $_POST['label']);
		$_POST['rating'] = explode("||", $_POST['rating']);
		$_POST['which'] = explode("||", $_POST['which']);

		if($lastid > 0 )
		{
			for($i=0; $i<count($_POST['subquestion']); $i++)
			{
				/*$fullquestion = $wpdb->get_results("SELECT * FROM wp_questions WHERE description = '".$_POST['question'][$i]."' AND graphic_label = '".$_POST['label'][$i]."'");
				$description_rating = "";
				if($_POST['rating'][$i] <= 2){ $description_rating = $fullquestion[0]->description_weak_rating; }
				if($_POST['rating'][$i] == 3){ $description_rating = $fullquestion[0]->description_regular_rating; }
				if($_POST['rating'][$i] >= 4){ $description_rating = $fullquestion[0]->description_strong_rating; }
				*/
				
				$recommendations = $wpdb->get_results("SELECT * FROM wp_sub_questions WHERE value='".$_POST['rating'][$i]."' AND description = '".$_POST['subquestion'][$i]."'");
				$description_rating = "";


				$wpdb->insert('wp_visitors_results',
					array(
						'idVisitor'=>$lastid,
						'question'=>$_POST['question'][$i],
						'subquestion'=>$_POST['subquestion'][$i],
						'label'=>$_POST['label'][$i],
						'rating'=>$_POST['rating'][$i],
						'which'=>$_POST['which'][$i],
						'description_rating'=>$recommendations[0]->recommendation
					)
				);
			}
			echo 1;
			
		}
		else
		{
			echo 0;
		}
	}
   wp_die();
}



add_action('wp_ajax_nopriv_generate_pdf', 'generate_pdf_f');
// Hook para usuarios logueados
add_action('wp_ajax_generate_pdf', 'generate_pdf_f');


function generate_pdf_f(){
	global $wpdb;
	$path = $_SERVER['DOCUMENT_ROOT'];
	include_once $path . '/wp-content/plugins/marketing-grader/includes/html2pdf/html2pdf.class.php';
	
	if(isset($_POST['mail']) && !empty($_POST['mail']))
	{
		try {
			$visitor = $wpdb->get_results("SELECT * FROM wp_visitors_register WHERE email = '".$_POST['mail']."'");
			$visitorResults = $wpdb->get_results("SELECT * FROM wp_visitors_results WHERE idVisitor = ".$visitor[0]->intId."");


			$img = $_POST['img'];
			$img = str_replace('data:image/png;base64,', '', $img);
			$img = str_replace(' ', '+', $img);
			$data = base64_decode($img);
			$im = imagecreatefromstring($data);  //convertir text a imagen
			

			if ($im !== false) {
				$filepath = $path.'/wp-content/plugins/marketing-grader/shortcodes/pdfs/graphic'.$visitor[0]->intId.'.png';
			    file_put_contents($filepath,$data);
			    //$image = imagecreatefrompng($data);
			    //header('Content-Type: image/png');
			    //imagepng($im, $path.'/wp-content/plugins/marketing-grader/shortcodes/pdfs/graphic12.png');//guardar a server 
			    //imagedestroy($im); //liberar memoria  
			    echo 'Todo salio bien tu imagen ha sido guardada';
			}else {
			    echo 'Un error ocurrio al convertir la imagen.';    
			}
			$html = '<div id="content-full-result" class="container"> 
							<div class="row content-header-result">
								<div class="col-md-6" style="max-width: 50%">
									<h4>Resultado</h4>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
								</div>
								<div class="col-md-6" style="max-width: 50%; text-align: center;">
									<img src="'.$path.'/wp-content/plugins/marketing-grader/shortcodes/pdfs/graphic'.$visitor[0]->intId.'.png" width="600" height="400" />
								</div>
					
							</div>';


		for($i=0; $i<count($visitorResults); $i++){ 
			$html .= '<hr style="margin-top: 30px; margin-bottom: 30px;" />
				<div class="row">
					<div class="col-md-12"><h4><strong>'. ($i+1) .'. </strong>'.$visitorResults[$i]->question .'</h4></div>
					<div class="col-md-12"><strong>R/. </strong>'.$visitorResults[$i]->subquestion.'</div>
				</div>';
			if($visitorResults[$i]->rating <= 2){
				$html .= '<hr style="color: red; border: solid; height: 12px; background: red;"><div class="col-md-12"><strong style="color:red;">Débil</strong></div>'; 
			}
			if($visitorResults[$i]->rating == 3){ 
				$html .= '<hr style="color: yellow; border: solid; height: 12px; background: yellow;"><div class="col-md-12"><strong style="color:yellow;">Regular</strong></div>'; 
			}
			if($visitorResults[$i]->rating >= 4){ 
				$html .= '<hr style="color: green; border: solid; height: 12px; background: green;"><div class="col-md-12"><strong style="color:green;">Fuerte</strong></div>'; 
			}
			$html .= '<div class="col-md-12">'.$visitorResults[$i]->description_rating.'</div>';

		}

		$html .= '</div>';

			sleep(1);
			//$html = "<img src='".$path."/wp-content/plugins/marketing-grader/shortcodes/pdfs/nombre_imagen.jpg' style='width: 500px;'>";
			$html2pdf = new HTML2PDF('P','A4','es',true,'UTF-8');
			$html2pdf->WriteHTML($html);
			$html2pdf->Output($path . '/wp-content/plugins/marketing-grader/shortcodes/pdfs/'.$_POST['mail'].'.pdf','F');


			//datos a enviar
            $data = array("a" => "a");
            //url contra la que atacamos
            $ch = curl_init("http://localhost/API/post");
            //a true, obtendremos una respuesta de la url, en otro caso, 
            //true si es correcto, false si no lo es
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            //establecemos el verbo http que queremos utilizar para la petición
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            //enviamos el array data
            curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($data));
            //obtenemos la respuesta
            $response = curl_exec($ch);
            // Se cierra el recurso CURL y se liberan los recursos del sistema
            curl_close($ch);
            
            if(!$response) {
                return false;
            }else{
                return $response;
            }


			//echo $_POST['html'];
			
		} catch (Exception $e) {
			echo $e;
		}
	}
	//echo $_POST['html'];

	wp_die();
}



// Hook para usuarios no logueados
add_action('wp_ajax_nopriv_visitors_results', 'visitors_results_a');
// Hook para usuarios logueados
add_action('wp_ajax_visitors_results', 'visitors_results_a');
// Función que procesa la llamada AJAX

function visitors_results_a(){   
	global $wpdb;

	if(isset($_POST['mail']) && !empty($_POST['mail']))
	{
		$email = $_POST['mail'];
		$visitor = $wpdb->get_results("SELECT * FROM wp_visitors_register WHERE email = '".$email."'");
		$visitorResult = $wpdb->get_results("SELECT * FROM wp_visitors_results WHERE idVisitor = ".$visitor[0]->intId."");
		echo json_encode($visitorResult);
	}
   wp_die();
}


?>