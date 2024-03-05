<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RegisterMail extends Mailable
{
    use Queueable, SerializesModels;
    public $newUser;

    public function __construct($newUser)
    {
        $this->newUser = $newUser;
    }


    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Verify Your Email Address for Twingram.',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.register',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
