<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class OuterEquipment extends Model


{
//    public static $intAttributes= [
//        'numb_vvod' => 'integer'
//    ];

    protected $primaryKey = 'id_outer_equip';
    protected $fillable = ['equip_name','numb_vvod',
        'factory_number', 'factory_name', 'inventory_number', 'purpose', 'year_issue', 'year_exploitation',
        'power', 'current', 'voltage', 'roles', 'id_build', 'state_tech_condition', 'build_id', 'affiliate'];

    public function buildings()
    {
        return $this->belongsTo(Buildings::class, 'id_build', 'build_id');
    }
}


