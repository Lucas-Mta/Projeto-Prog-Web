<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="styleGeral.css">
    <link rel="stylesheet" href="styleDashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
</head>

<body>
<div class="container">

<!-- Contêiner para o menu dinâmico -->
<div id="main-menu"></div>

<!-- Dashboard principal -->
<main class="dashboard">
    <header>
        <h1 class="merriweather-black">DASHBOARD</h1>
        <p class="poppins-regular">Bem vindo(a), <span id="welcome-user-name">Fulano</span>!</p>
    </header>

    <?php
    include 'conexao.php';

        try {
            // Calcula o total de receitas
            $sqlReceitas = "SELECT SUM(valor) AS total_receitas FROM receitas";
            $stmtReceitas = $pdo->prepare($sqlReceitas);
            $stmtReceitas->execute();
            $totalReceitas = $stmtReceitas->fetch(PDO::FETCH_ASSOC)['total_receitas'] ?? 0;

            // Calcula o total de gastos
            $sqlGastos = "SELECT SUM(valor) AS total_gastos FROM gastos";
            $stmtGastos = $pdo->prepare($sqlGastos);
            $stmtGastos->execute();
            $totalGastos = $stmtGastos->fetch(PDO::FETCH_ASSOC)['total_gastos'] ?? 0;

            // Calcula o saldo atual
            $saldoAtual = $totalReceitas - $totalGastos;
        } catch (PDOException $e) {
            echo "<p>Erro ao calcular os valores: " . $e->getMessage() . "</p>";
            $totalReceitas = 0;
            $totalGastos = 0;
            $saldoAtual = 0;
        }
    ?>

    <section class="cards">
        <!-- Cartões de resumo -->
        <div class="resume-cards">
            <div class="summary-card saldo">
                <p class="poppins-regular">Saldo Atual:</p>
                <h2>R$ <?php echo number_format($saldoAtual, 2, ',', '.'); ?></h2>
            </div>
            <div class="summary-card gastos">
                <p class="poppins-regular">Gastos:</p>
                <h2>R$ <?php echo number_format($totalGastos, 2, ',', '.'); ?></h2>
            </div>
            <div class="summary-card receitas">
                <p class="poppins-regular">Receitas:</p>
                <h2>R$ <?php echo number_format($totalReceitas, 2, ',', '.'); ?></h2>
            </div>
        </div>

        <!-- Cartões de categorias -->
        <div class="category-cards">
            <div class="category-card gastos-categorias">
                <h3 class="poppins-regular">Categorias de Gastos:</h3>
                <ul>
                    <?php
                    // Consulta de categorias de gastos e seus valores
                    $sqlGastosCategoria = "SELECT categoria, SUM(valor) AS total FROM gastos GROUP BY categoria";
                    $stmtGastosCategoria = $pdo->prepare($sqlGastosCategoria);
                    $stmtGastosCategoria->execute();
                    $categoriasGastos = $stmtGastosCategoria->fetchAll(PDO::FETCH_ASSOC);

                    foreach ($categoriasGastos as $gasto) {
                        echo "<li>";
                        echo "<span class='category-name'>" . htmlspecialchars($gasto['categoria']) . "</span>";
                        echo "<span class='category-value'>R$ " . number_format($gasto['total'], 2, ',', '.') . "</span>";
                        echo "</li>";
                    }
                    ?>
                </ul>
            </div>
            <div class="category-card receitas-categorias">
                <h3 class="poppins-regular">Categorias de Receitas:</h3>
                <ul>
                    <?php
                    // Consulta de categorias de receitas e seus valores
                    $sqlReceitasCategoria = "SELECT categoria, SUM(valor) AS total FROM receitas GROUP BY categoria";
                    $stmtReceitasCategoria = $pdo->prepare($sqlReceitasCategoria);
                    $stmtReceitasCategoria->execute();
                    $categoriasReceitas = $stmtReceitasCategoria->fetchAll(PDO::FETCH_ASSOC);

                    foreach ($categoriasReceitas as $receita) {
                        echo "<li>";
                        echo "<span class='category-name'>" . htmlspecialchars($receita['categoria']) . "</span>";
                        echo "<span class='category-value'>R$ " . number_format($receita['total'], 2, ',', '.') . "</span>";
                        echo "</li>";
                    }
                    ?>
                </ul>
            </div>
        </div>
    </section>

            <!-- Footer -->
            <footer class="footer">
                <p>&copy; 2024 Programação para a Web. Todos os direitos reservados.</p>
            </footer>

        </main>

    </div>

    <!-- Script -->
    <script src="scriptGeral.js"></script>
    <script src="scriptPerfil.js"></script>
    <script src="scriptAddTransacao.js"></script>


</body>

</html>
