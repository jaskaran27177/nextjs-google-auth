# 1. Use an official Node.js image (latest stable LTS)
FROM node:20-alpine

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy only package files first (for better caching)
COPY package.json package-lock.json ./

# 4. Install only production dependencies
RUN npm install

# 5. Copy rest of the application code
COPY . .

# 6. Build the Next.js application
RUN npm run build

# 7. Set environment to production
ENV NODE_ENV=production

# 8. Expose the port that Next.js will use
EXPOSE 3000

# 9. Start the Next.js production server
CMD ["npm", "start"]
