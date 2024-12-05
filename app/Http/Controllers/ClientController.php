<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = User::Clients()->paginate(6);

        return Inertia::render('Admin/Clients', [
            'clients' => ClientResource::collection($clients)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, int $id)
    {
        $client = User::find($id);
        $commandes = $client->commandes()->paginate(6);

        $prevPage = $request->prevPage;

        if(is_null($prevPage))
            $prevPage = "";

        if(!is_null($client))
            return Inertia::Render('Admin/Client', [
                'client' => new ClientResource(User::find($id)),
                'commandes' => $commandes,
                'prevPage' => $prevPage
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $client = User::find($request->input('id'));
        //dd(mb_detect_encoding($request->prenom));

        $rules = [
            'prenom' => 'required|max:64|regex:/^[\p{Lu}][\p{Ll}]+(-[\p{Lu}][\p{Ll}]+)*$/u',
            'nom' => 'required|max:64|regex:/^[\p{Lu}][\p{Ll}]+([ -][\p{Lu}][\p{Ll}]+)*$/u',
            'telephone' => 'nullable|numeric|digits:10'
        ];

        $messages = [
            'nom.required' => 'Veuillez entrer un nom de famille.',
            'nom.max' => 'Le nom de famille ne peut pas dépasser 64 caractères.',
            'nom.regex' => 'Le format du nom de famille entré est invalide.',

            'prenom.required' => 'Veuillez entrer un prénom.',
            'prenom.max' => 'Le prénom ne peut pas dépasser 64 caractères.',
            'prenom.regex' => 'Le format du prénom entré est invalide.',

            'telephone.digits' => 'Le numéro de téléphone doit contenir 10 chiffres.',
            'telephone.numeric' => 'Le numéro de téléphone doit contenir 10 chiffres.'
        ];

        if($client->email != $request->email)
        {
            $rules['email'] = 'required|string|lowercase|regex:/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/|max:128|unique:'.User::class;
            $messages['email.required'] = 'Veuillez entrer un courriel.';
            $messages['email.email'] = 'Veuillez entrer un courriel valide.';
            $messages['email.regex'] = 'Le format du courriel entré est invalide.';
            $messages['email.unique'] = 'Le courriel appartient déjà à un autre client.';
        }

        $validation = Validator::make($request->all(), $rules, $messages);

        if ($validation->fails())
            return back()->withErrors($validation->errors())->withInput();

        $client->nom = $request->nom;
        $client->prenom = $request->prenom;
        $client->email = $request->email;
        $client->telephone = $request->telephone;

        $client->save();

        return redirect("/admin/clients?page=" . $request->page);
    }
}
