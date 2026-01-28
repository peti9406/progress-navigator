<?php

namespace Services\AI;

use App\Services\AI\OpenRouterClient;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Mockery;
use Tests\TestCase;

class OpenRouterClientTest extends TestCase
{
    protected OpenRouterClient $underTest;

    protected function setUp(): void
    {
        parent::setUp();
        $this->underTest = new OpenRouterClient();
    }

    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function testGenerate_returnsText(): void
    {
        $prompt = 'Test prompt';
        Log::spy();

        Http::fake([
            'https://openrouter.ai/api/v1/chat/completions' => Http::response([
                'choices' => [
                    ['message' => ['content' => '  generated text  ']]
                ]
            ], 200)
        ]);

        $result = $this->underTest->generate($prompt);
        $this->assertEquals('generated text', $result);
        Log::getFacadeRoot()
            ->shouldNotHaveReceived('error');
    }

    public function testGenerate_throwsException_andLogsError(): void
    {
        Log::spy();

        Http::fake([
            'https://openrouter.ai/api/v1/chat/completions' => Http::response(
                'Server error', 500
            )
        ]);

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('OpenRouter failed');

        $this->underTest->generate('Server error');
        Log::shouldReceive('error');
    }
}
