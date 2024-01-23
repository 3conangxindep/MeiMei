<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $user = User::all();
        // $request->user();
        return response()->json($user, 200);
    }

    public function isRegistrationAllowed(Request $request)
    {
        $request->validate([
            'isRegistrationAllowed' => ['required', 'numeric'],
        ]);

        $exists = User::where('id_card', $request->id_card)->exists();

        return response()->json(['exists' => $exists]);
    }

    /**
     * Store a newly created resource in storage.
     *
     *
     */
    public function store(Request $request)
    {
        $registrationAllowed = $request->input('registration_allowed', true);

        // Check if registration is allowed
        if (!$registrationAllowed) {
            return response()->json(['error' => 'Registration is not allowed.'], 403);
        }

        // ... existing code ...

        $user = User::create($request->all());

        // Set registration_allowed to false after registration
        $user->update(['registration_allowed' => false]);

        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     *
     *
     */
    public function show(string $id)
    {
        //
        $user = User::find($id);
        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if ($request->hasFile('image')) {
            $rules = [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif', // 画像ファイルの制約を指定する
            ];

            $file = $request->file('image');

            $request->validate($rules);

            $fileName = time() . '_' . $file->getClientOriginalName();

            $disk = 'local';

            $path = $file->storeAs('public/images/img_url', $fileName, $disk);

            $publicPath = Storage::url($path);

            $user->img_url = $publicPath;

            $user->save();
        }


        $user->fill($request->all()); // Use fill() instead of update() to assign the values

        $user->save();

        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $user = User::find($id);
        $user->delete();
        return response()->json('user deleted', 204);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }


        return $request->user();
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->noContent();
    }
    //upload image
    public function uploadImage(Request $request)
    {
        $item_image_path = "";
        if ($request->hasFile('item_image_file')) {
            $item_image_path = $request->item_image_file->store('images/item', 's3');
        }

        return response()->json(["href" => "//" . env('CDN_DOMAIN') . "/" . $item_image_path]);
    }
}
