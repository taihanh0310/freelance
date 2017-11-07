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

Route::get('/','Fronts\HomeController@index')->name('home');

Route::get('lien-he', 'Fronts\HomeController@getContact')->name('home.contact');
Route::post('lien-he', 'Fronts\HomeController@postContact')->name('home.sendContact');
Route::get('tai-khoan/dang-ki', 'Auth\RegisterController@getRegister')->name('account.register');
