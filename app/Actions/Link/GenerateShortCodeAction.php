<?php

namespace App\Actions\Link;

use App\Models\Link;

class GenerateShortCodeAction
{
    private const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private const LENGTH = 7;

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
        $reserved = config('singkatsaja.reserved_aliases', []);

        if (in_array(strtolower($code), $reserved, true)) {
            return true;
        }

        return Link::where('short_code', $code)
            ->whereNull('deleted_at')
            ->exists();
    }
}
