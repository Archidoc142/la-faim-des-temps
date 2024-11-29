<?php

namespace App\Http\Controllers;

use App\Models\Adresse;
use App\Models\SecteurCode;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdresseController extends Controller
{
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $adresse = Adresse::find($id);
        $adresse->visible = false;
        $adresse->save();
    }
}
