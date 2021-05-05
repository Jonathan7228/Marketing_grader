<?php 
	
	function marketing_grader_initial_form(){
		global $wpdb;
		$us = wp_get_current_user();
		$url_actual="http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

		$questions = $wpdb->get_results("SELECT * FROM wp_questions WHERE state = 1 ORDER BY sequence");

		ob_start();
		?>
		<form method="post" id="create_licitacion" enctype="multipart/form-data">

			<div class="container">      
				<div class="row">
					<div class="col-md-12">
			          <div class="row">
			          	<?php
			          	for($i=0; $i<count($questions); $i++){ 
			          		$subquestions = $wpdb->get_results("SELECT * FROM wp_sub_questions WHERE question_id= ".$questions[$i]->intId."");
			          		if($questions[$i]->answer_sequential == 1){
	//############################################# SEQUENCIAL SELECTION ################################################### 
						?> 

						<div id="Question_<?php echo $i+1; ?>" class="col-md-12 content-general-by-question" <?php if($i>0){ echo 'style="display: none"';} ?>>
							<div class="form-row">
							    <div class="form-group col-md-12 content_question">
							    	<label for="licitacion_nombre" class="label_questions"><strong><?php echo $i+1; ?>.</strong> <?php echo $questions[$i]->description; ?>?</label>


									<div class="custom-control custom-radio custom-control-inline col-md-6 content_answers">
									  <input type="radio" class="custom-control-input" id="answer_question_<?php echo $i+1; ?>_yes" name="answer_question_<?php echo $i+1; ?>" value="1" onchange="valQuestion(<?php echo $i+1; ?>);" data-value="1" data-label="<?php echo $questions[$i]->graphic_label;  ?>">
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php echo $i+1; ?>_yes">Si</label>
									  <input type="radio" class="custom-control-input" id="answer_question_<?php echo $i+1; ?>_no" name="answer_question_<?php echo $i+1; ?>" value="0" onchange="valQuestion(<?php echo $i+1; ?>);" data-value="0" data-label="<?php echo $questions[$i]->graphic_label;  ?>">
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php echo $i+1; ?>_no">No</label>
									</div>

							    </div>


							    <?php 
					          	for($x=0; $x<count($subquestions); $x++){ ?>

					          		<div id="content_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>" class="form-group col-md-12 content-sub-questions"  style="display: none">

							    	<label for="licitacion_nombre" class="label_sub_questions"><strong><?php echo $i+1; ?>.<?php echo $x+1; ?>. </strong><?php echo $subquestions[$x]->description; ?>?</label>


									<div class="custom-control custom-radio custom-control-inline col-md-6 content_sub_answers">
									  <input type="radio" class="custom-control-input" id="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_yes" name="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>" value="1" onchange="valSubQuestion(<?php echo $i+1; ?>,<?php echo $x+1; ?>,<?php echo count($questions); ?>);" data-value="<?php echo $subquestions[$x]->value; ?>">
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_yes">Si</label>
									  <input type="radio" class="custom-control-input" id="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_no" name="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>" value="0" onchange="valSubQuestion(<?php echo $i+1; ?>,<?php echo $x+1; ?>,<?php echo count($questions); ?>);">
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_no">No</label>
									</div>

							    </div>
							    <div id="content_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>_1" class="form-group col-md-12 content-sub-questions"  style="display: none">

							    	<label for="licitacion_nombre" class="label-sub-questions-which">Cual?</label>
									<input type="text" class="custom-control-input which-text" id="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_which" name="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_which" >
							    </div>

							    <?php } ?>

							</div>
						</div>

			          	<?php
	//############################################# MULTIPLE SELECTION ##################################################### 
			          		}else{
			          			?>

			          			<div id="Question_<?php echo $i+1; ?>" class="col-md-12 content-general-by-question" <?php if($i>0){ echo 'style="display: none"';} ?>>
							<div class="form-row">
							    <div class="form-group col-md-12 content_question">
							    	<label for="licitacion_nombre" class="label_questions"><strong><?php echo $i+1; ?>.</strong> <?php echo $questions[$i]->description; ?>?</label>


									<div class="custom-control custom-radio custom-control-inline col-md-6 content_answers">
									  <input type="radio" class="custom-control-input" id="answer_question_<?php echo $i+1; ?>_yes" name="answer_question_<?php echo $i+1; ?>" value="1" onchange="valQuestionSelMul(<?php echo $i+1; ?>, <?php echo (count($subquestions)); ?>);" data-value="1" data-label="<?php echo $questions[$i]->graphic_label;  ?>">
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php echo $i+1; ?>_yes">Si</label>
									  <input type="radio" class="custom-control-input" id="answer_question_<?php echo $i+1; ?>_no" name="answer_question_<?php echo $i+1; ?>" value="0" onchange="valQuestionSelMul(<?php echo $i+1; ?>, <?php echo (count($subquestions)); ?>);" data-value="0" data-label="<?php echo $questions[$i]->graphic_label;  ?>">
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php echo $i+1; ?>_no">No</label>
									</div>

							    </div>


							    <?php 
					          	for($x=0; $x<count($subquestions); $x++){ ?>

					          		<div id="content_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>" class="form-group col-md-12 content-sub-questions"  style="display: none">

								    	<label for="licitacion_nombre" class="label_sub_questions"><strong><?php echo $i+1; ?>.<?php echo $x+1; ?>. </strong><?php echo $subquestions[$x]->description; ?>?</label>


										<div class="custom-control custom-radio custom-control-inline col-md-6 content_sub_answers">
										  <input type="radio" class="custom-control-input" id="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_yes" name="answer_subquestion_<?php echo $i+1; ?>" value="1" onchange="valSubQuestionSelMul(<?php echo $i+1; ?>, <?php echo $x+1; ?>, <?php echo count($questions); ?>);" data-value="<?php echo $subquestions[$x]->value; ?>">
										  <label class="custom-control-label display-label-radios" for="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_yes">Si</label>
										  
										</div>

							    	</div>
							    <div id="content_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>_1" class="form-group col-md-12 content-sub-questions"  style="display: none">

							    	<label for="licitacion_nombre" class="label-sub-questions-which">Cual?</label>
									<input type="text" class="custom-control-input which-text" id="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_which" name="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_which" >
							    </div>

							    <?php } ?>

							</div>
						</div>

			          			<?php
			          		}
			          } ?>


			          	


					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-group content-button col-md-12">
					<button type="button" class="btn btn-primary" id="btn_calculate" disabled="disabled">Calcular</button>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<canvas id="marksChart" width="600" height="400"></canvas>
				</div>
			</div>
		</form>

		<?php
		$return = ob_get_contents();
		ob_end_clean();
		return $return; 
	}

	add_shortcode('marketing_grader_initial_form','marketing_grader_initial_form');
?>