import Tour from '../models/Tour.js'

//create tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body)
    try {
        const savedTour = await newTour.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: savedTour,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'failed to create, try again' });
    }
}
//update
export const updateTour = async (req, res) => {
    const id = req.params.id
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, { $set: req.body },{new:true});
        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'failed to update, try again'
        });
    }
};
//get single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id
    try {
        const tour = await Tour.findById(id).populate('reviews');
        res.status(200).json({
            success: true,
            message: 'Successfully get',
            data:tour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'failed to find, try again'
        });
    }
};
//get all tour
export const getAllTour = async (req, res) => {
    //pagination
    const page = parseInt(req.query.page)
    console.log(page)
    try {
        const tours = await Tour.find().populate('reviews')
        .skip(page*8)
        .limit(8);

        res.status(200).json({
            success: true,
            count: tours.length,
            message: 'Successfully get',
            data:tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'failed to find, try again'
        });
    }
};
//get all featured tour
export const getFeaturedTour = async (req, res) => {
    //pagination
    const page = parseInt(req.query.page)
    console.log(page)
    try {
        const tours = await Tour.find({featured:true}).populate('reviews').limit(8);

        res.status(200).json({
            success: true,
            message: 'Successfully get',
            data:tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'failed to find, try again'
        });
    }
};
//delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id
    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'failed to delete, try again'
        });
    }
};

//get tour by search
export const getTourBySearch = async(req,res)=>{
    const city= new RegExp(req.query.city,'i');
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try{
        const tours = await Tour.find({city,distance:{$gte:distance},maxGroupSize:{$gte:maxGroupSize}}).populate('reviews')
        res.status(200).json({
            success: true,
            message: 'Successfull',
            data: tours,
        });
    }catch(err){
        res.status(404).json({
            success: false,
            message: 'failed, try again'
        });
    }
}

//get tour count
export const getTourCount = async(req,res)=>{
    try{
        const tourCount = await Tour.estimatedDocumentCount()

        res.status(200).json({success:true,data:tourCount,message:"successfull"});
    }catch(err){
        res.status(404).json({success:false,message:"failed to fatch"});
    }
}