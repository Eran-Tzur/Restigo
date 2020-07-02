<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
// ----------- item -----------------
Route::get('items', 'itemController@getItems');

Route::post('add-item', 'itemController@addItem');

Route::get('item/{id}', 'itemController@getItem');

Route::post('edit-item', 'itemController@editItem');

Route::get('item_diversities/{itemId}', 'diversitiesItemController@getItemDiversities');

// ----------- diversity -----------------
Route::get('diversities', 'diversityController@getDiversities');

Route::post('add-diversity', 'diversityController@addDiversity');

Route::get('diversity/{id}', 'diversityController@getDiversity');

Route::post('edit-diversity', 'diversityController@editDiversity');

Route::get('client_diversities/{clientId}', 'diversitiesClientController@getClientDiversities');
// ----------- client -----------------
Route::get('clients', 'clientController@getClients');

Route::post('add-client', 'clientController@addClient');

Route::get('client/{id}', 'clientController@getClient');

Route::post('edit-client', 'clientController@editClient');
