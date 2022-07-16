<?php

namespace App\Http\Controllers;

use App\Http\Requests\TimelineRequest;
use App\Models\Timeline;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class TimelinesController extends Controller
{
    public function index()
    {
        $query = Request::input('query');

        return Inertia::render('Timelines/Index', [
            'timelines' => Timeline::where('user_id', auth()->user()->id)->orWhere('user_id', $query)->get(),
            'users' => auth()->user()->admin === 2 ? User::find(auth()->user()->id)->load('supervisor.student') : User::where('type','estudante')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Timelines/Add');
    }
    public function store( TimelineRequest $timelineRequest)
    {
        $timelineData = $timelineRequest->except('timeline_path');
        $timeline = $timelineRequest->file('timeline_path');
        $path = $timeline->move('files/timelines', 'timeline' . uniqid() . '.' . trim($timeline->getClientOriginalExtension()));
        $timelineData['timeline_path'] = $path;
        $saved = Timeline::create($timelineData);
        if ($saved) {
            return Redirect::route('timelines.index')->with('success', 'O cronograma foi partilhado com sucesso.');
        } else {
            return Redirect::back()->with('error', 'Desculpe! O cronograma nao foi partilhado. Por favor tente novamente.');
        }
    }

    public function destroy($id)
    {
        $timeline = Timeline::findOrFail($id);
        if ($timeline->delete()) {
            return Redirect::back()->with('success', 'O cronograma foi eliminado com sucesso.');
        } else {
            return Redirect::back()->with('error', 'Desculpe! Nao foi possivel eliminar. Por favor tente novamente.');
        }
    }
}
