<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->group(['prefix' => 'api/v1'], function () use ($router) {

    $router->post('login/','UsersController@authenticate');

    $router->get('/outerequipall', 'OuterEquipmentController@index');
    $router->get('/outerinnerequip', 'OuterEquipmentController@indexOuterAndInner');
    $router->post('/outerequip', 'OuterEquipmentController@create');
    $router->get('/outerequip/{id}', 'OuterEquipmentController@show');
    $router->put('/outerequip/{id}', 'OuterEquipmentController@update');
    $router->delete('/outerequip/{id}', 'OuterEquipmentController@destroy');

    $router->get('/innerequipall', 'InnerEquipmentController@index');
    $router->post('/innerequip', 'InnerEquipmentController@create');
    $router->get('/innerequip/{id}', 'InnerEquipmentController@show');
    $router->put('/innerequip/{id}', 'InnerEquipmentController@update');
    $router->delete('/innerequip/{id}', 'InnerEquipmentController@destroy');


});