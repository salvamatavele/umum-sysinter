<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectCommentsRequest;
use App\Http\Requests\ProjectsRequest;
use App\Http\Requests\ProjectsUpdateRequest;
use App\Models\Project;
use App\Models\ProjectComment;
use App\Models\Supervision;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsConroller extends Controller
{
    protected Project $tcc;
    protected Project $supervisor;

    public function __construct(Project $tcc, Project $supervisor)
    {
        $this->tcc = $tcc;
        $this->supervisor = $supervisor;
    }

    public function index(): Response
    {
        $this->authorize('viewAny', Project::class);
        $query = FacadesRequest::all('query');
        if (Project::where('user_id', auth()->user()->id)->orWhere('user_id', $query)->first()) {
            $this->tcc = Project::where('user_id', auth()->user()->id)->orWhere('user_id', $query)->first()->loadMissing(['user.student', 'comments.user']);
            $this->supervisor = Project::where('user_id', auth()->user()->id)->orWhere('user_id', $query)->first()->loadMissing(['user.supervision.supervisor.employer']);
        }

        $project = Project::where('user_id', auth()->user()->id)->orWhere('user_id', $query)->first();
        return Inertia::render('Projects/Index', [
            'project' => $project,
            'tcc' => $this->tcc,
            'supervisor' => $this->supervisor,
            'students' => auth()->user()->admin === 2 ? Supervision::where('supervisor_id', auth()->user()->id)->get()->load('student') : null,
        ]);
    }
    public function show(): Response
    {
        $tccs = Project::all();
        return Inertia::render('Projects/Show', ['tccs' => $tccs]);
    }

    public function store(ProjectsRequest $projectsRequest)
    {
        $projectData = $projectsRequest->except('project_path');
        $project = $projectsRequest->file('project_path');
        $path = $project->move('files/projects', 'project' . uniqid() . '.' . trim($project->getClientOriginalExtension()));
        $projectData['project_path'] = $path;
        
        $saved = Project::create($projectData);
        if ($saved) {
            return Redirect::back()->with('success', 'A monografia foi enviada com sucesso.');
        } else {
            return Redirect::back()->with('error', 'Descupe! A monografia nao foi enviada. Por favor tente novamente.');
        }
    }

    public function update(ProjectsUpdateRequest $projectsRequest, $id)
    {
        $thisProject = Project::findOrFail($id);
        $projectData = $projectsRequest->except('project_path');
        $project = $projectsRequest->file('project_path');
        $path = $projectsRequest->hasFile('project_path') ? $project->move('files/projects', 'project' . uniqid() . '.' . trim($project->getClientOriginalExtension())) : '';
        $projectData['project_path'] = $projectsRequest->hasFile('project_path') ? $path : $thisProject->project_path;
        $updated = $thisProject->update($projectData);
        if ($updated) {
            return Redirect::back()->with('success', 'A monografia foi actualizada com sucesso.');
        } else {
            return Redirect::back()->with('error', 'Desculpe! A monografia nao foi actualizada. Por favor tente novamente.');
        }
    }

    public function changeStatus(Request $request, $id)
    {
        $status = $request->input('status');
        $project = Project::findOrFail($id);
        $updated = ($status == "2") ? $project->update(['done' => "1"]) : $project->update(['status' => $status]);
        if ($updated) {
            return Redirect::back()->with('success', 'O estado foi actualizada com sucesso.');
        } else {
            return Redirect::back()->with('error', 'Desculpe! O estado nao foi actualizada. Por favor tente novamente.');
        }
    }
}
