<?php

namespace Services\AI;

use App\Exceptions\AiFailedException;
use App\Services\AI\GeminiClient;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Log;
use Mockery;
use PHPUnit\Framework\TestCase;

class GeminiClientTest extends TestCase
{
    protected GeminiClient $underTest;

    protected function setUp(): void
    {
        parent::setUp();
        $this->underTest = new GeminiClient();
    }


    public function testGenerate_returnsText(): void
    {
        Log::spy();
        $prompt = 'test';

        $mockResult = Mockery::mock();
        $mockResult->shouldReceive('text')
            ->once()
            ->andReturn('generated text');

        Gemini::shouldReceive('generativeModel')
            ->once()
            ->with(model: 'gemini-2.5-flash')
            ->andReturnSelf();

        Gemini::shouldReceive('generateContent')
            ->once()
            ->with($prompt)
            ->andReturn($mockResult);

        Log::getFacadeRoot()
            ->shouldNotReceive('warning');

        $result = $this->underTest->generate($prompt);
        $this->assertEquals('generated text', $result);
    }

    public function testGenerate_throwsAiFailedException_whenGeminiFails(): void
    {
        Log::spy();
        $prompt = 'test';

        Gemini::shouldReceive('generativeModel')
            ->once()
            ->with(model: 'gemini-2.5-flash')
            ->andReturnSelf();

        Gemini::shouldReceive('generateContent')
            ->once()
            ->with($prompt)
            ->andThrow(new AiFailedException('Gemini'));

        Log::shouldReceive('error')
            ->once()
            ->with('Gemini failed', ['error' => 'Ai failed']);

        $this->expectException(AiFailedException::class);
        $this->expectExceptionMessage('Gemini failed');
        $this->underTest->generate($prompt);
    }

}
