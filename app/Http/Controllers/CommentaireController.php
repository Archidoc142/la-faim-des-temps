<?php

namespace App\Http\Controllers;

use App\Models\Commentaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Resources\CommentaireResource;

class CommentaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Avis');
    }

    /**
     * Display a listing of the resource in the admin menu.
     */
    public function indexAdmin()
    {
        $commentaires = Commentaire::paginate(6);

        return Inertia::render('Admin/Commentaires', [
            "commentaires" => CommentaireResource::collection($commentaires)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Commentaire::create([
            'note' => $request->note,
            'commentaire' => $request->comment,
            'id_utilistateur' => Auth::id()
        ]);

        return redirect('/?avisEnvoye=1');
    }

    /**
     * Display the specified resource.
     */
    public function show(Commentaire $commentaire)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commentaire $commentaire)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(int $id)
    {
        $commentaire = Commentaire::find($id);
        $nb_show = count(Commentaire::where('masque', true)->get());

        $show = false;

        if ($commentaire->masque) {
            $show = true;
        }

        if(strlen($commentaire->commentaire) > 0 && ($nb_show < 10 || $show)) {
            $commentaire->masque = !$commentaire->masque;
            $commentaire->save();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $commentaire = Commentaire::find($id);
        $commentaire->delete();
    }
}
