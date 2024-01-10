<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\contactController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\PhotoController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//User Routes
Route::get('/user', [UserController::class, 'index']);
Route::get('/user/{id}', [UserController::class, 'show']);
Route::post('/user', [UserController::class, 'store']);
Route::put('/user/{id}', [UserController::class, 'update']);
Route::delete('/user/{id}', [UserController::class, 'destroy']);


//follow
Route::get('/contact', [contactController::class, 'index']);
Route::get('/contact/{id}', [contactController::class, 'show']);
Route::put('/contact/like/{id_card}/{contact_id}', [contactController::class, 'updateLike']);
Route::get('/contact/newNotification/{id}', [contactController::class, 'getNewNotification']);
Route::get('/contact/notification/{id}', [contactController::class, 'getNotification']);
Route::put('/contact/notification/{id}', [contactController::class, 'updateNotification']);
Route::get('/contact/following/{id_card}/{page}', [contactController::class, 'getFollowing']);
Route::get('/contact/recent/{id_card}/{page}', [contactController::class, 'getRecent']);
Route::get('/contact/favorite/{id_card}/{page}', [contactController::class, 'getFavorite']);
Route::put('/contact/{id_card}/{contact_id}', [contactController::class, 'updateContact']);

//company information
Route::get('/company', [CompanyController::class, 'index']);
Route::get('/company/{id}', [CompanyController::class, 'show']);
Route::post('/company', [CompanyController::class, 'store']);
Route::put('/company/{id}', [CompanyController::class, 'update']);
// Route::get('/contact',[CompanyController::class,'index']);
//Login
Route::post('/login', [UserController::class, 'login']);
//Logout
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

//photos
Route::post('/photos', [PhotoController::class, 'upload']);
