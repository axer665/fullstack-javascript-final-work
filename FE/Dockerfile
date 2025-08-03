FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY . .
RUN npm install
#RUN npm install izitoast-react --legacy-peer-deps
EXPOSE 5173
CMD ["npm", "run", "dev"]