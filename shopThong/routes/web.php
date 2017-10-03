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

Route::get('/', ['as' => 'home.index', 'uses' => 'HomeController@index']);
Route::get('/ve-chung-toi', ['as' => 'home.about', 'uses' => 'HomeController@about']);
Route::get('/lien-he', ['as' => 'home.contact', 'uses' => 'HomeController@contact']);
Route::get('bai-viet/{category_slug}', ['as' => 'danh_muc_bai_viet', 'uses' => 'CategoryController@index']);
Route::get('bai-viet/{category_slug}/{post_slug}', ['as' => 'danh_muc_bai_viet.bai_viet', 'uses' => 'ProductController@listPost']);

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
