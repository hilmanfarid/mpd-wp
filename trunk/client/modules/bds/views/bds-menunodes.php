[
    {"leaf":true,"id":"cust_acc_trans","text":"Transaksi Harian WP"},
    {"leaf":true,"id":"t_vat_settlement","text":"Pelaporan Pajak"},
	{"leaf":true,"id":"t_trans_histories","text":"Histori Transaksi"},
	{"leaf":true,"id":"transaction_info","text":"Informasi"},
    {"leaf":true,"id":"send_message","text":"Buat Pesan"},
	{"leaf":true,"id":"t_message_inbox","text":"Inbox"},
    {"leaf":true,"id":"t_message_outbox","text":"Outbox"}
    
    <?php 
    $userInfo = wbUser::getSession();
    $role = '';
    
    if (isset($userInfo['roles'][0]['role_name'])){
        $role = strtolower($userInfo['roles'][0]['role_name']);
    }
    if($role=='administrator'||$role=='supervisor'){ 
    ?>,
    {
    /* USER & GROUP */
        "id":"user-menu",
        "leaf":false,
        "text":"Management User",
        "children":[
            {"leaf":true,"id":"user","text":"User"}
        ]
    }
    <?php }?>
]