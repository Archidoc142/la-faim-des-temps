<?php

use App\Console\Commands\RefreshQBTokensCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

//Schedule::call(new RefreshQBTokensCommand)->everyFifteenSeconds()->pingOnSuccess("http://localhost:8000/");
Schedule::command(RefreshQBTokensCommand::class)->everyFifteenSeconds()->runInBackground();
