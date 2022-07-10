<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchedulesRequest;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;

class SchedulesController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Schedule::class);
        $query = FacadesRequest::input('query');

        return Inertia::render('Schedules/Index', [
            'schedules' => Schedule::where('user_id', auth()->user()->id)->orWhere('user_id', $query)->get(),
            'users' => auth()->user()->admin === 2 ? User::find(auth()->user()->id)->load('supervisor.student') : null,
        ]);
    }
    public function create()
    {
        return Inertia::render('Schedules/Add', [
            'users' => auth()->user()->admin === 2 ? User::find(auth()->user()->id)->load('supervisor.student') : null,
        ]);
    }

    public function store(SchedulesRequest $schedulesRequest)
    {
        $scheduleData = $schedulesRequest->all();
        $schedule = Schedule::create($scheduleData);
        if ($schedule) {
            return Redirect::route('schedules.index')->with('success', "O Agenda foi criada com sucesso.");
        } else {
            return Redirect::back()->with('success', "Desculpe nao foi possivel criar a agenda. Tente novamente.");
        }
    }

    public function edit($id)
    {
        return Inertia::render('Schedules/Edit', [
            'users' => auth()->user()->admin === 2 ? User::find(auth()->user()->id)->load('supervisor.student') : null,
            'schedule' => Schedule::findOrFail($id),
        ]);
    }

    public function update(SchedulesRequest $schedulesRequest, $id)
    {
        $scheduleData = $schedulesRequest->all();
        $schedule = Schedule::findOrFail($id);

        if ($schedule->update($scheduleData)) {
            return Redirect::route('schedules.index')->with('success', "O Agenda foi actualizada com sucesso.");
        } else {
            return Redirect::back()->with('success', "Desculpe nao foi possivel actualizar a agenda. Tente novamente.");
        }
    }



    public function destroy($id)
    {
        $schedule = Schedule::findOrFail($id);
        if ($schedule->delete()) {
            return Redirect::back()->with('success', 'A agenda foi eliminado com sucesso.');
        } else {
            return Redirect::back()->with('error', 'Desculpe! Nao foi possivel eliminar. Por favor tente novamente.');
        }
    }
}
