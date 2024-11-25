<?php

namespace App\Jobs;

use App\Models\Commande;
use App\Models\Format;
use App\Models\ProduitFormat;
use App\Services\QuickBooksService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendCommandeQB implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Commande $commande) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $quickBooksService = new QuickBooksService();
        $quickBooksService->refreshTokens();

        $produits = $this->commande->ProduitsCommande()->get();
        $itemsQb = [];

        foreach ($produits as $produit)
        {
            $format = Format::where('id', $produit->pivot->id_format)->first();
            $produitFormat = ProduitFormat::where('id_produit', $produit->id)->where('id_format', $format->id)->first();

            $itemsQb[] = [
                "Amount" => $format->montant,
                "DetailType" => "SalesItemLineDetail",
                "SalesItemLineDetail" => [
                    "ItemRef" => [
                        "value" => $produitFormat->id_qb
                    ]
                ]
            ];
        }

        if($this->commande->livraison)
        {
            $fraisLivraisonItem = $quickBooksService->getFraisLivraisonItem();

            $itemsQb[] = [
                "Amount" => $this->commande->frais_livraison,
                "DetailType" => "SalesItemLineDetail",
                "SalesItemLineDetail" => [
                    "ItemRef" => [
                        "value" => $fraisLivraisonItem->Id
                    ]
                ]
            ];
        }

        $quickBooksService->createInvoice($this->commande, $itemsQb, false);
    }
}
