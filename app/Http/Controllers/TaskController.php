<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request) {
        $tasks = $request->user()->tasks()->get();
        return response($tasks);
    }

    public function create(Request $request) {
        $task = $request->user()->tasks()->create([
            'title' => $request->title,
            'description' => $request->description,
            'done' => false
        ]);

        return response($task);
    }

    public function updateStatus(Request $request, $id) {
        $task = $request->user()->tasks()->find($id);
        $task->done = !$task->done;
        $task->save();

        return response(['status' => 'ok']);
    }
}
