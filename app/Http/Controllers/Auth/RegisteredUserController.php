<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordRequest;
use App\Http\Requests\ProfileRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{

    public function profile()
    {
        return Inertia::render('Auth/Profile');
    }
    /**
     * Handle an incoming update request.
     *
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(ProfileRequest $profileRequest)
    {
        $currentUser = User::findOrFail(auth()->user()->id);
        $userData = $profileRequest->all();
        $user = $currentUser->update($userData);


        if ($user) {
            Auth::logout();
            event(new Registered($currentUser));
            Auth::login($currentUser);
            return Redirect::back()->with('success', "Os dados foram actualizados com sucesso.");
        } else {
            return Redirect::back()->with('error', "Desculpe nao foi possivel actualizar a conta. Tente novamente.");
        }

    }


    public function changePassword(PasswordRequest $request)
    {
        $currentUser = User::findOrFail(auth()->user()->id);
        if (Hash::check($request->input('password_current'), $currentUser->password)) {
        $user = $currentUser->update([
            'password' => Hash::make($request->input('password')),
        ]);
        if ($user) {
            return Redirect::back()->with('success', "A senha foi actualizada com sucesso.");
        } else {
            return Redirect::back()->with('error', "Desculpe nao foi possivel actualizar a senha. Tente novamente.");
        }
    } else {
        return Redirect::back()->with('success', "Desculpe a senha actual nao coresponde. Tente novamente.");
    }
    }
}
