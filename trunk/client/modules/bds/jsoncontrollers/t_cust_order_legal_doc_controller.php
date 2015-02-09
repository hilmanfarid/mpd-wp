<?php
/**
 * t_cust_order_legal_doc
 * class controller for table bds_t_cust_order_legal_doc
 *
 * @since 23-10-2012 12:07:20
 * @author wiliamdecosta@gmail.com
 */
class t_cust_order_legal_doc_controller extends wbController{
    /**
     * read
     * controler for get all items
     */
	public static function imurl(){
		return 'var/files/';;
	}
    public static function read($args = array()){
        // Security check
        //if (!wbSecurity::check('t_cust_order_legal_doc')) return;

        // Get arguments from argument array
        //extract($args);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
					'getParams' => json_encode($_GET),
					'controller' => json_encode(array('module' => 'bds','class' => 't_cust_order_legal_doc', 'method' => 'read', 'type' => 'json' )),
					'postParams' => json_encode($_POST),
					'jsonItems' => '',
					'start' => $start,
					'limit' => $limit);
					
            $ws_data = self::getResultData($ws_client, $params);
           
            $data['items'] = $ws_data ['data'];
            $data['total'] = $ws_data ['total'];
            $data['message'] = $ws_data ['message'];
            $data['success'] = $ws_data ['success'];
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
        return $data;

    }

    /**
     * create
     * controler for create new item
     */
    public static function create($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
		global $_FILES;
		if (!empty($_FILES['file_name']['name'])){
            try{
                wbUtil::checkUploadedImage($_FILES['file_name']);
            }catch (Exception $e) {
                $data['message'] = $e->getMessage();
                echo json_encode($data);
                session_write_close();
                exit;
            }
        }
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);

        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
    
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 't_cust_order_legal_doc', 'method' => 'create', 'type' => 'json' )),
		    			'postParams' => json_encode($_POST),
		    			'jsonItems' => '',
		    			'start' => $start,
		    			'limit' => $limit);
		    
            $ws_data = self::getResultData($ws_client, $params);  
			$filename = $thumbnail = '';
    	    if($ws_data['success']){
				try{        
					if (!empty($_FILES['file_name']['name'])){
						$filename = $ws_data ['data']['t_cust_order_legal_doc_id'].'_'.str_replace(' ', '_', $_FILES['file_name']['name']);
						
						if (!move_uploaded_file($_FILES['file_name']['tmp_name'], self::imurl().$filename)){
							throw new Exception("Upload file gagal. Mohon periksa direktori bukti transfer");
						}
						
						$path = strtolower(strrchr($_FILES['file_name']['name'], '.'));
						if(($path=='.jpeg') || ($path=='.jpg') || ($path=='.gif') || ($path=='.png')){
							$thumbnail = self::imurl().'/th_'.$filename;
							wbUtil::createThumbnailImage(2, self::imurl().$filename, $thumbnail, 150, 150);
							
							$view_picture = self::imurl().'/view_'.$filename;
							wbUtil::createThumbnailImage(2, self::imurl().$filename, $view_picture, 600, 800);		
						}			
						
						$items['file_name'] = $filename;
						$data['total'] = 1;
						$data['message'] = $ws_data ['message'];
						$data['success'] = $ws_data ['success'];
					}
				}catch(Exception $e){
					$data['total'] = 0;
					$data['message'] = $e->getMessage();
					$data['items'] = $items;
				}
			}
            $data['items'] = $ws_data ['data'];
            
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }

        echo json_encode($data);
		exit;
    }

    /**
     * update
     * controler for update item
     */
    public static function update($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
		global $_FILES;
		if (!empty($_FILES['file_name']['name'])){
            try{
                wbUtil::checkUploadedImage($_FILES['file_name']);
            }catch (Exception $e) {
                $data['message'] = $e->getMessage();
                echo json_encode($data);
                session_write_close();
                exit;
            }
        }

        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        
        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 't_cust_order_legal_doc', 'method' => 'update', 'type' => 'json' )),
		    			'postParams' => json_encode($_POST),
		    			'jsonItems' => '',
		    			'start' => $start,
		    			'limit' => $limit);
            $ws_data = self::getResultData($ws_client, $params);
            
			if($ws_data['success']){
				try{        
					if (!empty($_FILES['file_name']['name'])){
						$r = $ws_data['data']['old_row'];
						if (!empty($r['file_name']) && is_file(self::imurl().'/'.$r['file_name'])){ 
							@unlink(self::imurl().''.$r['file_name']);
					
							if (is_file(self::imurl().'th_'.$r['file_name'])){ 
								@unlink(self::imurl().'th_'.$r['file_name']);
							}
							if (is_file(self::imurl().'view_'.$r['file_name'])){ 
								@unlink(self::imurl().'view_'.$r['file_name']);
							}
							
						}
						echo self::imurl().'/'.$r['file_name'];
						$filename = $ws_data ['data']['t_cust_order_legal_doc_id'].'_'.str_replace(' ', '_', $_FILES['file_name']['name']);
						
						if (!move_uploaded_file($_FILES['file_name']['tmp_name'], self::imurl().$filename)){
							throw new Exception("Upload file gagal. Mohon periksa direktori bukti transfer");
						}
						
						$path = strtolower(strrchr($_FILES['file_name']['name'], '.'));
						if(($path=='.jpeg') || ($path=='.jpg') || ($path=='.gif') || ($path=='.png')){
							$thumbnail = self::imurl().'/th_'.$filename;
							wbUtil::createThumbnailImage(2, self::imurl().$filename, $thumbnail, 150, 150);
							
							$view_picture = self::imurl().'/view_'.$filename;
							wbUtil::createThumbnailImage(2, self::imurl().$filename, $view_picture, 600, 800);		
						}			
						
						$data['items'] = $ws_data ['data'];
						$data['total'] = $ws_data ['total'];
						$data['message'] = $ws_data ['message'];
						$data['success'] = $ws_data ['success'];
					}
				}catch(Exception $e){
					$data['total'] = 0;
					$data['message'] = $e->getMessage();
					$data['items'] = $items;
				}
			}
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }

        echo json_encode($data);
		exit;
    }

    /**
     * update
     * controler for remove item
     */
    public static function destroy($args = array()){
        // Security check
        //if (!wbSecurity::check('DHotel')) return;

        // Get arguments from argument array
        $jsonItems = wbRequest::getVarClean('items', 'str', '');
        $items =& wbUtil::jsonDecode($jsonItems);
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');

        try{
            $ws_client = self::getNusoap();
		    $params = array('search' => '',
		    			'getParams' => json_encode($_GET),
		    			'controller' => json_encode(array('module' => 'bds','class' => 't_cust_order_legal_doc', 'method' => 'destroy', 'type' => 'json')),
		    			'postParams' => json_encode($_POST),
		    			'jsonItems' => '',
		    			'start' => $start,
		    			'limit' => $limit);
            $ws_data = self::getResultData($ws_client, $params);
        
            $data['items'] = $ws_data ['data'];
            $data['total'] = $ws_data ['total'];
            $data['message'] = $ws_data ['message'];
            $data['success'] = $ws_data ['success'];
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
        return $data;
    }
    
    /*
    * IMPORT WALKIN
    */
}
?>