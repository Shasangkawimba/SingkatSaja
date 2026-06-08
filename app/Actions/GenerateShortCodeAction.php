<?php

namespace App\Actions;

use App\Models\Link;

class GenerateShortCodeAction
{
    private const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private const LENGTH = 7;
    private const RESERVED = ['login', 'register', 'logout', 'dashboard', 'settings', 'analytics', 'links', 'api', 'admin'];

    /**
     * Generate a unique collision-safe short code.
     */
    public function execute(): string
    {
        do {
            $code = '';
            for ($i = 0; $i < self::LENGTH; $i++) {
                $code .= self::CHARACTERS[random_int(0, 61)];
            }
        } while ($this->isCollision($code));

        return $code;
    }

    /**
     * Check if the generated code collides with active links or reserved keywords.
     */
    private function isCollision(string $code): bool
    {
        if (in_array(strtolower($code), self::RESERVED, true)) {
            return true;
        }

        return Link::where('short_code', $code)
            ->whereNull('deleted_at')
            ->exists();
    }
}
