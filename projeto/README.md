# Descrição do sistema
Deseja-se desenvolver um sistema de moeda estudantil no qual um professor pode distribuir moedas como forma de reconhecimento do esforço do aluno em sala de aula e um aluno pode trocar as moedas recebidas por alguma vantagem como desconto na mensalidade, compra de materiais específicos, etc.

- Os alunos que desejam ingressar no sistema de mérito devem realizar um cadastro, indicando nome, email, CPF, RG, Endereço, Instituição de Ensino e curso. As instituições participantes já estão pré-cadastradas no sistema, para que o aluno selecione.

- Os professores já estarão pré-cadastrados no sistema (a instituição envia a lista no momento da parceria). Cada professor terá armazenado o seu nome, CPF e departamento que está vinculado. É necessário deixar explícito que ele faz parte de uma instituição.

- A cada semestre, os professores recebe um total de mil moedas, que podem ser distribuídas aos seus alunos como forma de reconhecimento por bom comportamento, participação em aula, etcs. Esse total é acumulável no semestre (isto é, se o professor não distribuir todas as moedas num semestre, o total de 1.000 novas moedas será adicionado ao seu saldo corrente).

- Para enviar moedas, o professor deve possuir saldo suficiente, indicando qual aluno deverá receber o montante, bem como o motivo pelo qual ele está sendo reconhecido (uma mensagem aberta, obrigatória).

- Ao receber uma moeda, o aluno deve ser notificado por email. 

- Professores e alunos devem ser capazes de consultar o extrato de sua conta, visualizando o total de moedas que ainda possui, bem como as transações que realizou (para o professor, o envio de moedas; para o aluno, recebimento ou troca de moedas).

- Para trocar moedas, o aluno deve selecionar uma das vantagens cadastradas no sistema. Elas incluem, por exemplo: desconto em restaurantes da universidade, desconto de mensalidade, ou compra de materiais específicos.

- Empresas que sejam realizar parceria também devem se cadastrar no sistema, incluindo as vantagens que deseja oferecer e o custo de cada uma dela (em moedas).

- Para cadastrar uma vantagem, a empresa parceira deve adicionar também uma descrição e foto do produto.

- Ao resgatar uma vantagem, o aluno deve ter o valor descontado do seu saldo. Um email de cupom deve ser enviado para que ele utilize na troca presencial. Um email também deve ser enviado ao parceiro, para que ele possa conferir a troca. Ambos os emails devem incluir um código gerado pelo sistema, a fim de facilitar o processo de conferência.

- Por fim, alunos, professores e empresas parceiras precisam ter um login e uma senha cadastrados para acessar o sistema. Em todos os casos, um processo de autenticação é necessário para realização dos requisitos.

# Histórias de Usuário

- Eu, como **aluno**, desejo realizar o cadastro para participar do sistema de mérito.
- Eu, como **aluno**, desejo escolher qual a instituição da qual faço parte para receber as moedas estudantis.
- Eu, como **aluno**, desejo selecionar uma vantagem para poder trocar minhas moedas.
- Eu, como **aluno**, desejo verificar o extrato da conta para saber quantas moedas foram recebidas e trocadas.
- Eu, como **professor**, gostaria de enviar moedas para um aluno para reconhecer seu esforço.
- Eu, como **professor**, gostaria de visualizar meu extrato para saber quantas moedas foram enviadas.
- Eu, como **membro externo interessado**, quero realizar o cadastro para fazer uma parceria com o sistema.
- Eu, como **membro externo interessado**, quero cadastrar uma vantagem no sistema.

# Diagramas

### Diagrama de Casos de Uso
[Diagrama de Casos de Uso](/projeto/diagramas/diagrama_de_casos_de_uso/diagrama_de_casos_de_uso.png)

### Diagrama de Classes
[Diagrama de Classes](/projeto/diagramas/diagrama_de_classes/diagrama_de_classes.jpg)

### Diagrama de Entidade Relacionamento (DER)
[DER](/projeto/diagramas/diagrama_entidade_relacionamento/diagrama_entidade_relacionamento.jpg)

### Diagrama de Sequência
#### Cadastrar vantagem
[Diagrama de Sequência - Cadastrar vantagem](/projeto/diagramas/diagrama_sequencia/sequencia_cadastrar_vantagem.png)

#### Enviar moedas
[Diagrama de Sequência - Enviar moedas](/projeto/diagramas/diagrama_sequencia/sequencia_enviar_moedas.png)

#### Resgatar vantagem
[Diagrama de Sequência - Resgatar vantagem](/projeto/diagramas/diagrama_sequencia/sequencia_resgatar_vantagem.png)
