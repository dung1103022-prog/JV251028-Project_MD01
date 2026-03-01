<?php
declare(strict_types=1);

define('BASE_PATH', dirname(__DIR__));

require BASE_PATH . '/vendor/autoload.php';

// .env 読み込み
$dotenv = Dotenv\Dotenv::createImmutable(BASE_PATH);
$dotenv->load();

// セッション開始
\App\Core\Session::start();

// リクエスト生成
$request = new \App\Core\Request();

// アプリ起動
$app = new \App\Core\App();

$app->run($request);
