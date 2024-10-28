# Documentation Platform Frontend

## Getting Started

1. Clone the repository

```bash
git clone git@github.com:documentation-platform/documentation-platform-frontend.git
```

2. Create a `.env.development` file in the root directory of the project. You can copy the contents of the `.env.development.example` file and replace the values with your own.

3. Run the docker container with the following command

```bash
docker compose up
```

4. Open the browser and navigate to `http://localhost:3000`

5. (Optional) If you are running the application inside WSL and want to access the application from another device on the same network, you
    need to run the following command to get the IP address of the WSL container. (This command will expose the WSL container to the network)

```bash
sudo apt install npm # If you don't have npm installed
npx expose-wsl@latest
```

This will output the IP address of the WSL container. You can now access the application from another device on the same network by navigating to `http://<WSL_IP>:3000`
