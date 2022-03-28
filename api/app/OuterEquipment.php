<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OuterEquipment extends Model

{
    protected $primaryKey = 'id_outer_equip';
    protected $fillable = ['numb_vvod', 'place_first_lev', 'place_second_lev', 'place_third_lev', 'equip_name',
        'factory_number', 'factory_name', 'inventory_number', 'purpose', 'year_issue', 'year_exploitation',
        'power', 'current', 'voltage', 'place_zero_lev', 'roles'];

}
