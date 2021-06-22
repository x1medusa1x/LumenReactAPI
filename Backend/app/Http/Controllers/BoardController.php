<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BoardController extends FileController
{
    public function displayAllBoards(Request $request) {
        $users = User::all();
        $boards = Board::with('user')->get();
        return response()->json(['boards' => $boards, 'users' => $users]);
    }


    public function displayBoard ($id){
        $board = Board::with('user')->where('id',$id)->first();

        if(!$board){
            return $this->notFoundResponse(['error' => 'Board was not found']);
        }
        return response()->json(['board' => $board]);
    }

    public function newBoard(Request $request){
        $user = Auth::guard('api')->user();
        $board = new Board();
        $valid = Validator::make($request->all(), [
            'name' => 'required',
            'user_id' => 'required',
        ]);

        if ($valid->fails()) {
            return response()->json($valid->getMessageBag()->toArray());
        }
        if(!$user){
            return response()->json(['error' => 'Unauthorized']);
        }

        $board->user_id = $request->get('user_id');
        $board->name = $request->get('name');
        $board->save();
        return response()->json(['board' => $board]);
    }


    public function updateBoard(Request $request,$id) {

        $board = Board::where('id', $id)->first();
        $valid = Validator::make($request->all(), [
            'name' => 'required',
            'user_id' => 'required'
        ]);

        if ($valid->fails()) {
            return $this->userErrorResponse($valid->getMessageBag()->toArray());
        }

        if($board){
            $board->name = $request->name;
            $board->user_id = $request->user_id;
            $board->save();
        }

        return response()->json(['board' => $board]);

    }

    public function deleteBoard($id) {
       $board = Board::find($id);
       $board->delete();
       $boards = Board::with('user')->get();
       return response()->json(['boards' => $boards]);
    }

}
