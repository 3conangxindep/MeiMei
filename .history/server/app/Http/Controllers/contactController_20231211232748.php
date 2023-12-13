<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Contact;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;


class contactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    //
    public function index()
    {
        $contact = Contact::all();
        return response()->json($contact, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(string $id)
    {
        //lấy các giá trị id cùng nhau
        $contact = Contact::where('id_card', $id)->get();
        if (!$contact) {
            // Nếu không tồn tại, trả về lỗi 404 - Not Found
            return response()->json(['error' => 'Contact not found'], 404);
        }
        return response()->json($contact, 200);
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
    }

    // In contactController.php
    public function updateContact($id_card, $contact_id)
    {
        // Check if the entry already exists in the contact table
        $existingContact = Contact::where('id_card', $id_card)->where('contact_id', $contact_id)->first();

        if (!$existingContact) {
            // If the entry doesn't exist, create a new one
            Contact::create([
                'id_card' => $id_card,
                'contact_id' => $contact_id,
            ]);
        }

        return response()->json(['message' => 'Contact updated successfully'], 200);
    }

    public function getContactsForPage($id_card, $page)
    {
        $perPage = 10; // Số lượng mục trên mỗi trang

        $contacts = DB::table('contacts')
            ->join('users', 'contacts.contact_id', '=', 'users.id_card')
            ->select('contacts.*', 'users.*')
            ->where('contacts.id_card', $id_card)
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        return response()->json($contacts, 200);
    }
}
