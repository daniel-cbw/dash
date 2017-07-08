<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    /**
     * @var \Tymon\JWTAuth\JWTAuth
     */
    protected $jwt;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
    }

    public function register(Request $request){
        $user = $this->user->create([
          'name' => $request->get('name'),
          'email' => $request->get('email'),
          'password' => bcrypt($request->get('password'))
        ]);
        $token = JWTAuth::fromUser($user);
        return response()->json(['status'=>true,'message'=>'User created successfully','data'=>$user]);
    }

    public function signIn(Request $request)
    {   
        // echo '<pre>'
        // var_dump($request);
        // die();

        // $data = array();

        //$json = $request->json;

        //dd($request);

        //dd($json);

        // $postdata = file_get_contents("php://input");
        // $request = json_decode($postdata);
        // $email = $request->email;
        // $pass = $request->password;


        // $data['email'] = $request;

        // return $request;

        // die();

        $this->validate($request, [
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6'
        ]);

        try {
            if (! $token = $this->jwt->attempt($request->only('email', 'password'))) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return response()->json(['token_absent' => $e->getMessage()], $e->getStatusCode());
        }

        return response()->json(compact('token'));
    }
}