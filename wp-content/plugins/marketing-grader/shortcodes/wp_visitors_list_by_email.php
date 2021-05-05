<?php 
	
	function wp_visitors_list_by_email(){
		global $wpdb;
		
		//$page = get_page_link();
		//$us = wp_get_current_user();

		
		$pag = 1;
		if(isset($_GET['pag'])){
			$pag = intval($_GET['pag']);
			//si intval trae error, devuelve 0
			if($pag==0) $pag=1;
		}
		
		$offset = ($pag * 10)-10;
		$next = "";
		if($offset>0){
			$next = ",".$offset;
		}
		$whr="";
		if(isset($_GET['lic'])){
			$whr = " where a.email like '%".$_GET['lic']."%' ";
		}
		/*$licitaciones = $wpdb->get_results("SELECT * FROM wp_visitors_register a
left join wp_visitors_results b on a.intId=b.idVisitor where a.email='".$_GET['lic']."'");*/
		$licitaciones = $wpdb->get_results("SELECT * FROM wp_visitors_register a ".$whr." limit 10".$next);
//print_r($licitaciones);				
		//$consult_full = $wpdb->get_results("SELECT * FROM wp_apply_licitacion WHERE id_licitacion = ".$_GET['lic']);
		$consult_full = $wpdb->get_results("SELECT * FROM wp_visitors_register a ".$whr);

		$registros = count($licitaciones);
		ob_start();

			
		
?>

	<style>
	li{
		list-style:none;
		float: left;
		padding: 10px;
	}
	</style>


	<div id="content">
		<div>
		<input type="search" id="mail" name="mail" placeholder="prueba" style="width: 89%;"/>
		<input type="button" id="buscar" name="buscar" value="Buscar" style="width: 10%;"/>
		</div>
		<div class="list-group-item list-group-item-action flex-column align-items-start">
			<div class="d-flex w-100 justify-content-between">
				

				<div id="detalle-<?php echo $licitacion->id; ?>" class=""></div>
				<table class="apply-totals-table">
					<thead>
						<tr><th style="font-weight:bold">Ver detalle</th><th style="font-weight:bold">Nombre</th><th style="font-weight:bold">Email</th></tr>
					</thead>
					<tbody>
					<?php  foreach($licitaciones as $licitacion): ?>
				
					<tr><td><a id="det-<?php echo $licitacion->intId; ?>" href="/results/?mail=<?php echo  $licitacion->email; ?>"><i class="dashicons dashicons-search"></i></a></td><td><?php echo $licitacion->name; ?></td><td><?php echo  $licitacion->email; ?></td></tr>
										
						
					<?php endforeach; ?>
					</tbody>
				</table>
			</div>
			
			<div class="clearfix"></div>
		</div>
	</div>

		<nav aria-label="...">
		  <ul class="pagination pagination-lg">
		  	<?php  
				$cont = count($consult_full);
				$lic="";
				if(isset($_GET['lic'])){
					$lic = 'lic='.$_GET['lic'].'&';
				}
				for($i=0; $i<($cont/10); $i++){
					$number = $i+1;
					if($pag == $number){
						echo '<li class="page-item disabled"><a class="page-link" href="?'.$lic.'pag='.$number.'">'.$number.'</a></li>';
					}else{
						echo '<li class="page-item"><a class="page-link" href="?'.$lic.'pag='.$number.'">'.$number.'</a></li>';
					} 
						
				} 
			?>
		  </ul>
		</nav>
		<script>
			jQuery("#buscar").on("click",function(){
				if(jQuery("#mail").val().length>0){
				window.location.href=window.location.pathname+'/?pag=0&lic='+jQuery("#mail").val();
				}else{
					window.location.href=window.location.pathname+'/?pag=0';
				}
			});
		</script>
		<?php
		$return = ob_get_contents();
		ob_end_clean();
		return $return; 

	}

	add_shortcode('wp_visitors_list_by_email','wp_visitors_list_by_email');
?>