module.exports = {
  apps: [
    {
      name: "Sober",
      exec_mode: "cluster",
      instances: "1", // Or a number of instances
      script: "cross-env NODE_ENV=production node server/app.js",
      args: "start",
    },
  ],
};
