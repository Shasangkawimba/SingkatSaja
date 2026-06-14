<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Link;
use App\Models\ClickEvent;
use App\Models\DailyStat;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

// 1. Create/Reset User
$user = User::where('email', 'test@example.com')->first();
if (!$user) {
    $user = new User();
    $user->email = 'test@example.com';
}
$user->name = 'Test User';
$user->password = Hash::make('password');
$user->save();

echo "User test@example.com updated/created successfully.\n";

// 2. Hard delete any existing conflicting link with short_code 'google' to avoid constraint issues
DB::table('links')->where('short_code', 'google')->delete();

// 3. Create a test link
$link = Link::create([
    'user_id' => $user->id,
    'short_code' => 'google',
    'destination_url' => 'https://www.google.com',
    'expires_at' => now()->addDays(30)->toDateTimeString(),
]);

echo "Mock link created: /{$link->short_code} (ID: {$link->id})\n";

// 4. Create Daily Stats for the last 7 days
DailyStat::where('link_id', $link->id)->delete();
for ($i = 6; $i >= 0; $i--) {
    $date = now()->subDays($i)->toDateString();
    DailyStat::create([
        'link_id' => $link->id,
        'date' => $date,
        'clicks_count' => rand(10, 50),
    ]);
}

// 5. Create Click Events for dimension tracking
ClickEvent::where('link_id', $link->id)->delete();
$browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
$devices = ['desktop', 'mobile', 'tablet'];
$platforms = ['Windows', 'macOS', 'iOS', 'Android', 'Linux'];

for ($i = 0; $i < 100; $i++) {
    ClickEvent::create([
        'link_id' => $link->id,
        'browser' => $browsers[array_rand($browsers)],
        'device_type' => $devices[array_rand($devices)],
        'platform' => $platforms[array_rand($platforms)],
        'country' => 'ID',
        'referer' => 'https://t.co',
        'clicked_at' => now()->subHours(rand(1, 48))->toDateTimeString(),
    ]);
}

echo "Mock daily stats and click events created successfully.\n";
