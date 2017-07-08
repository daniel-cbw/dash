<?php

use Illuminate\Http\Response as HttpResponse;

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

Route::get('/', 'AngularController@serve');

// Route::get('/', function(){
// 	return File::get(public_path() . '/dist/index.html');
// });




// Route::any('{path?}', function()
// {
//     return File::get(public_path() . '/dist/index.html');
// })->where("path", ".+");

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::post('auth/register', 'AuthController@register');
Route::post('auth/login', 'AuthController@signIn');
//Route::group(['middleware' => 'jwt.auth'], function () {
  //  Route::get('user', 'AuthController@getAuthUser');
//});

// Route::group(['domain' => 'dash.coolblueweb.net', 'middleware' => 'jwt.auth'], function () {
//    Route::get('/r', function () {
//        try {
//            JWTAuth::parseToken()->toUser();
//        } catch (Exception $e) {
//            return Response::json(['error' => $e->getMessage()], HttpResponse::HTTP_UNAUTHORIZED);
//        }

//        return ['data' => 'This has come from a dedicated API subdomain with restricted access.'];
//    });
// });

Route::get('/restricted', [
   'before' => 'jwt.auth',
   function () {
       $token = JWTAuth::getToken();
       $user = JWTAuth::toUser($token);

       return Response::json([
           'data' => [
               'email' => $user->email,
               'registered_at' => $user->created_at->toDateTimeString()
           ]
       ]);
   }
]);
