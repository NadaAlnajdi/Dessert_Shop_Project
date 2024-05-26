<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use  App\Http\Requests\Auth\ForgetPasswordRequest;
use App\Notifications\ResetPassword;
use App\Models\User;

class ForgetPasswordController extends Controller
{
    //
    public function forgetPassword(ForgetPasswordRequest $request){
        $input=$request->only('mail');
        $user=User::where('email',$input)->first();
        $user->notify(new ResetPassword());
        $success['success']=true;
        return response()->json($success,200);
    }
}
