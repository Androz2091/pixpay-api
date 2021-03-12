const pixpay = require('./');
const chalk = require('chalk');
const dotenv = require('dotenv')
dotenv.config();

(async () => {
    console.log('[...] Logging in');
    const { token, domain } = await pixpay.login(process.env.PHONE, process.env.CODE);
    const { child, parent } = await pixpay.fetchUser(domain, token);
    console.log(`[${chalk.green('✅')}] Logged in! Child: ${child.firstname} ${child.lastname}. Parent: ${parent.firstname} ${parent.lastname}.`);
    console.log('[...] Fetching balance');
    const { userBalance } = await pixpay.fetchBalance(domain, token);
    console.log(`[${chalk.green('✅')}] Balance fetched! (${userBalance}€)`);
})();
