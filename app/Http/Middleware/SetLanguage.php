<?php

namespace App\Http\Middleware;

use Closure;

class SetLanguage
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $locale = $request->input('lang');
        if (
            $locale &&
            in_array($locale, config('app.supported_locales'))
        ) {
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
