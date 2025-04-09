<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;
    protected $table = 'feedbacks';

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'ip_address'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeFilterOn($query)
    {
        if (request('search')) {
            $query->where('title', 'like', '%' . request('search') . '%')
                ->orWhere('description', 'like', '%' . request('search') . '%');
        }
    }
}
