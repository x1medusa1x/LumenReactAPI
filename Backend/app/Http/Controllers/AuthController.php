<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */


      public function login(Request $request)
      {
       $email = $request->email;
       $password = $request->password;
       if( !$token = Auth::attempt(['email' => $email, 'password' => $password])){
         return response()->json(['message' => 'Unauthorized'], 401);
       }
       return $this->respondWithToken($token);
     }

     protected function respondWithToken($token)
     {
         return response()->json([
             'token' => $token,
             'token_type' => 'bearer',
             'expires_in' => Auth::factory()->getTTL() * 60
         ], 200);
     }

     public function logout(Request $request){
       $user = Auth::user();
       dd($user);
       #Auth::logout();
       //$this->jwt->invalidate($this->jwt->getToken());
     }
}
