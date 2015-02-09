<?php 
if (wbUser::isLoggedIn()):
    $userInfo = wbUser::getSession();
?>
    Anda telah login sebagai <?php echo $userInfo['user_name'];?>.
    <br/>
    [<a href="<?php echo wbModule::url('base', 'base', 'logout');?>" title="LogOut">LogOut</a>]
<?php 
    return;
endif;
?>

<form action="<?php echo $loginurl;?>" method="post" enctype="application/x-www-form-urlencoded">
<input type="hidden" name="redirecturl" id="redirecturl" value="<?php echo $redirecturl;?>" />
    
	<div class="loginform">
   		<div class="loginform-title"></div>
	   	<div class="loginform-content">
            <?php if (!empty($msg)):?>
                <div class="errormsg"><?php echo $msg;?></div>
            <?php endif;?>

			<strong>
		    	<label for="username" style="color:#FFFFFF;font-weight:bold;">Username </label>
		  	</strong><br />
		  		<input type="text" name="username" id="username" value="<?php echo $username;?>" maxlength="255" size="22" tabindex="1" /><br />
		  	<strong>
		    	<label for="password" style="color:#FFFFFF;font-weight:bold;">Password </label>
		  	</strong><br/>
		  	<input type="password" name="password" id="password" maxlength="64" size="22" tabindex="2" /><br />
		  	<input type="submit" value="Login" tabindex="3" />
		</div>
	</div>
</form>
<center>
	Copyright &copy; 2012
</center>