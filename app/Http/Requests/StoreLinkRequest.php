<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Redis;

class StoreLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $reserved = config('singkatsaja.reserved_aliases', []);

        return [
            'destination_url' => ['required', 'url', 'max:2048'],
            'short_code' => [
                'nullable',
                'string',
                'alpha_dash',
                'min:3',
                'max:50',
                Rule::unique('links')->whereNull('deleted_at'),
                function ($attribute, $value, $fail) use ($reserved) {
                    if (in_array(strtolower($value), $reserved, true)) {
                        $fail('The selected short code is reserved and cannot be used.');
                    }
                },
            ],
            'expires_at' => ['nullable', 'date', 'after:now'],
        ];
    }

    /**
     * Configure the validator instance and enforce creation rate limits.
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $user = $this->user();
            if ($user) {
                $redisKey = "rl:create:user:{$user->id}";
                $count = Redis::get($redisKey);
                $limit = config('singkatsaja.rate_limits.links_per_hour', 30);

                if ($count && $count >= $limit) {
                    $validator->errors()->add('short_code', "Rate limit exceeded. You can only create {$limit} links per hour.");
                }
            }
        });
    }
}
