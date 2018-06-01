<?php
/**
 * Created by zhuangjiayu.
 * Date: 2018/5/31
 * Time: 12:54
 */
require_once '../lib/Sql.class.php';

$mysqli = new mysqli('localhost', 'root', '123456', 'huaianzhd_db');


$tool = Sql_tool::build_by_mysqli($mysqli);
$stmt = $tool->prepare("select * from dadui_huizong_query_day WHERE number_id =  ? ");
$id = 1;
$stmt->bind_param('i', $id);
echo $tool->prepare_execute_res($stmt)->to_json();



//$stmt = $mysqli->prepare("select * from dadui_huizong_query_day WHERE number_id =  ? ");
//
//$id = 33926;
//$stmt->bind_param('i', $id);
//
//$stmt->execute();
//
//$result = $stmt->get_result();
//
//var_dump((new SqlResult($result))->to_json());

//$stmt = $mysqli->prepare("INSERT INTO `huaianzhd_db`.`dadui_huizong_query` (`police_name`) VALUES (?)");
//
//$name = 'key';
//
//$stmt->bind_param('s', $name);
//
//$stmt->execute();
