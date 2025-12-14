<?php

namespace Tests\Unit;

use App\DTO\LoginData;
use App\DTO\UserData;
use App\DTO\VerifyEmailData;
use App\Exceptions\EmailAlreadyVerifiedException;
use App\Exceptions\EmailNotVerifiedException;
use App\Exceptions\InvalidVerificationLinkException;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\AuthorizationService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Mockery;
use Tests\TestCase;

class AuthorizationServiceTest extends TestCase
{
    protected UserRepository $userRepository;
    protected AuthorizationService $underTest;

    public function setUp(): void
    {
        parent::setUp();
        $this->userRepository = Mockery::mock(UserRepository::class);
        $this->underTest = new AuthorizationService($this->userRepository);
    }

    public function testRegister_ShouldCreateUserAndSendVerificationEmail()
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

    public function testVerifyEmail_WhenUserNotFound_ShouldThrowModelNotFoundException()
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

    public function testVerifyEmail_WhenHashDoesNotMatchEmail_ShouldThrowInvalidVerificationLinkException()
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

    public function testVerifyEmail_WhenUserAlreadyVerified_ShouldThrowEmailAlreadyVerifiedException()
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

    public function testVerifyEmail_WhenUserNotVerifiedAndHashMatchesEmail_ShouldVerifyEmail()
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

    public function testLogin_WhenCredentialsInvalid_ShouldThrowAuthenticationException()
    {
        Auth::shouldReceive('attempt')
            ->once()
            ->andReturn(false);

        $data = new LoginData(
            'john@gmail.com',
            'wrong_password'
        );

        $this->expectException(AuthenticationException::class);
        $this->underTest->login($data);
    }

    public function testLogin_WhenUserHasNotVerifiedEmail_ShouldThrowEmailNotVerifiedException()
    {
        $user = Mockery::mock(User::class);

        Auth::shouldReceive('attempt')
            ->once()
            ->andReturn(true);

        Auth::shouldReceive('user')
            ->once()
            ->andReturn($user);

        Auth::shouldReceive('logout')
            ->once();

        $data = new LoginData(
            'not_verified@gmail.com',
            'password'
        );

        $user
            ->shouldReceive('hasVerifiedEmail')
            ->once()
            ->andReturn(false);

        $this->expectException(EmailNotVerifiedException::class);
        $this->underTest->login($data);
    }

    public function testLogin_WhenCredentialsValidAndHasVerifiedEmail_ShouldLoginSuccessfully()
    {
        $user = Mockery::mock(User::class);

        Auth::shouldReceive('attempt')
            ->once()
            ->andReturn(true);

        Auth::shouldReceive('user')
            ->once()
            ->andReturn($user);

        Auth::shouldReceive('logout')->never();

        $user
            ->shouldReceive('hasVerifiedEmail')
            ->once()
            ->andReturn(true);

        $data = new LoginData(
            'john@gmail.com',
            'password'
        );

        $result = $this->underTest->login($data);
        $this->assertSame($user, $result);
    }
}
