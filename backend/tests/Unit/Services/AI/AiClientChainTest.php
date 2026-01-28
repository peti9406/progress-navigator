<?php

namespace Services\AI;

use App\Services\AI\AiClient;
use App\Services\AI\AiClientChain;
use Illuminate\Support\Facades\Log;
use PHPUnit\Framework\TestCase;

class AiClientChainTest extends TestCase
{
    protected array $aiClientChain;
    protected AiClientChain $underTest;

    public function setUp(): void
    {
        parent::setUp();

        $this->aiClientChain = [
            \Mockery::mock(AiClient::class),
            \Mockery::mock(AiClient::class),
        ];

        $this->underTest = new AiClientChain($this->aiClientChain);
    }

    public function testGenerate_returnsText(): void
    {
        Log::spy();
        $prompt = 'Test prompt';

        foreach ($this->aiClientChain as $aiClient) {
            $aiClient
                ->shouldReceive('generate')
                ->with($prompt)
                ->once()
                ->andReturn('Generated text');
        }

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
