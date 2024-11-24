<?php

namespace App\Console\Commands;

use App\Services\QuickBooksService;
use Illuminate\Console\Command;

class RefreshQBTokensCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:refresh-q-b-tokens-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $qbService = new QuickBooksService();
        $qbService->refreshTokens();
    }
}
