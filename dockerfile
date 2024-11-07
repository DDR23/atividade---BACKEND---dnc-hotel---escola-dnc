# Usa uma imagem Node.js como base
FROM node:22.11.0

# Define o diretório de trabalho no contêiner
WORKDIR /atividade---backend---dnc-hotel---escola-dnc

# Copia os arquivos de configuração do projeto
COPY package*.json ./

# Instala as dependências
RUN npm install --legacy-peer-deps

# Copia o restante do código do projeto
COPY . .

# Expõe a porta do aplicativo (por exemplo, 3000)
EXPOSE 8080

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
