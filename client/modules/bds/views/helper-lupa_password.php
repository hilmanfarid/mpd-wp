
        <div class="lupapassword">
			<br /><br /><br /><br />
			<div class="lupapassword-content">
				
				<div class="clear"></div>
				<form method="post" action="index.php?module=bds&class=helper&method=send_email">
				
				<table border=0 width='100%' style="color:#0000EE;">
					
					<tr>
						<td colspan=3 Style="text-align: center;">
							<strong>
								<label Style="text-align: right; font-size:40; color:#0000EE; font-weight:bold;">LUPA PASSWORD</label>
							</strong><br /><br />
						</td>
					</tr>
					<tr>
						<td colspan=3 Style="color:red;">
							<?php echo $errorMsg;?>
						</td>
					</tr>
					<tr>
						<td>
							<strong>
								<label for="user_name" style="color:#0000EE;font-weight:bold;">Username</label>
							</strong>
						</td>
						<td>
							:
						</td>
						<td>
							<input type="text" name="user_name" id="user_name" value="<?php echo $user_name;?>" maxlength="255" size="50" tabindex="1" />
						</td>
					</tr>
					<tr>
						<td>
							<strong>
								<label for="npwpd" style="color:#0000EE;font-weight:bold;">NPWPD</label>
							</strong>
						</td>
						<td>
							:
						</td>
						<td>
							<input type="text" name="npwpd" id="npwpd" value="<?php echo $npwpd;?>" maxlength="255" size="50" tabindex="1" />
						</td>
					</tr>
					<tr>
						<td>
							<strong>
								<label for="email" style="color:#0000EE;font-weight:bold;">Email</label>
							</strong>
						</td>
						<td>
							:
						</td>
						<td>
							<input type="text" name="email" id="email" value="<?php echo $email;?>" maxlength="255" size="50" tabindex="1" />
						</td>
					</tr>					
					<tr>
						<td>
							<strong>
								<label for="question" style="color:#0000EE;font-weight:bold;">Pertanyaan Keamanan</label>
							</strong>
						</td>
						<td>
							:
						</td>
						<td>
							<select name="question" id="question" value="<?php echo $question;?>" maxlength="255" tabindex="2" >
							  <?php
									foreach($pertanyaan as $item) {
										echo '<option value="'.$item['p_private_question_id'].'">'.$item['question_pwd'].'</option>';										
									}
							  ?>
							</select> 
						</td>
					</tr>
					<tr>
						<td>
							<strong>
								<label for="answer" style="color:#0000EE;font-weight:bold;">Jawaban</label>
							</strong>
						</td>
						<td>
							:
						</td>
						<td>
							<input type="text" name="answer" id="answer" value="<?php echo $answer;?>" maxlength="255" size="50" tabindex="3" />
						</td>
					</tr>
					<tr>
						<td colspan=2 Style="text-align: center;">&nbsp
						</td>
					</tr>
					<tr>
						<td colspan=3 Style="text-align: center;">
							<input type="submit" value="Submit" tabindex="4" />
						</td>
					</tr>
					<tr>
						<td colspan=3 Style="text-align: center;">
							<a href="http://wp.disyanjak.net">Kembali Ke Halaman Login</a>
						</td>
					</tr>
				</table>
				</form>
				<br />
			</div>
		</div>
        