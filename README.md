<h1 align="center">Zytron frontend</h1>

<p align="center">
    <span>Frontend application for </span>
    <a href="https://github.com/zypher-game/zytron-blockscout/blob/master/README.md">Zytron</a>
    <span>  explorer</span>
</p>

## Running and configuring the app

App is distributed as a docker image. Here you can find information about the [package](https://github.com/zypher-game/zytron-website-frontend/pkgs/container/frontend) and its recent [releases](https://github.com/zypher-game/zytron-website-frontend/releases).

You can configure your app by passing necessary environment variables when starting the container. See full list of ENVs and their description [here](./docs/ENVS.md).

```sh
docker run -p 3000:3000 --env-file <path-to-your-env-file> ghcr.io/zypher-game/zytron-website-frontend:latest
```

Alternatively, you can build your own docker image and run your app from that. Please follow this [guide](./docs/CUSTOM_BUILD.md).

For more information on migrating from the previous frontend, please see the [frontend migration docs](https://docs.blockscout.com/for-developers/frontend-migration).

## Resources

- [App ENVs list](./docs/ENVS.md)
- [Contribution guide](./docs/CONTRIBUTING.md)
- [Making a custom build](./docs/CUSTOM_BUILD.md)
- [Frontend migration guide](https://docs.blockscout.com/for-developers/frontend-migration)
- [Manual deployment guide with backend and microservices](https://docs.blockscout.com/for-developers/deployment/manual-deployment-guide)

## License

[![License: GPL v3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
