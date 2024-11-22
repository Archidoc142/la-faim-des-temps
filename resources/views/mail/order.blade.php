<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"> <!-- Font de base-->

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: "Inter", sans-serif;
        }

        #main {
            padding: 1em;
        }

        .bold {
            font-weight: bold
        }

        .large {
            font-size: 1.125rem
        }

        .italic {
            font-style: italic
        }

        #signature {
            margin-top: 1.2rem;
        }

        #signature a {
            font-size: 0.9rem;
        }

        #logo-top {
            margin: 1.5rem auto;
            width: 128px;
            display: block;
        }

        #facture {
            background-color: rgb(228, 228, 228);
            margin: 2rem 0;
            padding: 1rem;
            border: 1px solid rgb(128, 128, 128);
            border-radius: 5px
        }

        .produit {
            margin: 1rem 0;
            display: flex;
            justify-content: space-between;
            min-width: 100%;
        }

        .produit div {
            width: 100%;
        }

        .produit h4, .produit .total, #total p {
            font-size: 1.05rem
        }

        .produit h4 {
            margin-bottom: 0.25rem
        }

        .prix {
            text-align: right;
            width: 7.5rem !important;
        }

        #coord {
            margin-bottom: 1rem
        }

        #totaux {
            margin-top: 1rem;
            text-align: right
        }

        #client {
            margin-bottom: 0.5rem
        }

        #total {
            margin-top: 0.75rem;
        }

    </style>
</head>
<body>
    <div id="main">
        <img id="logo-top" src="{{ URL::asset("img/logo-big.jpg")}}" alt="La faim des Temps">

        <p>{{__("email.bonjour") . " " . $commande->user->prenom}},</p>
        <br>
        <p>{{__("email.merci")}}</p>
        @if ($commande->type_commande->nom == "Payée séparément")
            <br>
            <p>{{__("email.interac1")}} : <span class="bold">cavistefaimdestemps@gmail.com</span>.</p>
            <p>{{__("email.interac2")}} <span class="bold">« Corbeau »</span>.</p>
        @endif
        @if ($commande->livraison)
            <br>
            <p>{{__("email.glaciere")}}</p>
        @endif

        <div id="facture">
            <div id="coord">
                <div id="client">
                    <p>{{$commande->user->prenom}} {{$commande->user->nom}}</p>
                    @if($commande->user->telephone)
                        <p>{{$commande->user->telephone}}</p>
                    @endif
                    <p>{{$commande->user->email}}</p>
                    @if($commande->id_adresse)
                        <p>{{ $commande->adresse->no_civique }}  {{ $commande->adresse->rue }}</p>
                        @if(isset($commande->adresse->appartement))
                            <p>{{__("email.appt") . " " . $commande->adresse->appartement }}</p>
                        @endif
                        <p>{{ $commande->adresse->code_postal }}</p>
                    @endif
                </div>
                <p>{{__("email.commande")}} <span class="bold">#{{$commande->id}}</span></p>
                <p>Code QB : <span class="bold">{{$commande->qb_invoice_id ? "#" . $commande->qb_invoice_id : "N/A"}}</span></p>
                <p>{{$commande->livraison ? __("email.livraison") : __("email.cueillette")}}</p>
                <p>{{$commande->type_commande->id == 1 ? __("email.en_ligne") : __("email.separement") }}</p>
                @if($commande->allergenes)
                    <br>
                    <p><span class="bold">{{__("email.allergenes")}} : </span>{{$commande->allergenes}}</p>
                @endif
            </div>
            <hr>
            @foreach ($produits as $produit)
            <div class="produit">
                <div>
                    <h4 class="bold">{{ $produit["qte"] }}× {{ $produit["nom"] }}</h4>
                    <p>{{ $produit["format"] }}</p>
                </div>
                <div class="prix">
                    <p>{{ $produit["qte"] }}× {{ $produit["prix_unitaire"] }} $</p>
                    <p class="bold">{{ number_format((float)($produit["prix_unitaire"] * $produit["qte"]), 2, ',', '') }} $</p>
                </div>
            </div>
            @endforeach
            <hr>
            <div id="totaux">

                <p>{{__("email.sous_total")}}: {{ number_format((float)($commande->total - $commande->frais_livraison), 2, ',', '') }} $</p>
                <p>
                @if($commande->frais_livraison > 0)
                    {{ __("email.livraison") . " (" . $commande->adresse->secteur_code->secteur->nom . ")"}}
                @else
                    {{__("email.livraison")}}
                @endif
                {{ ": " . number_format((float)($commande->frais_livraison), 2, ',', '') }} $</p>

                <div id="total">
                    <p>Total :
                        <span class="bold">{{number_format((float)($commande->total), 2, ',', '')}} $</span>
                    </p>
                </div>
            </div>
        </div>

        <p>{{__("email.semaine")}}</p>

        <div id="signature">
            <p class="large italic">Yannick Pellerin</p>
            <p class="bold">{{__("email.chef")}}</p>
            <a href="https://lafaimdestemps.com">lafaimdestemps.com</a>
        </div>
    </div>

</body>
</html>
