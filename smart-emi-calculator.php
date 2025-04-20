<?php
/**
 * Plugin Name: Smart EMI Calculator – Loan & Finance Tool
 * Plugin URI: https://yourwebsite.com/
 * Description: A responsive EMI Calculator with sliders, currency selector, dark mode, PDF export, and pie chart.
 * Version: 1.0
 * Author: AD Media Network
 * Author URI: https://yourwebsite.com/
 */

defined('ABSPATH') or die("No script kiddies please!");

// Enqueue scripts and styles
function emi_calculator_enqueue_assets() {
    wp_enqueue_style('emi-calculator-style', plugins_url('/assets/style.css', __FILE__));
    wp_enqueue_script('chart-js', 'https://cdn.jsdelivr.net/npm/chart.js', array(), null, true);
    wp_enqueue_script('jspdf', 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', array(), null, true);
    wp_enqueue_script('emi-calculator-script', plugins_url('/assets/script.js', __FILE__), array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'emi_calculator_enqueue_assets');

// Shortcode to display calculator
function emi_calculator_shortcode() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'includes/calculator-template.php');
    return ob_get_clean();
}
add_shortcode('smart_emi_calculator', 'emi_calculator_shortcode');
