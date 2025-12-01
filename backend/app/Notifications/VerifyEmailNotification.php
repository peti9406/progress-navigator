<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends VerifyEmail
{
    protected function verificationUrl($notifiable): array|string
    {
        $frontendUrl = env('FRONTEND_URL') . '/verify-email';

        return $frontendUrl
            . '?id=' . $notifiable->getKey()
            . '&hash=' . sha1($notifiable->getEmailForVerification());
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Verify Email Address')
            ->line('Please click the button below to verify your email address.')
            ->action('Verify Email', $this->verificationUrl($notifiable))
            ->line('If you did not create an account, no further action is required.');
    }
}
