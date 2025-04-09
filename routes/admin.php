<?php

use App\Http\Controllers\Admin\FeedbackController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(FeedbackController::class)->prefix('/feedbacks')->name('feedbacks.')->group(function () {
    Route::get('/', 'index')->name('index')->middleware(['auth', 'isAdmin']);
    Route::get('/create', 'create')->name('create');
    Route::post('/store', 'store')->name('store');
    Route::delete('/{feedback}', 'destroy')->name('destroy')->middleware(['auth', 'isAdmin']);
});

Route::resource('/users', UserController::class)->middleware('auth', 'isAdmin');
