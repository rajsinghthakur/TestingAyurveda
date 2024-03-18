import { validationResult } from "express-validator";
import Yoga from "../model/yoga.model.js";

export const Add = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Yoga.create({
        yogaName: request.body.yogaName,
        benefits: request.body.benefits,
        instructions: request.body.instructions,
        imageUrl: request.body.imageUrl,
        videoUrl: request.body.videoUrl,
        categoryname: request.body.categoryname
    })
        .then((result) => {
            return response.status(200).json({ message: "Yoga Saved...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const saveInBulk = async (request, response, next) => {
    try {
        let YogaList = request.body;
        for (let yoga of YogaList) {
            let { id, yogaName, benefits, instructions, imageUrl, videoUrl, categoryname } = yoga;
            await Yoga.create({ id, yogaName, benefits, instructions, imageUrl, videoUrl, categoryname })
        }
        return response.status(200).json({ message: "All Yoga Saved...." });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server Error", err });
    }
}
export const Update = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Yoga.update({
        yogaName: request.body.yogaName,
        benefits: request.body.benefits,
        instructions: request.body.instructions,
        imageUrl: request.body.imageUrl,
        videoUrl: request.body.videoUrl,
        categoryname: request.body.categoryname
    }, {
        where: { id: request.body.id },
        raw: true
    })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: "Yoga Updated...." });
            return response.status(401).json({ message: "Unauthorized reguest...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}


export const getYoga = async (request, response, next) => {
    Yoga.findAll()
        .then(result => {
            return response.status(200).json({ YogaList: result });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error", err });
        })
}

export const getYogaByCategory = (request, response, next) => {
    Yoga.findAll({ where: { categoryname: request.params.categoryName } })
        .then(result => {
            if (result[0])
                return response.status(200).json({ YogaList: result })
            return response.status(401).json({ message: "Unauthorized reguest...." });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error", err });
        })
}

export const Remove = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Yoga.destroy({
        where: { id: request.body.id },
        raw: true
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ message: "Yoga Removed...." });
            return response.status(401).json({ message: "Unauthorized reguest...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}