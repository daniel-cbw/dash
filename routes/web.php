<?php

use Illuminate\Http\Response as HttpResponse;
use Illuminate\Http\Request;

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
Route::get('guzzle', 'GuzzleController@index');


Route::group(['prefix' => 'api', 'before' => ['jwt.auth']], function()
{

  //Route::get('d', 'AuthController@delegateToken');

  Route::post('d', 'AuthController@refresh');
  Route::get('u', 'AuthController@getUser');

});

// Route::get('/restricted', [
//    'before' => 'jwt.auth',
//    function () {
//         try {

//           if (! $user = JWTAuth::parseToken()->authenticate()) {
//               return response()->json(['user_not_found'], 404);
//           }

//       } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

//           return response()->json(['token_expired'], $e->getStatusCode());

//       } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

//           return response()->json(['token_invalid'], $e->getStatusCode());

//       } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

//           return response()->json(['token_absent'], $e->getStatusCode());

//       }

//       // the token is valid and we have found the user via the sub claim
//       return response()->json(compact('user'));
//    }
// ]);
