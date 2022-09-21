<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupervisionRequest;
use App\Models\Supervision;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SupervisionsController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Supervision::class);
        return Inertia::render('Supervisions/Index', [
            'supervisions' => User::where('admin', 2)->get(),
        ]);
    }

    public function create($id)
    {
        return Inertia::render('Supervisions/Add', [
            'supervisor' => User::find($id)->load('supervisor.student.student'),
            'students' => User::where('admin', 3)->doesntHave('supervision')->get(),
        ]);
    }

    public function store(SupervisionRequest $supervisionRequest)
    {
        $supervision = $supervisionRequest->all();

        if (Supervision::create($supervision)) {
            return Redirect::back()->with('success', "O supervisor foi atribuido ao supervisando com sucesso");
        } else {
            return Redirect::back()->with('error', "Desculpe nao foi possivel atribuir o supervisor. Tente novamente.");
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
        $supervise = Supervision::findOrFail($id);
        $deleted = $supervise->delete();
        if ($deleted) {
            return Redirect::back()->with('success', "A supervisao foi anulada com sucesso.");
        } else {
            return Redirect::back()->with('error', "Desculpe nao foi possivel desalocar o supervisor. Tente novamente.");
        }
    }
}
