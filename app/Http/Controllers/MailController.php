<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\Password;
use App\Models\User;

class MailController extends Controller
{
    public function sendMailPassword(Request $request) {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        Mail::to($request->email)->send(new Password($user));
    }
}
