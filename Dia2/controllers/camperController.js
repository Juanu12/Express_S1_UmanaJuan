const Camper = require ('../models/camperModel')


async function getCampers( req, res) {

    try {
        const campers = await Camper.getCampers();
        res.json(campers);



    } catch  (error) {

        res.status(500).json({ message: "Error al obtener los campers", error });



    

    }




}


async function createCamper () {


    try{

        const camper = req.body;

        if (!camper || !camper.cedula || !camper.nombre) {


            return res.status(400).json ({ message: "Datos inválidos"  })


        }



        const newCamper = await Camper.addCamper(camper);
        res.status(201).json(newCamper)




    } catch (error) {



            res.status(500).json({message: "Error al crear camper", error})

    }




}

async function removeCamper(req, res) {
    try {
      const { id } = req.params;
      const result = await Camper.deleteCamper(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar camper", error });
    }
  }
  


module.exports = {
    getCampers,
    createCamper,
    removeCamper
  };