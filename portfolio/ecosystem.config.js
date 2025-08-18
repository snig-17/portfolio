module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'npx',
      args: 'http-server . -p 3000 -c-1',
      cwd: '/home/user/webapp/portfolio',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};