<?php

namespace App\Http\Controllers;
use App\DiversitiesClient;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class diversitiesClientController extends Controller
{
    public static function addDiversitiesClient(array $diversitiesIds, int $clientId)
   {
    DB::table('diversities_clients')->where('client_id', $clientId)->delete();
    foreach ($diversitiesIds as $diversitiesId) { 
        $diversity_client = new DiversitiesClient();
        $diversity_client->diversity_Id = $diversitiesId;
        $diversity_client->client_id = $clientId;
        $diversity_client->save();
        };
        return $diversity_client;
    }

    function getClientDiversities(int $clientId) 
    {
      return $diversitiesclients = DB::table('diversities_clients as d')
        ->select('d.diversity_id as id')
        ->where('client_id', '=', $clientId)
        ->get();
    }
}