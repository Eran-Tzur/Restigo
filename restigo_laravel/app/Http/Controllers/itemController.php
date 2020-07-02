<?php

namespace App\Http\Controllers;
use App\Item;

use App\Http\Requests\AddItemRequest;
use App\Http\Controllers\diversitiesItemController;

use Illuminate\Http\Request;

class itemController extends Controller
{
    function getItems()
    {
        $items = Item::all();
        return response()->json($items);
    }

    function addItem(AddItemRequest $request)
    {
        $name = $request->input('name');
        $catalog_number = $request->input('catalog_number');
        $price = $request->input('price');
        $has_vat = $request->input('has_vat');
        $enable = $request->input('enable');
        $diversities = $request->input('diversities');
        $item = new Item();
        $item->name = $name;
        $item->catalog_number = $catalog_number;
        $item->price = $price;
        $item->has_vat = $has_vat;
        $item->enable = $enable;
        $item->save();
        if(isset($diversities)) {
            diversitiesItemController::addDiversitiesItem($diversities, $item->id);
        }
        return $item;
    }

    function getItem($id)
    {
        $item = Item::find($id);
        return response()->json($item);
    }

    function editItem(AddItemRequest $request)
    {
        $item = Item::find($request['id']);
        $item->name = $request->input('name');
        $item->catalog_number = $request->input('catalog_number');
        $item->price = $request->input('price');
        $item->has_vat = $request->input('has_vat');
        $item->enable = $request->input('enable');
        $diversities = $request->input('diversities');
        $item->save();
        if(isset($diversities)) {
            diversitiesItemController::addDiversitiesItem($diversities, $item->id);
        }
        return $item;
    }
}