<?php

use App\Http\Controllers\ProfileController;
use App\Models\Feedback;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $total = Feedback::count();

    $auth_sub_total = Feedback::where('user_id', Auth::id())->get()->count();

    // Submissions per day
    $perDay = Feedback::select(
        DB::raw('DATE(created_at) as date'),
        DB::raw('COUNT(*) as count')
    )
        ->groupBy('date')
        ->orderBy('date', 'desc')
        ->pluck('count', 'date');

    // Most common words
    $allDescriptions = Feedback::pluck('description')->implode(' ');
    $words = str_word_count(strtolower($allDescriptions), 1);

    $stopWords = ['the', 'a', 'and', 'to', 'of', 'in', 'is', 'on', 'for', 'with', 'at', 'as'];
    $wordCounts = [];

    foreach ($words as $word) {
        if (!in_array($word, $stopWords)) {
            $wordCounts[$word] = ($wordCounts[$word] ?? 0) + 1;
        }
    }

    arsort($wordCounts);
    $commonWords = array_slice($wordCounts, 0, 10);

    return Inertia::render('Dashboard', [
        'stats' => [
            'total' => $total,
            'auth_sub_total' => $auth_sub_total,
            'per_day' => $perDay,
            'common_words' => $commonWords,
        ]
    ]);
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
