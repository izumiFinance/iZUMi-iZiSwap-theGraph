# iZi Swap Graph

## Start

install and build.

```sh
$ yarn install
$ yarn run build
```

config deploy key.

```sh
# change XXX_AccessToken then
$ yarn run auth 
$ yarn run codegen 
$ yarn run deploy
```

部署完后当前版本不会失效，会有一个 pending version

## Query

open [iziswapsubgraph](https://thegraph.com/hosted-service/subgraph/izumifinance/iziswapsubgraph).

## Using

### Add local chain

1. modify `network.json` file, add contract address and startBlock of new chain
2. modify `config.ts` file, append `StableCoinConfig` and `TrustableTokenConfig` config. **Address must be lowercase**.
3. modify `package.json`, add create, remove, deploy shortcut command
4. keep chian name same at `network.json` `config.ts` `package.json`

### Deploy local graph-node

After complied [graph-node](https://github.com/graphprotocol/graph-node), you should add or link release binary file to `PATH`.

```sh
# start local graph-node
$ cd iZUMi-iZiSwap-theGraph
$ pm2 start config/graph-node.pm2.json

# deploy XXX chain to local graph-node
$ yarn create-local-XXX
$ yarn deploy-local-XXX
```

## Bug

- optional chain not support
- static init block not support
- entity collection 字段的赋值和访问不能直接对原字段进行操作，需要先赋值一个局部变量再操作

## Ref Doc

- [assemblyscript](https://www.assemblyscript.org/types.html)
- [assemblyscript-api](https://docs.thegraph.academy/official-docs/developer/assemblyscript-api)
