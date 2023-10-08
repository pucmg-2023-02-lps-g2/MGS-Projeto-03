const partnerModel = require(".././models/partnerModel");

async function listPartners(req, res) {
    try {
      const partners = await partnerModel.getAllPartners();
      
      res.render('partners.ejs', { partners });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    listPartners,
};