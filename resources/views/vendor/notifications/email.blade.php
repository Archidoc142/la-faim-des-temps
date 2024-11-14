<x-mail::message>
{{-- Intro Lines --}}
@lang('befbtn')

{{-- Action Button --}}
@isset($actionText)
<?php
    $color = match ($level) {
        'success', 'error' => $level,
        default => 'primary',
    };
?>
<x-mail::button :url="$actionUrl" :color="$color">
    @lang('btn')
</x-mail::button>
@endisset

{{-- Outro Lines --}}
@lang('aftbtn')
@lang('befsal')


{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
@lang('regards')<br>
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
