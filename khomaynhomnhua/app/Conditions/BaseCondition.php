<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Conditions;

use App\BaseAbstractBean;
use Webpatser\Uuid\Uuid;

/**
 * Description of BaseCondition
 *
 * @author Nguyen Tai Hanh <hanh.nguyen1@innotech-vn.com>
 */
class BaseCondition extends BaseAbstractBean {

    public $limit;
    public $total_item;
    public $sort_type;
    public $order_by;
    public $keyword;
    public $show_paging;
    public $name;
    public $page;

    public function getPage() {
        return (int) $this->page;
    }

    public function getName() {
        return $this->name;
    }

    public function __construct() {
        $this->show_paging = 1; // show paging
    }

    public function getShowPaging() {
        return (int) $this->show_paging;
    }

    public function setShowPaging($value) {
        $this->show_paging = (int) $value;
    }

    public function getLimit() {
        return (int) env('APP_LIMIT', 20);
    }

    public function getTotalItem() {

        if (!is_null($this->total_item)) {
            return $this->total_item;
        }
        return 0;
    }

    public function getOrderBy() {
        if($this->order_by){
            return $this->order_by;
        }else{
            return "updated_at";
        }
    }

    public function getSortType() {
        if($this->sort_type){
            return $this->sort_type;
        }else{
            return "DESC";
        }
    }

    public function getKeyword() {
        return trim($this->keyword);
    }

}
