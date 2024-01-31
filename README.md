# App 

GymPass style app.

## RFs (Requisitos funcionais)

-> [x] Deve ser possível se cadastrar

-> [x] Deve ser possível se autenticar

-> [x] Deve ser possível obter o perfil de um usuário logado

-> [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado

-> [x] Deve ser possível o usuário obter seu histórico de check-ins

-> [x] Deve ser possível o usuário buscar academias próximas (até 10km)

-> [x] Deve ser possível o usuário buscar academias pelo nome

-> [x] Deve ser possível o usuário realizar check-in em uma academia

-> [x] Deve ser possível validar o check-in de um usuário 

-> [x] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

-> [x] O usuario não deve poder se cadastrar com um e-mail duplicado

-> [x] O usuario nao pode fazer 2 check-in no mesmo dia

-> [x] O usuario não pode fazer check-in se não estiver perto (100m ) da academia

-> [x] O check-in só pode ser validado até 20min após criado"

-> [X] O check-in só pode ser validado por administradores

-> [X] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

-> [x] A senha do usuario precisa estar criptografada

-> [x] Os dados de aplicação precisam estar persistindo em um banco PostgreSQL

-> [x] Todos listas de dados precisam estar paginadas com 20 itens por paginas

-> [X] O usuario deve ser identificado por um JWT (JSON Web Token) 