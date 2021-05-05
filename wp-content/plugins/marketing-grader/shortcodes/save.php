<?php

   $path = $_SERVER['DOCUMENT_ROOT'];
	//include_once($path . '/wp-config.php' );
	/*include_once $path . '/wp-load.php';
	*/
	include_once $path . '/wp-includes/wp-db.php';
	include_once $path . '/wp-includes/pluggable.php';
	global $wpdb;
	//*/

	if(isset($_POST['name']) && !empty($_POST['name']))
	{
		//*
		$wpdb->insert('wp_visitors_register',
			array(
				'name'=>$_POST['name'],
				'email'=>$_POST['email']
			)
		);
		$lastid = $wpdb->insert_id;
		if($lastid > 0 )
		{
			for($i=0; $i<count($_POST['subquestion']); $i++)
			{
				$wpdb->insert('wp_visitors_results',
					array(
						'idVisitor'=>$lastid,
						'question'=>$_POST['question'][$i],
						'subquestion'=>$_POST['subquestion'][$i],
						'label'=>$_POST['label'][$i],
						'rating'=>$_POST['rating'][$i],
						'which'=>$_POST['which'][$i]
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
?>