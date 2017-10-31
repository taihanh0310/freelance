<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Models\Interfaces;

/**
 *
 * @author Hanh Nguyen <hanh.nguyen1@innotech-vn.com>
 */
interface CURDInterface {
    public function fetchListData($condition = null);
    
    public function searchCondition($condition = null);

    public function readData($id);

    public function storeData(array $data);

    public function updateData($id, array $data);

    public function deleteData($id);
    
    public function deletes(array $ids);
}
