<?php
function custom_child_scripts() {


	wp_enqueue_style(
		'custom_core_style', 
		CORE_URL . '/css/custom_core_style.css',
		array(),
		rand()
	);

	wp_enqueue_script(
	    'custom_core',
	    CORE_URL . '/js/custom_core.js',
        array('jquery'), 
        rand(),
        true  
	);

	wp_localize_script( 'custom_script', 'MyAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );

	
	if ( is_page_template('template-projeto-virtual.php') ) {

		wp_enqueue_script(
		    'projeto_virtual_js',
		    CORE_URL . '/projeto-virtual/build/static/js/main.04ff4c66.js',
	        array('jquery'), 
	        rand(),
	        true  
		);

		wp_enqueue_style(
			'projeto_virtual_style', 
			CORE_URL . '/projeto-virtual/build/static/css/main.b3a3316a.css',
			array(),
			rand()
		);


		wp_localize_script('projeto_virtual_js', 'reactAppConfig', [
			'assetsUrl' => CORE_URL . '/assets'
		]);
		
		
	}

	
	
}


add_action( 'wp_enqueue_scripts', 'custom_child_scripts' ); 

