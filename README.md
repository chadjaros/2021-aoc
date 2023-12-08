## Setup

Set up env vars using `direnv`, or similar
- AOC_SESSION - The Session cookie from your browser once you've logged into the AOC website
- AOC_USERAGENT - A string indicating who you are

## Years

- 2016: Typescript
- 2017: Scala
- 2021: Typescript
- 2022: Typescript
- 2023: Typescript

## Utils

### Typescript
```bash
# Downwload input and run file
> npm start --file=2015/1/a

# Init directory and download input
> npm run init --file=2015/1
```

### Scala
```bash
# Download input and run file
> sbt "runMain 2016.1.a"

# Init directory and download input
> sbt "runMain scala_init.Init 2016/2"
```