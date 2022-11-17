const Stories = require("../model/stories")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

module.exports = app => {
    app.post(`${BASE_URL}/story`, upload.single('image'), async (req, res, next) => {
        try {
            const payLoad = {...req.body}
            payLoad.image = req.file.filename;
            const result = await Stories.create(payLoad)
            res.status(200).json({ message: "story Added Successfully", data: result });
        } catch (error) {
            next(error)
        }
    })
    
    app.put(`${BASE_URL}/story/:id`, upload.single('image'), async (req, res, next) => {
        try {
            const result = await Stories.findById(req.params.id)
            if (!result) 
                throw { status: 400, message: "No story is available" }
            
            const payLoad = {...req.body}
            if (req.file) {
                payLoad.image = req.file.filename;
            }
            const result2 = await Stories.updateOne({_id: req.params.id}, payLoad)
            res.status(200).json({ message: "story updated successfully", data: result2 })
        } catch (error) {
            next(error)
        }
    });

    app.get(`${BASE_URL}/stories`, async (req, res, next) => {
        try {
            const result = await Stories.find({})
            res.status(200).json({ message: "List of All stories", data: result });
        } catch (error) {
            next(error)
        }
    })

    app.get(`${BASE_URL}/story/:id`, async (req, res, next) => {
        try {
            const result = await Stories.findById(req.params.id)
            if (!result) 
                throw { status: 400, message: "No story is available" }
            
            res.status(200).json({ message: "story by Id", data: result });
        } catch (error) {
            next(error)
        }
    })

    app.delete(`${BASE_URL}/story/:id`, async (req, res, next) => {
        try {
            const result = await Stories.findById(req.params.id)
            if (!result) 
                throw { status: 400, message: "No story is available" }
            
            const result2 = await Stories.deleteOne({_id: req.params.id})
            res.status(200).json({ message: "story deleted successfully", data: result2 });
        } catch (error) {
            next(error)
        }
    })
}