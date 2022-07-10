<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SchedulesRequest extends FormRequest
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
        return [
            'user_id' => 'required|max:225',
            'title' => 'required|max:225',
            'url' => 'required|url|max:225',
            'date' => 'required|max:225',
            'time' => 'required|max:225',
            'description' => 'nullable|min:10',
        ];
    }
}
