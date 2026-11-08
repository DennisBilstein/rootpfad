<?php
declare(strict_types=1);

$name = 'Mira';
$completedLessons = 3;

echo 'Hello, $name!' . PHP_EOL;
echo "Hello, {$name}!" . PHP_EOL;
echo 'Hello, ' . $name . '!' . PHP_EOL;

$message = 'Progress: ';
$message .= $completedLessons . ' lessons';
echo $message . PHP_EOL;

$summary = sprintf('%s completed %03d lessons (100%% effort).', $name, $completedLessons);
echo $summary . PHP_EOL;

$letter = <<<LETTER
Hello, {$name}!
Completed lessons: {$completedLessons}
LETTER;

$literal = <<<'LITERAL'
Hello, $name!
LITERAL;

echo $letter . PHP_EOL;
echo $literal . PHP_EOL;
echo 'Next total: ' . ($completedLessons + 2) . PHP_EOL;
