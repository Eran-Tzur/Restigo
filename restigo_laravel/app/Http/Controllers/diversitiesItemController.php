<?php

namespace App\Http\Controllers;
use App\DiversitiesItem;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class diversitiesItemController extends Controller
{
   public static function addDiversitiesItem(array $diversitiesIds, int $itemId)
   {
    DB::table('diversities_items')->where('item_id', $itemId)->delete();
    foreach ($diversitiesIds as $diversitiesId) { 
        $diversity_item = new DiversitiesItem();
        $diversity_item->diversity_Id = $diversitiesId;
        $diversity_item->item_id = $itemId;
        $diversity_item->save();
        };
        return $diversity_item;
    }

    function getItemDiversities(int $itemId) 
    {
      return $diversitiesItems = DB::table('diversities_items as d')
        ->select('d.diversity_id as id')
        ->where('item_id', '=', $itemId)
        ->get();
    }
}