<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OuterEquipment extends Model

{
    protected $primaryKey = 'id_outer_equip';
    protected $fillable = ['numb_vvod', 'equip_name',
        'factory_number', 'factory_name', 'inventory_number', 'purpose', 'year_issue', 'year_exploitation',
        'power', 'current', 'voltage', 'roles','id_build', 'state_tech_condition', 'build_id'];

}
