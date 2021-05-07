<?php 
	include('header.php'); 	
	include('db.php'); 

	if($_SERVER['REQUEST_METHOD'] == "POST")
	{
		$username=mysqli_real_escape_string($conn, $_POST['name']);
		$password=mysqli_real_escape_string($conn, $_POST['password']);
		//$password = md5($password);
		$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
		$query = mysqli_query($conn, $sql);
		$result = mysqli_num_rows($query);
		
		if($result == 1){
			
			$_SESSION['username'] = $username;
			
            echo "<div class='alert' style='text-align:center;'>
					  Username or password is correct
				  </div>";
			//header("location: index.php");
		}
		else{
			echo "<div class='alert' style='text-align:center;'>
					  <strong>Error!</strong> Username or password is incorrect
				  </div>";
		}
	}
	?>

<main style="background-color:#007bff; padding-top:100px; padding-bottom:100px;">
   
   <!-- Create css class for section class login -->
    <section class="login"
        style="width:400px; background-color:white; border:1px black solid; margin-left:auto; margin-right:auto;padding-left:50px;
		padding-right:50px; padding-top:100px; padding-bottom:100px">
        <h1 style="text-align:center;">Login</h1>
        <hr>

		<!-- login form -->
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
            <div class="form-group">
                <label for="nameinput">Username</label>
                <input type="text" class="form-control" id="nameinput" name="name" placeholder="Enter your username" 
				style="width:300px; margin:auto;">
            </div>
            <div class="form-group">
                <label for="passwordinput">Password</label>
                    <input type="password" class="form-control" id="passwordinput" name="password"
                        placeholder="Enter your password" style="width:300px; margin:auto;">
            </div>
            <input type="submit" name="submit" value="Login"><br />
        </form>


    </section>
</main>