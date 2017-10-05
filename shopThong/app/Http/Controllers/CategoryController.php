<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;

use App\Http\Controllers\SiteController;
use Illuminate\Http\Request;
use TCG\Voyager\Models\Category;
use TCG\Voyager\Models\Post;

/**
 * Description of CategoryController
 *
 * @author hanhnguyen
 */
class CategoryController extends SiteController {

    public $categorySideBars;

    public function __construct() {
        $this->categorySideBars = Category::with('posts')->whereIn('id', [3, 4, 5, 6, 7, 8, 9, 10])->get();
    }

    public function index($slug) {
        $categorySideBars = $this->categorySideBars;
        
        $category = Category::with(['posts' => function($queryPost) {
                        $queryPost->where('status', 'PUBLISHED')->get();
                    }])->where('slug', $slug)->firstOrFail();
        return view('pages.category', compact('category', 'categorySideBars'));
    }
    
    public function productAll(){
        $categorySideBars = $this->categorySideBars;
        
        $categories = Category::with(['posts' => function($queryPost){
            $queryPost->where('status', 'PUBLISHED')->get();
        }])->whereIn('id', [3,4,5,6,7,8,9,10])->get(); 
        
        return view('pages.product', compact('categories', 'categorySideBars'));
    }

    public function productDetail($category_slug, $post_slug){
        $categorySideBars = $this->categorySideBars;
         $category = Category::with(['posts' => function($queryPost) use ($post_slug) {
                        $queryPost->where('status', 'PUBLISHED')->where('slug', $post_slug)->firstOrFail();
                    }])->where('slug', $category_slug)->firstOrFail();
        return view('pages.product_detail', compact('category', 'categorySideBars'));
    }

}
