<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
class AddDiversityRequest extends FormRequest
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
     * @return array
     */
    public function rules(Request $request)
    {
        $diversity_id = !empty($request['id']) ? ',' . $request['id'] : '';
        return [
            'name' => 'required|min:2|max:70|unique:diversities,name'. $diversity_id,
            'enable' => 'required|string',
        ];
    }
    public function messages()
    {
        return[
            'name.required' => 'name is required',
            'name.string' => 'name is required',
            'name.unique' => 'name already exist',
        ];
    }
}
