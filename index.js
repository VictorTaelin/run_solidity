#!/usr/bin/env node

(async () => {

var fs = require("fs");
var exec = require("child_process").execSync;
var ethers = require("ethers");

var file = process.argv[2] || "main.sol";

function exit() {
  fs.rmSync(".run_solidity", { recursive: true, force: true });
  process.exit();
}

try {
  exec("solc --bin --abi --overwrite "+file+" -o .run_solidity");
} catch (e) {
  exit();
}

var found_name = {};
for (var file of fs.readdirSync(".run_solidity")) {
  found_name[file.slice(0,-4)] = 1;
}

var names = Object.keys(found_name);

for (var name of names) {
  console.log(name + ".main():");

  var bytecode = fs.readFileSync("./.run_solidity/"+name+".bin").toString()
  var abi = JSON.parse(fs.readFileSync("./.run_solidity/"+name+".abi").toString())

  var provider = new ethers.providers.JsonRpcProvider();
  var signer = provider.getSigner(0);
  var factory = new ethers.ContractFactory(abi, bytecode, signer);
  var contract = null;
  var contract = await factory.deploy([]);
  var done = await (await contract.main()).wait();

  for (var ev of done.events) {
    console.log("-", ev.event + "(" + ev.args.map(x => x.toString()).join(",") + ")");
  }

  console.log("Gas: " + done.gasUsed.toString());

}

exit();

})();
