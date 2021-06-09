# trello-clone

This is a clone application for trello. This has built for leaning purpose. Below are the tech stacks which have been used to build it.

- Nextjs with typescript
- MongoDB for local development
- Mongo Atlas for production DB
- Chakra UI library

## Steps to run this on your local

First install the MongoDB Compass for better visualization of data with MongoDB server.

1. Clone this repo using `git clone https://github.com/knowankit/trello-clone.git`
2. Create _.env.local_ and add this env variable `LOCAL_MONGODB=mongodb://localhost:27017/trello`
3. Run `yarn install`
4. Run `yarn dev`

## If you are using docker to run this project

Install docker on your machine and start it

1. Create _.env.development_ file.
2. Add `LOCAL_MONGODB=mongodb://mongodb:27017/trello`
3. Run `docker-compose up`

## Some free resources used in this project

1. [Color Code](https://www.designpieces.com/palette/trello-color-palette-hex-and-rgb/)
2. [Illustration](https://undraw.co/illustrations)
3. [Icons](https://github.com/react-icons/react-icons)

## What is next?

1. Add card drag and drop - Ankit (Done)
2. Add column drag and drop - Ankit
3. Delete user - Nidhi (Will not be taken for now)
4. Add unsplash - Nidhi
5. Load only boards assigned to user - Ankit (Done)
6. Verify email on sign up - Ankit
7. Add card type (Nidhi)
8. Dark theme (Nidhi)
9. Board creation page redesign (Nidhi)
