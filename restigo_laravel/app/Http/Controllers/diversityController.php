<?php

namespace App\Http\Controllers;
use App\Diversity;

use App\Http\Requests\AddDiversityRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class diversityController extends Controller
{
    function getDiversities()
    {
        $diversities = Diversity::all();
        return response()->json($diversities);
    }

    function addDiversity(AddDiversityRequest $request)
    {
        $name = $request->input('name');
        $enable = $request->input('enable');
        $diversity = new Diversity();
        $diversity->name = $name;
        $diversity->enable = $enable;
        $diversity->save();
        return $diversity;
    }

    function getDiversity($id)
    {
        $diversity = Diversity::find($id);
        return response()->json($diversity);
    }

    function editDiversity(AddDiversityRequest $request)
    {
        $diversity = Diversity::find($request['id']);
        $diversity->name = $request->input('name');
        $diversity->enable = $request->input('enable');
        $diversity->save();
        return $diversity;
    }
}
