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

async function deletePartner(req, res) {
  const partnerId = req.params.id;

  try {
    await partnerModel.deletePartner(partnerId);
    res.redirect("/partners");
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
    listPartners,
    deletePartner,
};