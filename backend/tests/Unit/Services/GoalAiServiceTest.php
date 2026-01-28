<?php

namespace Services;

use App\Enums\AiPrompt;
use App\Services\AI\AiClient;
use App\Services\GoalAiService;
use Illuminate\Support\Facades\Log;
use Mockery;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class GoalAiServiceTest extends TestCase
{
    protected AiClient $aiClient;
    protected GoalAiService $underTest;

    public function setUp(): void
    {
        parent::setUp();

        $this->aiClient = Mockery::mock(AiClient::class);
        $this->underTest = new GoalAiService($this->aiClient);
    }

    public function testDecodeJsonOrFail_validJson_returnsDecodedArray(): void
    {
        Log::spy();
        $json = '{"valid": true}';
        $expected = [
            'valid' => true,
        ];

        $result = $this->underTest->decodeJsonOrFail($json);

        $this->assertEquals($expected, $result);
        Log::getFacadeRoot()
            ->shouldNotHaveReceived('error');
    }

    public function testDecodeJsonOrFail_invalidJson_throwsRuntimeException_andLogsError(): void
    {
        $invalidJson = '{invalid json}';

        Log::shouldReceive('error')
            ->once()
            ->with('Invalid AI JSON', ['ai_text' => $invalidJson]);

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('AI returned invalid JSON');

        $this->underTest->decodeJsonOrFail($invalidJson);
    }

    #[DataProvider('getHelpProvider')]
    public function testGetHelp_invalidJsonText_throwsRuntimeException(array|string $context ,AiPrompt $aiPrompt): void
    {
        $prompt = $aiPrompt->value . "\n" . json_encode($context);

        $this->aiClient
            ->shouldReceive('generate')
            ->once()
            ->with($prompt)
            ->andReturn('{invalid json}');

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('AI returned invalid JSON');
        $this->underTest->getHelp($context, $aiPrompt);
    }

    #[DataProvider('getHelpProvider')]
    public function testGetHelp_validJsonText_returnsArray(array|string $context, AiPrompt $aiPrompt): void
    {
        $prompt = $aiPrompt->value . "\n" . json_encode($context);

        $this->aiClient
            ->shouldReceive('generate')
            ->once()
            ->with($prompt)
            ->andReturn('{"valid": "true"}');

        $result = $this->underTest->getHelp($context, $aiPrompt);
        $this->assertEquals(['valid' => 'true'], $result);
    }

    public static function getHelpProvider(): array
    {
        return [
            'array context with STEP_HELP' => [
                [
                    'problem' => 'stuck',
                ],
                AiPrompt::STEP_HELP,
            ],
            'string context with STEP_HELP' => [
                'context',
                AiPrompt::STEP_HELP,
            ],
            'array context with GOAL_HELP' => [
                [
                    'problem' => 'stuck',
                ],
                AiPrompt::GOAL_HELP,
            ],
            'string context with GOAL_HELP' => [
                'context',
                AiPrompt::GOAL_HELP,
            ],
        ];
    }

}
