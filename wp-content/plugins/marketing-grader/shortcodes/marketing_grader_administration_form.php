<?php 
	
	function marketing_grader_administration_form(){
		global $wpdb;
		$us = wp_get_current_user();
		$url_actual="http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
		include "backQuestions.php";

		$questions = $wpdb->get_results("SELECT * FROM wp_questions");

		ob_start();
		?>
		<form method="post" id="admin_questions" action="<?php echo $url_actual; ?>" enctype="multipart/form-data">
			<input type="hidden" id="contQuestions" name="contQuestions" value="<?php echo count($questions); ?>">
			<input type="hidden" id="action" name="action">
			<div class="container">      
				<div class="row">
					<div class="col-md-12">
			          <div class="row" id="content_general">
			          	<?php
			          	for($i=0; $i<count($questions); $i++){ 
			          		$subquestions = $wpdb->get_results("SELECT * FROM wp_sub_questions WHERE question_id= ".$questions[$i]->intId."");
						?> 
						
						<div id="Question_<?php echo $i+1; ?>" class="col-md-12"style="display: inline-flex;">
							<div class="form-row">
								<i class="fas fa-trash-alt 5x icon-delete-questions" title="Eliminar" id="btn_delete_question_<?php echo $i+1; ?>" name="btn_delete_question_<?php echo $i+1; ?>" onclick="deleteQuestion(<?php echo $i+1; ?>, <?php echo count($questions); ?>);"></i>

								<i class="fas fa-eye-slash icon-disable-question" title="Desactivar Pregunta" id="btn_disable_question_<?php echo $i+1; ?>" name="btn_desactive_question_<?php echo $i+1; ?>" onclick="disableQuestion(<?php echo $i+1; ?>,<?php echo count($questions); ?>);" <?php if($questions[$i]->state == 0){ echo 'style="display:none"'; } ?> ></i>

								<i class="fas fa-eye icon-enable-question" title="Activar Pregunta" id="btn_enable_question_<?php echo $i+1; ?>" name="btn_enable_question_<?php echo $i+1; ?>" onclick="enableQuestion(<?php echo $i+1; ?>,<?php echo count($questions); ?>);" <?php if($questions[$i]->state ==1){ echo 'style="display:none"'; } ?> ></i>


								<div id="content_selection_mode">

									<input type="radio" class="custom-control-input" id="mode_question_<?php echo $i+1; ?>_secuencial" name="mode_question_<?php echo $i+1; ?>" value="1" <?php if($questions[$i]->answer_sequential == 1 ){ echo "checked"; } ?> <?php if($questions[$i]->state == 0){ echo 'disabled="disabled" style="color:lightgray"'; } ?> >
									<label class="custom-control-label display-label-radios" for="mode_question_<?php echo $i+1; ?>_secuencial" <?php if($questions[$i]->state == 0){ echo 'style="color: lightgray"'; } ?>>Secuencial</label>


									  <input type="radio" class="custom-control-input" id="mode_question_<?php echo $i+1; ?>_multiple_selecction" name="mode_question_<?php echo $i+1; ?>" value="0" <?php if($questions[$i]->answer_sequential == 0 ){ echo "checked"; } ?> <?php if($questions[$i]->state == 0){ echo 'disabled="disabled" style="color:lightgray"'; } ?>>
									  <label class="custom-control-label display-label-radios" for="mode_question_<?php echo $i+1; ?>_multiple_selecction" <?php if($questions[$i]->state == 0){ echo 'style="color: lightgray"'; } ?>>Selección Múltiple</label>

								</div>

							    <div class="form-group col-md-12 content_question">
							    	
							    	<div class="form-group inputs_sub_questions">
							    		<h4 id="title_principal_<?php echo $i+1;  ?>" <?php if($questions[$i]->state == 0){ echo 'style="color: lightgray"'; } ?>>Pregunta Principal</h4>
							
							    		<textarea class="custom-control-input field_description" id="description_question_<?php echo $i+1 ?>" name="description_question_<?php echo $i+1; ?>" <?php if($questions[$i]->state == 0){ echo 'readonly style="color:lightgray"'; } ?>><?php echo $questions[$i]->description; ?></textarea>
							    		<label for="graphic_label_<?php echo $i+1; ?>" <?php if($questions[$i]->state == 0){ echo 'style="color: lightgray"'; } ?>>Label Gráfica</label>

							    		<input type="text" id="graphic_label_<?php echo $i+1; ?>" name="graphic_label_<?php echo $i+1; ?>" value="<?php echo $questions[$i]->graphic_label; ?>" <?php if($questions[$i]->state == 0){ echo 'readonly style="color:lightgray"'; } ?> >
										
										

							    		<input type="hidden" id="state_question_<?php echo $i+1; ?>" name="state_question_<?php echo $i+1; ?>" value="<?php echo $questions[$i]->state; ?>" >
							    		
							    	</div>

									<div class="form-group col-md-6 content_field_value_principal">

									  <label for="sequence_question_<?php echo $i+1; ?>" <?php if($questions[$i]->state == 0){ echo 'style="color: lightgray"'; } ?>>Orden</label>

									  <input type="text" class="custom-control-input field_value" id="sequence_question_<?php echo $i+1; ?>" name="sequence_question_<?php echo $i+1; ?>" value="<?php if($questions[$i]->sequence != 0){ echo $questions[$i]->sequence; } ?>"  onchange="valSequenceQuestions(<?php echo $i+1; ?>,<?php echo count($questions); ?>);" <?php if($questions[$i]->state == 0){ echo 'readonly style="color:lightgray"'; } ?> >

									</div>

									<div class="form-group col-md-6 content_field_value_principal">
									  <label for="value_question_<?php echo $i+1; ?>" <?php if($questions[$i]->state == 0){ echo 'style="color: lightgray"'; } ?> >Valor</label>
									  <input type="text" class="custom-control-input field_value" id="value_question_<?php echo $i+1; ?>" name="value_question_<?php echo $i+1; ?>" value="1" readonly <?php if($questions[$i]->state == 0){ echo 'style="color:lightgray"'; } ?> >
									</div>
		
									
							    </div>

								<i class="fas fa-caret-down" id="closed_questions<?php echo $i+1;  ?>" name="closed_questions<?php echo $i+1;  ?>" style="display: none" onclick="closeQuestions(<?php echo $i+1; ?>)" title="Ocultar sub-preguntas"></i>

								<i class="fas fa-caret-right" id="open_questions<?php echo $i+1; ?>" name="open_questions<?php echo $i+1; ?>"  <?php if($questions[$i]->state == 0){ echo 'style=display:none'; } ?>  onclick="openQuestions(<?php echo $i+1; ?>)" title="Ver sub-preguntas"></i>

							    <div id="general_content_subquestion_<?php echo $i+1 ?>" style="display: none">
								    <?php 
						          	for($x=0; $x<6; $x++){ ?>
						          		
						          		<div id="content_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>" class="form-group col-md-12 content-inputs-sub-questions"  style="display: inline-flex;">

								    	<div class="form-group inputs_sub_questions">
								    		<label>Sub-pregunta</label>
								    		<textarea class="custom-control-input field_description" id="description_subquestion_<?php echo $i+1 ?>_<?php echo $x+1; ?>" name="description_subquestion_<?php echo $i+1 ?>_<?php echo $x+1; ?>"><?php if(!empty($subquestions[$x])){echo $subquestions[$x]->description;} ?></textarea>
								    	</div>


										<div class="form-group col-md-6 content_field_value">
											<label>Orden</label>
										  
										  <input type="text" class="custom-control-input field_value" id="sequence_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>" name="sequence_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>" value="<?php if(!empty($subquestions[$x])){echo $subquestions[$x]->sequence; } ?>" onchange="valSequenceSubquestions(<?php echo $i+1; ?>,<?php echo $x+1; ?>);" >
										</div>

										<div class="form-group col-md-6 content_field_value">
										 <label>Valor</label>
										  <input type="text" class="custom-control-input field_value" id="value_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>" name="value_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>" value="<?php if(!empty($subquestions[$x])){ echo $subquestions[$x]->value; } ?>" onchange="valValueSubquestions(<?php echo $i+1; ?>,<?php echo $x+1; ?>);" >
										</div>

								    </div>
								    <div class="form-group col-md-12 content-inputs-sub-questions">
								    		<label>Recomendación</label>
								    		<textarea class="custom-control-input field_description" id="subquestion_recommendation_<?php echo $i+1 ?>_<?php echo $x+1; ?>" name="subquestion_recommendation_<?php echo $i+1 ?>_<?php echo $x+1; ?>"><?php if(!empty($subquestions[$x])){echo $subquestions[$x]->recommendation; }?></textarea>
								    	</div>
								    <?php if($x<5){ echo '<hr class="hr-subquestions"> '; } ?>
								    
								    <?php } ?>
								</div>
							</div>
						</div>
						<hr id="hr_question_<?php echo $i+1; ?>" class="hr-questions" />
					<?php } ?>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-group content-button col-md-12">
					<button type="button" class="btn btn-primary" id="btn_save">Guardar</button>
					<button type="button" class="btn btn-primary" id="btn_add">Agregar</button>
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

	add_shortcode('marketing_grader_administration_form','marketing_grader_administration_form');
?>