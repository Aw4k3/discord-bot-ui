# tsc --build
# Copy-Item .\src\.env .\build\.env
npm i --package-lock-only
docker build -t fakeawakepc.local:5000/discord-bot-ui:0.1.0 . --no-cache
docker push fakeawakepc.local:5000/discord-bot-ui:0.1.0