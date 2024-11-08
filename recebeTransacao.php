<?php

require 'index.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $type = htmlspecialchars($_POST['type']);
    $movement = htmlspecialchars($_POST['movement']);
    $amount = floatval($_POST['amount'] ?? 0);
    $category = htmlspecialchars($_POST['category']);
    $date = htmlspecialchars($_POST['date']);
    $description = htmlspecialchars($_POST['description'] ?? '');

    echo "<h2>Dados da Transação Recebida:</h2>";
    echo "Tipo: $type<br>";
    echo "Movimentação: $movement<br>";
    echo "Valor: $amount<br>";
    echo "Categoria: $category<br>";
    echo "Data: $date<br>";
    echo "Descrição: $description<br>";

    try {
        $conn = conectar();

        
    } catch (Exception $e) {
        // fazer um rollback?
        echo "Erro ao inserir a transação: " . $e->getMessage();
    }
} else {
    echo "Requisição inválida.";
}

?>

<!-- $type = htmlspecialchars($_POST['type']);
$movement = htmlspecialchars($_POST['movement']);
$amount = floatval($_POST['amount'] ?? 0);
$category = htmlspecialchars($_POST['category']);
$date = htmlspecialchars($_POST['date']);
$description = htmlspecialchars($_POST['description'] ?? '');

echo "<h2>Dados da Transação Recebida:</h2>";
echo "Tipo: $type<br>";
echo "Movimentação: $movement<br>";
echo "Valor: $amount<br>";
echo "Categoria: $category<br>";
echo "Data: $date<br>";
echo "Descrição: $description<br>"; -->
