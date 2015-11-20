# Music Server

A means of serving music files over a local network, and a web app to control playback.

## Build

Development:

```
npm run build-dev
```

Production:

```
npm run build
```

## Serve

Development:

```
npm run serve-dev
```

Production:

```
npm run serve
```

## Test

To run tests:

```
npm test
```

## Load Music

To load music from an iTunes library, for development:

```
npm run import-itunes-dev <absolute_path_to_itunes_library.xml> <absolute_path_to_itunes_media_folder>
```

For production:

```
npm run import-itunes <absolute_path_to_itunes_library.xml> <absolute_path_to_itunes_media_folder>
```