<?php

namespace Services\AI;

use App\Services\AI\AiClient;
use App\Services\AI\AiClientChain;
use App\Services\AI\GeminiClient;
use App\Services\AI\OpenRouterClient;
use Illuminate\Support\Facades\Log;
use Mockery;
use PHPUnit\Framework\TestCase;

class AiClientChainTest extends TestCase
{
    protected array $aiClientChain;
    protected AiClientChain $underTest;

    public function setUp(): void
    {
        parent::setUp();

        $this->aiClientChain = [
            Mockery::mock(GeminiClient::class),
            Mockery::mock(OpenRouterClient::class),
        ];

        $this->underTest = new AiClientChain($this->aiClientChain);
    }

    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function testGenerate_returnsText(): void
    {
        Log::spy();
        $prompt = 'Test prompt';

        $this->aiClientChain[0]
            ->shouldReceive('generate')
            ->once()
            ->with($prompt)
            ->andReturn('Generated text');

        $result = $this->underTest->generate($prompt);
        $this->assertEquals('Generated text', $result);
        Log::getFacadeRoot()
            ->shouldNotReceive('error');
    }

    public function testGenerate_throwsException(): void
    {
        Log::spy();
        $prompt = 'Test prompt';

        foreach ($this->aiClientChain as $aiClient) {
            $aiClient
                ->shouldReceive('generate')
                ->once()
                ->with($prompt)
                ->andThrow(\RuntimeException::class);
        }

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('All ai clients failed');

        $this->underTest->generate($prompt);
        Log::shouldReceive('error')
            ->once()
            ->with('All ai clients failed');
    }
}
