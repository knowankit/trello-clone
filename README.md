# trello-clone ![Build status](https://github.com/knowankit/trello-clone/actions/workflows/main.yml/badge.svg)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

![Trello clone](https://github.com/knowankit/trello-clone/blob/develop/demo.gif)
<p align="center">
  <a href="https://twitter.com/knowankit">
    <img alt="Twitter: Ankit Kumar" src="https://img.shields.io/twitter/follow/knowankit.svg?style=social" target="_blank" />
  </a>
</p>

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#steps-to-run-this-on-your-local)
  - [1. **Clone the application**](#1-clone-the-application)
  - [2. **Install necessary dependencies for the application**](#2-install-necessary-dependencies-for-the-application)
  - [3. **Create a .env file and copy the contents from .env.example**](#3-create-a-env-file-and-copy-the-contents-from-envexample)
  - [4. **Start the application**](#4-start-the-application)
- [What is next?](#Whats-next)
- [Tech Stack](#tech-stacks)
- [Support](#support)
- [Contributing](#contributing)
- [License](#license)

## Overview

This is a clone application for trello. This has been built for learning purpose. My plan is to improve this project and add more features in every release.

### [Demo](https://trello-clone-one.vercel.app/) 

## Features 🤩

- Login/Register with JWT token authentication
- Ability to create/update/delete the board
- Ability to add/update/move/delete the card
- Background image library for the board
- Add labels to the card
- Supports adding of detail description in the card
- Invite user to the board
- Assign a card to the user

## Requirements

1. [Node.js](https://nodejs.org/)
2. [npm](https://www.npmjs.com/)

## Steps to run this on your local

First install the MongoDB Compass for better visualization of data with MongoDB server.

1. Clone this repo using `git clone https://github.com/knowankit/trello-clone.git`
2. Create _.env.local_ and add this env variable `LOCAL_MONGODB=mongodb://localhost:27017/trello`
    Add `JWT_SECRET_KEY=randomstrings`
3. Run `yarn install`
4. Run `yarn dev`

`For unsplash gallery, api key is needed which can be generated from unsplash website`

### If you want to run the project using docker

Install docker on your machine and start it

1. Create _.env.development_ file.
2. Add `LOCAL_MONGODB=mongodb://mongodb:27017/trello`
3. Run `docker-compose up`

## What's next 🚀

- Comment on the card
- Add cypress testing

## Tech stacks

- Nextjs with typescript
- MongoDB for local development
- Mongo Atlas for production DB
- Chakra UI library

## Support

Reach out to the maintainer at one of the following places:

- [Portfolio](https://knowankit.com)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/knowankit)

## Contributing

All contributions are welcome!

### Contributors

<a href="https://github.com/knowankit/trello-clone/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=knowankit/trello-clone" />
</a>

Made with [contributors-img](https://contrib.rocks).
## Other interesting repositories

- [My Portfolio](https://github.com/knowankit/knowankit.com)
- [React bubble effect button](https://github.com/knowankit/react-bubbly-effect-button)
- [Particle text effect](https://github.com/knowankit/particle-text-effect)

## License

This project is licensed under the **MIT license**. Feel free to edit and distribute this template as you like.

See [LICENSE](LICENSE) for more information.
