# App 

GymPass style app.

## RFs (Requisitos funcionais)

-> [ ] Deve ser possível se cadastrar

-> [ ] Deve ser possível se autenticar

-> [ ] Deve ser possível obter o perfil de um usuário logado

-> [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado

-> [ ] Deve ser possível o usuário obter seu histórico de check-ins

-> [ ] Deve ser possível o usuário buscar academias próximas

-> [ ] Deve ser possível o usuário buscar academias pelo nome

-> [ ] Deve ser possível o usuário realizar check-in em uma academia

-> [ ] Deve ser possível validar o check-in de um usuário 

-> [ ] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

-> [ ] O usuario não deve poder se cadastrar com um e-mail duplicado

-> [ ] O usuario nao pode fazer 2 check-in no mesmo dia

-> [ ] O usuario não pode fazer check-in se não estiver perto (100m ) da academia

-> [ ] O check-in só pode ser validado até 20min após criado

-> [ ] O check-in só pode ser validado por administradores

-> [ ] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

-> [ ] A senha do usuario precisa estar criptografada

-> [ ] Os dados de aplicação precisam estar persistindo em um banco PostgreSQL

-> [ ] Todos listas de dados precisam estar paginadas com 20 itens por paginas

-> [ ] O usuario deve ser identificado por um JWT (JSON Web Token) 