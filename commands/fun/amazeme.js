const got = require('got');
module.exports = {
    name: "amazeme",
    category:"fun",
    description: "amazeme :))",
    usage: 'amazeme',
    run: async(client, message) => {
    got('https://www.reddit.com/r/interestingasfuck/random.json').then(response => {
        let content = JSON.parse(response.body);
        var title = content[0].data.children[0].data.title;
        var amazeme = content[0].data.children[0].data.url;
        message.channel.send('**' + title + '**');
        message.channel.send(amazeme)
    })
}
}