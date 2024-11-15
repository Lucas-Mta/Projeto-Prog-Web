<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gastos</title>
    <link rel="stylesheet" href="styleGeral.css">
    <link rel="stylesheet" href="styleTransacoes.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
</head>

<body>
    <div class="container">

        <!-- Contêiner para o menu dinâmico -->
        <div id="main-menu"></div>

        <main class="dashboard">
            <!-- Contêiner flexível para header e cards -->
            <div class="header-container">
                <header>
                    <h1 class="merriweather-black">GASTOS</h1>
                    <p class="poppins-regular">Bem vindo(a), <span id="welcome-user-name">Fulano</span>!</p>
                </header>

                <!-- Seção de Cards de Saldo e Links -->
                <section class="balance-cards">
                    <?php
                    include 'conexao.php';
                    try {
                        // SQL do total de gastos
                        $sqlTotalGastos = "SELECT SUM(valor) AS total_gastos FROM gastos";
                        $stmtTotalGastos = $pdo->prepare($sqlTotalGastos);
                        $stmtTotalGastos->execute();
                        $totalGastos = $stmtTotalGastos->fetch(PDO::FETCH_ASSOC)['total_gastos'] ?? 0;
                    } catch (PDOException $e) {
                        echo "<p>Erro ao calcular total de gastos: " . $e->getMessage() . "</p>";
                        $totalGastos = 0;
                    }
                    ?>

                    <div class="balance-card">
                        <a href="indexTransacoes.php">
                            <p>Total Gastos</p>
                            <h2>R$ <?php echo number_format($totalGastos, 2, ',', '.'); ?></h2>
                        </a>
                    </div>
                    <a href="indexReceitas.php" class="circle-card">
                        <i class="fa-solid fa-arrow-down"></i>
                    </a>
                </section>
            </div>

            <!-- Seção de Gastos -->
            <div class="transaction-sec">
                <div class="transaction-header">
                    <select name="month" id="month" class="month-select poppins-regular">
                        <option value="january">JANEIRO</option>
                        <option value="february">FEVEREIRO</option>
                        <option value="march">MARÇO</option>
                        <option value="april">ABRIL</option>
                        <option value="may">MAIO</option>
                        <option value="june">JUNHO</option>
                        <option value="july">JULHO</option>
                        <option value="august">AGOSTO</option>
                        <option value="september">SETEMBRO</option>
                        <option value="october">OUTUBRO</option>
                        <option value="november">NOVEMBRO</option>
                        <option value="december">DEZEMBRO</option>
                    </select>

                    <div class="search-and-filter">
                        <div class="search-container">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="search" placeholder="Buscar..." class="poppins-regular search-input">
                        </div>
                        <div class="vertical-divider"></div>
                        <button type="button" class="search-filter-btn">
                            <i class="fa-solid fa-filter"></i>
                        </button>
                    </div>
                </div>

                <!-- Tabela de Gastos -->
                <div class="transaction-table">
                    <table>
                        <thead>
                            <tr class="title">
                                <th>MOVIMENTAÇÕES</th>
                                <th>VALOR GASTO</th>
                                <th>CATEGORIA</th>
                                <th>DATA</th>
                                <th>DESCRIÇÃO</th>
                            </tr>
                        </thead>
                        <tbody class="content">
                            <?php
                            try {
                                // SQL tabela de gastos
                                $sql = "SELECT * FROM gastos ORDER BY data DESC";
                                $stmt = $pdo->prepare($sql);
                                $stmt->execute();
                                $gastos = $stmt->fetchAll(PDO::FETCH_ASSOC);

                                // Exibe os gastos
                                foreach ($gastos as $gasto) {
                                    echo "<tr>";
                                    echo "<td>" . htmlspecialchars($gasto['movimentacoes']) . "</td>";
                                    echo "<td>R$ " . number_format($gasto['valor'], 2, ',', '.') . "</td>";
                                    echo "<td>" . htmlspecialchars($gasto['categoria']) . "</td>";
                                    echo "<td>" . date("d/m/Y", strtotime($gasto['data'])) . "</td>";
                                    echo "<td>" . htmlspecialchars($gasto['descricao']) . "</td>";
                                    echo "</tr>";
                                }
                            } catch (PDOException $e) {
                                echo "<tr><td colspan='5'>Erro ao buscar gastos: " . $e->getMessage() . "</td></tr>";
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
                
            </div>

            <!-- Footer -->
            <footer class="footer">
                <p>&copy; 2024 Programação para a Web. Todos os direitos reservados.</p>
            </footer>

        </main>
        
    </div>

    <!-- Script -->
    <script src="scriptGeral.js"></script>

</body>

</html>
