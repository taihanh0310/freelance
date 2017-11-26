<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models\Services;
use App\Models\Interfaces\CURDInterface;
use App\Models\Entities\Manufacturer;
/**
 * Description of ManufacturerService
 *
 * @author Hanh Nguyen <hanh.nguyen1@innotech-vn.com>
 */
class ManufacturerService implements CURDInterface {
    
    private $manufacturerEnt;
    
    public function __construct(Manufacturer $manufacturerEnt) {
        $this->manufacturerEnt = $manufacturerEnt;
    }
    //put your code here
    public function deleteData($id) {
        
    }

    public function deletes(array $ids) {
        
    }

    public function fetchListData($condition = null) {
        return $this->manufacturerEnt->all();
    }

    public function readData($id) {
        
    }

    public function searchCondition($condition = null) {
        
    }

    public function storeData(array $form) {
        $data = [];
        
        return $this->manufacturerEnt->save($data);
    }

    public function updateData($id, array $data) {
        
    }

}
