const BaseSlashCommand = require('../../utils/BaseSlashCommand');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { default: axios } = require('axios');
// setup enviroment variables to secure store and get credentials.
require('dotenv').config();
// set the header to "authorize" our account using API key
axios.defaults.headers.common['X-BLOBR-KEY'] = process.env.GEOIPKey;

//TODO add ip address validation.
module.exports = class PingCommand extends BaseSlashCommand {
  constructor() {
    super('get-ip-info');
  }

  async run(client, interaction) {
    // allow additional time to process user's request, discord only gives 3 seconds to respond otherwise.
    await interaction.deferReply({ ephemeral: true });
    // grab the ip from the user
    let ip = interaction.options.getString('ip', true);
    // formar our request to follow GEOAPI's expected syntax.
    let url = `${process.env.GEOAPIENDPOINT}?ip=${ip}`;
    let data;
    // use a trycatch block to catch any unexpected errors.
    try {
      data = await axios.get(url);
    } catch (error) {
      // log the error to console
      console.error(error);
      // let the user know we ran into an issue while processing their request.
      return interaction.editReply({
        content: `There was an error while handling your request.`,
      });
    }
    // handle any failure response from the API.
    if (data.status != 200)
      return interaction.editReply({
        content: 'Failed to get data from ip.',
      });
    // create an embed to display the data
    let embed = this.createEmbedFromIPInfo(data.data);
    // response to the user with the embed we created
    return interaction.editReply({
      content: '',
      embeds: [embed],
    });
  }

  getSlashCommandJSON() {
    // format our command into the structure discord expects
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(
        'check how much info a malicious user can retrieve on you if you only visit their site. '
      )
      .addStringOption(
        (option) =>
          option
            .setName('ip')
            .setDescription('the ip address to get info from.')
            .setRequired(true)
            .setMinLength(7) // 1.1.1.1 basic ip validation
      )
      .toJSON();
  }
  createEmbedFromIPInfo(data) {
    let embed = new EmbedBuilder();
    embed.setTitle(`${data.country.name} | ${data.country.tourism_slogan}`);
    //embed.setColor('RANDOM');
    embed.setAuthor({
      iconURL: data.country.flag_urls.png,
      name: data.country.official_name,
    });
    embed.setThumbnail(data.country.flag_urls.png);
    embed.setDescription(
      `**Cordinates**: **Latitude** ${data.point.lat} **Longitude**: ${
        data.point.lon
      }\n**Country Name**: ${data.country.official_name}\n**Currency**: ${
        data.country.currency.name
      } ${data.country.currency.symbol}\n**Region**: ${
        data.locationInfo.region
      }\n**City**: ${data.locationInfo.city}\n**Postal Code**: ${
        data.locationInfo.postal_code && data.locationInfo.postal_code.length
          ? data.locationInfo.postal_code
          : 'N/A'
      }\n**TimeZone**: ${data.portable.timezone.name} | **UTC offset** ${
        data.portable.timezone.utc_offsetStr
      }\n**Local Time**: ${data.portable.timezone.current_time}`
    );
    embed.addFields([
      { name: ' ', value: ' ' },
      { name: ' ', value: ' ' },
      { name: ' ', value: ' ' },
      // Seperate ip data and developer notice for readability's sake.
      {
        name: 'Developer Notice',
        value: `This is merely a sample of what a malicous user could retrieve, Stay safe out there friend. \n\nP.S. This ip is not stored anywhere in this bot. you can view its source code here [github.com/Pax-0](https://github.com/Pax-0)`,
      },
    ]);
    embed.setTimestamp();
    return embed;
  }
};
