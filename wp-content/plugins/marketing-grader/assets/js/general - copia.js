jQuery(document).ready(function($){

	$("#btn_calculate").on('click',function(){
		var cont = 1;
		var questions = [];
		var labels =[];
		while(typeof window["question_"+cont] !== 'undefined')
		{
			questions.push(window["question_"+cont]);
			cont++;
		}
		cont = 1;
		while(typeof window["labels_"+cont] !== 'undefined')
		{
			labels.push(window["labels_"+cont]);
			cont++;
		}
		event.preventDefault();
		var marksCanvas = document.getElementById("marksChart");

		var marksData = {
		  labels: labels,

		  datasets: [{
		    label: "Tu calificación",
		    backgroundColor: "rgba(255,87,51,0.5)",
		    data: questions
		  }]
		};
		var chartOptions = {
			  scale: {
			    ticks: {
			      beginAtZero: true,
			      min: 0,
			      max: 5,
			      stepSize: 1
			    }
			  }
			};
		var radarChart = new Chart(marksCanvas, {
		  type: 'radar',
		  data: marksData,
		  options: chartOptions
		});
	});


	$('#btn_add').on('click',function(){
		var contQuestions = parseInt($("#contQuestions").val());
		contQuestions += 1;
		var html = '<div id="Question_'+contQuestions+'" class="col-md-12"style="display: inline-flex;"><div class="form-row"><i class="fas fa-trash-alt 5x icon-delete-questions" title="Eliminar" id="btn_delete_question_'+contQuestions+'" name="btn_delete_question_'+contQuestions+'" onclick="deleteQuestion('+contQuestions+', '+contQuestions+');"></i><i class="fas fa-eye-slash icon-disable-question" title="Desactivar Pregunta" id="btn_disable_question_'+contQuestions+'" name="btn_desactive_question_'+contQuestions+'" onclick="disableQuestion('+contQuestions+','+contQuestions+');" ></i><i class="fas fa-eye icon-enable-question" title="Activar Pregunta" id="btn_enable_question_'+contQuestions+'" name="btn_enable_question_'+contQuestions+'" onclick="enableQuestion('+contQuestions+','+contQuestions+');" style="display: none" ></i><div id="content_selection_mode"><input type="radio" class="custom-control-input" id="mode_question_'+contQuestions+'_secuencial" name="mode_question_'+contQuestions+'" value="1" checked="checked"><label class="custom-control-label display-label-radios" for="mode_question_'+contQuestions+'_secuencial">Secuencial</label><input type="radio" class="custom-control-input" id="mode_question_'+contQuestions+'_multiple_selecction" name="mode_question_'+contQuestions+'" value="0"><label class="custom-control-label display-label-radios" for="mode_question_'+contQuestions+'_multiple_selecction">Selección Multiple</label></div><div class="form-group col-md-12 content_question"><div class="form-group inputs_sub_questions"><h4 id="title_principal_'+contQuestions+'">Pregunta Principal</h4><textarea class="custom-control-input field_description" id="description_question_<?php echo $i+1 ?>" name="description_question_'+contQuestions+'"></textarea><label for="graphic_label_'+contQuestions+'">Label Gráfica</label><input type="text" id="graphic_label_'+contQuestions+'" name="graphic_label_'+contQuestions+'"><input type="hidden" id="state_question_'+contQuestions+'" name="state_question_'+contQuestions+'" value="1" ></div><div class="form-group col-md-6 content_field_value_principal"><label for="sequence_question_'+contQuestions+'">Orden</label><input type="text" class="custom-control-input field_value" id="sequence_question_'+contQuestions+'" name="sequence_question_'+contQuestions+'" onchange="valSequenceQuestions('+contQuestions+','+contQuestions+');"  ></div><div class="form-group col-md-6 content_field_value_principal"><label for="value_question_'+contQuestions+'">Valor</label><input type="text" class="custom-control-input field_value" id="value_question_'+contQuestions+'" name="value_question_'+contQuestions+'" value="1" readonly></div></div><i class="fas fa-caret-down" id="closed_questions'+contQuestions+'" style="display: none" onclick="closeQuestions('+contQuestions+')" title="Ocultar sub-preguntas"></i><i class="fas fa-caret-right" id="open_questions'+contQuestions+'" onclick="openQuestions('+contQuestions+')" title="Ver sub-preguntas"></i><div id="general_content_subquestion_'+contQuestions+'" style="display: none"><div id="content_subquestion_'+contQuestions+'_1" class="form-group col-md-12 content-inputs-sub-questions"  style="display: inline-flex;"><div class="form-group inputs_sub_questions"><label>Sub-pregunta</label><textarea class="custom-control-input field_description" id="description_subquestion_'+contQuestions+'_1" name="description_subquestion_'+contQuestions+'_1"></textarea></div><div class="form-group col-md-6 content_field_value"><label>Orden</label><input type="text" class="custom-control-input field_value" id="sequence_subquestion_'+contQuestions+'_1" name="sequence_subquestion_'+contQuestions+'_1" onchange="valSequenceSubquestions('+contQuestions+',1);" ></div><div class="form-group col-md-6 content_field_value"><label>Valor</label><input type="text" class="custom-control-input field_value" id="value_subquestion_'+contQuestions+'_1" name="value_subquestion_'+contQuestions+'_1" onchange="valValueSubquestions('+contQuestions+',1);" ></div></div><hr class="hr-subquestions"><div id="content_subquestion_'+contQuestions+'_2" class="form-group col-md-12 content-inputs-sub-questions"  style="display: inline-flex;"><div class="form-group inputs_sub_questions"><label>Sub-pregunta</label><textarea class="custom-control-input field_description" id="description_subquestion_'+contQuestions+'_2" name="description_subquestion_'+contQuestions+'_2"></textarea></div><div class="form-group col-md-6 content_field_value"><label>Orden</label><input type="text" class="custom-control-input field_value" id="sequence_subquestion_'+contQuestions+'_2" name="sequence_subquestion_'+contQuestions+'_2" onchange="valSequenceSubquestions('+contQuestions+',2);" ></div><div class="form-group col-md-6 content_field_value"><label>Valor</label><input type="text" class="custom-control-input field_value" id="value_subquestion_'+contQuestions+'_2" name="value_subquestion_'+contQuestions+'_2" onchange="valValueSubquestions('+contQuestions+',2);" ></div></div><hr class="hr-subquestions"><div id="content_subquestion_'+contQuestions+'_3" class="form-group col-md-12 content-inputs-sub-questions"  style="display: inline-flex;"><div class="form-group inputs_sub_questions"><label>Sub-pregunta</label><textarea class="custom-control-input field_description" id="description_subquestion_'+contQuestions+'_3" name="description_subquestion_'+contQuestions+'_3"></textarea></div><div class="form-group col-md-6 content_field_value"><label>Orden</label><input type="text" class="custom-control-input field_value" id="sequence_subquestion_'+contQuestions+'_3" name="sequence_subquestion_'+contQuestions+'_3" onchange="valSequenceSubquestions('+contQuestions+',3);" ></div><div class="form-group col-md-6 content_field_value"><label>Valor</label><input type="text" class="custom-control-input field_value" id="value_subquestion_'+contQuestions+'_3" name="value_subquestion_'+contQuestions+'_3" onchange="valValueSubquestions('+contQuestions+',3);" ></div></div><hr class="hr-subquestions"><div id="content_subquestion_'+contQuestions+'_4" class="form-group col-md-12 content-inputs-sub-questions"  style="display: inline-flex;"><div class="form-group inputs_sub_questions"><label>Sub-pregunta</label><textarea class="custom-control-input field_description" id="description_subquestion_'+contQuestions+'_4" name="description_subquestion_'+contQuestions+'_4"></textarea></div><div class="form-group col-md-6 content_field_value"><label>Orden</label><input type="text" class="custom-control-input field_value" id="sequence_subquestion_'+contQuestions+'_4" name="sequence_subquestion_'+contQuestions+'_4" onchange="valSequenceSubquestions('+contQuestions+',4);" ></div><div class="form-group col-md-6 content_field_value"><label>Valor</label><input type="text" class="custom-control-input field_value" id="value_subquestion_'+contQuestions+'_4" name="value_subquestion_'+contQuestions+'_4" onchange="valValueSubquestions('+contQuestions+',4);" ></div></div></div></div></div><hr id="hr_question_'+contQuestions+'" class="hr-questions" />';
		$('#content_general').append(html);
		$("#contQuestions").val(contQuestions);
	});

	$("#btn_save").on('click',function(){
		var contQuestions = parseInt($("#contQuestions").val());
		var ban = 0;
		for(var i=1; i<= contQuestions; i++)
		{
			if($("#description_question_"+i+"").val()=='')
			{
				$("#description_question_"+i+"").css('border', '5px solid #f00');
				ban +=1;
			}

			if($("#graphic_label_"+i+"").val()=='')
			{
				$("#graphic_label_"+i+"").css('border', '5px solid #f00');
				ban +=1;
			}

			if($("#state_question_"+i+"").val()=='1')
			{
				if($("#sequence_question_"+i+"").val()=='')
				{
					$("#sequence_question_"+i+"").css('border', '5px solid #f00');
					ban +=1;
				}
			}

			if($("#value_question_"+i+"").val()=='')
			{
				$("#value_question_"+i+"").css('border', '5px solid #f00');
				ban +=1;
			}

			for(var x=1; x<=4; x++)
			{
				if($("#description_subquestion_"+i+"_"+x+"").val()=='')
				{
					$("#description_subquestion_"+i+"_"+x+"").css('border', '5px solid #f00');
					ban +=1;
				}

				if($("#sequence_subquestion_"+i+"_"+x+"").val()=='')
				{
					$("#sequence_subquestion_"+i+"_"+x+"").css('border', '5px solid #f00');
					ban +=1;
				}

				if($("#value_subquestion_"+i+"_"+x+"").val()=='')
				{
					$("#value_subquestion_"+i+"_"+x+"").css('border', '5px solid #f00');
					ban +=1;
				}
			}
		}

		if(ban != 0)
		{
			alert('Por favor ingresa los valores requeridos');
			return;
		}
		else
		{
			$("#action").val("save");
			$('#admin_questions').submit();
			return;
		}
	});
	
});
var questions = [];
var labels = [];

function valQuestion(numQuestion)
{
	window["labels_"+numQuestion] =jQuery('input:radio[name=answer_question_'+numQuestion+']').data("label");

	if((jQuery('input:radio[name=answer_question_'+numQuestion+']:checked').val())== 1 )
	{
		window["question_"+numQuestion] = 1;
		jQuery('#content_subquestion_'+numQuestion+'_1').css('display','inline-flex');
		jQuery('#Question_'+(numQuestion+1)+'').css('display','none');
	}
	else
	{
		window["question_"+numQuestion] = 0;
		jQuery('#content_subquestion_'+numQuestion+'_1').css('display','none');
		jQuery('#Question_'+(numQuestion +1)+'').css('display','block');
		jQuery('#content_subquestion_'+numQuestion+'_2').css('display','none');
		jQuery('#content_subquestion_'+numQuestion+'_3').css('display','none');
		jQuery('#content_subquestion_'+numQuestion+'_4').css('display','none');
		jQuery('#content_subquestion_'+numQuestion+'_4_1').css('display','none');
		jQuery('input:radio[name=answer_question_'+numQuestion+'_1]').attr('checked', false);
		jQuery('input:radio[name=answer_question_'+numQuestion+'_2]').attr('checked', false);
		jQuery('input:radio[name=answer_question_'+numQuestion+'_3]').attr('checked', false);
		jQuery('input:radio[name=answer_question_'+numQuestion+'_4]').attr('checked', false);
		jQuery('#answer_question_'+numQuestion+'_4_which').val("");
	}
	
}

function valSubQuestion(numQuestion, numSubQ, cantQuestions)
{
	if((jQuery('input:radio[name=answer_question_'+numQuestion+'_'+numSubQ+']:checked').val())== 0 )
		{
			jQuery('#content_subquestion_'+numQuestion+'_'+(numSubQ+1)+'').css("display","inline-flex");
			jQuery('#Question_'+(numQuestion+1)+'').css('display','none');
			
		}
		else
		{
			window["question_"+numQuestion] = jQuery('input:radio[name=answer_question_'+numQuestion+'_'+numSubQ+']').data("value");
			//window["question_"+numQuestion] = jQuery('input:radio[name=answer_question_'+numQuestion+'_'+numSubQ+']').data("value");
			if(numSubQ != 4){
				for(i=(numSubQ+1); i<=4; i++)
				{
					jQuery('#content_subquestion_'+numQuestion+'_'+i+'').css('display','none');
					jQuery('input:radio[name=answer_question_'+numQuestion+'_'+i+']').attr('checked', false);
				}
				jQuery('#answer_question_'+numQuestion+'_4_which').val('');
				if(numQuestion == cantQuestions){
						jQuery("#btn_calculate").attr("disabled",false);	
					}
					else
					{
						jQuery('#Question_'+(numQuestion+1)+'').css('display','block');
					}
			}
			else
			{
				jQuery('#content_subquestion_'+numQuestion+'_'+numSubQ+'_1').css('display','inline-flex');
				jQuery('#answer_question_'+numQuestion+'_'+numSubQ+'_which').on('keypress',function(){
					if(numQuestion == cantQuestions){
						jQuery("#btn_calculate").attr("disabled",false);	
					}
					else
					{
						jQuery('#Question_'+(numQuestion+1)+'').css('display','block');
					}
				});

				jQuery('#answer_question_'+numQuestion+'_'+numSubQ+'_which').on('blur',function(){
					if(jQuery('#answer_question_'+numQuestion+'_'+numSubQ+'_which').val() == ''){
						if(numQuestion == cantQuestions){
						jQuery("#btn_calculate").attr("disabled",true);	
					}
					else
					{
						jQuery('#Question_'+(numQuestion+1)+'').css('display','block');
					}
					}
				});
			}			
		}
	
}

//############################## MULTIPLE SELECTION #########################################################

function valQuestionSelMul(numQuestion, contSubQ){
	window["labels_"+numQuestion] =jQuery('input:radio[name=answer_question_'+numQuestion+']').data("label");
	if((jQuery('input:radio[name=answer_question_'+numQuestion+']:checked').val())== 1 ){
		window["question_"+numQuestion] = 1;	
		for(var i=1; i<=contSubQ; i++)
		{
			jQuery('#content_subquestion_'+numQuestion+'_'+i+'').css('display','inline-flex');
		}
		jQuery('#Question_'+(numQuestion+1)+'').css('display','none');
	}
	else
	{
		window["question_"+numQuestion] = 0;
		for(var i=1; i<=contSubQ; i++)
		{
			jQuery('#content_subquestion_'+numQuestion+'_'+i+'').css('display','none');
			jQuery('input:radio[name=answer_subquestion_'+numQuestion+']').attr('checked', false);

		}
		jQuery('#Question_'+(numQuestion+1)+'').css('display','block');
	}
}

function valSubQuestionSelMul(numQuestion, numSubQ, cantQuestions){

	window["question_"+numQuestion] = jQuery('input:radio[name=answer_subquestion_'+numQuestion+']:checked').data("value");	
	if(numSubQ != 4)
	{
		if(numQuestion == cantQuestions){
				jQuery("#btn_calculate").attr("disabled",false);	
			}
			else
			{
				jQuery('#Question_'+(numQuestion+1)+'').css('display','block');
			}
	}
	else
	{
		jQuery('#content_subquestion_'+numQuestion+'_'+numSubQ+'_1').css('display','inline-flex');
		jQuery('#answer_question_'+numQuestion+'_'+numSubQ+'_which').on('keypress',function(){
			if(numQuestion == cantQuestions){
				jQuery("#btn_calculate").attr("disabled",false);	
			}
			else
			{
				jQuery('#Question_'+(numQuestion+1)+'').css('display','block');
			}
		});

		jQuery('#answer_question_'+numQuestion+'_'+numSubQ+'_which').on('blur',function(){
			if(jQuery('#answer_question_'+numQuestion+'_'+numSubQ+'_which').val() == ''){
				if(numQuestion == cantQuestions){
					jQuery("#btn_calculate").attr("disabled",true);	
				}
				else
				{
					jQuery('#Question_'+(numQuestion+1)+'').css('display','block');
				}
			}
		});
	}
}


function openQuestions(id){
	jQuery('#general_content_subquestion_'+id+'').css('display','block');
	jQuery('#open_questions'+id+'').css('display','none');
	jQuery('#closed_questions'+id+'').css('display','block');
}

function closeQuestions(id){
	jQuery('#general_content_subquestion_'+id+'').css('display','none');
	jQuery('#open_questions'+id+'').css('display','block');
	jQuery('#closed_questions'+id+'').css('display','none');
}

function valSequenceSubquestions(question, subquestion){
	var valAct = jQuery('#sequence_subquestion_'+question+'_'+subquestion+'').val();
	var valOtr = 0;
	if(valAct > 0 && valAct < 5){
		for(var i=1; i<=4; i++)
		{
			
			if(i != subquestion)
			{
				valOtr = jQuery('#sequence_subquestion_'+question+'_'+i+'').val();
				if(valAct == valOtr){
					alert("No se debe repetir la secuencia "+valAct);
					jQuery('#sequence_subquestion_'+question+'_'+subquestion+'').val("");
					return;
				}
			}
		}
	}else{
		alert("La secuencia debe estar en 1 y 4");
		jQuery('#sequence_subquestion_'+question+'_'+subquestion+'').val("");
		return;
	}
}

function valValueSubquestions(question, subquestion){
	var valAct = jQuery('#value_subquestion_'+question+'_'+subquestion+'').val();
	var valOtr = 0;
	if(valAct > 1 && valAct < 6){
		for(var i=1; i<=4; i++)
		{
			
			if(i != subquestion)
			{
				valOtr = jQuery('#value_subquestion_'+question+'_'+i+'').val();
				if(valAct == valOtr){
					alert("No se debe repetir el valor "+valAct);
					jQuery('#value_subquestion_'+question+'_'+subquestion+'').val("");
					return;
				}
			}
		}
	}else{
		alert("El valor debe estar en 2 y 5");
		jQuery('#value_subquestion_'+question+'_'+subquestion+'').val("");
		return;
	}
}

function valSequenceQuestions(question, contQuestions){
	var valAct = jQuery('#sequence_question_'+question+'').val();
	var valOtr = 0;
	if(valAct > 0 && valAct < (contQuestions+1)){
		for(var i=1; i<=contQuestions; i++)
		{
			
			if(i != question)
			{
				valOtr = jQuery('#sequence_question_'+i+'').val();
				if(valAct == valOtr){
					alert("No se debe repetir la secuencia "+valAct);
					jQuery('#sequence_question_'+question+'').val("");
					return;
				}
			}
		}
	}else{
		alert("La secuencia debe estar en 1 y "+contQuestions);
		jQuery('#sequence_question_'+question+'').val("");
		return;
	}
}


function deleteQuestion(numQuestion,cantQuestions)
{
	var conf = confirm("Está seguro de eliminar la pregunta?");
	if (conf == true) {
		jQuery("#Question_"+numQuestion).remove();
		jQuery("#hr_question_"+numQuestion).remove();
		
		for(var i=1; i <= cantQuestions; i++)
		{
			if(i>numQuestion)
			{

				jQuery("#Question_"+i).attr('id','Question_'+(i-1));

				
				jQuery("#btn_delete_question_"+i).attr('name','btn_delete_question_'+(i-1));
				jQuery("#btn_delete_question_"+i).attr('onclick','deleteQuestion('+(i-1)+', '+(cantQuestions-1)+');');
				jQuery("#btn_delete_question_"+i).attr('id','btn_delete_question_'+(i-1));

				
				jQuery("#btn_disable_question_"+i).attr('name','btn_disable_question_'+(i-1));
				jQuery("#btn_disable_question_"+i).attr('onclick','disableQuestion('+(i-1)+', '+(cantQuestions-1)+');');
				jQuery("#btn_disable_question_"+i).attr('id','btn_disable_question_'+(i-1));

				
				jQuery("#mode_question_"+i+"_secuencial").attr('name','mode_question_'+(i-1));
				jQuery("#mode_question_"+i+"_secuencial").attr('id','mode_question_'+(i-1)+'"_secuencial');

				
				jQuery("#mode_question_"+i+"_multiple_selecction").attr('name','mode_question_'+(i-1));
				jQuery("#mode_question_"+i+"_multiple_selecction").attr('id','mode_question_'+(i-1)+'"_multiple_selecction');

				
				jQuery("#description_question_"+i).attr('name','description_question_'+(i-1));
				jQuery("#description_question_"+i).attr('id','description_question_'+(i-1));

				
				jQuery("#graphic_label_"+i).attr('name','graphic_label_'+(i-1));
				jQuery("#graphic_label_"+i).attr('id','graphic_label_'+(i-1));

				
				jQuery("#sequence_question_"+i).val((parseInt(jQuery("#sequence_question_"+i).val()))-1);
				jQuery("#sequence_question_"+i).attr('name','sequence_question_'+(i-1));
				jQuery("#sequence_question_"+i).attr('onchange','valSequenceQuestions('+(i-1)+','+(cantQuestions-1)+');');
				jQuery("#sequence_question_"+i).attr('id','sequence_question_'+(i-1));

				
				jQuery("#value_question_"+i).attr('name','value_question_'+(i-1));
				jQuery("#value_question_"+i).attr('id','value_question_'+(i-1));

				
				jQuery("#closed_questions"+i).attr('name','closed_questions'+(i-1));
				jQuery("#closed_questions"+i).attr('onclick','closeQuestions('+(i-1)+')');
				jQuery("#closed_questions"+i).attr('id','closed_questions'+(i-1));

				
				jQuery("#open_questions"+i).attr('name','open_questions'+(i-1));
				jQuery("#open_questions"+i).attr('onclick','openQuestions('+(i-1)+')');
				jQuery("#open_questions"+i).attr('id','open_questions'+(i-1));

				jQuery("#general_content_subquestion_"+i).attr('id','general_content_subquestion_'+(i-1));

				for(var x=1; x <= 4; x++)
				{

					jQuery("#content_subquestion_"+i+"_"+x).attr('id','content_subquestion_'+(i-1)+'_'+x);

					
					jQuery("#description_subquestion_"+i+"_"+x).attr('name','description_subquestion_'+(i-1)+'_'+x);
					jQuery("#description_subquestion_"+i+"_"+x).attr('id','description_subquestion_'+(i-1)+'_'+x);

					
					jQuery("#sequence_subquestion_"+i+"_"+x).attr('name','sequence_subquestion_'+(i-1)+'_'+x);
					jQuery("#sequence_subquestion_"+i+"_"+x).attr('onchange','valSequenceSubquestions('+(i-1)+','+x+');');
					jQuery("#sequence_subquestion_"+i+"_"+x).attr('id','sequence_subquestion_'+(i-1)+'_'+x);

					
					jQuery("#value_subquestion_"+i+"_"+x).attr('name','value_subquestion_'+(i-1)+'_'+x);
					jQuery("#value_subquestion_"+i+"_"+x).attr('onchange','valValueSubquestions('+(i-1)+','+x+');');
					jQuery("#value_subquestion_"+i+"_"+x).attr('id','value_subquestion_'+(i-1)+'_'+x);


				}

				jQuery("#hr_question_"+i).attr('id','hr_question_'+(i-1));
			}
		}
		jQuery("#contQuestions").val((parseInt(jQuery("#contQuestions").val()))-1);
	}


}

function disableQuestion(numQuestion,cantQuestions)
{

	var conf = confirm("Está seguro de desactivar la pregunta?");
	if (conf == true) 
	{
		
		jQuery("#state_question_"+numQuestion+"").val("0");
		jQuery("#btn_disable_question_"+numQuestion+"").css("display","none");
		jQuery("#btn_enable_question_"+numQuestion+"").css("display","inline-block");

		jQuery("#mode_question_"+numQuestion+"_secuencial").attr("readonly", true);
		jQuery("#mode_question_"+numQuestion+"_secuencial").css("color","lightgray");
		jQuery("label[for='mode_question_"+numQuestion+"_secuencial']").css("color","lightgray");

		jQuery("#mode_question_"+numQuestion+"_multiple_selecction").attr("readonly", true);
		jQuery("#mode_question_"+numQuestion+"_multiple_selecction").css("color","lightgray");
		jQuery("label[for='mode_question_"+numQuestion+"_multiple_selecction']").css("color","lightgray");
		

		jQuery("#title_principal_"+numQuestion+"").css("color","lightgray");

		jQuery("#description_question_"+numQuestion+"").attr("readonly", true);
		jQuery("#description_question_"+numQuestion+"").css("color","lightgray");

		jQuery("#graphic_label_"+numQuestion+"").attr("readonly", true);
		jQuery("#graphic_label_"+numQuestion+"").css("color","lightgray");
		jQuery("label[for='graphic_label_"+numQuestion+"']").css("color","lightgray");

		jQuery("#sequence_question_"+numQuestion+"").attr("readonly", true);
		jQuery("#sequence_question_"+numQuestion+"").css("color","lightgray");
		jQuery("label[for='sequence_question_"+numQuestion+"']").css("color","lightgray");

		jQuery("#value_question_"+numQuestion+"").attr("readonly", true);
		jQuery("#value_question_"+numQuestion+"").css("color","lightgray");
		jQuery("label[for='value_question_"+numQuestion+"']").css("color","lightgray");

		jQuery("#general_content_subquestion_"+numQuestion+"").css("display","none");
		jQuery("#closed_questions"+numQuestion+"").css("display","none");

		jQuery("#sequence_question_"+numQuestion+"").val("");



		jQuery("#open_questions"+numQuestion+"").css("display","none");

	}
}

function enableQuestion(numQuestion,cantQuestions)
{

	var conf = confirm("Está seguro de activar la pregunta?");
	if (conf == true) 
	{
		jQuery("#state_question_"+numQuestion+"").val("1");
		jQuery("#btn_disable_question_"+numQuestion+"").css("display","inline-block");
		jQuery("#btn_enable_question_"+numQuestion+"").css("display","none");

		jQuery("#mode_question_"+numQuestion+"_secuencial").attr("disabled", false);
		jQuery("#mode_question_"+numQuestion+"_secuencial").css("color","#686868");
		jQuery("label[for='mode_question_"+numQuestion+"_secuencial']").css("color","");

		jQuery("#mode_question_"+numQuestion+"_multiple_selecction").attr("disabled", false);
		jQuery("#mode_question_"+numQuestion+"_multiple_selecction").css("color","#686868");
		jQuery("label[for='mode_question_"+numQuestion+"_multiple_selecction']").css("color","");
		

		jQuery("#title_principal_"+numQuestion+"").css("color","");

		jQuery("#description_question_"+numQuestion+"").attr("readonly", false);
		jQuery("#description_question_"+numQuestion+"").css("color","#686868");

		jQuery("#graphic_label_"+numQuestion+"").attr("readonly", false);
		jQuery("#graphic_label_"+numQuestion+"").css("color","#686868");
		jQuery("label[for='graphic_label_"+numQuestion+"']").css("color","");

		jQuery("#sequence_question_"+numQuestion+"").attr("readonly", false);
		jQuery("#sequence_question_"+numQuestion+"").css("color","#686868");
		jQuery("label[for='sequence_question_"+numQuestion+"']").css("color","");

		jQuery("#value_question_"+numQuestion+"").attr("readonly", true);
		jQuery("#value_question_"+numQuestion+"").css("color","#686868");
		jQuery("label[for='value_question_"+numQuestion+"']").css("color","");



		jQuery("#open_questions"+numQuestion+"").css("display","inline-block");
	}
}

