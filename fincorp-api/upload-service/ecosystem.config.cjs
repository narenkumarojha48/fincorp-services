
//  export const  apps =[{
//     name: "image-processor",
//     script: "./src/index.js",        // Your entry point
//     instances: "max",            // IMPORTANT: Uses all CPU cores for resizing
//     exec_mode: "cluster",        // Enables load balancing across cores
//     max_memory_restart: "1G",    // Safety net: restarts if memory leaks
//     watch: false,                // Don't watch files in production
//     // node_args: "--experimental-specifier-resolution=node",
//     env: {
//       NODE_ENV: "development",
//       PORT: 5001
//     },
//     env_production: {
//       NODE_ENV: "production",
//       PORT: 80
//     }
//   }]

  // ecosystem.config.cjs
module.exports = {
  apps : [{
    name: "upload-service",
    script: "src/index.js", // Your ESM entry point
    instances: "max",
    exec_mode: "cluster", // Still works perfectly with ESM
    
    // Explicitly tell Node how to handle the script if needed
    // node_args: "--experimental-specifier-resolution=node",
    //  node_args: "--max-old-space-size=2048" // Gives Node 2GB of RAM
    
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production",
    }
  }]
}
