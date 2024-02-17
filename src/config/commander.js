import { Command } from "commander";

const program = new Command()

program
  .option('--mode <mode>', 'Environment mode', 'production')
  .parse()

  export default program;