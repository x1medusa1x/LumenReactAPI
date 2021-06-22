<?php

/** @var \Laravel\Lumen\Routing\Router $router */

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

$router->group(['prefix' => 'api'], function () use ($router) {

   $router->post('readJsonFile', 'FileController@readFromFile');
   $router->post('login', 'AuthController@login');
   $router->post('register', 'AuthController@register');
   $router->post('logout', 'AuthController@logout');
   $router->group(['middleware' => 'auth'], function() use ($router){

     $router->get('/boards', 'BoardController@displayAllBoards');
     $router->get('/board/{id}', 'BoardController@displayBoard');
     $router->put('/board/newBoard', 'BoardController@newBoard');
     $router->patch('/board/update/{id}', 'BoardController@updateBoard');
     $router->delete('/board/delete', 'BoardController@deleteBoard');
   });
});
