<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
use Inertia\Inertia;
var_dump(Inertia::optional(fn() => 'test'));
var_dump(Inertia::defer(fn() => 'test'));
