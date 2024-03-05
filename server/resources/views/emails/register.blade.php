@component('mail::message')

# Hello {{ $newUser->username }},

<p>Welcome to Twingram! We're excited to have you on board.</p>

@component('mail::button', ['url' => 'http://localhost:5173/' . $newUser->remember_token])
Verificar Email
@endcomponent

Or paste this link in your browser: <a href="{{ url('verify/' .$newUser->remember_token) }}">{{ url('verify/' .$newUser->remember_token) }}</a>

<p>If you did not create an account, no further action is required. Delete this email.</p>

Just in case you have any problem, contact us at <a href="mailto:twingram@support.com">twingram@support.com</a>.

{{-- Salutation --}}
Regards,<br>
Twingram Team
@endcomponent
