## Glacier app snake game

- aws lambda env

```
GLACIER_APP_PRIVATEKEY=<your-eth-private-key>
GLACIER_APP_NS=<your-namespace>
GLACIER_GATEWAY=<glacier-gateway>
```

- aws lambda deploy
```
npm i
zip -r snake.zip ./*
```

Upload snake.zip to aws lambda service, event handle by 'lambda.handler'

