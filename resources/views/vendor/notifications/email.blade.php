<x-mail::message>
{{-- Intro Lines --}}
@lang('email.befbtn')

{{-- Action Button --}}
@isset($actionText)
<?php
    $color = match ($level) {
        'success', 'error' => $level,
        default => 'primary',
    };
?>
<x-mail::button :url="$actionUrl" :color="$color">
    @lang('email.btn')
</x-mail::button>
@endisset

{{-- Outro Lines --}}
@lang('email.aftbtn')
@lang('email.befsal')

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
@lang('email.regards')<br>
{{ config('app.name') }}
@endif

{{-- Subcopy --}}
@isset($actionText)
<x-slot:subcopy>
@lang(
    'trouble',
    [
        'actionText' => $actionText,
    ]
) <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
</x-slot:subcopy>
@endisset
</x-mail::message>
