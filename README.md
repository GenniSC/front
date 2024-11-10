# FindBus

## Descrição
O FindBus é um software e aplicativo projetado para auxiliar os
usuários a encontrar a rota de ônibus mais adequada para seus
destinos desejados. No FindBus, os usuários terão acesso não apenas
às informações de cada rota disponível, mas também a avaliações
detalhadas, comentários e até mesmo informações sobre os
motoristas que operam em cada itinerário. Este projeto inclui um front-end e um back-end que interagem através de uma API.

## Tecnologias Utilizadas
- Front-end: [React TypeScript]
- Back-end: [ Python, Flask, Werkzeug, Jinja2, itsdangerous, click, MarkupSafe, colorama, uvicorn, h11 , blinker]
- Banco de dados: [SQLite DB Browser]

## Repositórios
- Front-end: [BrnFbrian/front](https://github.com/BrnFbrian/front)
- Back-end: [BrnFbrian/back](https://github.com/BrnFbrian/back)

## Configuração e Instalação

# Back-end
# Clonar o repositório do back-end
git clone https://github.com/BrnFbrian/back
cd back

# Instalar as dependências necessárias
pip install -r requirements.txt

# Configurar variáveis de ambiente (opcional)
export FLASK_APP=run.py
export FLASK_ENV=development
export FLASK_DEBUG=1

# Iniciar o servidor Flask
flask run

# Front-end
# Clonar o repositório do front-end
git clone https://github.com/BrnFbrian/front
cd front

# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento do React
npm start

## Banco de Dados

O FindBus utiliza o SQLite como sistema de gestão de banco de dados. O SQLite é uma solução de banco de dados embutida que não requer um servidor de banco de dados separado, tornando-o ideal para aplicações que necessitam de uma configuração simples e eficiente.

### Configuração do Banco de Dados

Não é necessária nenhuma configuração inicial para o SQLite, pois ele cria o arquivo de banco de dados automaticamente se ele não existir quando a aplicação é iniciada. As tabelas e esquemas necessários são definidos no código do Flask e são criados automaticamente pelo SQLAlchemy com base nas definições dos modelos do projeto.

### Inicialização do Banco de Dados

Quando você inicia a aplicação Flask pela primeira vez, as tabelas do banco de dados são automaticamente criadas se não estiverem presentes. Isso é gerenciado pelo seguinte comando em seu código Flask:

```python
with app.app_context():
    db.create_all()


