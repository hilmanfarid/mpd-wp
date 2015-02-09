<?php
/**
 * bphtb_registration
 * class model for table bds_bphtb_registration 
 *
 * @since 23-10-2012 12:07:20
 * @author hilman farid
 */
class bphtb_registration extends AbstractTable{
    /* Table name */
    public $table = 't_bphtb_registration';
    /* Alias for table */
    public $alias = 'b';
    /* List of table fields */
    public $fields = array('t_bphtb_registration_id' => array('type' => 'int', 'nullable' => false, 'unique' => true, 'display' => 'ID Bphtb'),
                           'registration_no' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'NAMA WP'),
                           'njop_pbb' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'NOP'),
                           'wp_name' => array('type' => 'str', 'nullable' => true, 'unique' => false, 'display' => 'NAMA WP'));
                           
                           
    /* Display fields */
    public $displayFields = array('b.wp_name');
    /* Details table */
    public $details = array();
    /* Primary key */
    public $pkey = 't_bphtb_registration_id';
    /* References */    
    public $refs = array();
    
    /* select from clause for getAll and countAll */
    public $selectClause = "SELECT b.t_bphtb_registration_id,b.registration_no,a.receipt_no, b.njop_pbb, to_char(a.payment_date, 'YYYY-MM-DD') AS payment_date,
					        b.wp_name, b.wp_address_name, kelurahan.region_name AS kelurahan_name, kecamatan.region_name AS kecamatan_name, b.land_area, b.building_area, b.land_total_price, a.payment_amount, 
					        b.bphtb_amt_final";

    public $fromClause = "FROM t_bphtb_registration AS b 
            			LEFT JOIN t_payment_receipt_bphtb AS a ON a.t_bphtb_registration_id = b.t_bphtb_registration_id
            			LEFT JOIN p_region AS kelurahan ON b.wp_p_region_id_kel = kelurahan.p_region_id
            			LEFT JOIN p_region AS kecamatan ON b.wp_p_region_id_kec = kecamatan.p_region_id";

    function __construct(){
        parent::__construct();
   	}
    
    /**
     * validate
     * input record validator
     */
    public function validate(){
        $userInfo = wbUser::getSession();
        
        if ($this->actionType == 'CREATE'){
            // TODO : Write your validation for CREATE here
            $this->record['creation_date'] = date('Y-m-d');
            $this->record['created_by'] = $userInfo['user_name'];
            
            $this->record['updated_date'] = date('Y-m-d');
            $this->record['updated_by'] = $userInfo['user_name'];
            
        }else if ($this->actionType == 'UPDATE'){
            // TODO : Write your validation for UPDATE here
            $this->record['updated_date'] = date('Y-m-d');
            $this->record['updated_by'] = $userInfo['user_name'];
        }
        
        return true;
    }
}
?>