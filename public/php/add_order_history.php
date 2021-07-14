<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

class Add_Order_History {

    public function main() {
        include ('folder_path.php');
        include_once ('db.php');

        $getDate = date("Y-m-d");
        date_default_timezone_set("Asia/Kuala_Lumpur");
        $getDate = date('Y-m-d H:i:s', time());

        $orderDetail = $_POST['orderDetail'];
        $fname = $_POST['fname'];
        $email = $_POST['email'];
        $address = $_POST['address'];
        global $conn;

        //$query1 = "INSERT INTO history (orderDetail, userid, date, username, email) VALUES ( '".$orderDetail."', '".$_COOKIE["userid"]."', '".$getDate."', '".$fname."', '".$email."')";
        $query1 = "INSERT INTO history (orderDetail, userid, date, username, email, address) VALUES ( '" . $orderDetail . "', '" . $_COOKIE["userid"] . "', '" . $getDate . "', '" . $fname . "', '" . $email . "', '" . $address . "');";

        $query2 = mysqli_query($conn, $query1);
        //$sql = "SELECT * FROM history";
        //$query = mysqli_query($conn, $sql);
        //
        //$test = json_encode($query->fetch_assoc());
        $invoice_id = mysqli_insert_id($conn);

        $book_details = json_decode($orderDetail);

//        echo $book_details[0]->isbn;

        if ($query2) {
            $mail = new PHPMailer;
            $mail->SMTPDebug = 3; // Enable verbose debug output

            $mail->isSMTP(); // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
            $mail->SMTPAuth = true; // Enable SMTP authentication
            $mail->Username = 'group77302cem@gmail.com'; // SMTP username
            $mail->Password = 'Group7302cem'; // SMTP password
            $mail->SMTPSecure = TRUE; // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587; // TCP port to connect to
            //not recommended for real production
            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            $mail->addAddress($email, $fname); // Add a recipient
            $mail->setFrom('group77302cem@gmail.com', 'Group 7 CEM Bookstore');

            $mail->isHTML(true); // Set email format to HTML


            $altbody = 'Invoice #' . $invoice_id . "\r\n" . 'Date of Purchase: ' . $getDate . "\r\n" . 'Name: ' . $fname . "\r\n" . 'Address: ' . $address . "\r\n\r\n";
            for ($x = 0; $x < count($book_details); $x++) {
                $altbody = $altbody . 'Book #' . ($x + 1) . "\r\n" . 'ISBN: ' . $book_details[$x]->isbn . "\r\n" . 'Title: ' . $book_details[$x]->name . "\r\n" . 'Quantity: ' . $book_details[$x]->quantity . "\r\n" . 'Unit Price: RM' . $book_details[$x]->price . "\r\n" . 'Subtotal Price: RM' . ($book_details[$x]->price * $book_details[$x]->quantity);
            }

            $mail->Subject = 'Invoice #' . $invoice_id;

            $mail->Body = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                            <div class="container">
                                <div class="row">
                                    <!-- BEGIN INVOICE -->
                                    <div class="col-xs-12">
                                        <div class="grid invoice">
                                            <div class="grid-body">
                                                <div class="invoice-title">
                                                    <div class="row">
                                                        <div class="col-xs-12">
                                                            <h1>Group 7 CEM Bookstore</h1>
                                                        </div>
                                                    </div>
                                                    <br>
                                                    <div class="row">
                                                        <div class="col-xs-12">
                                                            <h2>Invoice<br>
                                                                <span class="small">Order #1082</span></h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr>
                                                <div class="row">
                                                    <div class="col-xs-6">
                                                        <address>
                                                            <strong>Bill & Ship To:</strong><br>
                                                            Twitter, Inc.<br>
                                                            795 Folsom Ave, Suite 600<br>
                                                            San Francisco, CA 94107<br>
                                                            <abbr title="Phone">P:</abbr> (123) 456-7890
                                                        </address>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-6 text-right">
                                                        <address>
                                                            <strong>Order Date & Time:</strong><br>
                                                            17/06/14
                                                        </address>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <h3>ORDER SUMMARY</h3>
                                                        <table class="table table-striped">
                                                            <thead>
                                                                <tr class="line">
                                                                    <td><strong>#</strong></td>
                                                                    <td class="text-center"><strong>Detail</strong></td>
                                                                    <td class="text-right"><strong>Unit Price</strong></td>
                                                                    <td class="text-right"><strong>Subtotal Price</strong></td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td><strong>Template Design</strong><br>A website template is a pre-designed webpage, or set of webpages, that anyone can modify with their own content and images to setup a website.</td>
                                                                    <td class="text-center">15</td>
                                                                    <td class="text-center">$75</td>
                                                                    <td class="text-right">$1,125.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td><strong>Template Development</strong><br>Web development is a broad term for the work involved in developing a web site for the Internet (World Wide Web) or an intranet (a private network).</td>
                                                                    <td class="text-center">15</td>
                                                                    <td class="text-center">$75</td>
                                                                    <td class="text-right">$1,125.00</td>
                                                                </tr>
                                                                <tr class="line">
                                                                    <td>3</td>
                                                                    <td><strong>Testing</strong><br>Take measures to check the quality, performance, or reliability of (something), especially before putting it into widespread use or practice.</td>
                                                                    <td class="text-center">2</td>
                                                                    <td class="text-center">$75</td>
                                                                    <td class="text-right">$150.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="3">
                                                                    </td><td class="text-right"><strong>Total</strong></td>
                                                                    <td class="text-right"><strong>$2,400.00</strong></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>									
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- END INVOICE -->
                                </div>
                            </div>
                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>';

            $mail->AltBody = $altbody;

            if (!$mail->send()) {
                echo json_encode(array("status" => 1, "message" => "Order added but email sending failed."));
            } else {
                echo json_encode(array("status" => 1, "message" => "Order added."));
            }
        } else {
            echo json_encode(array("status" => 0, "message" => "An error has occured."));
        }
    }

}

$add_order_history = new Add_Order_History();
$add_order_history->main();
?>