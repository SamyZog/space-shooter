[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/organization/repository)

# Index

-   [Demo](#demo)
-   [Instructions](#instructions)
-   [Hosting](#host)
-   [Development phase](#dev-phase)
-   [Tech Stack / Dependencies](#deps)
-   [Run locally](#run)
-   [Authors](#authors)

<h2>Space Shooter&nbsp;&nbsp;<img src="src/assets/fighter/red.png" height="25"/></h2> 

A [space-invaders](https://en.wikipedia.org/wiki/Space_Invaders) like game.

<h2 id="demo">Demo</h2>

[Space Shooter](https://samyzog.github.io/space-shooter/)

<h2 id="features">Features</h2>

-   Adjustable difficulty level, with each difficulty providing its own class of enemies that each have different
    attributes
-   Choose between different fighter classes, with each class having its own attributes
-   Choose different space background
-   Background image is animated to simulate flying through space
-   Score and lives count are updated live on the hud
-   The laser of the user controlled fighter jams when it is used too much, and needs some time to cooldown, this is
    visually represented on the HUD by a cooldown meter (the cooldown period depends on fighter class)

<h2 id="demo">Instructions</h2>

-   move Up: <kbd>🠅</kbd>
-   move Down: <kbd>🠇</kbd>
-   move Left: <kbd>🠄</kbd>
-   move Right: <kbd>🠆</kbd>
-   shoot: <kbd>&nbsp;&nbsp;Space&nbsp;&nbsp;</kbd>

<h2 id="host">Hosting</h2>

This web app is hosted on [Github Pages](https://pages.github.com/)

<h2 id="dev-phase">Development phase</h2>

This project was a lot of fun to create. Being a gamer myself I loved every second of developing it.

Building this small game has cemented a lot of the theoretical and practical knowledge I have in JavaScript, DOM
manipulation, OOP, array methods and different web API's:

-   [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
-   [Web Animations](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

<h2 id="deps">Tech Stack / Dependencies</h2>

-   [HTML](#)
-   [Sass](https://sass-lang.com/)
-   [JavaScript](#)

<h2 id="run">Run Locally</h2>

Clone the project

```bash
  git clone https://github.com/SamyZog/space-shooter
```

Go to the project directory

```bash
  cd space-shooter
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

<h2 id="authors">Authors</h2>

-   [@SamyZog](https://www.github.com/SamyZog)
