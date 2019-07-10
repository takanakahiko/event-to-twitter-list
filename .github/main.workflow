workflow "Install, Lint, Build" {
  on = "push"
  resolves = ["Lint", "Build"]
}

action "Install" {
  uses = "docker://node:latest"
  runs = "npm ci"
}

action "Lint" {
  needs = "Install"
  uses = "docker://node:latest"
  runs = "npm run lint"
}

action "Build" {
  needs = "Install"
  uses = "docker://node:latest"
  runs = "npm run build"
  env = {
    TWITTER_CONSUMER_KEY    = "TEMP"
    TWITTER_CONSUMER_SECRET = "TEMP"
    APP_URL                 = "https://event-to-twitter-list.herokuapp.com/"
  }
}
