<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Otp;

class ResetPassword extends Notification
{
    use Queueable;

    protected $message;
    protected $subject;
    protected $fromEmail;
    protected $mailer;
    protected $otp;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->message = 'You are receiving this email because we received a password reset request for your account.';
        $this->subject = 'Reset Password Notification';
        $this->fromEmail = "shimaak137@gmail.com";
        $this->mailer = 'smtp';
        $this->otp = new Otp;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        $otp = $this->otp->generate($notifiable->email,'numeric', 6, 15);

        return (new MailMessage)
            ->mailer($this->mailer)
            ->subject($this->subject)
            ->greeting('Hello ' . $notifiable->first_name)
            ->line($this->message)
            ->line('Code: ' . $otp->token)
            ->from($this->fromEmail);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
