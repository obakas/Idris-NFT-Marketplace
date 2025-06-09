
ANVIL_KEY := 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

# THIS IS AN ANVIL GLOBALLY KNOWN PRIVATE KEY!!
deploy:
	forge script script/SetupAnvil.s.sol --rpc-url http://127.0.0.1:8545 --private-key ${ANVIL_KEY} --via-ir --broadcast -vvv

anvil: 
	anvil --dump-state marketplace-anvil.json

mint-usdc:
	forge script script/MintUSDC.s.sol --rpc-url http://127.0.0.1:8545 --private-key ${ANVIL_KEY} --via-ir --broadcast -vvv