<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App;

/**
 * Description of BaseAbstractBean
 *
 * @author NTHanh
 */
class BaseAbstractBean {
    public function setAttributes($data)
    {
        if (is_object($data) && $data instanceof BaseAbstractBean)
        {
            $data = $data->toArray();
        }
        if (!is_array($data))
        {
            return;
        }

        foreach ($data as $key => $value)
        {
            if (property_exists($this, $key))
            {
                $this->$key = $value;
            }
        }
    }
    
    public function getAttributes(){
        
    }

    public function toArray()
    {
        return get_object_vars($this);
    }

    public function className()
    {
        return get_class($this);
    }
}
?>