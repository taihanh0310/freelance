<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers\Fronts;
use Illuminate\Http\Request;
use App\Http\Controllers\Fronts\FrontController;
/**
 * Description of HomeController
 *
 * @author Hanh Nguyen <hanh.nguyen1@innotech-vn.com>
 */
class HomeController extends FrontController{
    
    /**
     * @author Hanh Nguyen <hanh.nguyen1@innotech-vn.com>
     * @todo read about shop
     * address
     * front number
     * email
     * location config
     */
    public function getContact(){
        // read about shop
        // address
        // front number
        // email 
    }
    
    public function postSendQuestionContact(Request $request){
        // process send question contact
    }
    
    /**
     * @author Hanh Nguyen <hanh.nguyen1@innotech-vn.com>
     * @todo About me for this website intruction
     */
    public function aboutUs(){
        // define
    }
}
