<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
class AuthController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */


     // public function register(Request $request){
     //     if ($request->has('name') && $request->has('password') && $request->has('email')) {
     //       $user = new User;
     //       $user->password=Hash::make($request->password);
     //       $user->email=$request->email;
     //       $user->name = $request->name;
     //       if($user->save()){
     //               Return "User registration is successful!";
     //       } else {
     //               Return "User registration failed!";
     //       }
     //     } else {
     //           Return "Please enter full user information!";
     //     }
     //   }


      public function login(Request $request)
      {
        $valid = Validator::make($request->all(), [
             'email' => 'required|email',
             'password' => 'required|string|min:6',
         ]);

         if ($valid->fails()) {
             return response()->json($valid->errors(), 422);
         }

         if (! $token = auth()->attempt($valid->validated())) {
             return response()->json(['error' => 'Unauthorized'], 401);
           }
       return $this->respondWithToken($token);
     }



     public function logout(Request $request){
      auth()->logout();
      return response()->json(['message'=>'Successfully logged out']);
     }
}
