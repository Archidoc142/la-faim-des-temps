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

class Order extends Mailable
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
            subject: trans("email.subject") . " #" . $this->commande->id
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $produits = CommandeProduit::where('id_commande', $this->commande->id)->get();

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
