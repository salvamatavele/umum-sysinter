<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', Course::class);
        $courses = Course::all();
        return Inertia::render('Courses/Index', ['courses' => $courses]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Courses/New');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CourseRequest $courseRequest)
    {
        $data = $courseRequest->all();
        $course = Course::create($data);
        if ($course) {
            return Redirect::route('courses.index')->with('success', "O curso foi registado com sucesso.");
        } else {
            return Redirect::back()->with('success', "Desculpe nao foi possivel registar o curso. Tente novamente.");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return Inertia::render('Courses/Edit', [
            'course' => Course::find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CourseRequest $courseRequest, $id)
    {
        $data = $courseRequest->all();
        $course = Course::findOrFail($id);
        $updated = $course->update($data);
        if ($updated) {
            return Redirect::route('courses.index')->with('success', "O curso foi actualizado com sucesso.");
        } else {
            return Redirect::back()->with('success', "Desculpe nao foi possivel actualizar o curso. Tente novamente.");
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
        $course = Course::findOrFail($id);
        $deleted = $course->delete();
        if ($deleted) {
            return Redirect::route('courses.index')->with('success', "O curso foi eliminado com sucesso.");
        } else {
            return Redirect::back()->with('success', "Desculpe nao foi possivel eliminar o curso. Tente novamente.");
        }
    }
}
