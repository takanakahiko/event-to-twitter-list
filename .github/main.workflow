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
}
