<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Task extends Model
{
    use HasFactory;

    // Одна задача принадлежит одному пользователю
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Разрешение на заполнение этих полей через create
    protected $fillable = [
        'title',
        'description',
        'done',
    ];
}
