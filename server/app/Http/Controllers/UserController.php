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

    /**
     * Store a newly created resource in storage.
     *
     *
     */
    public function store(Request $request)
    {
        //
        $user = User::create($request->all());
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
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // 画像ファイルの制約を指定する
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

    return response()->json(["href" =>"//".env('CDN_DOMAIN')."/" . $item_image_path]);




    // // Kiểm tra xem có tệp hình ảnh được chọn hay không
    // if ($request->hasFile('image')) {
    //     $image = $request->file('image');

    //     // Lưu trữ hình ảnh vào thư mục public/img_user
    //     $path = $image->storeAs('public/img_user', $image->getClientOriginalName());

    //     // Cập nhật đường dẫn hình ảnh trong cơ sở dữ liệu hoặc thực hiện các thao tác khác
    //     // ...

    //     return response()->json(['message' => 'Hình ảnh đã được tải lên thành công', 'path' => $path]);
    // }

    // return response()->json(['error' => 'Không có hình ảnh được chọn'], 400);
    }
}
