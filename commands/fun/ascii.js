var figlet = require('figlet');

module.exports = {
    name: 'ascii',
    category: 'fun',
    description: 'ascii xd',
    usage: 'ascii',
    run: (client, message, args, tools) => {
  
  var maxLen = 100 // Kendiniz en yüksek harf sayisini ayarlayabilirsiniz
  
  if(args.join(' ').length > maxLen) return message.channel.send(`The max length is ${maxLen}!`) 
  
  if(!args[0]) return message.channel.send('Please enter some text.');
  
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log('k...');
          console.dir(err);
          return;
      }

      message.channel.send(`${data}`, {code: 'AsciiArt'});
  });


}
}