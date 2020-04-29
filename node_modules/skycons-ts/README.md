[![CircleCI](https://circleci.com/gh/andipaetzold/skycons/tree/master.svg?style=svg)](https://circleci.com/gh/andipaetzold/skycons/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/f6399fba6533a100291b/maintainability)](https://codeclimate.com/github/andipaetzold/skycons/maintainability)

# Skycons for TypeScript

This project is a fork of [Skycons by DarkSky](https://github.com/darkskyapp/skycons). Besides providing type definitions, it has more readable source code and is easier to use within a TypeScript application.

All images and animations are unchanged and were designed by DarkSky.

## Install
```bash
npm install skycons-ts --save
```

## Usage

```html
<canvas id="icon1" width="128" height="128"></canvas>
<canvas id="icon2" width="128" height="128"></canvas>
```

```ts
import { Skycons } from 'skycons-ts';

const skycons = new Skycons({'color': 'blue'});
// on Android, a nasty hack is needed: {'resizeClear': true}

// you can add a canvas by it's ID...
skycons.add('icon1', 'rain');

// ...or by the canvas DOM element itself.
skycons.add(document.getElementById('icon2'), 'rain');

// start animation!
skycons.play();

// you can also halt animation with skycons.pause()

// want to change the icon? no problem:
skycons.set('icon1', 'partly-cloudy-night');

// remove icon
skycons.remove('icon2');
```
