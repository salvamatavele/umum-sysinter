<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Course;
use App\Models\Employer;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', User::class);
        return Inertia::render('Users/Index', [
            'users' => User::where('admin', '!=', 0)->where('id', '!=', auth()->user()->id)->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Add', [
            'courses' => Course::all(),
        ]);
    }

    public function store(UserRequest $userRequest)
    {
        $userRequest->merge(['password' => Hash::make('12345678')]);
        $userData = $userRequest->only(['name', 'last_name', 'email', 'phone', 'type', 'admin', 'password']);
        $userData['admin'] = (($userRequest->input('type') == 'cordenador') ? 1 : ($userRequest->input('type') == 'supervisor' ? 2 : 3));
        $user = User::create($userData);

        if ($user) {
            if ($userData['type'] == 'estudante') {
                $userRequest->merge(['user_id' => $user->id]);
                $studentData = $userRequest->only(['user_id', 'process_nr', 'course', 'course_code']);
                Student::create($studentData);
            }
            if ($userData['type'] == 'cordenador' || $userData['type'] == 'supervisor') {
                $userRequest->merge(['user_id' => $user->id]);
                $employer = $userRequest->only(['user_id', 'role', 'school_degree']);
                Employer::create($employer);
            }

            return Redirect::route('users.index')->with('success', "O Usuario foi registado com sucesso.\n O codigo de acesso ao sistema e: 12345678");
        } else {
            return Redirect::back()->with('success', "Desculpe nao foi possivel registar o usuario. Tente novamente.");
        }
    }
    public function show($id)
    {
        return Inertia::render('Users/Show', [
            'user' => User::find($id),
        ]);
    }
    public function edit($id)
    {
        $user = User::find($id);
        $user->load(['student', 'employer']);
        return Inertia::render('Users/Edit', [
            'user' => $user,
            'courses' => Course::all(),
        ]);
    }

    public function update(UserRequest $userRequest, $id)
    {
        $userData = $userRequest->only(['name', 'last_name', 'email', 'phone', 'type', 'admin']);
        $userData['admin'] = (($userRequest->input('type') == 'cordenador') ? 1 : ($userRequest->input('type') == 'supervisor' ? 2 : 3));
        $user = User::findOrFail($id);
        $userUpdated = $user->update($userData);

        if ($userUpdated) {
            if ($userData['type'] == 'estudante') {
                $studentData = $userRequest->only(['process_nr', 'course', 'course_code']);
                $user->student->update($studentData);
            }
            if ($userData['type'] == 'cordenador' || $userData['type'] == 'supervisor') {
                $employerData = $userRequest->only(['role', 'school_degree']);
                $user->employer->update($employerData);
            }

            return Redirect::route('users.index')->with('success', "O Usuario foi actualizado com sucesso.");
        } else {
            return Redirect::back()->with('success', "Desculpe nao foi possivel actualizar o usuario. Tente novamente.");
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $deleted = $user->delete();
        if ($deleted) {
            return Redirect::route('users.index')->with('success', "O usuario foi eliminado com sucesso.");
        } else {
            return Redirect::back()->with('success', "Desculpe nao foi possivel eliminar o usuario. Tente novamente.");
        }
    }
}
