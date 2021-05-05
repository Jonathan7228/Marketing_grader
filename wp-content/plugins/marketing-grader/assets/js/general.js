
jQuery(document).ready(function($){
	//var email = getParameterByName('email');
	//var firstname = getParameterByName('firstname');
	//var lastname = getParameterByName('lastname');
	//var site = getParameterByName('site');
	var email = 'camilo.barbosa@triario.com';
	//var firstname = 'Camilo';
	//var lastname = 'Barbosa';
	//var site = 'www.triario.com';
	var cont = 1;
	var questions = [];
	var labels = [];
	var descriptions = [];
	var subdescriptions = [];
	var whichs = [];
	var ratings = [];
	var subquestions = [];
	
	/*if(window.location.pathname == "/marketin-grader-home/")
	{
		if(email == '' || name == ''){window.location.href = window.location.origin;}
	}*/

	if(window.location.pathname == "/results/")
	{

		event.preventDefault();
		  
		data=	
		 	{
		 		email: email,
		 		action:'visitors_results'

		 	};

		var results = $.ajax({ 
	            url: ajax_var.ajaxurl, //Archivo de servidor que inserta en la BD 
	            type: "POST", 
	            data: 'action='+data.action+'&mail='+data.email
	        });

		results.done(function( data ) {
			var res =  JSON.parse(data);
			for (var i = 0; i < res.length; i++)
			{
				ratings.push(res[i].rating);
				labels.push(res[i].label);
				questions.push(res[i].question);
				subquestions.push(res[i].subquestion);
				whichs.push(res[i].which);
			
			}	
				setTimeout(function(){ 

					var marksCanvas = document.getElementById("marksChart");
					var marksData = {
					  labels: labels,

					  datasets: [{
					    label: "Tu calificación",
					    backgroundColor: "rgba(255,87,51,0.5)",
					    data: ratings
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
						  },
						  line:{
						  	backgroundColor:"rgba(255,87,51,0.5)"
						  }
						};
					var radarChart = new Chart(marksCanvas, {
					  type: 'radar',
					  data: marksData,
					  options: chartOptions
					});
				 }, 1000);	
        });

        results.fail(function( data ) { 
            console.log('error'); 
        });
	}
	
	$("#btn_calculate").on('click',function(){
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
		cont = 1;
		while(typeof window["description_"+cont] !== 'undefined')
		{
			descriptions.push(window["description_"+cont]);
			cont++;
		}
		cont = 1;
		while(typeof window["subdescription_"+cont] !== 'undefined')
		{
			subdescriptions.push(window["subdescription_"+cont]);
			cont++;
		}
		cont = 1;
		while(typeof jQuery("#answer_question_"+cont+"_4_which").val() !== 'undefined')
		{
			whichs.push(jQuery("#answer_question_"+cont+"_4_which").val());
			cont++;
		}
		event.preventDefault();
		$("#Question_"+(questions.length)).css("display","none");
		$("#EmailCalculate").css("display","none");

		if(email != ''){
			 datos=	
			 	{
			 		action:'visitors_register',
			 		email: email,
			 		rating: questions,
			 		label: labels,
			 		question: descriptions,
			 		subquestion: subdescriptions,
			 		which : whichs

			 	}; 
			var request = $.ajax({ 
	            url: ajax_var.ajaxurl, //Archivo de servidor que inserta en la BD 
	            type: "POST", 
	            data: 'action='+datos.action+'&mail='+datos.email+'&rating='+datos.rating.join("||")+'&label='+datos.label.join("||")+'&question='+datos.question.join("||")+'&subquestion='+datos.subquestion.join("||")+'&which='+datos.which.join("||")

	        }); 
		}
        request.done(function( data ) { 
            window.location.href = window.location.origin+"/results/?mail="+email; 
        }); 

        request.fail(function( jqXHR, textStatus ) { 
            console.log( "Error petición Ajax: " + textStatus ); 
            console.log(jqXHR ); 
        });
	});


	$("#btn_download").on('click',function(){
	
		$("#img_graphic").attr('src', $("#marksChart")[0].toDataURL("image/png",1));
		
		setTimeout(() => { 
		var img = (String(jQuery("#img_graphic").attr("src"))).trim();
		datos=	
			 	{
			 		action:'generate_pdf',
			 		email: email,
			 		img: img
			 	};
		
			$.ajax({ 
		            url: ajax_var.ajaxurl, //Archivo de servidor que inserta en la BD 
		            type: "POST", 
		            data: 'action='+datos.action+'&img='+datos.img+'&mail='+datos.email

		        }).done(function( data ) { 
		        		
		        	
		        	var url = window.location.origin+'/wp-content/plugins/marketing-grader/shortcodes/pdfs/'+email+'.pdf';
	         		window.open(url, '_blank');
		        }); 
 		}, 2000);
	});

// ################################# Administrator ##############################################################
	$('#btn_add').on('click',function(){
		var contQuestions = parseInt($("#contQuestions").val());
		contQuestions += 1;
		subquestions = "";
		for(i=1; i<= 6; i++){
			subdescriptions += '<div id="content_subquestion_'+contQuestions+'_'+i+'" class="form-group col-md-12 content-inputs-sub-questions"  style="display: inline-flex;"><div class="form-group inputs_sub_questions"><label>Sub-pregunta</label><textarea class="custom-control-input field_description" id="description_subquestion_'+contQuestions+'_'+i+'" name="description_subquestion_'+contQuestions+'_'+i+'"></textarea></div><div class="form-group col-md-6 content_field_value"><label>Orden</label><input type="text" class="custom-control-input field_value" id="sequence_subquestion_'+contQuestions+'_'+i+'" name="sequence_subquestion_'+contQuestions+'_'+i+'" onchange="valSequenceSubquestions('+contQuestions+','+i+');" ></div><div class="form-group col-md-6 content_field_value"><label>Valor</label><input type="text" class="custom-control-input field_value" id="value_subquestion_'+contQuestions+'_'+i+'" name="value_subquestion_'+contQuestions+'_'+i+'" onchange="valValueSubquestions('+contQuestions+','+i+');" ></div></div><div class="form-group col-md-12 content-inputs-sub-questions"><label>Recomendación</label><textarea class="custom-control-input field_description" id="subquestion_recommendation_'+contQuestions+'_'+i+'" name="subquestion_recommendation_'+contQuestions+'_'+i+'"></textarea></div>';
			if(i<6){
				subdescriptions += '<hr class="hr-subquestions">';
			}
		}
		var html = '<div id="Question_'+contQuestions+'" class="col-md-12"style="display: inline-flex;"><div class="form-row"><i class="fas fa-trash-alt 5x icon-delete-questions" title="Eliminar" id="btn_delete_question_'+contQuestions+'" name="btn_delete_question_'+contQuestions+'" onclick="deleteQuestion('+contQuestions+','+contQuestions+');"></i><i class="fas fa-eye-slash icon-disable-question" title="Desactivar Pregunta" id="btn_disable_question_'+contQuestions+'" name="btn_desactive_question_'+contQuestions+'" onclick="disableQuestion('+contQuestions+','+contQuestions+');"></i><i class="fas fa-eye icon-enable-question" style="display: none;" title="Activar Pregunta" id="btn_enable_question_'+contQuestions+'" name="btn_enable_question_'+contQuestions+'" onclick="enableQuestion('+contQuestions+','+contQuestions+');"></i><div id="content_selection_mode"><input type="radio" class="custom-control-input" id="mode_question_'+contQuestions+'_secuencial" name="mode_question_'+contQuestions+'" value="1" ><label class="custom-control-label display-label-radios" for="mode_question_'+contQuestions+'_secuencial" >Secuencial</label><input type="radio" class="custom-control-input" id="mode_question_'+contQuestions+'_multiple_selecction" name="mode_question_'+contQuestions+'" value="0" ><label class="custom-control-label display-label-radios" for="mode_question_'+contQuestions+'_multiple_selecction" >Selección Múltiple</label></div><div class="form-group col-md-12 content_question"><div class="form-group inputs_sub_questions"><h4 id="title_principal_'+contQuestions+'" >Pregunta Principal</h4><textarea class="custom-control-input field_description" id="description_question_'+contQuestions+'" name="description_question_'+contQuestions+'"></textarea><label for="graphic_label_'+contQuestions+'" >Label Gráfica</label><input type="text" id="graphic_label_'+contQuestions+'" name="graphic_label_'+contQuestions+'" ><input type="hidden" id="state_question_'+contQuestions+'" name="state_question_'+contQuestions+'" value="1" ></div><div class="form-group col-md-6 content_field_value_principal"><label for="sequence_question_'+contQuestions+'" >Orden</label><input type="text" class="custom-control-input field_value" id="sequence_question_'+contQuestions+'" name="sequence_question_'+contQuestions+'" onchange="valSequenceQuestions('+contQuestions+','+contQuestions+');" ></div><div class="form-group col-md-6 content_field_value_principal"><label for="value_question_'+contQuestions+'">Valor</label><input type="text" class="custom-control-input field_value" id="value_question_'+contQuestions+'" name="value_question_'+contQuestions+'" value="1" readonly ></div></div><i class="fas fa-caret-down" id="closed_questions'+contQuestions+'" name="closed_questions'+contQuestions+'" style="display: none" onclick="closeQuestions('+contQuestions+')" title="Ocultar sub-preguntas"></i><i class="fas fa-caret-right" id="open_questions'+contQuestions+'" name="open_questions'+contQuestions+'" onclick="openQuestions('+contQuestions+')" title="Ver sub-preguntas"></i><div id="general_content_subquestion_'+contQuestions+'" style="display: none">'+subdescriptions+'</div></div></div><hr id="hr_question_'+contQuestions+'" class="hr-questions" />';
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

			for(var x=1; x<=6; x++)
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

				if($("#subquestion_recommendation_"+i+"_"+x+"").val()=='')
				{
					$("#subquestion_recommendation_"+i+"_"+x+"").css('border', '5px solid #f00');
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

var currentDiv = "";
var backDiv = [];


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
	if(valAct >= 0 && valAct < 6){
		for(var i=1; i<=6; i++)
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
		alert("El valor debe estar en 0 y 5");
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

				for(var x=1; x <= 6; x++)
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

		jQuery("#description_weak_rating_"+numQuestion+"").attr("readonly", true);
		jQuery("#description_weak_rating_"+numQuestion+"").css("color","lightgray");
		jQuery("label[for='description_weak_rating_"+numQuestion+"']").css("color","lightgray");

		jQuery("#description_regular_rating_"+numQuestion+"").attr("readonly", true);
		jQuery("#description_regular_rating_"+numQuestion+"").css("color","lightgray");
		jQuery("label[for='description_regular_rating_"+numQuestion+"']").css("color","lightgray");

		jQuery("#description_strong_rating_"+numQuestion+"").attr("readonly", true);
		jQuery("#description_strong_rating_"+numQuestion+"").css("color","lightgray");
		jQuery("label[for='description_strong_rating_"+numQuestion+"']").css("color","lightgray");

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

		jQuery("#description_weak_rating_"+numQuestion+"").attr("readonly", false);
		jQuery("#description_weak_rating_"+numQuestion+"").css("color","#686868");
		jQuery("label[for='description_weak_rating_"+numQuestion+"']").css("color","");

		jQuery("#description_regular_rating_"+numQuestion+"").attr("readonly", false);
		jQuery("#description_regular_rating_"+numQuestion+"").css("color","#686868");
		jQuery("label[for='description_regular_rating_"+numQuestion+"']").css("color","");

		jQuery("#description_strong_rating_"+numQuestion+"").attr("readonly", false);
		jQuery("#description_strong_rating_"+numQuestion+"").css("color","#686868");
		jQuery("label[for='description_strong_rating_"+numQuestion+"']").css("color","");



		jQuery("#open_questions"+numQuestion+"").css("display","inline-block");
	}
}
// #################################  End Administrator ##############################################################



function nextStep(div,type,numQuestion,numSubQuestion,cantSubQuestions,cantQuestions)
{

	if(type == 1)
	{

		if(numQuestion <= cantQuestions)
		{
			window["labels_"+numQuestion] =jQuery('input:radio[name=answer_question_'+numQuestion+']').data("label");
			window["description_"+numQuestion] =jQuery('input:radio[name=answer_question_'+numQuestion+']').data("question");
			if((jQuery('input:radio[name=answer_question_'+numQuestion+']:checked').val())== 1 )
			{
				window["question_"+numQuestion] = 1;
				jQuery("#"+div).css("display","none");
				jQuery("#SubQuestion_"+(numQuestion)+"_"+(numSubQuestion)).css("display","block");
				currentDiv = "SubQuestion_"+(numQuestion)+"_"+(numSubQuestion);
				
			}
			else
			{
				if(numQuestion == cantQuestions)
				{
					//jQuery("#"+div).css("display","none");
					jQuery('#btn_next_'+numQuestion).attr("disabled","disabled");
					jQuery('#EmailCalculate').css("display","block");
				}
				else
				{
					window["question_"+numQuestion] = 0;
					jQuery("#"+div).css("display","none");
					jQuery("#Question_"+(numQuestion + 1)).css("display","block");
					currentDiv = "Question_"+(numQuestion+1);
				}
				
			}
		}
	}
	else if(type == 2)
	{
		if(numSubQuestion <= cantSubQuestions )
		{
			window["labels_"+numQuestion] =jQuery('#answer_question_'+numQuestion+'').data("label");
			window["description_"+numQuestion] =jQuery('#answer_question_'+numQuestion+'').data("question");
			if((jQuery('input:radio[name=answer_subquestion_'+numQuestion+'_'+numSubQuestion+']:checked').val())== 0 )
			{	
				jQuery("#"+div).css("display","none");
				jQuery("#SubQuestion_"+(numQuestion)+"_"+(numSubQuestion + 1)).css("display","block");
				currentDiv = "SubQuestion_"+(numQuestion)+"_"+(numSubQuestion + 1);
			}
			else
			{
				window["subdescription_"+numQuestion] =jQuery('input:radio[name=answer_subquestion_'+numQuestion+'_'+numSubQuestion+']').data("subquestion");
				if(numQuestion == cantQuestions )
				{
					//jQuery("#"+div).css("display","none");
					jQuery('#btn_next_'+numQuestion).attr("disabled","disabled");
					jQuery('#EmailCalculate').css("display","block");
				}
				else
				{
					
					window["question_"+numQuestion] = jQuery('input:radio[name=answer_subquestion_'+numQuestion+'_'+numSubQuestion+']').data("value");
					jQuery("#"+div).css("display","none");
					jQuery("#Question_"+(numQuestion + 1)).css("display","block");
					currentDiv = "Question_"+(numQuestion+1);
				}
			}

		}else{
			if(numQuestion < cantQuestions )
			{

				jQuery("#"+div).css("display","none");
				jQuery("#Question_"+(numQuestion + 1)).css("display","block");
			}
			else
			{
				//jQuery("#"+div).css("display","none");
				jQuery('#btn_next_'+numQuestion).attr("disabled","disabled");
				jQuery('#EmailCalculate').css("display","block");
			}
		}
	}
	else
	{
		if(numQuestion <= cantQuestions )
		{
			window["labels_"+numQuestion] =jQuery('#answer_question_'+numQuestion+'').data("label");
			window["description_"+numQuestion] =jQuery('#answer_question_'+numQuestion+'').data("question");
			if(numQuestion == cantQuestions )
			{
				window["question_"+numQuestion] = jQuery('input:radio[name=answer_subquestion_'+numQuestion+']:checked').data("value");
				window["subdescription_"+numQuestion] =jQuery('input:radio[name=answer_subquestion_'+numQuestion+']:checked').data("subquestion");
				//jQuery("#"+div).css("display","none");
				jQuery('#btn_next_'+numQuestion).attr("disabled","disabled");
				jQuery('#EmailCalculate').css("display","block");
			}
			else
			{
				window["subdescription_"+numQuestion] =jQuery('input:radio[name=answer_subquestion_'+numQuestion+']:checked').data("subquestion");
				window["question_"+numQuestion] = jQuery('input:radio[name=answer_subquestion_'+numQuestion+']:checked').data("value");
				jQuery("#"+div).css("display","none");
				jQuery("#Question_"+(numQuestion + 1)).css("display","block");
			}
		}
	}
	backDiv.push(div);
	
}

function backStep(div)
{
	jQuery("#"+div).css("display","none");
	var bDiv = backDiv[(backDiv.length)-1];
	jQuery("#"+bDiv).css("display","block");
	backDiv.pop();
}

function valQuestionSelMul(btn,subQuestion,inputWhich,numQuestion,numSubQuestion,multSelection){
	jQuery('#'+btn).attr('disabled',false);	
}

function valQuestion(btn,subQuestion,inputWhich,numQuestion,numSubQuestion,multSelection)
{
	if(multSelection == 0){
		if(subQuestion != 4)
		{
			jQuery('#'+btn).attr('disabled',false);
		}
		else
		{
			if((jQuery('input:radio[name=answer_subquestion_'+numQuestion+'_'+numSubQuestion+']:checked').val())== 1 )	
			{
				jQuery('#'+inputWhich).attr('disabled',false);
			}
			else
			{
				jQuery('#'+inputWhich).val('');
				jQuery('#'+inputWhich).attr('disabled',true);
				jQuery('#'+btn).attr('disabled',true);
			}
		}
	}
	else
	{
		if((jQuery('input:radio[name=answer_question_'+numQuestion+']:checked').val()) == 1 )
		{
			window["question_"+numQuestion] = 1;
			jQuery("#SubQuestion_"+(numQuestion)+"").css("display","block");
			jQuery('#'+btn).attr('disabled',true);
		}
		else
		{
			jQuery("#SubQuestion_"+(numQuestion)).css("display","none");
			jQuery('#'+btn).attr('disabled',false);
		}

		if((jQuery('input:radio[name=answer_subquestion_'+numQuestion+']:checked').val()) == 1 )
		{
			if((jQuery('input:radio[name=answer_subquestion_'+numQuestion+']:checked').data("value")) != undefined){
				if((jQuery('input:radio[name=answer_subquestion_'+numQuestion+']:checked').data("value"))== 5)
				{
					jQuery('#'+inputWhich).attr('disabled',false);
				}
				else
				{
					jQuery('#'+btn).attr('disabled',false);
					jQuery('#'+inputWhich).val('');
					jQuery('#'+inputWhich).attr('disabled',true);
				}
			}
			else
			{
				jQuery('#'+btn).attr('disabled',true);
			}
		}
	}
}

function valQuestionWhich(valWhick,btnNext){
	if(valWhick != '')
	{
		jQuery('#'+btnNext).attr('disabled',false);
	}
	else
	{
		jQuery('#'+btnNext).attr('disabled',true);
	}	
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



