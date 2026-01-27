<?php

namespace Services;

use App\Services\GoalAiService;
use App\Services\ProgressionService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Mockery;
use PHPUnit\Framework\TestCase;

class GoalAiServiceTest extends TestCase
{
    protected ProgressionService $progressionService;
    protected GoalAiService $underTest;

    protected function setUp(): void
    {
        parent::setUp();

        $this->progressionService = Mockery::mock(ProgressionService::class);
        $this->underTest = new GoalAiService($this->progressionService);
    }

    public function testGetHelp_whenIdIsInvalid_ThrowsException()
    {
        $this->progressionService
            ->shouldReceive('getGoalById')
            ->once()
            ->with(9999)
            ->andThrow(new ModelNotFoundException());

        $this->expectException(ModelNotFoundException::class);
        $this->underTest->getHelp(9999, '');
    }

    public function testGetHelp_whenAiResponseIsValidJson_ReturnsDecodedJson()
    {
        $this->progressionService
            ->shouldReceive('getGoalById')
            ->once()
            ->with(1)
            ->andReturn();

        $service = $this->getMockBuilder(GoalAIService::class)
            ->setConstructorArgs([$this->progressionService])
            ->onlyMethods(['getHelpString'])
            ->getMock();

        $service->method('getHelpString')
            ->willReturn(json_encode([
                'steps' => ['Step 1', 'Step 3'],
                'goal' => 'Test goal',
            ]));

        $result = $this->underTest->getHelp(1, 'I am stuck');

        $this->assertIsArray($result);
        $this->assertEquals(['Step 1', 'Step 3'], $result['steps']);
        $this->assertEquals('Test goal', $result['goal']);
    }

}
