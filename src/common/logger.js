import morgan from 'morgan';
import chalk from 'chalk';

const logger = morgan(function (tokens, req, res) {
  const status = tokens.status(req, res);
  let statusColor = chalk.white;
  if (status >= 500) statusColor = chalk.red;
  else if (status >= 400) statusColor = chalk.yellow;
  else if (status >= 300) statusColor = chalk.cyan;
  else if (status >= 200) statusColor = chalk.green;

  return [
    chalk.blue(tokens.method(req, res)),
    chalk.magenta(tokens.url(req, res)),
    statusColor(status),
    chalk.yellow(tokens['response-time'](req, res) + ' ms'),
    chalk.gray('-'),
    chalk.white(tokens.res(req, res, 'content-length') || '0'),
  ].join(' ');
});

export default logger;
