<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\SiteController;
use TCG\Voyager\Models\Post;
use TCG\Voyager\Models\Category;
/**
 * Description of HomeController
 *
 * @author Hanh Nguyen <hanh.nguyentai@nashtechglobal.com>
 */
class HomeController extends SiteController {
    //put your code here
    
    public function index(){
        $home_product_limit = config('app.product_home_limit');
        
        $categories = Category::with(['posts' => function($queryPost){
            $queryPost->where('status', 'PUBLISHED')->take(6)->get();
        }])->whereIn('id', [3,4,5,6,7,8,9,10])->get();     
        return view('pages.home', compact('categories'));        
    }

    public function about(){
        // about
    }
    
    public function contact(){
        
    }
}
