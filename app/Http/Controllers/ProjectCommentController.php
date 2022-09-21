<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectCommentsRequest;
use App\Models\ProjectComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ProjectCommentController extends Controller
{
    public function store(ProjectCommentsRequest $projectCommentsRequest)
    {
        $commentData = $projectCommentsRequest->all();
        $comment = ProjectComment::create($commentData);
        if ($comment) {
            return Redirect::back()->with('success', 'Comentada com sucesso.');
        } else {
            return Redirect::back()->with('error', 'Descupe! Nao foi possivel comentar. Por favor tente novamente.');
        }
        return $commentData;
    }

    public function destroy($id)
    {
        $comment = ProjectComment::findOrFail($id);
        if ($comment->delete()) {
            return Redirect::back()->with('success', 'A Comentario eliminado com sucesso.');
        } else {
            return Redirect::back()->with('error', 'Descupe! Nao foi possivel eliminar. Por favor tente novamente.');
        }
    }
}
