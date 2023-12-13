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
    public function update(Request $request, $id_card, $contact_id)
    {
        // Check if the entry already exists in the contact table
        $existingContact = Contact::where('id_card', $id_card)->where('contact_id', $contact_id)->first();

        if (!$existingContact) {
            // If the entry doesn't exist, create a new one
            $existingContact = Contact::create([
                'id_card' => $id_card,
                'contact_id' => $contact_id,
            ]);
        } else {
            $existingContact->touch();
        }

        // Retrieve the 'created_at' timestamp
        $time = $existingContact->created_at;

        return response()->json(['message' => 'Contact updated successfully', 'time' => $time], 200);
    }

    /**
     * Remove the specified resource
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

    public function getFollowingContacts($id_card, $page)
    {
        $perPage = 2; // Số lượng mục trên mỗi trang

        $totalContacts = DB::table('contact')
            ->where('id_card', $id_card)
            ->count();

        $created_at = DB::table('contact')
            ->where('id_card', $id_card);

        $contacts = DB::table('contact')
            ->join('user', 'contact.contact_id', '=', 'user.id_card')
            ->select('contact.*', 'user.*', 'contact.created_at as contact_created_at', 'contact.updated_at as contact_updated_at')
            ->where('contact.id_card', $id_card)
            ->orderBy('user.user_name') // Add this line for alphabetical sorting
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $totalPages = ceil($totalContacts / $perPage);

        return response()->json(['data' => $contacts, 'totalPages' => $totalPages,], 200);
    }

    public function getRecentContacts($id_card, $page)
    {
        $perPage = 2; // Số lượng mục trên mỗi trang

        $totalContacts = DB::table('contact')
            ->where('id_card', $id_card)
            ->count();

        $contacts = DB::table('contact')
            ->join('user', 'contact.contact_id', '=', 'user.id_card')
            ->select('contact.*', 'user.*', 'contact.created_at as contact_created_at', 'contact.updated_at as contact_updated_at')
            ->where('contact.id_card', $id_card)
            ->orderBy('contact.updated_at', 'desc') // Add this line for sorting by updated_at in descending order
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $totalPages = ceil($totalContacts / $perPage);

        return response()->json(['data' => $contacts, 'totalPages' => $totalPages], 200);
    }
}
