<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\Rule;

class ProjectsUpdateRequest extends FormRequest
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
            'user_id' => 'required',
            'title' => ['required', Rule::unique('projects', 'title')->ignore($id), 'min:8', 'max:255'],
            'description' => 'nullable|min:8',
            'project_path' => 'nullable|file|mimes:pdf,doc,docx|max:50512',
        ];
    }
}
