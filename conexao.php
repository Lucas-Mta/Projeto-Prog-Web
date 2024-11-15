<?php
function conectar() {
    $host = "localhost";
    $usuario = "root";
    $senha = "";
    $banco = "dashboard-financeiro";

    try {
        $conn = new PDO("mysql:host=$host;dbname=$banco", $usuario, $senha);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (Exception $e) {
        die("Erro de conexão: " . $e->getMessage());
    }
}
?>
