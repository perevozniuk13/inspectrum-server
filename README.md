## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the react app in the development mode.\

### `npm run dev`

Runs express app in the development mode. \

### Environment variables

.env.sample has all environment variables examples that must be included in .env file

# [InSpectrum]

## Overview

InSpectrum is a web application designed to assist developers and designers in finding inspiration for colour palettes in their upcoming projects. It provides users with the capability to explore colour combinations on simulated websites, generate personalised collections, and save preferred mockups and palettes.

### Problem

Many colour combination applications only provide CSS code for colours and gradients, lacking the capability to visualise how your project would appear with these colours. Additionally, most of them do not offer the feature to create user collections.

### User Profile

The application is targeting developers and designers who are in search of colour inspiration for their upcoming projects. Users have the ability to explore random colour combinations or combinations based on their chosen colours. They can obtain the hex codes to use in CSS, view example mockups, and save them to a personalised collection.

### Features

```
As a user I want to be able to get random colour combinations or combinations based on my chosen colour/colours.
As a user I want to get hex, rgb values for suggested colours and be able to copy them.
As a user I want to look at the mockups with colour palettes and save them to my collection.
As a user I want to be able to navigate to my profile, search, edit or delete my collections.
```

### Tech Stack

- HTML, CSS, JavaScript, React.js, Node.js, Express.js, MySql, Knex.js,
- Libraries: color-thief.js, react-colour-picker, react-pagination

### Database tables

- Users
- Palettes
- Collections
- Favourites
- Pivot (many to many relationship between Collections and Palettes)
