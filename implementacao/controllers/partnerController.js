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

async function addPartner(req, res) {
  try {
    const { id, name } = req.body;
    const data = await partnerModel.addPartner({ id, name });

    res.redirect('/partners');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar empresa parceira');
  }
};

async function deletePartner(req, res) {
  const partnerId = req.params.id;

  try {
    await partnerModel.deletePartner(partnerId);
    res.redirect("/partners");
  } catch (error) {
    console.error("Error ao deletar parceiro:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
    listPartners,
    addPartner,
    deletePartner,
};