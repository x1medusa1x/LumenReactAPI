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
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6|max:255',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'messages' => $validator->messages()
            ], 200);
        }

        if (! $token = Auth::guard('api')->attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
     }

     public function user(Request $request){
       return response()->json(Auth::guard('api')->user());
     }

     public function logout(Request $request){
       Auth::guard('api')->logout();
      return response()->json([
             'status' => 'success',
             'message' => 'logout'
         ], 200);
     }
}
