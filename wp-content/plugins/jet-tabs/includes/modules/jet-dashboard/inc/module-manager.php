<?php
namespace Jet_Dashboard;

use Jet_Dashboard\Dashboard as Dashboard;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define Jet_Dashboard_License_Manager class
 */
class Module_Manager {

	/**
	 * Modules map
	 *
	 * @var array
	 */
	private $registered_modules = array();

	/**
	 * [__construct description]
	 */
	public function __construct() {

		add_action( 'init', array( $this, 'init_module' ), -996 );
	}

	/**
	 * [$modules description]
	 * @var array
	 */
	public function register_modules( $modules = array() ) {

		if ( empty( $modules ) ) {
			return;
		}

		foreach ( $modules as $module_slug => $module_class ) {

			if ( ! array_key_exists( $module_slug, $this->registered_modules ) ) {
				$this->registered_modules[ $module_slug ] = $module_class;
			}
		}
	}

	/**
	 * [get_registeredregistered_modules description]
	 * @param  array  $modules [description]
	 * @return [type]          [description]
	 */
	public function get_registered_modules() {
		return $this->registered_modules;
	}

	/**
	 * Initialize modules on aproppriate AJAX or  on module page
	 *
	 * @return [type] [description]
	 */
	public function init_module() {

		if ( wp_doing_ajax() ) {
			$this->maybe_load_module_on_ajax();
		} else {
			$this->maybe_load_module();
		}
	}

	/**
	 * Maybe load on ajax request
	 *
	 * @return [type] [description]
	 */
	public function maybe_load_module_on_ajax() {

		$action = ! empty( $_REQUEST['action'] ) ? $_REQUEST['action'] : false;

		if ( ! $action ) {
			return;
		}

		$parts = explode( '/', $action );

		if ( empty( $parts[1] ) || Dashboard::get_instance()->dashboard_slug !== $parts[0] ) {
			return;
		}

		$module = $parts[1];

		$this->load_module( $module );

	}

	/**
	 * Maybe load on regular request
	 *
	 * @return [type] [description]
	 */
	public function maybe_load_module() {

		if ( ! Dashboard::get_instance()->is_dashboard_page() ) {
			return;
		}

		$module = Dashboard::get_instance()->get_subpage();

		$this->load_module( $module );
	}

	/**
	 * Load module by slug
	 *
	 * @param  [type] $module [description]
	 * @return [type]         [description]
	 */
	public function load_module( $module ) {

		if ( ! isset( $this->registered_modules[ $module ] ) ) {
			return;
		}

		$class_name = $this->registered_modules[ $module ];

		return new $class_name();
	}
}
