<?php

namespace App\Jobs;

use App\Models\Commande;
use App\Models\User;
use App\Services\QuickBooksService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendPaymentQB implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public User $user, public Commande $commande)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $quickBooksService = new QuickBooksService();
        $quickBooksService->sendPayment($this->user, $this->commande);
    }
}
