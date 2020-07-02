<?php

namespace App\Http\Controllers;
use App\Client;

use App\Http\Requests\AddClientRequest;
use App\Http\Controllers\diversitiesClientController;

use Illuminate\Http\Request;

class clientController extends Controller
{
    function getClients()
    {
        $clients = Client::all();
        return response()->json($clients);
    }

    function addClient(AddClientRequest $request)
    {
        $name = $request->input('name');
        $type = $request->input('type');
        $enable = $request->input('enable');
        $diversities = $request->input('diversities');
        $client = new Client();
        $client->name = $name;
        $client->type = $type;
        $client->enable = $enable;
        $client->save();
        if(isset($diversities)) {
            diversitiesClientController::addDiversitiesClient($diversities, $client->id);
        }
        return $client;
    }

    function getClient($id)
    {
        $client = Client::find($id);
        return response()->json($client);
    }

    function editClient(AddClientRequest $request)
    {
        $client = Client::find($request['id']);
        $client->name = $request->input('name');
        $client->type = $request->input('type');
        $client->enable = $request->input('enable');
        $diversities = $request->input('diversities');
        $client->save();
        if(isset($diversities)) {
            diversitiesClientController::addDiversitiesClient($diversities, $client->id);
        }
        return $client;
    }
}
