<?php

namespace Services\AI;

use App\Exceptions\AiFailedException;
use App\Exceptions\AllAiFailedException;
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

    public function testGenerate_throwsAllAiFailedException(): void
    {
        Log::spy();
        $prompt = 'Test prompt';

        foreach ($this->aiClientChain as $aiClient) {
            $aiClient
                ->shouldReceive('generate')
                ->with($prompt)
                ->andThrow(new AllAiFailedException());
        }

        $this->expectException(AllAiFailedException::class);
        $this->expectExceptionMessage('AI service currently unavailable, please try again later.');

        $this->underTest->generate($prompt);
        Log::shouldReceive('error')
            ->once()
            ->with('All AI failed');
    }
}
