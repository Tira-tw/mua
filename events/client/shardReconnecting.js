const chalk = require("chalk");

module.exports = (client, id) => {
    console.log(chalk.yellowBright(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} 重新連接`))
}
