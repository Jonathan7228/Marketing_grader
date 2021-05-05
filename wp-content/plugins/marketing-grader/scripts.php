<?php 
function  wpb_scripts_marketing_grader(){
	
	wp_register_style( 'cp_custom_css', plugin_dir_url( __FILE__ ).'assets/css/styles.css');
	wp_register_style( 'load-fa', 'https://use.fontawesome.com/releases/v5.3.1/css/all.css' );

	wp_register_script('general', plugin_dir_url( __FILE__ ).'assets/js/general.js', '', '5', true );
	wp_register_script('chart', plugin_dir_url( __FILE__ ).'assets/js/Chart.min.js', '', '5', true );
	wp_register_script('html2canvas', 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.0/html2canvas.min.js', '', '5', true );


	wp_localize_script( 'general', 'ajax_var', array(
        'url'    => plugin_dir_url( __FILE__ ).'shortcodes/save.php',
        'urlpdf'    => plugin_dir_url( __FILE__ ).'shortcodes/pdf.php',
        'ajaxurl'=> admin_url( 'admin-ajax.php' ),
        'results'=> plugin_dir_url( __FILE__ ).'shortcodes/marketing_grader_result.php'
    ) );

	wp_enqueue_style( 'cp_custom_css' );
	wp_enqueue_style( 'load-fa' );
	wp_enqueue_script('general');
	wp_enqueue_script('chart');
	wp_enqueue_script('html2canvas');

	
}
add_action( 'wp_enqueue_scripts', 'wpb_scripts_marketing_grader' );
?>