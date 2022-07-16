<?php

use App\Http\Controllers\CalendarsController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectCommentController;
use App\Http\Controllers\ProjectsConroller;
use App\Http\Controllers\SchedulesController;
use App\Http\Controllers\SupervisionsController;
use App\Http\Controllers\TimelinesController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', function () {
    return Redirect::route('dashboard');
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    /**courses routes */
    Route::resource('courses', CoursesController::class);
    /**Users routes */
    Route::get('users', [UsersController::class, 'index'])->name('users.index');
    Route::get('users/create', [UsersController::class, 'create'])->name('users.create');
    Route::post('users', [UsersController::class, 'store'])->name('users.store');
    Route::get('users/{id}', [UsersController::class, 'show'])->name('users.show');
    Route::get('users/{id}/edit', [UsersController::class, 'edit'])->name('users.edit');
    Route::put('users/{id}', [UsersController::class, 'update'])->name('users.update');
    Route::delete('users/{id}', [UsersController::class, 'destroy'])->name('users.destroy');
    /*supervision routes */
    Route::get('supervisions', [SupervisionsController::class, 'index'])->name('supervisions.index');
    Route::get('supervisions/{id}/create', [SupervisionsController::class, 'create'])->name('supervisions.create');
    Route::post('supervisions', [SupervisionsController::class, 'store'])->name('supervisions.store');
    Route::delete('supervisions/{id}', [SupervisionsController::class, 'destroy'])->name('supervisions.destroy');
    /**project */
    Route::get('projects', [ProjectsConroller::class, 'index'])->name('projects.index');
    Route::post('projects', [ProjectsConroller::class, 'store'])->name('projects.store');
    Route::post('projects/{id}', [ProjectsConroller::class, 'update'])->name('projects.update');
    Route::put('projects/status/{id}', [ProjectsConroller::class, 'changeStatus'])->name('projects.status');
    /**project comment */
    Route::post('comments', [ProjectCommentController::class, 'store'])->name('projects.comment');
    Route::delete('comments/{id}', [ProjectCommentController::class, 'destroy'])->name('comments.destroy');
    /**timelines */
    Route::get('timelines', [TimelinesController::class, 'index'])->name('timelines.index');
    Route::get('timelines/create', [TimelinesController::class, 'create'])->name('timelines.create');
    Route::post('timelines', [TimelinesController::class, 'store'])->name('timelines.store');
    Route::delete('timelines/{id}', [TimelinesController::class, 'destroy'])->name('timelines.destroy');

    /**calendar */
    Route::get('calendars', [CalendarsController::class, 'index'])->name('calendars.index');
    Route::post('calendars', [CalendarsController::class, 'store'])->name('calendars.store');
    Route::delete('calendars/{id}', [CalendarsController::class, 'destroy'])->name('calendars.destroy');

    /**agends */
    Route::get('schedules', [SchedulesController::class, 'index'])->name('schedules.index');
    Route::get('schedules/create', [SchedulesController::class, 'create'])->name('schedules.create');
    Route::post('schedules/store', [SchedulesController::class, 'store'])->name('schedules.store');
    Route::get('schedules/{id}/edit', [SchedulesController::class, 'edit'])->name('schedules.edit');
    Route::put('schedules/{id}', [SchedulesController::class, 'update'])->name('schedules.update');
    Route::delete('schedules/{id}', [SchedulesController::class, 'destroy'])->name('schedules.destroy');
});


require __DIR__ . '/auth.php';
