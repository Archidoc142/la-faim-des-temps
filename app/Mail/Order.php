<?php

namespace App\Mail;

use App\Http\Resources\UserResource;
use App\Models\Commande;
use App\Models\CommandeProduit;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;

class Order extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public Commande $commande)
    {
        $this->commande = $commande;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __("email.subject") . " #" . $this->commande->id
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $commandeProduits = CommandeProduit::where('id_commande', $this->commande->id)->get();
        $produits = [];
        $index = 0;

        $locale = Config::get("app.locale");

        foreach($commandeProduits as $commandeProduit)
        {
            if($index == 0 ||
               $produits[$index - 1]["nom"] != $commandeProduit->produit->lang($locale)->pivot->description ||
               $produits[$index - 1]["format"] != $commandeProduit->format->langue($locale)->pivot->nom)
            {
                $newProduit = null;
                $newProduit["nom"] = $commandeProduit->produit->lang($locale)->pivot->description;
                $newProduit["qte"] = 1;
                $newProduit["format"] = $commandeProduit->format->langue($locale)->pivot->nom;
                $newProduit["prix_unitaire"] = $commandeProduit->format->montant;

                $produits[] = $newProduit;
                $index++;
            }
            else
            {
                $produits[$index - 1]["qte"]++;
            }
        }

        return new Content(
            view: 'mail.order',
            with: [
                "commande" => $this->commande,
                "produits" => $produits
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
