<?php 
	require_once ABSPATH . '/wp-includes/pluggable.php';
	global $wpdb;

	if(isset($_GET['add']) && $_GET['add'] == 1){
		$wpdb->insert('wp_questions',
			array(
					'description'=>''

				)
		);
		$lastid = $wpdb->insert_id;

		/*-for($i=1; $i<=4; $i++)
		{
			$wpdb->insert('wp_sub_questions',
					array(
							'question_id'=>$lastid

						)
			);
		}*/
		unset($_GET['add']);
		echo '<script>window.location.replace("'.get_site_url().'/administrador/");</script>';
	}

?>