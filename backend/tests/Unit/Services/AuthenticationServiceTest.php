<?php

namespace Services;

use App\DTO\LoginData;
use App\DTO\UserData;
use App\DTO\VerifyEmailData;
use App\Exceptions\EmailAlreadyVerifiedException;
use App\Exceptions\EmailNotVerifiedException;
use App\Exceptions\InvalidVerificationLinkException;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\AuthenticationService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Mockery;
use Tests\TestCase;

class AuthenticationServiceTest extends TestCase
{
    protected UserRepository $userRepository;
    protected AuthenticationService $underTest;

    public function setUp(): void
    {
        parent::setUp();
        $this->userRepository = Mockery::mock(UserRepository::class);
        $this->underTest = new AuthenticationService($this->userRepository);
    }

    public function testRegister_shouldCreateUser_andSendVerificationEmail()
    {
        $user = Mockery::mock(User::class);

        $user
            ->shouldReceive('sendEmailVerificationNotification')
            ->once();

        $data = new UserData(
            'John Doe',
            'john@gmail.com',
            'password'
        );

        $this->userRepository
            ->shouldReceive('create')
            ->once()
            ->with($data->toArray())
            ->andReturn($user);


        $this->underTest->register($data);
    }

    public function testVerifyEmail_whenUserNotFound_shouldThrowModelNotFoundException()
    {
        $data = new VerifyEmailData(
            9999,
            'hash'
        );

        $this->userRepository
            ->shouldReceive('find')
            ->once()
            ->with(9999)
            ->andThrow(new ModelNotFoundException());

        $this->expectException(ModelNotFoundException::class);
        $this->underTest->verifyEmail($data);
    }

    public function testVerifyEmail_whenHashDoesNotMatchEmail_shouldThrowInvalidVerificationLinkException()
    {
        $user = new User();
        $user->email = 'john@gmail.com';

        $data = new VerifyEmailData(
            1,
            'invalid_hash'
        );

        $this->userRepository
            ->shouldReceive('find')
            ->once()
            ->with(1)
            ->andReturn($user);

        $this->expectException(InvalidVerificationLinkException::class);
        $this->underTest->verifyEmail($data);
        $this->assertNull($user->email_verified_at);
    }

    public function testVerifyEmail_whenUserAlreadyVerified_shouldThrowEmailAlreadyVerifiedException()
    {
        $user = new User();
        $user->email = 'john@gmail.com';
        $user->email_verified_at = now();

        $data = new VerifyEmailData(
            1,
            sha1('john@gmail.com')
        );

        $this->userRepository
            ->shouldReceive('find')
            ->once()
            ->with(1)
            ->andReturn($user);

        $this->expectException(EmailAlreadyVerifiedException::class);
        $this->underTest->verifyEmail($data);
    }

    public function testVerifyEmail_whenUserNotVerified_andHashMatchesEmail_shouldVerifyEmail()
    {
        $user = Mockery::mock(User::class)->makePartial();
        $user->id = 1;
        $user->email = 'john@gmail.com';

        $user
            ->shouldReceive('hasVerifiedEmail')
            ->once()
            ->andReturn(false);

        $user
            ->shouldReceive('markEmailAsVerified')
            ->once();

        $this->userRepository
            ->shouldReceive('find')
            ->once()
            ->with($user->id)
            ->andReturn($user);

        $data = new VerifyEmailData(
            $user->id,
            sha1($user->email)
        );

        $this->underTest->verifyEmail($data);
    }

    public function testLogin_whenCredentialsInvalid_shouldThrowAuthenticationException()
    {
        Auth::shouldReceive('attempt')
            ->once()
            ->andReturn(false);

        $data = new LoginData(
            'john@gmail.com',
            'wrong_password',
            false
        );

        $this->expectException(AuthenticationException::class);
        $this->underTest->login($data);
    }

    public function testLogin_whenUserHasNotVerifiedEmail_shouldThrowEmailNotVerifiedException()
    {
        $user = Mockery::mock(User::class);

        Auth::shouldReceive('attempt')
            ->once()
            ->andReturn(true);

        Auth::shouldReceive('user')
            ->once()
            ->andReturn($user);

        $user
            ->shouldReceive('hasVerifiedEmail')
            ->once()
            ->andReturn(false);


        $data = new LoginData(
            'not_verified@gmail.com',
            'password',
            false
        );

        $this->expectException(EmailNotVerifiedException::class);
        $this->underTest->login($data);
    }

    public function testLogin_whenCredentialsValid_andHasVerifiedEmail_shouldLoginSuccessfully()
    {
        $user = Mockery::mock(User::class);

        Auth::shouldReceive('attempt')
            ->once()
            ->andReturn(true);

        Auth::shouldReceive('user')
            ->once()
            ->andReturn($user);

        $user
            ->shouldReceive('hasVerifiedEmail')
            ->once()
            ->andReturn(true);

        $data = new LoginData(
            'john@gmail.com',
            'password',
            false
        );

        $result = $this->underTest->login($data);
        $this->assertSame($user, $result);
    }
}
