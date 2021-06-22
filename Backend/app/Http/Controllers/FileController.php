<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
class FileController extends BaseController
{
  public function readFromFile()
  {
    $filePath = realpath("../resources/results.json");
    $data = json_decode(file_get_contents($filePath), true);

    function returnArray($array){
      $temp = [];
      foreach($array as $key => $val){
        if(is_array($val)) {
          $temp[$key] = $val;
          returnArray($val);
        }else{
          $temp[$key] = $val;
        }
      }
      return $temp;
    }
    dd(returnArray($data));
  }
}
