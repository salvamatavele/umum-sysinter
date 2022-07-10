<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $id = Request::segment(2);
        return [
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($id)],
            'phone' => 'required|string|min:8|max:55',
            'type' => 'required|string|max:55',
            'admin' => 'nullable|integer',
            'process_nr' => 'nullable|integer',
            'role' => 'nullable|string|max:55',
            'school_degree' => 'nullable|string|max:255',
            'course' => 'nullable|string|max:255',
            'course_code' => 'nullable|string|max:255',
        ];
    }
}
