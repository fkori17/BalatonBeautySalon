<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable; 
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Notifications\Messages\MailMessage;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Authenticatable
{
    use HasApiTokens, Notifiable, CanResetPassword;
    protected $table = 'customers';
    protected $hidden = ['password', 'remember_token'];
     
    protected $fillable = [
        'email',
        'password',
        'name',
        'phone',
        'loyal'
    ];

    public function treatment(): HasMany
    {
        return $this->hasMany(Treatment::class, 'customer_id', 'id');
    }

    public function sendPasswordResetNotification($token)
{
    $this->notify(new class($token) extends ResetPasswordNotification {
        public function toMail($notifiable)
        {
            $url = 'http://localhost:5173/reset-password?token=' . $this->token . '&email=' . $notifiable->getEmailForPasswordReset();

            return (new MailMessage)
                ->subject('Jelszó visszaállítása - Balaton Beauty Salon') 
                ->greeting('Kedves ' . $notifiable->name . '!') 
                ->line('Ezt az e-mailt azért kaptad, mert jelszó-visszaállítási kérelmet kaptunk a fiókodhoz.')
                ->action('Jelszó visszaállítása', $url) 
                ->line('Ez a link 60 percig érvényes.')
                ->line('Ha nem te kérted a visszaállítást, nincs további teendőd.')
                ->salutation('Üdvözlettel,' . PHP_EOL . 'Balaton Beauty Salon csapata'); 
        }
    });
}
}
