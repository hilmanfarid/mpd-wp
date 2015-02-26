<?php
/**
 * t_vat_settlement
 * class controller for table bds_t_vat_settlement 
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class helper_controller extends wbController{    
    /**
     * read
     * controler for get all items
     */
    public static function read_pertanyaan($args = array()){
        // Security check
        //if (!wbSecurity::check('t_vat_settlement')) return;
        
        // Get arguments from argument array
        extract($args);
    
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('bds', 't_vat_settlement');
			
            $query = "select * from p_private_question";
			$items = $table->dbconn->GetAll($query);
			
        
            $data['items'] = $items;
            $data['total'] = count($items);
            $data['success'] = true;
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
    
        return $data;    
    }
	
	public static function cek_jawaban($args = array()){
        // Security check
        //if (!wbSecurity::check('t_vat_settlement')) return;
        
        // Get arguments from argument array
        extract($args);
		
		$email = wbRequest::getVarClean('email', 'str', '');
		$npwpd = wbRequest::getVarClean('npwpd', 'str', '');
		$user_name = wbRequest::getVarClean('user_name', 'str', '');
		$question = wbRequest::getVarClean('question', 'str', '');
		$answer = wbRequest::getVarClean('answer', 'str', '');
    
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('bds', 't_vat_settlement');
			
            $query = "select c.t_customer_user_id, c.user_name, c.user_pwd , a.npwpd, a.p_private_question_id, a.private_answer from t_vat_registration as a
				inner join t_cust_account as b on a.t_vat_registration_id = b.t_vat_registration_id
				inner join t_customer_user as c on b.t_customer_id = c.t_customer_id
				where c.user_name = '".$user_name."' and upper(a.npwpd) = upper('".$npwpd."') and a.p_private_question_id = ".$question." and upper(a.private_answer) =upper('".$answer."')";
			$items = $table->dbconn->GetAll($query);
			
		
            $data['items'] = $items;
            $data['total'] = count($items);
            $data['success'] = true;
			$data['message'] =  'test';
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
    
        return $data;    
    }

	public static function ganti_password($args = array()){
        // Security check
        //if (!wbSecurity::check('t_vat_settlement')) return;
        
        // Get arguments from argument array
        extract($args);
		
		$email = wbRequest::getVarClean('email', 'str', '');
		$npwpd = wbRequest::getVarClean('npwpd', 'str', '');
		$user_name = wbRequest::getVarClean('user_name', 'str', '');
		$question = wbRequest::getVarClean('question', 'str', '');
		$answer = wbRequest::getVarClean('answer', 'str', '');
    
        
        $data = array('items' => array(), 'total' => 0, 'success' => false, 'message' => '');
        try{
            $table =& wbModule::getModel('bds', 't_vat_settlement');
			$query = "select dbms_random.string('x',10) AS new_password";
			$new_password = $table->dbconn->GetOne($query);
			
            $query = "update p_app_user set user_pwd = md5('".$new_password."') where app_user_name = '".$user_name."'";
			$table->dbconn->Execute($query);
			$query = "update t_customer_user set user_pwd = md5('".$new_password."') where user_name = '".$user_name."'";
			$table->dbconn->Execute($query);			
			
            $data['items'] = '';
            $data['total'] = '';
            $data['success'] = true;
			$data['message'] =  $new_password;
        }catch (Exception $e) {
            $data['message'] = $e->getMessage();
        }
    
        return $data;    
    }

}
?>