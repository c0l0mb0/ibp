<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Users;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
//    public function __construct()
//    {
//          $this->middleware('auth:api');
//    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        $this->validate($request, [
            'user_name' => 'required',
            'password' => 'required'
        ]);
        $user = Users::where('user_name', $request->input('user_name'))->first();
        if (Hash::check($request->input('password'), $user->password)) {
            $request->session()->put('id', $user->id_users);
            return response()->json(['status' => 'success']);
        } else {
            return response()->json(['status' => 'fail'], 401);
        }
    }
}

?>
