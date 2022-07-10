<?php

namespace App\Providers;

use App\Models\Course;
use App\Models\Project;
use App\Models\Schedule;
use App\Models\Supervision;
use App\Models\User;
use App\Policies\CoursePolicies;
use App\Policies\ProjectPolicies;
use App\Policies\SchedulePolicies;
use App\Policies\SupervisionPolicies;
use App\Policies\UserPolicies;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Course::class => CoursePolicies::class,
        User::class => UserPolicies::class,
        Supervision::class => SupervisionPolicies::class,
        Project::class => ProjectPolicies::class,
        Schedule::class => SchedulePolicies::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
