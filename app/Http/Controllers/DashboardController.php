<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'students' => User::where('type', 'estudante')->get(),
            'users' => User::all(),
            'tccDone' => Project::where('status', 1)->where('done',0)->get(),
            'tccArchived' => Project::where('done', 1)->get(),
            'tccPeding' => Project::where('status', 0)->get(),
        ]);
    }
}
