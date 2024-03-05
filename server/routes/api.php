<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TwinController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(["middleware" => "api", "profix" => "auth"], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/profile', [AuthController::class, 'profile']);
    Route::post('/post', [TwinController::class, 'twin']);
    Route::post('/post/{twin_id}', [TwinController::class, 'twinAnswer']);
    Route::post('/getToken', [AuthController::class, 'getToken']);

});

Route::get('verify/{token}', [AuthController::class, 'verify']);





