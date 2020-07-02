<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
class AddClientRequest extends FormRequest
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
        $client_id = !empty($request['id']) ? ',' . $request['id'] : '';
        return [
            'name' => 'required|min:2|max:70|unique:items,name'. $client_id,
            'type' => 'required',
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
