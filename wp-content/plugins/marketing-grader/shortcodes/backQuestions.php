<?php 
	require_once ABSPATH . '/wp-includes/pluggable.php';
	global $wpdb;
	
	if(isset($_POST['action']) && $_POST['action'] == 'save'){
		
		$wpdb->query('TRUNCATE TABLE wp_questions');
		$wpdb->query('TRUNCATE TABLE wp_sub_questions');

		for($i=1; $i<=$_POST['contQuestions']; $i++)
		{
			$mode_question = 0;
			if($_POST['mode_question_'.$i] == 1)
			{
				$mode_question = 1;
			}
			$state_question = 0;
			if($_POST['state_question_'.$i] == 1)
			{
				$state_question = 1;
			}
			$wpdb->insert('wp_questions',
			array(
					'sequence'=>$_POST['sequence_question_'.$i],
					'description'=>$_POST['description_question_'.$i],
					'graphic_label'=>$_POST['graphic_label_'.$i],
					'answer_sequential'=>$mode_question,
					'state'=>$state_question

				)
			);
			$lastid = $wpdb->insert_id;
			for($x=1; $x<=6; $x++)
			{
				$wpdb->insert('wp_sub_questions',
					array(
							'question_id'=>$lastid,
							'description'=>$_POST['description_subquestion_'.$i.'_'.$x],
							'recommendation'=>$_POST['subquestion_recommendation_'.$i.'_'.$x],
							'sequence'=>$_POST['sequence_subquestion_'.$i.'_'.$x],
							'value'=>$_POST['value_subquestion_'.$i.'_'.$x]

						)
				);
			}
			
		}

		echo '<script>window.location.replace("'.get_site_url().'/administrador/");</script>';
	}

?>