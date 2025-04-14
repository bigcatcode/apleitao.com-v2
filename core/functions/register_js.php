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

		wp_enqueue_style('swiper-css', 'https://unpkg.com/swiper/swiper-bundle.min.css');
    	wp_enqueue_script('swiper-js', 'https://unpkg.com/swiper/swiper-bundle.min.js', array(), null, true);

		wp_enqueue_script(
		    'projeto_virtual_js',
		    CORE_URL . '/projeto-virtual/build/static/js/main.c9eedc92.js',
	        array('jquery'), 
	        rand(),
	        true  
		);

		wp_enqueue_style(
			'projeto_virtual_style', 
			CORE_URL . '/projeto-virtual/build/static/css/main.48309f74.css',
			array(),
			rand()
		);


		wp_localize_script('projeto_virtual_js', 'reactAppConfig', [
			'assetsUrl' => CORE_URL . '/projeto-virtual/public'
		]);
		
		
	}

	
	
}


add_action( 'wp_enqueue_scripts', 'custom_child_scripts' ); 

