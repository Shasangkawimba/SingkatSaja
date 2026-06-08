<?php

namespace App\Services;

class UserAgentParser
{
    /**
     * Parse User-Agent string into browser, platform, and device type.
     */
    public function parse(?string $ua): array
    {
        if (empty($ua)) {
            return [
                'browser' => 'Other',
                'platform' => 'Other',
                'device_type' => 'desktop',
            ];
        }

        return [
            'browser' => $this->detectBrowser($ua),
            'platform' => $this->detectPlatform($ua),
            'device_type' => $this->detectDeviceType($ua),
        ];
    }

    /**
     * Detect browser name.
     */
    protected function detectBrowser(string $ua): string
    {
        if (preg_match('/(Edge|Edg)\//i', $ua)) {
            return 'Edge';
        }
        if (preg_match('/(OPR|Opera)\//i', $ua)) {
            return 'Opera';
        }
        if (preg_match('/Chrome\//i', $ua)) {
            return 'Chrome';
        }
        if (preg_match('/Firefox\//i', $ua)) {
            return 'Firefox';
        }
        if (preg_match('/Safari\//i', $ua) && !preg_match('/Chrome\//i', $ua)) {
            return 'Safari';
        }
        if (preg_match('/(MSIE|Trident)/i', $ua)) {
            return 'IE';
        }

        return 'Other';
    }

    /**
     * Detect operating system platform.
     */
    protected function detectPlatform(string $ua): string
    {
        if (preg_match('/iPhone|iPad|iPod/i', $ua)) {
            return 'iOS';
        }
        if (preg_match('/Android/i', $ua)) {
            return 'Android';
        }
        if (preg_match('/Windows/i', $ua)) {
            return 'Windows';
        }
        if (preg_match('/Macintosh|Mac OS X/i', $ua)) {
            return 'macOS';
        }
        if (preg_match('/Linux/i', $ua)) {
            return 'Linux';
        }

        return 'Other';
    }

    /**
     * Detect device category type.
     */
    protected function detectDeviceType(string $ua): string
    {
        if (preg_match('/iPad/i', $ua) || (preg_match('/Android/i', $ua) && !preg_match('/Mobile/i', $ua)) || preg_match('/tablet/i', $ua)) {
            return 'tablet';
        }
        if (preg_match('/Mobile|iPhone|iPod|Windows Phone|BlackBerry|webOS/i', $ua)) {
            return 'mobile';
        }

        return 'desktop';
    }
}
