<?php

use App\Models\User;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/token', function (Request $request) {
    // Проверь данные, которые прислали в теле запроса
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required'
    ]);

    // Получить пользователя по почте
    $user = User::where('email', $request->email)->first();

    // Если такого пользователя нет
    // Или он ввёл неправильный пароль
    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return $user->createToken($request->device_name)->plainTextToken;
});


Route::get('/tasks', [TaskController::class, 'index'])->middleware('auth:sanctum');
Route::post('/tasks/update/{id}', [TaskController::class, 'updateStatus'])->middleware('auth:sanctum');
Route::post('/tasks/create', [TaskController::class, 'create'])->middleware('auth:sanctum');
