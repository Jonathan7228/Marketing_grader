<?php 
	
	function marketing_grader_result(){
		global $wpdb;
		$us = wp_get_current_user();
		$url_actual="http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

		$visitor = $wpdb->get_results("SELECT * FROM wp_visitors_register WHERE email = '".$_GET['mail']."'");
		$visitorResults = $wpdb->get_results("SELECT * FROM wp_visitors_results WHERE idVisitor = ".$visitor[0]->intId."");

		ob_start();
		?>

		<div id="content-full-result" class="container"> 
			<div class="row content-header-result">
					<div class="col-md-6 col-header-result">
						<h4>Resultado</h4>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
					</div>
					<div id="canvasGraphic" class="col-md-6 col-header-result">
						<canvas id="marksChart" width="600" height="400"></canvas>
						
					</div>
				</div>

			
			<?php for($i=0; $i<count($visitorResults); $i++){  ?>
				<hr class="hr-by-questions" />
				<div class="row">
					<div class="col-md-12"><h4><strong><?php echo $i+1; ?>. </strong><?php echo $visitorResults[$i]->question; ?></h4></div>
					<div class="col-md-12"><strong>R/. </strong><?php echo $visitorResults[$i]->subquestion; ?></div>
				</div>
				
				<?php if($visitorResults[$i]->rating <= 2){ echo '<hr class="hr-debil"><div class="col-md-12"><strong class="text-debil">Débil</strong></div>'; } ?>
				<?php if($visitorResults[$i]->rating == 3){ echo '<hr class="hr-regular"><div class="col-md-12"><strong class="text-regular">Regular</strong></div>'; } ?>
				<?php if($visitorResults[$i]->rating >= 4){ echo '<hr class="hr-fuerte"><div class="col-md-12"><strong class="text-fuerte">Fuerte</strong></div>'; } ?>
				<div class="col-md-12"><?php echo $visitorResults[$i]->description_rating; ?></div>
			<?php } ?>
			<div class="row">
				<div class="col-md-12" style="display: block; text-align: center;">
					<img src="" id="img_graphic" width="500px" height="500px">
				</div>
			</div>

<div class="container-fluid ofertas">
			<div class="row" id="content_asesoria" style="text-align: center;">
				<div class="col-md-12">
					<button type="button" class="btn btn-primary btn_download" id="btn_asesoria">Solicitar Asesoria</button>
					
				</div>
			</div>

			<div class="row" id="content_download" style="text-align: center;">
				<div class="col-md-12">
					<button type="button" class="btn btn-primary btn_download" id="btn_download">Enviar correo</button>
				</div>
			</div>
		</div>
		</div>
		<?php
		$return = ob_get_contents();
		ob_end_clean();
		return $return; 
	}

	add_shortcode('marketing_grader_result','marketing_grader_result');
?>