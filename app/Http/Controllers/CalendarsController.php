<?php

namespace App\Http\Controllers;

use App\Http\Requests\CalendarsRequest;
use App\Models\Calendar;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;

class CalendarsController extends Controller
{
    public function index()
    {
        $query = FacadesRequest::input('query', 'all');
        $calendars = ($query != "all") ? Calendar::where('course', $query)->get() : Calendar::all();
        return Inertia::render('Calendars/Index', [
            'courses' => Course::all(),
            'calendars' =>  $calendars,
        ]);
    }

    public function store(CalendarsRequest $calendarsRequest)
    {
        $calendarData = $calendarsRequest->except('calendar');
        $calendar = $calendarsRequest->file('calendar');
        $path = $calendar->move('files/calendars', 'calendar' . uniqid() . '.' . trim($calendar->getClientOriginalExtension()));
        $calendarData['calendar'] = $path;
        $saved = Calendar::create($calendarData);
        if ($saved) {
            return Redirect::back()->with('success', 'O calendario foi publicado com sucesso.');
        } else {
            return Redirect::back()->with('error', 'Desculpe! O calendario nao foi publicado. Por favor tente novamente.');
        }
    }

    public function destroy($id)
    {
        $calendar = Calendar::findOrFail($id);
        if ($calendar->delete()) {
            return Redirect::back()->with('success', 'O calendario foi eliminado com sucesso.');
        } else {
            return Redirect::back()->with('error', 'Desculpe! Nao foi possivel eliminar. Por favor tente novamente.');
        }
    }
}
