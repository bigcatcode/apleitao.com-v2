<?php

function add_custom_taxonomy_fields_to_rest_api() {
    register_rest_field(
        'cor', // Your taxonomy name
        'cor_image', // Field name that you want to add to REST API response
        array(
            'get_callback' => function($term) {
                return get_term_meta($term['id']); // Get all custom fields for this term
            },
            'update_callback' => null,
            'schema' => null
        )
    );
}
add_action('rest_api_init', 'add_custom_taxonomy_fields_to_rest_api');

function add_custom_taxonomy_fields_to_rest_api2() {
    register_rest_field(
        'cor', // Your taxonomy name
        'cor_image_url', // Field name that you want to add to REST API response
        array(
            'get_callback' => function($term) {
                // Get the custom field 'cor_image' from the term
                $cor_image_id = get_term_meta($term['id'], 'cor_image', true); // Use the correct meta key here
                if ($cor_image_id) {
                    return wp_get_attachment_url($cor_image_id); // Get the image URL
                }
                return ''; // Return an empty string if there's no image
            },
            'update_callback' => null, // No update callback needed
            'schema' => null // No schema needed
        )
    );
}
add_action('rest_api_init', 'add_custom_taxonomy_fields_to_rest_api2');

function add_taxonomy_terms_to_productos_rest() {
    $taxonomies = ['serie', 'estilo', 'acabamento', 'cor', 'marca'];

    foreach ($taxonomies as $taxonomy) {
        register_rest_field(
            'produtos',
            $taxonomy . '_names',
            [
                'get_callback'    => function ($post_arr) use ($taxonomy) {
                    $terms = get_the_terms($post_arr['id'], $taxonomy);
                    if (is_array($terms)) {
                        return array_map(function ($term) {
                            return $term->name;
                        }, $terms);
                    }
                    return [];
                },
                'schema' => null,
            ]
        );
    }
}
add_action('rest_api_init', 'add_taxonomy_terms_to_productos_rest');