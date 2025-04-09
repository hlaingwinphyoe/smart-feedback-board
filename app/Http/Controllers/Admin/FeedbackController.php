<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedbacks = Feedback::query()
            ->with('user')
            ->filterOn()
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(function ($feedback) {
                return [
                    'id' => $feedback->id,
                    'title' => $feedback->title,
                    'description' => $feedback->description,
                    'created_at' => $feedback->created_at->diffForHumans(),
                    'user_id' => $feedback->user_id,
                    'user_name' => $feedback->user->name ?? "Guest",
                ];
            });

        return Inertia::render('Feedback/Index', [
            'feedbacks' => $feedbacks,
        ]);
    }

    public function create()
    {
        return Inertia::render('Feedback/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $ip = $request->ip();

        $todayCount = Feedback::where('ip_address', $ip)
            ->orWhere('user_id', Auth::id())
            ->whereDate('created_at', Carbon::today())
            ->count();

        if ($todayCount >= 3) {
            return redirect()->back()->with('error', 'You can only submit 3 feedbacks per day.');
        }

        try {
            DB::beginTransaction();

            Feedback::create([
                'title' => $request->title,
                'description' => $request->description,
                'user_id' => Auth::id() ?? null,
                'ip_address' => $ip
            ]);

            DB::commit();

            return redirect()->back()->with('success', 'Successfully Created.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function destroy(Feedback $feedback)
    {
        DB::transaction(function () use ($feedback) {
            $feedback->delete();
        });

        return redirect()->back()->with('success', 'Feedback deleted successfully.');
    }
}
