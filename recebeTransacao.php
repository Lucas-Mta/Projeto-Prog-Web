<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $movimentacoes = $_POST['movement'] ?? '';
    $valor = $_POST['amount'] ?? 0;
    $categoria = $_POST['category'] ?? '';
    $data = $_POST['date'] ?? date('Y-m-d');
    $descricao = $_POST['description'] ?? '';
    $tipo = $_POST['type'] ?? 'expense';

    // pegando se e gasto ou receita 
    $tipo = ($tipo === 'expense') ? 'Gasto' : 'Receita';

    // verificacao de data, pq tava dando erro no comeco
    if (!preg_match('/\d{4}-\d{2}-\d{2}/', $data)) {
        $data = date('Y-m-d'); 
    }

    try {
        $id_gasto = null;
        $id_receita = null;

        //add na tabela de gasto ou receita
        if ($tipo === 'Gasto') {
            $sqlGasto = "INSERT INTO gastos (movimentacoes, valor, categoria, data, descricao) VALUES (?, ?, ?, ?, ?)";
            $stmtGasto = $pdo->prepare($sqlGasto);
            $stmtGasto->execute([$movimentacoes, $valor, $categoria, $data, $descricao]);
            $id_gasto = $pdo->lastInsertId(); 
        } else {
            $sqlReceita = "INSERT INTO receitas (movimentacoes, valor, categoria, data, descricao) VALUES (?, ?, ?, ?, ?)";
            $stmtReceita = $pdo->prepare($sqlReceita);
            $stmtReceita->execute([$movimentacoes, $valor, $categoria, $data, $descricao]);
            $id_receita = $pdo->lastInsertId(); // Captura o ID da receita inserida
        }

        // add na tabela de transacao
        $sqlTransacao = "INSERT INTO transacoes (tipo, valor, data, descricao, id_gasto, id_receita) VALUES (?, ?, ?, ?, ?, ?)";
        $stmtTransacao = $pdo->prepare($sqlTransacao);
        $stmtTransacao->execute([$tipo, $valor, $data, $descricao, $id_gasto, $id_receita]);

        echo "sucesso";
    } catch (PDOException $e) {
        echo "Erro ao inserir: " . $e->getMessage();
    }
}
