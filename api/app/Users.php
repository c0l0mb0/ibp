<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model implements AuthenticatableContract, AuthorizableContract
{
    use \Illuminate\Auth\Authenticatable, \Laravel\Lumen\Auth\Authorizable;

    protected $primaryKey = 'id_users';

    protected $fillable = ['username', 'email', 'password'];

    protected $hidden = [
        'password'
    ];

}
