<?php 
	
	function marketing_grader_index(){
		global $wpdb;
		$us = wp_get_current_user();
		$url_actual="http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

		$questions = $wpdb->get_results("SELECT * FROM wp_questions WHERE state = 1 ORDER BY sequence");

		ob_start();

		?>
		<form method="post" id="marketing_grader_index" enctype="multipart/form-data">
			<div class="container">      
				<div class="row">
					<div class="col-md-12">
			          <div class="row">
			          	<?php
			          	for($i=0; $i<count($questions); $i++){ 
			          		$subquestions = $wpdb->get_results("SELECT * FROM wp_sub_questions WHERE question_id= ".$questions[$i]->intId."");
			          		if($questions[$i]->answer_sequential == 1){
	//############################################# SEQUENCIAL SELECTION ##########################################

						?> 
						<div id="Question_<?php echo $i+1; ?>" class="col-md-12 content-general-by-question" <?php if($i>0){ echo 'style="display: none"';} ?>>
							<div class="form-row">
							    <div class="form-group col-md-12 content_question">
							    	<label for="licitacion_nombre" class="label_questions"><strong><?php echo $i+1; ?>.</strong> <?php echo $questions[$i]->description; ?>?</label>
							    </div>
							</div>
							<div class="form-row">
								<div class="custom-control custom-radio custom-control-inline col-md-6 content_answers">
									  <input 
									  	type="radio" 
									  	class="custom-control-input" 
									  	id="answer_question_<?php echo $i+1; ?>_yes" 
									  	name="answer_question_<?php echo $i+1; ?>" 
									  	value="1" 
									  	data-value="1" 
									  	data-label="<?php echo $questions[$i]->graphic_label;  ?>"
										data-question="<?php echo $questions[$i]->description;  ?>" 
									  	onchange="valQuestion('btn_next_<?php echo $i+1; ?>',0,'',<?php echo $i+1; ?>,0,0);" 
									  />
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php echo $i+1; ?>_yes">Si</label>

									  <input 
									  	type="radio" 
									  	class="custom-control-input" 
									  	id="answer_question_<?php echo $i+1; ?>_no" 
									  	name="answer_question_<?php echo $i+1; ?>" 
									  	value="0" 
									  	data-value="0" 
									  	data-label="<?php echo $questions[$i]->graphic_label;  ?>"
										data-question="<?php echo $questions[$i]->description;  ?>" 
									  	onchange="valQuestion('btn_next_<?php echo $i+1; ?>',0,'',<?php echo $i+1; ?>,0,0);" 
									  />
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php echo $i+1; ?>_no">No</label>
									</div>

							</div>

							<div class="form-row content_buttons">
								<div class="col-md-12">
									<button type="button" class="btn btn-primary btn-next" id="btn_next_<?php echo $i+1; ?>" onclick="nextStep(<?php echo "'Question_".($i+1)."'";  ?>,1,<?php echo $i+1; ?>,1,4,<?php echo count($questions); ?>);" disabled="disabled">Siguiente</button>
								</div>
								
							</div>
							
							<div class="form-row content_buttons">
								<div class="col-md-12">
									<button type="button" class="btn btn-primary btn-back" id="btn_back_<?php echo $i+1; ?>_<?php echo $x+1;?>" onclick="backStep(<?php  echo "'Question_".($i+1)."'"; ?>);" <?php if(($i +1) == 1 ){ echo 'style="display:none"'; } ?> >Atras</button>
								</div>
								
							</div>
							
						</div>
 						<?php 
					      	for($x=0; $x<count($subquestions); $x++){ 
					    ?>
					    <div id="SubQuestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>" class="col-md-12 content-general-by-question" style="display: none">
							<div class="form-row">
							    <div class="form-group col-md-12 content_question">
							    	<label for="licitacion_nombre" class="label_questions"><strong><?php echo $i+1; ?>.<?php echo $x+1; ?>.</strong> <?php echo $subquestions[$x]->description; ?>?</label>
							    </div>

							</div>
							<div class="form-row">
								<div class="custom-control custom-radio custom-control-inline col-md-6 content_answers">
									  <input 
									  	type="radio" 
									  	class="custom-control-input" 
									  	id="answer_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>_yes" 
									  	name="answer_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>" 
									  	value="1" 
									  	data-value="<?php echo $subquestions[$x]->value; ?>"
									  	data-subquestion="<?php echo $subquestions[$x]->description;  ?>" 
									  	onchange="valQuestion('btn_next_<?php echo $i+1; ?>_<?php echo $x+1;?>',<?php echo $x+1; ?>,'answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_which',<?php echo $i+1; ?>,<?php echo $x+1;?>,0);"
									  />
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php echo $i+1; ?>_yes">Si</label>

									  <input 
									  	type="radio" 
									  	class="custom-control-input" 
									  	id="answer_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>_no" 
									  	name="answer_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>" 
									  	value="0" 
									  	data-value="0" 
									  	onchange="valQuestion('btn_next_<?php echo $i+1; ?>_<?php echo $x+1;?>',<?php echo $x+1; ?>,'answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_which',<?php echo $i+1; ?>,<?php echo $x+1;?>,0);"
									  />
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php echo $i+1; ?>_no">No</label>
									</div>

							</div>

							<div class="form-row" <?php if(($x +1) != 4 ){ echo 'style="display:none"'; } ?>>
								<div class="col-md-12">
									<label for="licitacion_nombre" class="label-sub-questions-which">Cual?</label>
									<input 
										type="text" 
										class="custom-control-input which-text" 
										id="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_which" 
										name="answer_question_<?php echo $i+1; ?>_<?php echo $x+1; ?>_which" 
										disabled="disabled" 
										onkeypress="valQuestionWhich(this.value,'btn_next_<?php echo $i+1; ?>_<?php echo $x+1;?>')" onchange="valQuestionWhich(this.value,'btn_next_<?php echo $i+1; ?>_<?php echo $x+1;?>')"
									/>
								</div>
								
							</div>

							<div class="form-row content_buttons">
								<div class="col-md-12">
									<button type="button" class="btn btn-primary btn-next" id="btn_next_<?php echo $i+1; ?>_<?php echo $x+1;?>" onclick="nextStep(<?php echo "'SubQuestion_".($i+1)."_".($x+1)."'";  ?>,2,<?php echo $i+1; ?>,<?php echo $x+1; ?>,<?php echo count($subquestions); ?>,<?php echo count($questions); ?>);" disabled="disabled">Siguiente</button>
								</div>
								
							</div>
							<div class="form-row content_buttons">
								<div class="col-md-12">
									<button type="button" class="btn btn-primary btn-back" id="btn_back_<?php echo $i+1; ?>_<?php echo $x+1;?>" onclick="backStep(<?php echo "'SubQuestion_".($i+1)."_".($x+1)."'";  ?>);" >Atras</button>
								</div>
								
							</div>
							
						</div>

							    <?php } ?>

				<?php }else{ 
//############################################## MULTIPLE SELECTION ############################################## 
				?>

					<div id="Question_<?php echo $i+1; ?>" class="col-md-12 content-general-by-question" <?php if($i>0){ echo 'style="display: none"';} ?>>
							<div class="form-row">
							    <div class="form-group col-md-12 content_question">
							    	<label class="label_descriptors"><?php echo $questions[$i]->descriptor; ?></label>
							    </div>

							    <div class="form-group col-md-12 content_question">
							    	<label class="label_questions"><strong><?php echo $i+1; ?>.</strong> <?php echo $questions[$i]->description; ?>?</label>
							    </div>

							</div>
							<div class="form-row">
								<div class="custom-control custom-radio custom-control-inline col-md-6 content_answers">
									<input 
										type="hidden" 
										name="answer_question_<?php echo $i+1; ?>" 
										id="answer_question_<?php echo $i+1; ?>" 
										data-label="<?php echo $questions[$i]->graphic_label;  ?>"
										data-question="<?php echo $questions[$i]->description;  ?>">
									  <!--<input 
									  	type="radio" 
									  	class="custom-control-input" 
									  	id="answer_question_<?php //echo $i+1; ?>_yes" 
									  	name="answer_question_<?php //echo $i+1; ?>" 
									  	value="1" 
									  	data-value="1" 
									  	data-label="<?php //echo $questions[$i]->graphic_label;  ?>"
										data-question="<?php //echo $questions[$i]->description;  ?>" 
									  	onchange="valQuestion('btn_next_<?php //echo $i+1; ?>',0,'',<?php //echo $i+1; ?>,0,1);"
									  />
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php //echo $i+1; ?>_yes">Si</label>

									  <input 
									  	type="radio" 
									  	class="custom-control-input" 
									  	id="answer_question_<?php //echo $i+1; ?>_no" 
									  	name="answer_question_<?php //echo $i+1; ?>" 
									  	value="0" 
									  	data-value="0" 
									  	data-label="<?php //echo $questions[$i]->graphic_label;  ?>"
										data-question="<?php //echo $questions[$i]->description;  ?>" 
									  	onchange="valQuestion('btn_next_<?php //echo $i+1; ?>',0,'',<?php //echo $i+1; ?>,0,1);"
									  />
									  <label class="custom-control-label display-label-radios" for="answer_question_<?php //echo $i+1; ?>_no">No</label>-->
									</div>

							</div>
							<div id="SubQuestion_<?php echo $i+1; ?>" class="col-md-12 content-general-by-question" style="display: block">
						
 						<?php 
					      	for($x=0; $x<count($subquestions); $x++){ 
					    ?>

							<div class="form-row">
								<div class="custom-control custom-radio custom-control-inline col-md-6">
									<label class="custom-control-label display-label-radios" for="answer_subquestion_<?php echo $i+1; ?>"><?php echo $subquestions[$x]->description; ?>?</label>
									  <input 
									  	type="radio" 
									  	class="custom-control-input" 
									  	id="answer_subquestion_<?php echo $i+1; ?>_<?php echo $x+1; ?>_yes" 
									  	name="answer_subquestion_<?php echo $i+1; ?>" 
									  	value="1"
									  	data-label="<?php echo $questions[$i]->graphic_label;  ?>"
										data-question="<?php echo $questions[$i]->description;  ?>"  
									  	data-value="<?php echo $subquestions[$x]->value; ?>" 
									  	data-subquestion="<?php echo $subquestions[$x]->description;  ?>" 
									  	onchange="valQuestionSelMul('btn_next_<?php echo $i+1; ?>',<?php echo $x+1; ?>,'answer_question_<?php echo $i+1; ?>',<?php echo $i+1; ?>,<?php echo $x+1;?>,1);"
									  />
								</div>
								<?php //if(($x +1) == 4 ){ ?>
								<!--<div class="form-row">
								<div class="col-md-12">
									<label class="label-sub-questions-which">Cual?</label>
									<input 
										type="text" 
										class="custom-control-input which-text" 
										id="answer_question_<?php //echo $i+1; ?>_<?php //echo $x+1; ?>_which" 
										name="answer_question_<?php //echo $i+1; ?>_<?php //echo $x+1; ?>_which" 
										disabled="disabled" 
										onkeypress="valQuestionWhich(this.value,'btn_next_<?php //echo $i+1; ?>')" 
										onchange="valQuestionWhich(this.value,'btn_next_<?php //echo $i+1; ?>')"
									/>
								</div>
								
							</div>-->
						<?php //} ?>

							</div>
						
			   	<?php     } ?>
			   	</div>
			   		<div class="form-row content_buttons">
						<div class="col-md-12">
							<button type="button" class="btn btn-primary btn-next" id="btn_next_<?php echo $i+1; ?>" onclick="nextStep(<?php echo "'Question_".($i+1)."'";  ?>,3,<?php echo $i+1; ?>,0,<?php echo count($subquestions); ?>,<?php echo count($questions); ?>);" disabled="disabled">Siguiente</button>
						</div>
					</div>
					<div class="form-row content_buttons">
						<div class="col-md-12">
							<button type="button" class="btn btn-primary btn-back" id="btn_back_<?php echo $i+1; ?>_<?php echo $x+1;?>" onclick="backStep(<?php echo "'Question_".($i+1)."'";  ?>);" >Atras</button>
						</div>
						
					</div>
					
			   	</div>
			   	<?php     } ?>
			   	<?php     } ?>

			<div id="EmailCalculate" class="col-md-12 content-general-by-question" style="display: none;">
	
			   		<div class="form-row content_buttons">
						<div class="col-md-12">
							<button type="button" class="btn btn-primary btn_calculate" id="btn_calculate">Calcular</button>
						</div>
						
					</div>
			   	</div>
					</div>
				</div>
			</div>
		</form>

		<?php
		$return = ob_get_contents();
		ob_end_clean();
		return $return; 
	}

	add_shortcode('marketing_grader_index','marketing_grader_index');
?>