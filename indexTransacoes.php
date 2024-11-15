<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transações</title>
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
                    <h1 class="merriweather-black">TRANSAÇÕES</h1>
                    <p class="poppins-regular">Bem vindo(a), <span id="welcome-user-name">Fulano</span>!</p>
                </header>

                <!-- Seção de Cards de Saldo e Links -->
                <section class="balance-cards">
                    <?php
                    include 'conexao.php';
                    try {
                        // Consulta para calcular o total de receitas
                        $sqlReceitas = "SELECT SUM(valor) AS total_receitas FROM receitas";
                        $stmtReceitas = $pdo->prepare($sqlReceitas);
                        $stmtReceitas->execute();
                        $totalReceitas = $stmtReceitas->fetch(PDO::FETCH_ASSOC)['total_receitas'] ?? 0;

                        // Consulta para calcular o total de gastos
                        $sqlGastos = "SELECT SUM(valor) AS total_gastos FROM gastos";
                        $stmtGastos = $pdo->prepare($sqlGastos);
                        $stmtGastos->execute();
                        $totalGastos = $stmtGastos->fetch(PDO::FETCH_ASSOC)['total_gastos'] ?? 0;

                        // Calcula o saldo atual
                        $saldoAtual = $totalReceitas - $totalGastos;
                    } catch (PDOException $e) {
                        echo "<p>Erro ao calcular saldo: " . $e->getMessage() . "</p>";
                        $saldoAtual = 0;
                    }
                    ?>

                    <div class="balance-card">
                        <a href="indexTransacoes.php">
                            <p>Saldo Atual</p>
                            <!-- EXPLICACAO DESSE NGC AI EMBAIXO
                            $saldoAtual. (2) casas decimais. (',') separador, ('.') separador de milhar -->
                            <h2>R$ <?php echo number_format($saldoAtual, 2, ',', '.'); ?></h2>
                        </a>
                    </div>
                    <a href="indexReceitas.php" class="circle-card">
                        <i class="fa-solid fa-arrow-up"></i>
                    </a>
                    <a href="indexGastos.php" class="circle-card">
                        <i class="fa-solid fa-arrow-down"></i>
                    </a>
                </section>
            </div>


            <!-- Seção de Transações -->
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

                <!-- Tabela de Transações -->
                <div class="transaction-table">
                    <table>
                        <thead class="title">
                            <tr>
                                <th>TIPO</th>
                                <th>VALOR</th>
                                <th>DATA</th>
                                <th>DESCRIÇÃO</th>
                            </tr>
                        </thead>
                        <tbody class="content">
                            <?php
                            include 'conexao.php';
                            try {
                                // Consulta os dados da tabela transacoes
                                $sql = "SELECT * FROM transacoes ORDER BY data DESC";
                                $stmt = $pdo->prepare($sql);
                                $stmt->execute();
                                $transacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

                                // Exibe cada transação
                                foreach ($transacoes as $transacao) {
                                    echo "<tr>";
                                    echo "<td>" . htmlspecialchars($transacao['tipo']) . "</td>";
                                    echo "<td>R$ " . number_format($transacao['valor'], 2, ',', '.') . "</td>";
                                    echo "<td>" . date("d/m/Y", strtotime($transacao['data'])) . "</td>";
                                    echo "<td>" . htmlspecialchars($transacao['descricao']) . "</td>";
                                    echo "</tr>";
                                }
                            } catch (PDOException $e) {
                                echo "<tr><td colspan='4'>Erro ao buscar transações: " . $e->getMessage() . "</td></tr>";
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
    <script src="scriptAddTransacao.js"></script>

</body>

</html>
