<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class GuzzleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index( Request $request )
    {
       
        $client = new Client(); //GuzzleHttp\Client
		$response = $client->get('https://baconipsum.com/api/?type=meat-and-filler');
		$foo = $response->getBody();
		
		return $foo;
    }
}
